// ==UserScript==
// @name          Copy Link as MD
// @description
// @namespace     https://contributor.pw
// @author        Alex Ivanov <ai@contributor.pw>
// @developer     Alex Ivanov <ai@contributor.pw>
// @version       0.0.0-2
// @include       *
// @grant         GM_setClipboard
// @grant         GM_notification
// @license       MIT
// ==/UserScript==

/**
 *
 * @param {HTMLAnchorElement} a
 * @returns {string}
 */
const anchorToMarkdown_ = (a) =>
  toMarkdown_(clearHTMLString_(a.innerHTML), a.href);

/**
 *
 * @param {string} t
 * @param {string} l
 * @returns {string}
 */
const toMarkdown_ = (t, l) => `[${t}](${l})`;

/**
 *
 * @param {string} htmlString
 * @returns {string}
 */
const clearHTMLString_ = (htmlString) =>
  String(htmlString).replace(/<[^>]*>?/gm, '');

(() =>
  document.addEventListener('keydown', (e) => {
    if (
      e.code === 'KeyM' &&
      e.ctrlKey &&
      !e.altKey &&
      !e.shiftKey &&
      !e.metaKey
    ) {
      let md = '';

      const a = document.querySelector('a:hover');
      const sel = window.getSelection();

      if (a) md = anchorToMarkdown_(a);
      else if (sel)
        md = toMarkdown_(
          `${document.title} | ${sel.toString()}`,
          window.location
        );

      if (md) {
        GM_setClipboard(md);
        GM_notification(md, 'Copied');
        e.preventDefault();
      }
    }
  }))();
