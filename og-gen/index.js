const puppeteer = require("puppeteer");
const wait = require("waait");

const cached = new Map();

module.exports = async (context, req) => {
    const qs = new URLSearchParams(req.query);
    console.log(`https://thecloudblog.net/opengraph.html?${qs.toString()}`);
    const photoBuffer = await getScreenshot(`https://thecloudblog.net/opengraph.html?${qs.toString()}`);
    context.res = {
        body: photoBuffer,
        headers: {
            "content-type": "image/jpeg",
        }
    };
};

async function getScreenshot(url) {
    // first check if this value has been cached
    const cachedImage = cached.get(url);
    if (cachedImage) {
        return cachedImage;
    }
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });
    await page.goto(url);
    await wait(1000);
    const buffer = await page.screenshot();
    cached.set(url, buffer);
    await browser.close();
    return buffer;
}