// Author: Daniel Garcia, Benjamin Jessing

/* The scrapeConferenceData() function scrapes data that is present in a WikiCFP
 * conference webpage. The URL is the only necessary argument; the function
 * scrapeConferenceData() then returns an Object of descriptive member variables
 * accessible by the dot operator; a usage example follows:
 *    var submitBy =
 *    scrapeConferenceData('http://www.wikicfp.com/...').submissionDeadline;
*/

const puppeteer = require('puppeteer');


const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());

const fs = require('fs');
const readline = require('readline');

const http = require('http');
const url = require('url');
const host = 'localhost';
const port = 8000;

var html_file;
var text_conferences_data = "";


const nodemailer = require('nodemailer');
function sendEmailUsingNodemailer(email_list) {
   console.log("Attempting to send email using Nodemailer");
   const transport = nodemailer.createTransport({
       service: 'Gmail',
       auth: {
         type: 'OAuth2',
         user: 'no.reply.ccv@gmail.com',
         //pass: 'hal9000!',
       },
   });
   
   for (var i = 0; i < email_list.length; i++) {
       const mailOptions = {
       from: 'no.reply.ccv@gmail.com',
       to: email_list[i],
       subject: 'hello world!',
       html: 'hello world!',
       };
       transport.sendMail(mailOptions, (error, info) => {
           if (error) {
               console.log(error);
           }
           console.log(`Message sent: ${info.response}`);
       });
   }
}
async function grabEmailList(filename) {
   var email_list = [];
   
   const file_stream = fs.createReadStream(filename);
   const rl = readline.createInterface({
      input: file_stream,
      crlfDelay: Infinity
   })
   
   for await (const line of rl) {
      email_list.push(line);
   }
   console.log(email_list);
   return email_list;
}

function scrapeConferenceDataUsingCheerio(conferenceURL) {
   // setup
   var request = require('request');
   var cheerio = require('cheerio');

   // this Object will be updated and returned later
   var conferenceData = {
      conferenceName: undefined,
      location: undefined,
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
         conferenceData.location = extractNextElementText(tableCells, 'Where');
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

function exportConferenceData(conferences) {
   var text_conferences_data = "";
   text_conferences_data += conferences.length.toString() + '\n';
   
   var url_count = 0;
   for (var k = 0; k < conferences.length; k++) {
       if (conferences[k].conf_url != "") {
           console.log("dddddddd", conferences[k].conf_url);
           url_count += 1;
       }
   }
   
   text_conferences_data += url_count.toString() + '\n';
   
   text_conferences_data += (conferences.length - url_count).toString() + '\n';
   
   for (var i = 0; i < (conferences.length - url_count); i++) {
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
   fs.readFile('single_file_test.html', function(err, html) {
      if (err) {
         throw err; 
      }
      html_file = html;
      console.log(html_file);
   });
}

//run used to call created async function and allow 'await' followed by the results given
async function run() {
   //var all_info = await grabTopFiveUrls('http://www.wikicfp.com/cfp/');
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
   
   const getSingleUrlData = function(req, res) {
      console.log(req.body);
      single_url_data = scrapeConferenceDataUsingCheerio(req);
   }
   app.put("/getSingleUrlData", getSingleUrlData);
   
   const returnSingleUrlData = function(req, res) {
      res.end(single_url_data);
   }
   app.get("/returnSingleUrlData", returnSingleUrlData);
   ///////////////////////////////////////////////////////////////////////////////////////////
   
   const getDataScraper = async function(req, res) {      
      console.log("Entered Data Scraping");
      console.log("Data scraping request received.");
      
      var conference_data;
      conference_data = await grabTopFiveUrls('http://www.wikicfp.com/cfp/');
      
      res.setHeader("content-type", "text/plain");
      
      console.log(conference_data);
      res.end(conference_data[0].conferenceName);
      
      
      console.log("conference_data.txt sent");
   };
   app.get("/getDataScraper", getDataScraper);
   
   const sendEmail = async function(req, res) {
      console.log("Successfully entered sendEmail function within server");
      email_list = await grabEmailList('emails.txt');
      sendEmailUsingNodemailer(email_list);
   };
   app.get("/sendEmail", sendEmail);
   
   const server = app.listen(port);
   
   
   //console.log(all_info);
}
run();