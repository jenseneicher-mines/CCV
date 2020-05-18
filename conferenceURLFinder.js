// Author: Benjamin Jessing

/* The findConferenceURL function requires the single argument of a string that
 * represents the conference's title; this title is then used to return the URL
 * of the top conference search result from WikiCFP.
 */

function findConferenceURL(title) {
   // setup
   const request = require('request');
   const cheerio = require('cheerio');

   // build the URL that shows the results of the title search
   const searchURL = 'http://www.wikicfp.com/cfp/servlet/tool.search?q=' +
      title.replace(/ /g, '+') + '&year=a';
   console.log('Search URL: ' + searchURL);

   request(searchURL, function(error, response, html) {
      if(!error) {
         // load HTML
         const $ = cheerio.load(html);

         // scrape the top (most-matching) conference result's URL and return it
         var result = $('*').find('table').find('table').find('tbody').
            find('a').attr('href').trim();
         console.log('Found this URL: ' + result);
         return result;
      } else {
         console.log('No results for this search; try a different title.');
         return undefined;
      }
   });
}

findConferenceURL('computer vision'); // DELETEME
