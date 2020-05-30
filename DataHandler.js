/*
* dataHandler
*
* Class used for any necessary data manipulation
*/
class DataHandler {
   // no args necessary in creation of dataHandler obj as of yet
   constructor() {}
   
   grabConferenceData(input_file) {
       var file_lines = input_file.split('\n');
       
       var conference_data = [];
       
       var num_confs = parseInt(file_lines[0], 10);
       var num_confs_as_url = parseInt(file_lines[1], 10);
       var num_confs_as_manual = parseInt(file_lines[2], 10);
       console.log(num_confs, num_confs_as_url, num_confs_as_manual);
       
       for (var i = 3; i < 3 + num_confs_as_url; i++) {
           console.log(file_lines[i]);
           // ADDING URL TO CODE WILL BE HANDLED HERE AS WELL AS IN ADDING CONFERENCE WITHIN POP UP WINDOW
       }
       
       for (var j = 3+num_confs_as_url; j < 3+num_confs_as_url+num_confs_as_manual; j++) {
           var split_line = file_lines[j].split(',');
           console.log(split_line.length);
           
           var conference = [];
           for (var k = 0; k < split_line.length; k++) {
               if (k <= 3) {
                   conference.push(split_line[k]);
               } else {
                   conference.push(parseInt(split_line[k], 10));
               }
           }
           conference_data.push(conference);
       }
       console.log("grabConferenceData: ", conference_data);
       return conference_data;
   }
   
   exportConferenceDataToUrl(conferences, data_handler) {
       var text_conferences_data = "";
       text_conferences_data += conferences.length.toString() + '%0A';
       
       var url_count = 0;
       for (var k = 0; k < conferences.length; k++) {
           if (conferences[k].conf_url != "") {
               url_count += 1;
           }
       }
       
       text_conferences_data += url_count.toString() + '%0A';
       
       text_conferences_data += (conferences.length - url_count).toString() + '%0A';
       
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
           text_conferences_data += name + '%2C' + url + '%2C'+ field + '%2C' + color + '%2C' + submission_deadline + '%2C' +
                                       notification_deadline + '%2C' + decision_deadline + '%2C' +
                                       conference_start_date + '%2C' + conference_end_date + '%2C' + location + '%0A';
       }
       
       
       console.log(text_conferences_data);
       
       var text_file = null;
       var blob_text_conferences_data = new Blob([text_conferences_data], {type:'text/plain'});
       text_file = window.URL.createObjectURL(blob_text_conferences_data);
       
       console.log(text_file);
       
       return text_file;
   }
   
   exportConferenceData(conferences, data_handler) {
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
       
       var text_file = null;
       var blob_text_conferences_data = new Blob([text_conferences_data], {type:'text/plain'});
       text_file = window.URL.createObjectURL(blob_text_conferences_data);
       
       console.log(text_file);
       
       return text_file;
   }

   // converts date object to a number to 1 and 366 (considers leap years)
   convertDateToNum(now) {
       var start = new Date(now.getFullYear(), 0, 0);
       var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
       var oneDay = 1000 * 60 * 60 * 24;
       var day = Math.round(diff / oneDay);
       console.log('Day of year: ' + day);
       return day;
   }

   // converts number from 1 to 366 (considering leap years) into a date object
   convertNumToDate(now, now_num) {
       var date = new Date(now.getFullYear(), 0); // initialize a date in `year-01-01`
       return new Date(date.setDate(now_num)); // add the number of days
   }
}
module.exports = DataHandler;