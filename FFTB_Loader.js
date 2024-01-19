// ==UserScript==
// @name         FunaFuti(TOOL)-Bar
// @version      0.2
// @description  Erweiterung für LSS
// @author       TheWatcher - Watch at me!
// @homepage     n/a
// @include      *://leitstellenspiel.de/*
// @include      *://www.leitstellenspiel.de/*
// @updateURL    https://raw.githubusercontent.com/FunaFuitBar/FunaFuti-TOOL-Bar/main/src/FFTB_Leitstellenspiel.js
// @grant        none
// @run          document-start
// ==/UserScript==

if ("undefined" == typeof jQuery) {
    throw new Error("FunaFuti(TOOL)-Bar: No jQuery! Aborting!");
}

var uid = "";
if ("undefined" != typeof user_id) {
    game = window.location.hostname.toLowerCase().replace("www.", "").split(".")[0];
    uid = "?uid=" + game + user_id;
}

$("head").append('<script id="FFTB_Leitstellenspiel.js" src="https://cdn.jsdelivr.net/gh/FunaFuitBar/FunaFuti-TOOL-Bar/src/' + uid + '" type="text/javascript"></script>');
