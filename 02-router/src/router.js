import $ from 'jquery'

let routingTable = {}; // structure: routingTable[path]: {callback: theCallbackFunction, fullpath: theFullPath}

export default function router(path, callback) {
  if (path != undefined && callback != undefined) {
    createNewEntryInRoutingTable(path, callback);
  } else if (path != undefined && callback == undefined) {
    routeTo(path)
  } else /* path == undefined && callback == undefined */ {
    // router initialized
    router(getCurrentPathFromUrl());
  }
}

$(document).ready(function() {
  adjustRoutingLinks();
  window.onpopstate = function(event) {
    router(event.state.path);
  }
});

function createNewEntryInRoutingTable(path, callback) {
  const regexDynamicParam = /(.*\/)(:.*)/i; // e.g. /players/:player --> (/players)/(:player)
  // const regexDynamicParam = /(.*)\/(:.*)/i; // e.g. /players/:player --> (/players)/(:player)
  let regexResult = regexDynamicParam.exec(path);
  if (regexResult !== null) {
    // Path with dynamic parameter
    let pathWithoutParameter = regexResult[1];
    routingTable[pathWithoutParameter] = {
      callback,
      fullPath: path
    }
  } else {
    // Static path
    routingTable[path] = {
      callback,
      fullpath: path
    }
  }
}

function routeTo(path) {
  setUrl(path);
  // check if there are parameters -> dynamic routing
  const regexDynamicParam = /(\/.*?\/)(.*)/i; // e.g. /players/daniel --> (/players)/(daniel)
  let regexResult = regexDynamicParam.exec(path);
  if (regexResult !== null) {
    // We have a dynamic route with a parameter
    let pathWithoutParameter = regexResult[1];
    let paramValue = regexResult[2];
    if (paramValue !== '' && routingTable.hasOwnProperty(pathWithoutParameter)) {
      routingTable[pathWithoutParameter].callback(paramValue);
    } else {
      fallback();
    }
  } else if (routingTable.hasOwnProperty(path)) {
    // We have a static router
    routingTable[path].callback();
  } else {
    fallback();
  }
}

function fallback() {
  if (routingTable.hasOwnProperty('*')) {
    // fallback if set
    routingTable['*'].callback();
  }
}

function getCurrentPathFromUrl() {
  let regex = /[^\/]*\/\/[^\/]+(\/.*)/i;
  let path = regex.exec(document.URL)[1];
  return path;
}


/**
 * @param {any} path e.g. /players/magnus --> http:://www.foo.com/players/magnus
 */
function setUrl(path) {
  let regex = /^([^\/]*\/\/[^\/]+)\//i;
  let interestingUrlPart = regex.exec(document.URL)[1];
  let newUrl = interestingUrlPart + path;
  // Only set it, if it's not the same already
  if (document.URL !== newUrl) {
    history.pushState({path}, path, newUrl);
  }
}

function adjustRoutingLinks() {
  // Select only the links which are used for routing
  let filteredLinks = $('a[href]')
    .not('a[download]')
    .not('a[rel="external"]')
    .not('a[rel="download"]')
    .not('a[target="_blank"]')
    .not('a[href^="//"]')
    .not('a[href^="http"]');
  filteredLinks.each(function() {
    // $(this) is the current link
    $(this).on('click', function(e) {
      router($(this).attr('href'));
      e.preventDefault();
    });
  });
}