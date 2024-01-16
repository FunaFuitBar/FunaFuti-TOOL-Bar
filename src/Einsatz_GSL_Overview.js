// ==UserScript==
// @name         Einsatz und GSL overview
// @version      1.0.0
// @author       TheWatcher - Watch at me!
// @include      /^https?:\/\/(?:w{3}\.)?(?:leitstellenspiel\.de|(?:meldkamerspel|missionchief|missionchief-australia|nodsentralspillet|112-merkez|jogo-operador112|operador193|dyspetcher101-game|missionchief-japan|jocdispecerat112|missionchief-korea|hatakeskuspeli|dispecerske-centrum)\.com|missionchief\.co\.uk|centro-de-mando\.es|operatorratunkowy\.pl|larmcentralen-spelet\.se|operatore112\.it|operateur112\.fr|dispetcher112\.ru|alarmcentral-spil\.dk|operacni-stredisko\.cz|centro-de-mando\.mx)\/$/
// @updateURL    https://github.com/FunaFuitBar/FunaFuti-TOOL-Bar/edit/main/src/Einsatz_GSL_Overview.js
// @grant        GM_addStyle
// ==/UserScript==
/* global $ */

(function() {
    'use strict';

    GM_addStyle(`.modal {
display: none;
position: fixed; /* Stay in place front is invalid - may break your css so removed */
padding-top: 100px;
left: 0;
right:0;
top: 0;
bottom: 0;
overflow: auto;
background-color: rgb(0,0,0);
background-color: rgba(0,0,0,0.4);
z-index: 9999;
}
.modal-body{
height: 650px;
overflow-y: auto;
}`);

    $("body")
        .prepend(`<div class="modal fade bd-example-modal-lg" id="gslModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&#x274C;</span>
                          </button>
                          <h3 class="modal-title"><center>Übersicht aller Einsätze & GSL</center></h3>
                        </div>
                          <div class="modal-body" id="gslModalBody">
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Schließen</button>
                            <div class="pull-left">v ${GM_info.script.version}</div>
                          </div>
                    </div>
                  </div>`);

    $("#btn-group-mission-select")
        .before(`<a id="gslTriggerButton" data-toggle="modal" data-target="#gslModal" class="btn btn-success btn-xs">
                   <span class="glyphicon glyphicon-star"></span>
                 </a>`);

    var gslMissionTypes = [41,43,59,75,99,207,221,222,256,350];

    async function gslReplies(source) {
        var mission = await $.get("/missions/"+source);
        var returnValue = "";

        if($("#mission_replies > li", mission).length) {
            $("#mission_replies > li", mission).each(function() {
                returnValue += $(this)[0].innerText + "<br>";
            });
        }

        if(returnValue) {
            returnValue.trim();
        } else {
            returnValue = "- keine Rückmeldungen -";
        }
        return returnValue;
    }

    function getGslMissions() {
        var returnValue = [];

        $("#mission_list > .missionSideBarEntry, #mission_list_alliance > .missionSideBarEntry:not(.mission_deleted)").each(function() {
            var $this = $(this);
            var missionId = +$this.attr("id").replace(/\D+/g,"");
            var missionType = +$this.attr("mission_type_id");

            if(isNaN(missionType) || gslMissionTypes.includes(missionType)) {
                returnValue.push({"id": missionId, "type": missionType, "address": $("#mission_address_"+missionId).text().trim(), "caption": $("#mission_caption_"+missionId).contents().not($("#mission_caption_"+missionId).children()).text().replace(",","").replace("[Verband]","").trim()});
            }
        });

        return returnValue;
    }

    $("body").on("click", "#gslTriggerButton", async function() {
        $("#gslModalBody").html("wird geladen ...");

        var gslMissions = getGslMissions();
        var intoTable =
            `<table class="table">
             <thead>
             <tr>
             <th class="col">Name</th>
             <th class="col">Adresse</th>
             <th class="col">Rückmeldungen</th>
             </tr>
             </thead>
             <tbody>`;

        for(var i in gslMissions) {
            var e = gslMissions[i];
            var replies = await gslReplies(e.id);

            intoTable +=
                `<tr>
                   <td class="col"><a class="lightbox-open" href="/missions/${e.id}">${e.caption}</a></td>
                   <td class="col">${e.address}</td>
                   <td class="col">${replies}</td>
                 </tr>`;
        }

        intoTable += `</tbody>
                      </table>`;

        $("#gslModalBody").html(intoTable);
    });

})();
