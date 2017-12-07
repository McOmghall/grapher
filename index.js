const Crawler = require("crawler");
const URL = require('url')

const INSIDE_WIKI_PAGES = new RegExp('^\/wiki')
const SPECIAL_PAGES = ['/File:', '/Special:', '/Portal:', '/Category:', '/Wikipedia:', '/Talk:', '/Help:'].map((e) => new RegExp(INSIDE_WIKI_PAGES.source + e))

console.log(INSIDE_WIKI_PAGES)
console.log(SPECIAL_PAGES)

const isInsideWikiPages = (e) => INSIDE_WIKI_PAGES.test(e)
const isNotASpecialPage = (e) => !SPECIAL_PAGES.some((sp) => sp.test(e))
const filterWikiURL = (e) => isInsideWikiPages(e) && isNotASpecialPage(e)

const crawlWithDeepness = function (deepness, error, res, done) {
  if (error) {
    console.error('D:%d ERRORED %s -> %s', deepness, res.options.uri, null);
  } else {
    console.log('D:%d SUCCESS %s %s -> %s', deepness, res.request.method, res.request.uri.href, res.$('title').text());

    const links = res.$('a')
    console.log('D:%d SUCCESS %s %s -> Parsing %s links', deepness, res.request.method, res.request.uri.href, links.length)

    const filterLinks = links.get().map((e) => res.$(e).attr('href')).filter(filterWikiURL).map((e) => URL.resolve(res.request.uri.href, e))
    const uniqueHrefs = Array.from(new Set(filterLinks))

    console.log('D:%d SUCCESS %s %s -> Got %s valid hrefs', deepness, res.request.method, res.request.uri.href, uniqueHrefs.length)

    c.queue(uniqueHrefs.map((e) => ({ uri: e, callback: crawlWithDeepness.bind(this, deepness + 1)})))
  }
  done();
}

const c = new Crawler({
  maxConnections: 10,
  preRequest: function (opts, done) {
    done()
  },
  // This will be called for each crawled page
  callback: crawlWithDeepness.bind(this, 0)
});


c.queue('https://en.wikipedia.org/wiki/Main_Page')
