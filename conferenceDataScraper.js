// Author: Benjamin Jessing

/* The scrapeConferenceData() function scrapes data that is present in a WikiCFP
 * conference webpage. The URL is the only necessary argument; the function
 * scrapeConferenceData() then returns an Object of descriptive member variables
 * accessible by the dot operator; a usage example follows:
 *    var submitBy =
 *    scrapeConferenceData('http://www.wikicfp.com/...').submissionDeadline;
*/

function scrapeConferenceData(conferenceURL) {
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
         console.log('This is the fully-loaded conference data Object:');
         console.log('(Some information might be undefined because it was not provided on WikiCFP.)');
         console.log(conferenceData);
         return conferenceData;
      } else {
         // this outputs to the console if the URL does not exist
         console.log('Error: URL does not exist.');
         return undefined;
      }
   });
}

// DELETEME
scrapeConferenceData('http://wikicfp.com/cfp/servlet/event.showcfp?eventid=98130&copyownerid=52097&skip=1');
