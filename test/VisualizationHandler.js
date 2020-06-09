/******************************
 * VisualizationHandler class *
 ******************************/
class VisualizationHandler {
    /////////////////////////////////////////////////// constructor //////////////////////////////////////////////////////
    /***********************************************************************************                                //
     * constructor                                                                     *                                //
     *                                                                                 *                                //
     * @params svg, document, x, y, conference_data                                    *                                //
     * svg: svg                                                                        *                                //
     * document: used in creation of Conference object                                 *                                //
     * x, y: where visualization is centered on the x, y axis                          *                                //
     * conferences_data: array of conference data                                      *                                //
     ***********************************************************************************/                               //
    constructor(svg, document, x, y, conferences_data) {                                                                //
        this.svg = svg;                                                                                                 //
        this.document = document;                                                                                       //
        this.x = x;                                                                                                     //
        this.y = y;                                                                                                     //
                                                                                                                        //
        // array for storing Conference objs, not to be confused with conferences_data array                            //
        this.conferences = [];                                                                                          //
                                                                                                                        //
        this.num_confs = 0;                                                                                             //
        this.names = [];                                                                                                //
        this.urls = [];                                                                                                 //
        this.fields = [];                                                                                               //
        this.colors = [];                                                                                               //
        this.submission_deadlines = [];                                                                                 //
        this.decision_deadlines = [];                                                                                   //
        this.conferenceStart_dates = [];                                                                                //
        this.conferenceEnd_dates = [];                                                                                  //
        this.abstract_deadlines = [];                                                                                   //
        this.locations = [];                                                                                            //
        this.notes = [];                                                                                                //
        this.inner_radii = [];                                                                                          //
        this.outer_radii = [];                                                                                          //
        this.start_angles = [];                                                                                         //
        this.end_angles = [];                                                                                           //
        this.conf_dates_start_angles = [];                                                                              //
        this.conf_dates_end_angles = [];                                                                                //
        this.rings = [];                                                                                                //
        this.arcs = [];                                                                                                 //
        this.abstract_arcs = [];                                                                                        //
        this.conf_dates_arcs = [];                                                                                      //
        this.self = this;                                                                                               //
                                                                                                                        //
        this.ring_size = 3;                                                                                             //
        this.arc_size = 10;                                                                                             //
        this.spacing = 20;                                                                                              //
                                                                                                                        //
        // smallest conference visualization radius                                                                     //
        this.curr_radius = 150;                                                                                         //
                                                                                                                        //
        // create date line and month ring upon VisualizationHandler obj creation                                       //
        var now = new Date();                                                                                           //
        this.initVisualization(this, svg, now, x, y, this.curr_radius);                                                 //
                                                                                                                        //
        // populate conferences array & fill other empty arrays with initial conference_data array                      //
        this.addMultipleConferences(svg, document, this, conferences_data, x, y);                                       //
    }                                                                                                                   //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////// call createDateLine() and createMonthsRing() to initialize date line and month ring (self explanatory) ///////
    /***********************************************************************************                                //
     * initVisualization                                                               *                                //
     *                                                                                 *                                //
     * @params conferences_handler, svg, now, x, y, r                                  *                                //
     * conferences_handler: used to call non static functions                          *                                //
     * svg: svg obj                                                                    *                                //
     * x, y: where visualization is centered on the x, y axis                          *                                //
     * r: radius of largest circle, used in creation of date line                      *                                //
     ***********************************************************************************/                               //
    initVisualization(conferences_handler, svg, now, x, y, r) {                                                         //
        conferences_handler.createDateLine(svg, now, x, y, r);                                                         //
        conferences_handler.createMonthsRing(svg, x, y);                                                               //
    }                                                                                                                   //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ///// takes in conferences_data array and populates all data arrays as well as creating conference visualizations ////
    /***********************************************************************************                                //
     * initVisualization                                                               *                                //
     *                                                                                 *                                //
     * @params svg, document, conferences_handler, conferences_data, x, y,             *                                //
     * svg, document: svg obj & document obj necessary for creation of visualizations  *                                //
     * conferences_handler: used to call non static functions (glorified 'this')       *                                //
     * conferences_data: array of conference data for population of info and visuals   *                                //
     * x, y: where visualization is centered on the x, y axis                          *                                //
     ***********************************************************************************/                               //
    addMultipleConferences(svg, document, conferences_handler, conferences_data, x, y) {                                //
        // populate conferences array & fill other empty arrays                                                        //
        for (var i = 0; i < conferences_data.length; i++) {                                                            //
            // handle single conference creation                                                                       //
            conferences_handler.addConference(svg, document, conferences_handler, conferences_data[i], x, y);          //
        }                                                                                                              //
    }                                                                                                                   //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////// handles addition of all conference information as well as creation of conference visualizations //////////
    /***********************************************************************************                                //
     * addConference                                                                   *                                //
     *                                                                                 *                                //
     * @params svg, document, conferences_handler, conferences_data, x, y,             *                                //
     * svg, document: svg obj & document obj necessary for creation of visualizations  *                                //
     * conferences_handler: used to call non static functions (glorified 'this')       *                                //
     * conferences_data: array of conference data for population of info and visuals   *                                //
     * x, y: where visualization is centered on the x, y axis                          *                                //
     ***********************************************************************************/                               //
    addConference(svg, document, conferences_handler, conference_data, x, y) {                                          //
        //////////// create variables for conference information and add to visualization conf arrays ////////////     //
        var conf_name = conference_data[0];                                                                     //     //
        var conf_url = conference_data[1];                                                                      //     //
        var conf_field = conference_data[2];                                                                    //     //
        var conf_color = conference_data[3];                                                                    //     //
        var conf_submission_deadline = conference_data[4];                                                      //     //
        var conf_abstract_deadline = conference_data[5];                                                        //     //
        var conf_decision_deadline = conference_data[6];                                                        //     //
        var conf_start_date = conference_data[7];                                                               //     //
        var conf_end_date = conference_data[8];                                                                 //     //
        var conf_location = conference_data[9];                                                                 //     //
        var conf_notes = conference_data[10];                                                                   //     //
                                                                                                                //     //
        conferences_handler.names.push(conf_name);                                                              //     //
        conferences_handler.urls.push(conf_url);                                                                //     //
        conferences_handler.fields.push(conf_field);                                                            //     //
        conferences_handler.colors.push(conf_color);                                                            //     //
        conferences_handler.submission_deadlines.push(conf_submission_deadline);                                //     //
        conferences_handler.abstract_deadlines.push(conf_abstract_deadline);                                    //     //
        conferences_handler.decision_deadlines.push(conf_decision_deadline);                                    //     //
        conferences_handler.conferenceStart_dates.push(conf_start_date);                                        //     //
        conferences_handler.conferenceEnd_dates.push(conf_end_date);                                            //     //
        conferences_handler.locations.push(conf_location);                                                      //     //
        conferences_handler.notes.push(conf_notes);                                                             //     //
        //////////////////////////////////////////////////////////////////////////////////////////////////////////     //
        //
        /////// create variables for conference visualization creation and add to visualization conf arrays //////     //
        var inner_radius = conferences_handler.curr_radius - conferences_handler.arc_size/2;                    //     //
        var outer_radius = conferences_handler.curr_radius + conferences_handler.arc_size/2;                    //     //
        var deadline_start_angle = ((conf_submission_deadline)/365) * (2*Math.PI);                              //     //
        var deadline_end_angle = ((conf_decision_deadline)/365) * (2*Math.PI);                                  //     //
        var conf_dates_start_angle = ((conf_start_date)/365) * (2*Math.PI);                                     //     //
        var conf_dates_end_angle = ((conf_end_date)/365) * (2*Math.PI);                                         //     //
                                                                                                                //     //
        conferences_handler.inner_radii.push(inner_radius);                                                     //     //
        conferences_handler.outer_radii.push(outer_radius);                                                     //     //
        conferences_handler.start_angles.push(deadline_start_angle);                                            //     //
        conferences_handler.end_angles.push(deadline_end_angle);                                                //     //
        conferences_handler.conf_dates_start_angles.push(conf_dates_start_angle);                               //     //
        conferences_handler.conf_dates_end_angles.push(conf_dates_end_angle);                                   //     //
        //////////////////////////////////////////////////////////////////////////////////////////////////////////     //
        //
        ///////////////////////////// create conference obj using created variables //////////////////////////////     //
        var conf = new Conference(conferences_handler, conf_name, conf_url,                                     //     //
            conferences_handler.conferences.length, x, y, conf_field,                       //     //
            conf_color, conf_submission_deadline, conf_decision_deadline,                   //     //
            conf_start_date, conf_end_date, conf_abstract_deadline,                         //     //
            conf_location, conf_notes, conferences_handler.curr_radius,                     //     //
            inner_radius, outer_radius, deadline_start_angle,                               //     //
            deadline_end_angle, conf_dates_start_angle, conf_dates_end_angle,               //     //
            null, null, null, null);                                                        //     //
        console.log("addConference:", "Successfully created conference:", conf);                                //     //
        //////////////////////////////////////////////////////////////////////////////////////////////////////////     //
        //
        /////////////// create conf visualization objects and add to visualization conf arrays ////////////////////     //
        // create visualization objects and adds them to conf obj                                                //     //
        Conference.createConfVisuals(svg, document, conferences_handler, conf,                                   //     //
            conf.start_angle, conf.end_angle, conf.conf_color,                          //     //
            conf.conf_dates_start_angle, conf.conf_dates_end_angle);                    //     //
                                                                                        //     //
        // add created visualization objects to conferences_handler                                              //     //
        conferences_handler.rings.push(conf.ring);                                                               //     //
        conferences_handler.arcs.push(conf.arc);                                                                 //     //
        conferences_handler.abstract_arcs.push(conf.abstract_arc);                                               //     //
        conferences_handler.conf_dates_arcs.push(conf.conf_dates_arc);                                           //     //
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////     //
        //
        //
        ///////////////// finally, push the conference object itself to the visualization handler /////////////////     //
        conferences_handler.conferences.push(conf);                                                              //     //
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////     //
        //
        //////////////// perform final updates to conferences_handler for future conf additions ///////////////////     //
        // update num_confs count                                                                                //     //
        conferences_handler.num_confs += 1;                                                                      //     //
        // update curr_radius                                                                                    //     //
        conferences_handler.curr_radius += conferences_handler.spacing;                                          //     //
        // remake date line with longer length                                                                   //     //
        var now = new Date();                                                                                    //     //
        conferences_handler.createDateLine(svg, now, x, y, conferences_handler.curr_radius);                     //     //
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////     //
        //
        return conf;                                                                                                    //
    }                                                                                                                   //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ///////// handles deletion of conference info and visualization as well as updating of other visualizations //////////
    /***********************************************************************************                                //
     * delAndUpdate                                                                    *                                //
     *                                                                                 *                                //
     * @params svg, document, conferences_handler, selected_index                      *                                //
     * svg, document: svg obj & document obj necessary for creation of visualizations  *                                //
     * conferences_handler: used to call non static functions (glorified 'this')       *                                //
     * selected_index: index of conference selected, used to delete all of its info    *                                //
     ***********************************************************************************/                               //
    static delAndUpdate(svg, document, conferences_handler, selected_index) {                                           //
        // create DataHandler object for date manipulations
        var data_handler = new DataHandler();                                                                          //
        // remove ring and arc from d3 and svg                                                                         //
        console.log(conferences_handler, selected_index);                                                              //
                                                                                                                       //
        // remove svg objects from html
        if(isNaN(conferences_handler.decision_deadlines[selected_index])) {
            conferences_handler.rings[selected_index].remove();                                                            //
            conferences_handler.abstract_arcs[selected_index].remove();                                                    //
        } else {
            conferences_handler.rings[selected_index].remove();                                                            //
            conferences_handler.arcs[selected_index].remove();                                                             //
            conferences_handler.abstract_arcs[selected_index].remove();                                                    //
            conferences_handler.conf_dates_arcs[selected_index].remove();                                                  //
        }
        //
        // check if you need to update the visualization                                                               //
        if (conferences_handler.conferences[selected_index].conf_index < (conferences_handler.num_confs - 1)) {        //
            console.log("Needs updating");                                                                              //
            // update rings outside of one deleted (update radii for all objs, update indices given to conference objs) //
            for (var i = selected_index+1; i < conferences_handler.num_confs; i++) {                                    //
                console.log("Currently updating", i);                                                                   //
                                                                                                                        //
                var conference = conferences_handler.conferences[i];                                                    //
                console.log(conference);                                                                                //
                conference.radius -= conferences_handler.spacing;                                                       //
                                                                                                                        //
                //update ring                                                                                           //
                conference.conf_index -= 1;                                                                             //
                console.log(conferences_handler.rings[i]);                                                              //
                conferences_handler.rings[i].attr("r", conference.radius);                                              //
                                                                                                                        //


                if (isNaN(conferences_handler.decision_deadlines[i])) {
                    //update abstract arc                                                                                   //
                    // 1) remove current arc                                                                               //
                    conferences_handler.abstract_arcs[i].remove();                                                          //
                    conferences_handler.abstract_arcs[i] = null;                                                            //
                } else {
                    //update arc                                                                                            //
                    // 1) remove current arc                                                                                //
                    conferences_handler.arcs[i].remove();                                                                   //
                    conferences_handler.arcs[i] = null;                                                                     //
                    // 2) create new, updated arc and re-add to conf object                                                 //
                    conferences_handler.arcs[i] = Conference.createConfArc(svg, document, conferences_handler,              //
                        conference,             //
                        conference.start_angle, conference.end_angle,                          //
                        conference.conf_color);                  //
                    //
                    //
                    //update abstract arc                                                                                   //
                    // 1) remove current arc                                                                               //
                    conferences_handler.abstract_arcs[i].remove();                                                          //
                    conferences_handler.abstract_arcs[i] = null;                                                            //
                                                                                                                            //
                    // 2) create new, updated arc and re-add to conf object                                                 //
                    conferences_handler.abstract_arcs[i] = Conference.createConfAbstractDeadlineArc(svg, document,          //
                        conferences_handler, conference);                                      //
                                                                                               //
                                                                                               //
                    //update conference dates arc                                                                           //
                    // 1) remove current arc                                                                               //
                    conferences_handler.conf_dates_arcs[i].remove();                                                        //
                    conferences_handler.conf_dates_arcs[i] = null;                                                          //
                                                                                                                            //
                    // 2) create new, updated arc and re-add to conf object                                                 //
                    conferences_handler.conf_dates_arcs[i] = Conference.createConfDatesArc(svg, document,                   //
                        conferences_handler, conference, conference.conf_dates_start_angle,    //
                        conference.conf_dates_end_angle);                                      //
                }
            }                                                                                                           //
        }                                                                                                              //
        // update conferences_handler data arrays after deletions                                                      //
        conferences_handler.conferences = conferences_handler.conferences.slice(0, selected_index)                     //
            .concat(conferences_handler.conferences                                                                    //
                .slice(selected_index + 1, conferences_handler.conferences.length));                                       //
        conferences_handler.names = conferences_handler.names.slice(0, selected_index)                                 //
            .concat(conferences_handler.names                                                                          //
                .slice(selected_index + 1, conferences_handler.names.length));                                             //
        conferences_handler.fields = conferences_handler.fields.slice(0, selected_index)                               //
            .concat(conferences_handler.fields                                                                         //
                .slice(selected_index + 1, conferences_handler.fields.length));                                            //
        conferences_handler.colors = conferences_handler.colors.slice(0, selected_index)                               //
            .concat(conferences_handler.colors                                                                         //
                .slice(selected_index + 1, conferences_handler.colors.length));                                            //
        conferences_handler.submission_deadlines = conferences_handler.submission_deadlines.slice(0, selected_index)   //
            .concat(conferences_handler.submission_deadlines                                                           //
                .slice(selected_index + 1, conferences_handler.submission_deadlines.length));                              //
        conferences_handler.decision_deadlines = conferences_handler.decision_deadlines.slice(0, selected_index)       //
            .concat(conferences_handler.decision_deadlines                                                             //
                .slice(selected_index + 1, conferences_handler.decision_deadlines.length));                                //
        conferences_handler.conferenceStart_dates = conferences_handler.conferenceStart_dates.slice(0, selected_index) //
            .concat(conferences_handler.conferenceStart_dates                                                          //
                .slice(selected_index + 1, conferences_handler.conferenceStart_dates.length));                             //
        conferences_handler.conferenceEnd_dates = conferences_handler.conferenceEnd_dates.slice(0, selected_index)     //
            .concat(conferences_handler.conferenceEnd_dates                                                            //
                .slice(selected_index + 1, conferences_handler.conferenceEnd_dates.length));                               //
        conferences_handler.abstract_deadlines = conferences_handler.abstract_deadlines.slice(0, selected_index)       //
            .concat(conferences_handler.abstract_deadlines                                                             //
                .slice(selected_index + 1, conferences_handler.abstract_deadlines.length));                                //
        conferences_handler.locations = conferences_handler.locations.slice(0, selected_index)                         //
            .concat(conferences_handler.locations                                                                      //
                .slice(selected_index + 1, conferences_handler.locations.length));                                         //
        conferences_handler.inner_radii = conferences_handler.inner_radii.slice(0, selected_index)                     //
            .concat(conferences_handler.inner_radii                                                                    //
                .slice(selected_index + 1, conferences_handler.inner_radii.length));                                       //
        conferences_handler.outer_radii = conferences_handler.outer_radii.slice(0, selected_index)                     //
            .concat(conferences_handler.outer_radii                                                                    //
                .slice(selected_index + 1, conferences_handler.outer_radii.length));                                       //
        conferences_handler.start_angles = conferences_handler.start_angles.slice(0, selected_index)                   //
            .concat(conferences_handler.start_angles                                                                   //
                .slice(selected_index + 1, conferences_handler.start_angles.length));                                      //
        conferences_handler.end_angles = conferences_handler.end_angles.slice(0, selected_index)                       //
            .concat(conferences_handler.end_angles                                                                     //
                .slice(selected_index + 1, conferences_handler.end_angles.length));                                        //
        conferences_handler.rings = conferences_handler.rings.slice(0, selected_index)                                 //
            .concat(conferences_handler.rings                                                                          //
                .slice(selected_index + 1, conferences_handler.rings.length));                                             //
        conferences_handler.arcs = conferences_handler.arcs.slice(0, selected_index)                                   //
            .concat(conferences_handler.arcs                                                                           //
                .slice(selected_index + 1, conferences_handler.arcs.length));                                              //
        conferences_handler.abstract_arcs = conferences_handler.abstract_arcs.slice(0, selected_index)                 //
            .concat(conferences_handler.abstract_arcs                                                                  //
                .slice(selected_index + 1, conferences_handler.abstract_arcs.length));                                     //
        conferences_handler.conf_dates_arcs = conferences_handler.conf_dates_arcs.slice(0, selected_index)             //
            .concat(conferences_handler.conf_dates_arcs                                                                //
                .slice(selected_index + 1, conferences_handler.conf_dates_arcs.length));                                   //
                                                                                                                           //
        conferences_handler.curr_radius -= conferences_handler.spacing;
        // return updated num_confs                                                                                    //
        return conferences_handler.num_confs - 1;                                                                      //
    }                                                                                                                   //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // creates black line on visualization indicating the day
    createDateLine(svg, now, x, y, r) {
        //Create data handler
        var data_handler = new DataHandler();
        //handle date conversion for finding correct angle
        var converted_date = data_handler.convertDateToNum(now);
        console.log(converted_date);
        var date_angle = (converted_date/365) * (2*Math.PI);
        console.log(date_angle);
        var newly_built_date_line = d3.svg.line.radial().angle(date_angle - (Math.PI/2)).radius(function(d) { return d; } );
        console.log(newly_built_date_line);

        //MAGIC NUMBER 15 LOOKIN REEEEAAAAAL SHIT
        var date_line = svg.append("line").attr("x1", x).attr("y1", y)
            .attr("x2", x + (r - 15)*Math.cos(date_angle - (Math.PI/2))).attr("y2", y + (r - 15)*Math.sin(date_angle - (Math.PI/2)))
            .attr("stroke-width", 2).attr("stroke", "black");
        return date_line;
    }

