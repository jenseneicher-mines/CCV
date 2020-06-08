// Author: Daniel Garcia, Benjamin Jessing

/* The scrapeConferenceData() function scrapes data that is present in a WikiCFP
 * conference webpage. The URL is the only necessary argument; the function
 * scrapeConferenceData() then returns an Object of descriptive member variables
 * accessible by the dot operator; a usage example follows:
 *    var submitBy =
 *    scrapeConferenceData('http://www.wikicfp.com/...').submissionDeadline;
*/

const puppeteer = require('puppeteer');
const request = require('request');
const cheerio = require('cheerio');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(function(req, res, next){
  if (req.is('text/*')) {
    req.text = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk){ req.text += chunk });
    req.on('end', next);
  } else {
    next();
  }
});

const fs = require('fs');
const readline = require('readline');

const http = require('http');
const url = require('url');
const host = 'localhost';
const port = 8000;

var html_file;

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function scrapeConferenceDataUsingCheerio(conferenceURL) {
    console.log("Attempting to scrape conference data from", conferenceURL);

    // this Object will be updated and returned later
    var conferenceData = {
       conferenceName: undefined,
       url: undefined,
       color: undefined,
       location: undefined,
       submissionDeadline: undefined,
       notificationDeadline: undefined,
       abstractDeadline: undefined,
       authorFeedbackRebuttalWindow: undefined,
       conferenceDates: undefined,
       fieldOfStudy: undefined,
       cameraReadyDeadline: undefined
    };
    
    console.log("Beginning asynchronous function");
    request(conferenceURL, function(error, response, html) {
  
      if (!error) {
        console.log("Scraping conference data from", conferenceURL);
         // load HTML
         const $ = cheerio.load(html);

         // setup
         const tableCells = $('.gglu').find('tr').children();
         const categories = $('.gglu').find('a');

         // scrape conference name
         conferenceData.conferenceName = $('title').text().trim();
         conferenceData.url = conferenceURL;
         conferenceData.color = getRandomColor();
         
         // scrape data that is clearly labeled on WikiCFP
         conferenceData.location = extractNextElementText(tableCells, 'Where');
         conferenceData.submissionDeadline = extractNextElementText(tableCells, 'Submission Deadline');
         conferenceData.notificationDeadline = extractNextElementText(tableCells, 'Notification Due');
         conferenceData.abstractDeadline = extractNextElementText(tableCells, 'Abstract Registration Due');
         if (conferenceData.abstractDeadline == undefined) {
            conferenceData.abstractDeadline = conferenceData.submissionDeadline;
         }
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
         console.log(conferenceData);
      } else {
         // this outputs to the console if the URL does not exist
         console.log(error);
         console.log('Error: URL does not exist.');
      }
   });
    //console.log("Scraping using Cheerio results within scraping function: ", conferenceData);
    return conferenceData;
}

function findConferenceUrlBySearch(title) {
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
         console.log("findConferenceUrlBySearch:", "result", "http://www.wikicfp.com" + result);
         result = "http://www.wikicfp.com" + result;
         console.log("findConferenceUrlBySearch:", "result", result);
         return result;
      } else {
         console.log('No results for this search; try a different title.');
         return undefined;
      }
   });
}

async function grabSingleSearchData(search) {
  var all_info = [];

   // connect to the website and open an invisible browsing tab
   const browser = await puppeteer.launch();
   const page = await browser.newPage();
   //await page.goto(search);

   var conf_url = findConferenceUrlBySearch(search);
   
   
   await page.waitFor(2000);
   
   //loop through popular links, follow them and grab the conference info, then push info into all_info array
    all_info.push(scrapeConferenceDataUsingCheerio(conf_url));
    //await page.goBack();

    
    console.log("grabSingleSearchData", "returned result:", all_info);
    
   // DEBUG SUCCESS: wait for the last conference to load its data before returning
   await page.waitFor(500);
   
   return all_info;
}

