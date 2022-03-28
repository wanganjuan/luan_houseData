
const puppeteer = require('puppeteer');
let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
 
    await page.goto('http://quote.eastmoney.com/sz002044.html');
    // await page.click('#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img');
    await page.waitFor(10);
 
    const result = await page.evaluate(() => {
        let title = document.querySelector('#arrowud').innerText;
 
        return {
            title
        }
 
    });
 
    browser.close();
    return result;
};
 
scrape().then((value) => {
    console.log(value); // Success!
});
// (async () => {
//   const browser = await puppeteer.launch({
//       headless: false,   //有浏览器界面启动
//       slowMo: 100,       //放慢浏览器执行速度，方便测试观察
//       args: [            //启动 Chrome 的参数，详见上文中的介绍
//           '–no-sandbox',
//           '--window-size=1280,960'
//       ],
//   });
//   const page = await browser.newPage();
//   await page.goto('https://www.baidu.com');
//   await page.close();
//   await browser.close();
// })();