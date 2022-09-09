const puppeteer = require('puppeteer');

exports.main = async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.send('params error');
  }

  const width = 959
  const height = 500

  const args = [
    `--window-size=${width},${height}`,
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-gpu',
    '--ignore-certificate-errors',
    '--disable-infobars',
    '--lang=ja'
  ];
  const browser = await puppeteer.launch({
    args: args,
    headless: true
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: width,
    height: height
  })
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'ja'
  });
  await page.goto(url, { waitUntil: 'networkidle0' });
  const imageBuffer = await page.screenshot({
    // fullPage: true,
    quality: 100,
    type: 'jpeg'
  });
  res.set('Content-Type', 'image/png');
  res.send(imageBuffer);
};