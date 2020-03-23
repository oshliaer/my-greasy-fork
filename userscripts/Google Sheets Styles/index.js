// ==UserScript==
// @name          Google Sheets Advanced Styles
// @description   Adds a few useful properties for Google Sheets.
// @namespace     https://contributor.pw
// @domain        docs.google.com
// @include       https://docs.google.com/spreadsheets/*
// @author        Alex Ivanov <ai@contributor.pw>
// @developer     Alex Ivanov <ai@contributor.pw>
// @version       0.0.0-1
// @grant         none
// @icon          https://raw.githubusercontent.com/contributorpw/my-greasy-fork/master/userscripts/Google%20Sheets%20Styles/ico.png
// @screenshot    https://raw.githubusercontent.com/contributorpw/my-greasy-fork/master/userscripts/Google%20Sheets%20Styles/screenshot.png
// @license       MIT
// ==/UserScript==

const observation = () =>
  [...document.querySelectorAll(".cell-input")].forEach(el => {
    console.log("asdfsdf");
    new MutationObserver(e => {
      console.log(e);
      e.forEach(l =>
        [...l.target.querySelectorAll(".formula-content")].forEach(
          el => (el.style["font-size"] = "24px")
        )
      );
    }).observe(el, {
      childList: true
    });
  });

(function() {
  setTimeout(observation, 3000);
})();
