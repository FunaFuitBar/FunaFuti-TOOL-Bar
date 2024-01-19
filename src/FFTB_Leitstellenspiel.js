"use strict";

if (typeof jQuery === "undefined") {
  throw new Error("No jQuery! Aborting!");
}

var fftb_modules = [
  // Neue Module immer UNTEN hinzufügen
  {
    id: 1,
    name: "Einsatz & GSL Übersicht",
    script: "Einsatz_GSL_Overview.js",
    description:
      "Zeigt alle VGSL & PGSL an, und alle Einsätze ab 7000 Cr.",
  },
    /*
  {
    id: 4,
    name: "Mission-Filter",
    script: "fftb_leitstellenspiel.mission_filter.js",
    description:
      "Blendet oben in der Missions-Liste einen Filter ein, mit dem man Einsätze nach erwarteten Credits filtern kann (wirkt nicht auf das Alarmfenster).",
  },
  {
    id: 6,
    name: "Hospital Info",
    pathname: "/vehicles",
    pathStartsWith: true,
    script: "fftb_leitstellenspiel.hospital_info.js",
    description:
      "In dem Fenster, in dem Patienten ins Krankenhaus geschickt werden, wird für Verbands-Krankenhäuser Information über das Gebäude eingeblendet.",
  },
  {
    id: 5,
    name: "Mission Speed",
    script: "fftb_leitstellenspiel.speed.js",
    description:
      "In der Missions-Liste wird oben vor den Filtern nicht nur 'Pause' angezeigt, sondern alle Geschwindigkeiten - mit einem Link zum schnellen Anpassen.",
  },
  {
    id: 7,
    name: "Chat History Highlighting",
    pathname: "/alliance_chats",
    pathStartsWith: true,
    script: "fftb_leitstellenspiel.alliance_chat.js",
    description:
      "Im Verbands-Chat-Verlauf (History, nicht aktuelle Liste) werden alle gesendeten Nachrichten umrandet: grün: gesendete Nachricht / hellrot: Name wurde erwähnt (mit oder ohne @) / dunkelrot: Startet mit dem Name - könnte eine persönliche Nachricht gewesen sein.",
  },
  {
    id: 8,
    name: "Gebäude Zuklappen (beta)",
    script: "fftb_leitstellenspiel.building_toggle.js",
    description:
      "Gebäude können zu- und aufgeklappt werden, damit die Liste etwas übersichtlicher wird. Noch manuell - automatisch ist in Entwicklung.",
  },
  {
    id: 9,
    name: "Mögliche Einsätze: DGL ausblenden",
    pathname: "/einsaetze",
    pathStartsWith: false,
    script: "fftb_leitstellenspiel.hidedgl.js",
    description:
      "Auf der Seite 'Mögliche Einsätze' alle Einsätze, die die Dienstgruppen-Erweiterung benötigen, ausblenden.",
  },
  {
    id: 3,
    name: "Übersicht Personal <sup><i class='glyphicon glyphicon-warning-sign'></i></sup>",
    script: "fftb_leitstellenspiel.employee.js",
    description:
      "Es wird aus allen Wachen der aktuelle Personal-Stamm geladen und kann unter Profil -> Angestellte angezeigt und gefiltert werden (kann dort mit einem Klick für andere Plugins exportiert werden).",
  },
  {
    id: 1,
    name: "Personal Anheuern <sup><i class='glyphicon glyphicon-warning-sign'></i></sup>",
    script: "fftb_leitstellenspiel.hire.js",
    description:
      "Wenn nicht Premium: geht alle 2 Tage durch alle Wachen durch und stellt Personal-Anheuern auf 3 Tage ein.",
  },*/
];
var fftb_version = 1.00;
var fftb_latest_changes_msg = "<b>Neues Modul:</b> Mögliche Einsätze: DGL ausblenden";

