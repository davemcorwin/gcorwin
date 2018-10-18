//https://github.com/nezhar/chrome-shots/blob/master/app/index.js
const puppeteer = require('puppeteer');
const url = require('url');

const root = 'https://www.gcorwin.com'

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(root, { waitUntil: 'networkidle2' });
  const links = await page.$$eval('a', as => as.map(a => a.href))
  const localLinks = getUniqueLocalLinks(links)
  console.log(localLinks)

  await page.screenshot({ path: 'gcorwin.png', fullPage: true });

  await browser.close();
})();

function getUniqueLocalLinks(anchors) {
  return anchors
    .filter(filterLocalLink)
    .filter(uniqueify)
}

function filterLocalLink(href) {
  return href && new url.parse(href).host === 'www.gcorwin.com'
}

function uniqueify(value, idx, ary) {
  return ary.indexOf(value) === idx
}
