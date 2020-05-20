// Author: Benjamin Jessing, Daniel Garcia

/* The scrapeConferenceData() function scrapes data that is present in a WikiCFP
 * conference webpage. The URL is the only necessary argument; the function
 * scrapeConferenceData() then returns an Object of descriptive member variables
 * accessible by the dot operator; a usage example follows:
 *    var submitBy =
 *    scrapeConferenceData('http://www.wikicfp.com/...').submissionDeadline;
*/

const puppeteer = require('puppeteer');

function scrapeConferenceDataUsingCheerio(conferenceURL) {
   // setup
   var request = require('request');
   var cheerio = require('cheerio');

   // this Object will be updated and returned later
   var conferenceData = {
      conferenceName: undefined,
      submissionDeadline: undefined,
      notificationDeadline: undefined,
      abstractDeadline: undefined,
      authorFeedbackRebuttalWindow: undefined,
      conferenceDates: undefined,
      fieldOfStudy: undefined,
      cameraReadyDeadline: undefined
   }

   request(conferenceURL, function(error, response, html) {
      if (!error) {
         // load HTML
         const $ = cheerio.load(html);

         // setup
         const tableCells = $('.gglu').find('tr').children();
         const categories = $('.gglu').find('a');

         // scrape conference name
         conferenceData.conferenceName = $('title').text().trim();

         // scrape data that is clearly labeled on WikiCFP
         conferenceData.submissionDeadline = extractNextElementText(tableCells, 'Submission Deadline');
         conferenceData.notificationDeadline = extractNextElementText(tableCells, 'Notification Due');
         conferenceData.abstractDeadline = extractNextElementText(tableCells, 'Abstract Registration Due');
         conferenceData.notificationDeadline = extractNextElementText(tableCells, 'Notification Due');
         conferenceData.conferenceDates = extractNextElementText(tableCells, 'When');
         conferenceData.fieldOfStudy = extractNextElementText(categories, 'Categories');

         // scrapes the text of an element after another; called above several times
         function extractNextElementText(elementList, currentElementText) {
            var result = undefined;
            elementList.each(function(i) {
               if(elementList.eq(i).text().trim() == currentElementText.trim()) {
                  result = elementList.eq(i + 1).text().trim();
               }
            });
            return result;
         }

         // The following data might possibly not exist on WikiCFP; must verify with client.
         conferenceData.authorFeedbackRebuttalWindow = 'VERIFY WITH CLIENT; UNAVAILABLE ON WIKICFP';
         conferenceData.cameraReadyDeadline = 'VERIFY WITH CLIENT; UNAVAILABLE ON WIKICFP';

         // the conferenceData Object can now be returned; it is full of information
         //console.log('This is the fully-loaded conference data Object:');
         //console.log('(Some information might be undefined because it was not provided on WikiCFP.)');
         //console.log(conferenceData);
         return conferenceData;
      } else {
         // this outputs to the console if the URL does not exist
         console.log('Error: URL does not exist.');
         return undefined;
      }
   });
   return conferenceData;
}

async function grabTopFiveUrls(conf_url) {
   var all_info = [];

   // connect to the website and open an invisible browsing tab
   const browser = await puppeteer.launch();
   const page = await browser.newPage();
   await page.goto(conf_url);

   //loop through popular links, follow them and grab the conference info, then push info into all_info array
   for (var i = 2; i <= 6; i++) {
      await page.$eval( 'body > div:nth-child(5) > table > tbody > tr > td:nth-child(5) > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child('+i+') > td:nth-child(1) > div > a', form => form.click() );
      //console.log(page.url());
      all_info.push(scrapeConferenceDataUsingCheerio(page.url()));
      await page.goBack();
   }

   // DEBUG SUCCESS: wait for the last conference to load its data before returning
   await page.waitFor(500);
   // close the browser
   browser.close();
   // return all_info
   return all_info;
}

//run used to call created async function and allow 'await' followed by the results given
async function run() {
   var all_info = await grabTopFiveUrls('http://www.wikicfp.com/cfp/');
   console.log("--------------------");
   console.log(all_info);
}
run()