function fftb_setup_info_dialog() {
  $("#fftb_version").text(fftb_version);

  var mods_act = JSON.parse(localStorage.getItem("fftb_modules_active ") || "[]");

  var changed = false;

  for (var i = 0; i < fftb_modules.length; i++) {
    var m = fftb_modules[i],
      act = false;

    if (mods_act.find((e) => m.id == e) >= 0) {
      act = true;
    }

    $("#fftb_modules").append(
      `<div class="col-xs-12 col-md-6">
                <div class="fftb_module${act ? " active" : ""}">
                    <div class="pull-right btn-group">
                        <label for="mod_on_${m.id}" class="btn"><input type="radio" id="mod_on_${m.id}" name="mod_${m.id}" data-id="${m.id}" value="on"${act ? " checked" : ""}> On</label> 
                        <label for="mod_off_${m.id}" class="btn"><input type="radio" id="mod_off_${m.id}" name="mod_${m.id}" value="off"${act ? "" : " checked"}> Off</label>
                    </div>
                    <div class="h2">${m.name}</div>
                    <small>${m.description}</small>
                </div>
            </div>`
    );
  }

  $("#fftb_modules input[type='radio']").change((e) => {
    var p = $(e.target).parent().parent().parent();

    p.toggleClass("active");

    var act = [];

    $("#fftb_info_dlg input[type='radio'][value='on']:checked").each((i, e) => {
      act.push($(e).data("id"));
    });

    changed = true;

    console.log("act", act);
    localStorage.setItem("fftb_modules_active", JSON.stringify(act));
  });

  $("#fftb_info_dlg").on("hidden.bs.modal", () => {
    if (changed) {
      location.reload();
    }
  });

  $("#logout_button")
    .parent()
    .after(
      '<li role="presentation"><a href="#" data-toggle="modal" data-target="#fftb_info_dlg" onclick="return false;"><i class="glyphicon glyphicon-info-sign"></i> fftb_leitstellenspiel_extras</a></li>'
    );

  var c = localStorage.getItem("fftb_info_shown");

  //
  // Dialog für neue Version mit Änderungen anzeigen?
  //
  if (!c || c < fftb_version) {
    $("#fftb_info_new_version").show();

    $("#fftb_info_new_version .latest-changes").html(fftb_latest_changes_msg);

    $("#fftb_info_dlg").modal("show");

    localStorage.setItem("fftb_info_shown", fftb_version);
  }
}

function fftb_load_module(src) {
  $.ajax({
    url: "https://raw.githubusercontent.com/FunaFuitBar/FunaFuti-TOOL-Bar/main/src/" + src,
    async: true,
  })
    .done(() => {
      console.log(src + " loaded");
    })
    .fail((xhr, msg, err) => {
      console.warn(src + " NOT loaded", msg, err, xhr);
    });
}

$(function () {
  console.info(
    "fftb_extras loading... (version " + fftb_version + ")"
  );

  window.setTimeout(() => {
    $.ajax({
      url: "https://raw.githubusercontent.com/FunaFuitBar/FunaFuti-TOOL-Bar/main/src/FFTB_Snippet_dialog.php",
      async: true,
    })
      .done((d) => {
        $("body").append(d);
        //$('#fftb_peronal_dlg').dialog();
      })
      .fail((d, e, f) => {
        console.error("DLG FAIL", e, d, f);
      });

  }, 100);

  window.setTimeout(() => {
    var mods = JSON.parse(localStorage.getItem("fftb_modules_active") || "[]");

    for (var i = 0; i < mods.length; i++) {
      var mod = fftb_modules.filter(function (e) {
        return e.id == this.i;
      }, { i: mods[i] });

      if (mod.length >= 1) {
        if (mod[0].pathname) {
          console.log("location", location);
          if (
            mod[0].pathStartsWith &&
            location.pathname.startsWith(mod[0].pathname)
          ) {
            fftb_load_module(mod[0].script);
          } else if (location.pathname == mod[0].pathname) {
            fftb_load_module(mod[0].script);
          }
        } else {
          fftb_load_module(mod[0].script);
        }
      }
    }

    fftb_setup_info_dialog();
  }, 2500);
});
