/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */

const { session } = require('electron');

const INSTAGRAM = 'https://www.instagram.com/';
const INSTAGRAM_REGEX = /^https?:\/\/www.instagram.com/;
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36 OPR/50.0.2762.67';

const isInstagram = url => INSTAGRAM_REGEX.test(url);

module.exports = () => {
  const { webRequest } = session.defaultSession;

  webRequest.onBeforeSendHeaders((details, fn) => {
    const headers = details.requestHeaders;

    if (isInstagram(details.url)) {
      headers.Origin = INSTAGRAM;
      headers.Referer = INSTAGRAM;
      headers['User-Agent'] = USER_AGENT;
    }

    fn({ cancel: false, requestHeaders: headers });
  });

  webRequest.onHeadersReceived((details, fn) => {
    const headers = details.responseHeaders;

    if (isInstagram(details.url)) {
      headers['access-control-allow-origin'] = ['*'];
    }

    fn({ cancel: false, responseHeaders: headers });
  });
};
