// ==UserScript==
// @name          Google Sheets New Functions Alert
// @description   Trying to check if there are new features in Google Sheets.
// @namespace     https://contributor.pw
// @domain        docs.google.com
// @include       https://docs.google.com/spreadsheets/*
// @author        Alex Ivanov <ai@contributor.pw>
// @developer     Alex Ivanov <ai@contributor.pw>
// @version       0.0.0-2
// @grant GM_setValue
// @grant GM_getValue
// @icon          https://raw.githubusercontent.com/contributorpw/my-greasy-fork/master/userscripts/Google%20Sheets%20Styles/ico.png
// @screenshot    https://raw.githubusercontent.com/contributorpw/my-greasy-fork/master/userscripts/Google%20Sheets%20Styles/screenshot.png
// @license       MIT
// ==/UserScript==

// console.log(' =========================================================== ');
// // waitForKeyElements('iframe[id*="ritz"]', actionFunction);
// waitForKeyElements('iframe', actionFunction);

// function actionFunction(jNode) {
//   //-- DO WHAT YOU WANT TO THE TARGETED ELEMENTS HERE.
//   // jNode.css('background', 'yellow'); // example
//   alert('load!');
// }

const store = {
  mo: undefined,
  frame: undefined,
};

const sendData = async (frame) => {
  const ritzFileName = [
    // ...document
    //   .querySelector('iframe[id*="ritz"]')
    ...frame.contentDocument.querySelectorAll('script'),
  ]
    .map((el) => el.innerHTML)
    .filter((t) => /ritz_behavior\.js/.test(t))[0]
    .match(/[^\/]+ritz_behavior\.js/)[0];
  console.log(ritzFileName);
  const res = await fetch(
    `https://docs.google.com/spreadsheets/j2clritzapp/static/client/js/${ritzFileName}`
  );
  console.log('yep!');
  const text = await res.text();
  const list = text.match(/"([^"]*UPLUS UMINUS[^"]+)"/gim)[0];
  console.log(list);
  GM_setValue('timemark_sending', '' + new Date().getTime());
  console.log('sending data');
  checkData({ data: text });
};

const checkData = async (body) => {
  const res = await fetch(
    'https://script.google.com/macros/s/AKfycbwqKT8nsqfq3inuO0UziG5XUj0edCVFj23zwrCMr5MVxkxWd4U_t6pivfEXIMwQX6L3/exec',
    {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify(body || {}),
    }
  );
  const text = await res.text();
  console.log(text);
  GM_setValue('timemark_checking', '' + new Date().getTime());
};

store.mo = new MutationObserver((mutationRecords) => {
  mutationRecords.forEach((mutationRecord) => {
    const frame = mutationRecord.target.querySelector('iframe[id*="ritz"]');
    if (frame) {
      if (store.frame === undefined) {
        store.frame = frame;
        sendData(store.frame);
      }
      store.mo.disconnect();
    }
  });
});

const observation = () =>
  store.mo.observe(document.querySelector('body'), {
    childList: true,
  });

(function () {
  const timemark_sending = GM_getValue('timemark_sending', '0');
  if (new Date().getTime() - timemark_sending > 60 * 1000) {
    setTimeout(observation, 3000);
  } else {
    const timemark_checking = GM_getValue('timemark_checking', '0');
    if (new Date().getTime() - timemark_checking > 10 * 60 * 1000) {
      console.log('======================================= skip sending data');
      console.log('======================================= checking data');
      checkData({ test: 1 });
    } else
      console.log('======================================= skip sending data');
    console.log('======================================= skip checking data');
  }
})();
