/**************************************************                                                                          //
 * DataHandler                                    *                                                                          //
 *                                                *                                                                          //
 * Class used for any necessary data manipulation *                                                                          //
 **************************************************/                                                                         //
class DataHandler {                                                                                                         //
    //////////////// constructor (no args necessary in creation of dataHandler obj as of yet) ////////////////               //
    constructor() {}                                                                                        //               //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////               //
    //
    //////////////////////////// used to create conference data array from file format ///////////////////////               //
    /*********************************************************************************************          //               //
     * grabConferenceData                                                                        *          //               //
     * @params input_file                                                                        *          //               //
     * input_file: data in file format, used in creation of conference data array                *          //               //
     *********************************************************************************************/         //               //                                                                             //               //
    grabConferenceData(input_file) {                                                                        //               //
        var file_lines = input_file.split('\n');                                                            //               //
                                                                                                            //               //
        var conference_data = [];                                                                           //               //
                                                                                                            //               //
        var num_confs = parseInt(file_lines[0], 10);                                                        //               //
        console.log("grabConferenceData:", num_confs);                                                      //               //
                                                                                                            //               //
        for (var j = 1; j < 1+num_confs; j++) {                                                             //               //
            var split_line = file_lines[j].split(',');                                                      //               //
            console.log(split_line.length);                                                                 //               //
                                                                                                            //               //
            var conference = [];                                                                            //               //
            for (var k = 0; k < split_line.length; k++) {                                                   //               //
                if ((k <= 3) || (k == 9) || (k == 10)) {                                                    //               //
                    conference.push(split_line[k]);                                                         //               //
                } else {                                                                                    //               //
                    conference.push(parseInt(split_line[k], 10));                                           //               //
                }                                                                                           //               //
            }                                                                                               //               //
            console.log("grabConferenceData:", conference);                                                 //               //
            conference_data.push(conference);                                                               //               //
        }                                                                                                   //               //
        console.log("grabConferenceData:", "conference_data:", conference_data);                            //               //
        return conference_data;                                                                             //               //
    }                                                                                                       //               //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////               //
    //
    ////////////////////////////////// used to create downloadable txt file //////////////////////////////////               //
    /*********************************************************************************************          //               //
     * exportConferenceData                                                                      *          //               //
     * @params conferences                                                                       *          //               //
     * conferences: data in conf data array format, used in creation of exported txt file        *          //               //
     *********************************************************************************************/         //               //
    exportConferenceData(conferences) {                                                                     //               //
        var text_conferences_data = "";                                                                     //               //
        text_conferences_data += conferences.length.toString() + '\n';                                      //               //
                                                                                                            //               //
        for (var k = 0; k < conferences.length; k++) {                                                      //               //
            var name = conferences[k].conf_name;                                                            //               //
            var url = conferences[k].conf_url;                                                              //               //
            var field = conferences[k].conf_field;                                                          //               //
            var color = conferences[k].conf_color;                                                          //               //
            var submission_deadline = conferences[k].submission_deadline;                                   //               //
            var abstract_deadline = conferences[k].abstract_deadline;                                       //               //
            var decision_deadline = conferences[k].decision_deadline;                                       //               //
            var conference_start_date = conferences[k].conferenceStart_date;                                //               //
            var conference_end_date = conferences[k].conferenceEnd_date;                                    //               //
            var location = conferences[k].conf_location;                                                    //               //
            var notes = conferences[k].notes;                                                               //               //
            text_conferences_data += name + ',' + url + ','+ field + ',' + color + ',' +                    //               //
                submission_deadline + ',' + abstract_deadline + ',' +              //               //
                decision_deadline + ',' +                                          //               //
                conference_start_date + ',' + conference_end_date +                //               //
                ',' + location + ',' + notes + '\n';                               //               //
        }                                                                                                   //               //
        console.log("exportConferenceData:", "conference data to be exported:", text_conferences_data);     //               //
                                                                                                            //               //
        // create blob and use to download txt file                                                         //               //
        var text_file = null;                                                                               //               //
        var blob_text_conferences_data = new Blob([text_conferences_data], {type:'text/plain'});            //               //
        text_file = window.URL.createObjectURL(blob_text_conferences_data);                                 //               //
        return text_file;                                                                                   //               //
    }                                                                                                       //               //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////               //
    //
    /////////////// converts date object to a number between 1 and 366 (considers leap years) ////////////////               //
    /*********************************************************************************************          //               //
     * convertDateToNum                                                                          *          //               //
     * @params now                                                                               *          //               //
     * now: Date obj holding date to be converted                                                *          //               //
     *********************************************************************************************/         //               //
    convertDateToNum(now) {                                                                                 //               //
        var start = new Date(now.getFullYear(), 0, 0);                                                      //               //
        var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);     //               //
        var oneDay = 1000 * 60 * 60 * 24;                                                                   //               //
        var day = Math.round(diff / oneDay);                                                                //               //
        console.log('Day of year: ' + day);                                                                 //               //
        return day;                                                                                         //               //
    }                                                                                                       //               //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////               //
    //
    ////////////// converts number from 1 to 366 (considering leap years) into a date object /////////////////               //
    /*********************************************************************************************          //               //
     * grabConferenceData                                                                        *          //               //
     * @params input_file                                                                        *          //               //
     * now: Date obj holding TODAY'S DATE, used only to grab the year for leap year check        *          //               //
     * now_num: the date of year as number to be converted to Date obj                           *          //               //
     *********************************************************************************************/         //               //
    convertNumToDate(now, now_num) {                                                                        //               //
        var date = new Date(now.getFullYear(), 0); // initialize a date in `year-01-01`                     //               //
        return new Date(date.setDate(now_num)); // add the number of days                                   //               //
    }                                                                                                       //               //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////               //
}                                                                                                                           //