async function grabSingleUrlData(conf_url) {
  var all_info = [];

  console.log("grabSingleUrlData:", "conf_url:", conf_url);
  
   // connect to the website and open an invisible browsing tab
   const browser = await puppeteer.launch();
   const page = await browser.newPage();
   await page.goto(conf_url);

   //loop through popular links, follow them and grab the conference info, then push info into all_info array
    all_info.push(scrapeConferenceDataUsingCheerio(page.url()));
    await page.goBack();

   // DEBUG SUCCESS: wait for the last conference to load its data before returning
   await page.waitFor(300);
   
   return all_info;
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

function exportConferenceData(conferences) {
   var text_conferences_data = "";
   text_conferences_data += conferences.length + '\n';
   
   for (var i = 0; i < conferences.length; i++) {
       var name = conferences[i].conf_name;
       var url = conferences[i].conf_url;
       var field = conferences[i].conf_field;
       var color = conferences[i].conf_color;
       var submission_deadline = conferences[i].submission_deadline;
       var notification_deadline = conferences[i].notification_deadline;
       var decision_deadline = conferences[i].decision_deadline;
       var conference_start_date = conferences[i].conferenceStart_date;
       var conference_end_date = conferences[i].conferenceEnd_date;
       var location = conferences[i].conf_location;
       text_conferences_data += name + ',' + url + ','+ field + ',' + color + ',' + submission_deadline + ',' +
                                   notification_deadline + ',' + decision_deadline + ',' +
                                   conference_start_date + ',' + conference_end_date + ',' + location + '\n';
   }
   
   
   console.log(text_conferences_data);
   
   //text_file = fs.writeFile('conference_data_from_server.txt', text_conferences_data, function (err) {
   //   if (err) throw err;
   //   console.log('File was created successfully.');
   //});
   
   return text_conferences_data;
}

async function grabHTML() {
   fs.readFile('admin.html', function(err, html) {
      if (err) {
         throw err; 
      }
      html_file = html;
      console.log(html_file);
   });
}
// converts date object to a number to 1 and 366 (considers leap years)
function convertDateToNum(now) {
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.round(diff / oneDay);
    console.log('Day of year: ' + day);
    return day;
}

// converts the string date to a date object
function convertDateStringToDateObj(date_string) {
    var secs = date_string;
    var date = new Date(secs);
    return date;
}

// convert conference data text file to a CSV string
function confToString(file) {
    var confDataString = "";
    confDataString += fs.readFileSync(file);
    console.log(confDataString);
    var confDataStringLine = confDataString.split("\n");
    return confDataString;
}

           
// convert formats of conference data to a CSV string
function convertConferenceData(conferenceData) {
    var confDataString = "";
    
    confDataString += conferenceData.length.toString() + "\n";
    
    for(var i = 0; i < conferenceData.length; i++){
        console.log("convertConferenceData:", "notificationDeadline before manipulation:", conferenceData[i].notificationDeadline)
        console.log("convertConferenceData:", "submissionDeadline before manipulation:", conferenceData[i].submissionDeadline)

        conferenceData[i].submissionDeadline = convertDateToNum(convertDateStringToDateObj(conferenceData[i].submissionDeadline));
        conferenceData[i].notificationDeadline = convertDateToNum(convertDateStringToDateObj(conferenceData[i].notificationDeadline));
        conferenceData[i].abstractDeadline = convertDateToNum(convertDateStringToDateObj(conferenceData[i].abstractDeadline));    
        var conf_start_date = "";
        var conf_end_date = "";
        var finished_grabbing_start = false;
        for (var j = 0; j < conferenceData[i].conferenceDates.length; j++) {
            if (!finished_grabbing_start) {
              if (conferenceData[i].conferenceDates[j] != '-') {
                conf_start_date += conferenceData[i].conferenceDates[j];
              } else {
                finished_grabbing_start = true;
              }
            } else {
              conf_end_date += conferenceData[i].conferenceDates[j];
            }
        }
        conf_start_date = conf_start_date.trim();
        conf_end_date = conf_end_date.trim();
        
        conf_start_date = convertDateToNum(convertDateStringToDateObj(conf_start_date));
        conf_end_date = convertDateToNum(convertDateStringToDateObj(conf_end_date));
        
        console.log("convertConferenceData:", "conference start & end dates:", conf_start_date, conf_end_date);
        console.log("convertConferenceData:", "notificationDeadline:", conferenceData[i].notificationDeadline);
        
        console.log(conferenceData[i].conferenceName);
        conferenceData[i].conferenceName = conferenceData[i].conferenceName.replace(/,/g, ' |');
        conferenceData[i].location = conferenceData[i].location.replace(/,/g, ' |');

        console.log(conferenceData[i].conferenceName);
        //for (var k = 0; k < conferenceData[i].conferenceName.length; k++) {
        //    console.log("boom",conferenceData[i].conferenceName[k]);
        //    if (conferenceData[i].conferenceName[k] === ',') {
        //        conferenceData[i].conferenceName[k] = ';';
        //        console.log("and change");
        //    }
        //}

        confDataString += conferenceData[i].conferenceName + ',' + conferenceData[i].url + ','+ conferenceData[i].fieldOfStudy + ',' + conferenceData[i].color + ',' +
            conferenceData[i].submissionDeadline + ',' + conferenceData[i].abstractDeadline + ',' + conferenceData[i].notificationDeadline + ',' +
            conf_start_date + ',' + conf_end_date + ',' + conferenceData[i].location + '\n';
    }
    return confDataString;
}

//run used to call created async function and allow 'await' followed by the results given
async function run() {
   // grab html file
   html_file = await grabHTML();
   console.log("--------------------");
   
   
   const startup = function(req, res) {
      var path = url.parse(req.url).pathname;
      console.log("startup");
      console.log(path);
      
      res.setHeader("content-type", "text/html");
      //res.write(html_file);
      //res.send(html_file);
      res.end(html_file);
   };
   app.get("/", startup);
   
   ///////////////////////////////////////// currently working on ////////////////////////////
   var single_url_data = "";
   
   const getSingleUrlData = async function(req, res) {
      console.log("getSingleUrlData:","conf_url", req.text);
      single_url_data = await grabSingleUrlData(req.text);
      console.log("getSingleUrlData:","conf_data", single_url_data);
      
      converted_data = convertConferenceData(single_url_data);
      console.log("getSingleUrlData:", "converted_data", converted_data);
      
      res.end(converted_data);
   };
   app.post("/getSingleUrlData", getSingleUrlData);
   ///////////////////////////////////////////////////////////////////////////////////////////
   
   const getDataBySearch = async function(req, res) {
      console.log("Attempting to grab data using search");
      var data_results = await grabSingleSearchData(req.text);
      console.log("getDataBySearch:", data_results);
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      res.end(data_results);
   }
   app.post("/getDataBySearch", getDataBySearch);
   
   const getDataScraper = async function(req, res) {      
      console.log("Entered Data Scraping");
      console.log("Data scraping request received.");
      
      var conference_data;
      conference_data = await grabTopFiveUrls('http://www.wikicfp.com/cfp/');
      var converted_conference_data = convertConferenceData(conference_data);
      
      res.setHeader("content-type", "text/plain");
      
      console.log(converted_conference_data);
      res.end(converted_conference_data);
      
      
      console.log("conference_data.txt sent");
   };
   app.get("/getDataScraper", getDataScraper);
   
   const sendEmail = async function(req, res) {
      console.log("Successfully entered sendEmail function within server");
      email_list = await grabEmailList('emails.txt');
      sendEmailUsingNodemailer(email_list);
   };
   app.get("/sendEmail", sendEmail);
   
   const downloadConferenceDataFile = function(req, res) {
      console.log("Attempting to download conference data file");
      const file = 'conference_data.txt';
      var stringConferences = confToString(file);
      console.log("downloadConferenceDataFile:", stringConferences);
      res.end(stringConferences);
   };
   app.get("/files", downloadConferenceDataFile);
   
   const server = app.listen(port);
   
   
   //console.log(all_info);
}
run();