'use strict'

var htmlparser = require('htmlparser2')

module.exports = detect
function detect(src) {
  if (typeof src === 'string') src = parseDOM(src)
  var res = []
  parseDeps(src, res)
  return dedupe(res)
}

function parseDOM(domstr) {
  var handler = new htmlparser.DefaultHandler();
  var parser = new htmlparser.Parser(handler);
  parser.parseComplete(domstr);
  return handler.dom;
}

function parseDeps(dom, res) {
  if (Array.isArray(dom)) {
    for (var i = 0; i < dom.length; i++) {
      parseDeps(dom[i], res)
    }
  } else if (typeof dom === 'object') {
    var attrs = dom.attribs || {}

    attrs = Object.keys(attrs).reduce(function (obj, name) { return obj[name.toLowerCase()] = attrs[name], obj }, {})

    if (attrs.src) res.push(attrs.src)
    if (attrs.href) res.push(attrs.href)
    if (attrs.manifest) res.push(attrs.manifest)
    if (dom.name === 'meta') {
      if (attrs.property && attrs.property.toLowerCase() === 'og:image' && attrs.content) res.push(attrs.content)
    }

    if (dom.children) parseDeps(dom.children, res)
  }
}


function dedupe(urls) {
  var seen = {}
  return urls
    .filter(function (url) {
      if (seen['key:' + url]) return false
      else return seen['key:' + url] = true
    })
}