    // creates 12 month arcs inside the smallest conference radius to show the user how time is alloted in the visualization
    createMonthsRing(svg, x, y) {
        // how month names are displayed, change this array if you would like different names to be shown
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        // empty arrays to store the 12 created month arcs
        var month_arcs = [];
        var month_text_objs = [];

        // math portion to properly define size and spacing of arcs
        var spacing = (0.005*((2*Math.PI)/12));
        var arc_length = (((2*Math.PI)/12) - (2*spacing));
        var start_angle = spacing;
        var end_angle = arc_length - spacing;

        // begin creation of the 12 month arcs and their accompanying text
        for (var i = 0; i < 12; i++) {
            //init. and append new conference arc to svg
            var newly_built_arc = d3.svg.arc().innerRadius(120)
                .outerRadius(140)
                .startAngle(start_angle)
                .endAngle(end_angle);

            var defs = svg.append("defs");

            var dropShadowFilter = defs.append('svg:filter')
                .attr('id', 'drop-shadow')
                .attr('filterUnits', "userSpaceOnUse")
                .attr('width', '250%')
                .attr('height', '250%');
            dropShadowFilter.append('svg:feGaussianBlur')
                .attr('in', 'SourceGraphic')
                .attr('stdDeviation', 2)
                .attr('result', 'blur-out');
            dropShadowFilter.append('svg:feOffset')
                .attr('in', 'color-out')
                .attr('dx', 3)
                .attr('dy', 3)
                .attr('result', 'the-shadow');
            dropShadowFilter.append('svg:feBlend')
                .attr('in', 'SourceGraphic')
                .attr('in2', 'the-shadow')
                .attr('mode', 'normal');


            var new_month_arc = svg.append("path").attr("id", months[i] + "_arc").attr("d", newly_built_arc).attr("transform", "translate("+x+", "+y+")").style("fill", "#AD193D");



            //var months_text_arc = svg.append("path").attr("id", "path_text_months").attr("d", "M75,300 A125,125 0 0,1 325,300").attr("fill", "none").style("stroke", "#AAAAAA");
            var months_text = svg.append("text").attr("id", months[i])
                .attr("x", 15)   //Move the text from the start angle of the arc
                .attr("dy", 18) //Move the text down
                .style("font-size", 12)
                .style("fill", "#ffffff")
                .style("font-style", "italic")
                .append("textPath").attr("xlink:href", "#"+months[i]+"_arc").style("text-anchor", "right").text(months[i]);

            // store the created text and arc (not really necessary as of now, but it's here just in case)
            month_arcs.push(new_month_arc);
            month_text_objs.push(months_text);

            // update start and end angles for the next arc to be created
            start_angle += arc_length + 2*spacing;
            end_angle += arc_length + 2*spacing;
        }
    }
}