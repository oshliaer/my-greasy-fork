// ==UserScript==
// @name          Whitespaces (only pilcrow for the endline) in Google Docs
// @description   Adds whitespaces (only pilcrow for the endline) in Google Docs.
// @namespace     https://contributor.pw
// @domain        docs.google.com
// @include       http://docs.google.com/*
// @include       https://docs.google.com/*
// @author        Alex Ivanov <ai@contributor.pw>
// @developer     Alex Ivanov <ai@contributor.pw>
// @version       2020.1.31
// @grant         GM_addStyle
// @icon          https://gist.github.com/pp/pp/raw/icon.png
// @screenshot    https://gist.github.com/pp/pp/raw/screenshot.png
// @license       MIT
// ==/UserScript==

var style =
  '.kix-lineview > .kix-lineview-content > span > .goog-inline-block.kix-lineview-text-block:last-child:after{content:"¶";}';

GM_addStyle(style);
