// Author: Benjamin Jessing
// webScraper.js scrapes relevant info from the wikiCFP URL below:
const url = 'http://www.wikicfp.com/cfp/servlet/event.showcfp?eventid=98130&copyownerid=52097&skip=1';
const axios = require('axios');
const cheerio = require('cheerio');
// connect to the WikiCFP conference website/URL
axios.get(url)
  .then(response => {
    /* press F12 in a browser to see the same HTML code from the website:
     * console.log(response.data);
     */
    let getData = html => {
      data = [];
      const $ = cheerio.load(html);
      // scrape the important data from the website
      data.push({
        // FIXME: return the scraped information instead of null values
        url : url,
        conferenceName : null,
        submissionDeadline : null,
        notificationDeadline : null,
        abstractDeadline : null,
        authorFeedbackRebuttalWindowBegin : null,
        authorFeedbackRebuttalWindowEnd : null,
        conferenceDate : null,
        fieldOfStudy : null,
        cameraReadyDeadline : null
      });
      // output scraped data to the sonsole
      console.log(data);
    }
    // required to output scraped data to the console
    getData(response.data)
  })
  .catch(error => {
    // log any errors during website connection
    console.log(error);
  })





// POSSIBLE CODE TO COPY-PASTE FROM?
//
// async function scrapeProduct(url) {
//
//     // connect to the website and open an invisible browsing tab
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(url);
//
//     // scrape the desired text from the website using the XPath
//     const [el] = await page.$x('/html/body/div[4]/center/table/tbody/tr[2]/td/h2/span/span[7]');
//     const txt = await el.getProperty('textContent');
//     const title = await txt.jsonValue();
//
//     // output the text scraped from the website
//     console.log({title});
//
//     // close the browser
//     browser.close();
// }
// // URL (web address) of the site to scrape from
// scrapeProduct('https://www.amazon.com/Black-Swan-Improbable-Robustness-Fragility/dp/081297381X');
