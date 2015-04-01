// stolen from this stackexchange answer
// http://stackoverflow.com/a/12070823

var host = "https://google.com/?igu=2#igu=2";
// enforcing https because security is important
// the url param is what actually tells google to render the page backwards.
// com.google is just an iframe to that url.
// if they ever remove this functionality, the url param won't work anymore, so normal traffic will pass harmlessly through the extension
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    return {
      redirectUrl: host + details.url.match(/^https?:\/\/[^\/]+([^\/]*)/)[1]
    };
  }, {
    urls: [
      "*://google.com/",
      "*://www.google.com/"
    ],
    types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
  }, ["blocking"]
);
