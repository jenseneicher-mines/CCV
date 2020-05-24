/*
* visualizationHandler
*
* Class handles all necessary functions needed to be performed on the macro visualization
*/
class VisualizationHandler {
   /*
    * constructor
    *
    * @params svg, document, x, y, conferences, num_confs, names, fields, colors, submission_deadlines, notification_deadlines, decision_deadlines
    * svg: svg
    * document: used in creation of Conference object
    * x: where visualization is centered on the x axis
    * y: where visualization is centered on the y axis
    * conferences: array of Conference objects inputted into visualization on start (currently is an empty array, as we have nothing stored)
    * num_confs: number of conferences
    * names: conference names
    * fields: conference fields
    * colors: conference visualization colors
    * submission_deadlines: conference submission deadlines
    * notification_deadlines: conference notification deadlines
    * decision_deadlines: conference decision deadlines
    *
    * This method handles the start-up creation of our visualization. As of now it takes lists of all conference info in order using
    * separate arrays. For example, for the creation of two conferences you would have names_array = ["name_1", "name_2"],
    * fields_array = ["field_1", "field_2"], etc. If it is seen that the better way of creating conferences is using a two dimensional
    * array of conference information (i.e. [["name_1", "field_1"]["field_1", "field_2"]]), then necessary adjustments will be made.
    * If this change is made it should be noted that updating info arrays IS ESSENTIAL
    */
   constructor(svg, document, x, y, conferences, num_confs) {
       this.svg = svg;
       this.document = document;
       this.x = x;
       this.y = y;

       this.conferences = [];
       this.num_confs = num_confs;
       this.names = [];
       this.fields = [];
       this.colors = [];
       this.submission_deadlines = [];
       this.decision_deadlines = [];
       this.conferenceStart_dates = [];
       this.conferenceEnd_dates = [];
       this.notification_deadlines = [];
       this.locations = [];
       this.inner_radii = [];
       this.outer_radii = [];
       this.start_angles = [];
       this.end_angles = [];
       this.rings = [];
       this.arcs = [];
       this.self = this;

       // smallest conference visualization radius
       this.curr_radius = 200;

       // variables necessary for visual creation
       var spacing = 20;
       var ring_size = 3;
       var arc_size = 10;
       
       // populate conferences array & fill other empty arrays
       for (var i = 0; i < num_confs; i++) {
            this.names.push(conferences[i][0]);
            this.fields.push(conferences[i][1]);
            this.colors.push(conferences[i][2]);
            this.submission_deadlines.push(conferences[i][3]);
            this.notification_deadlines.push(conferences[i][4]);
            this.decision_deadlines.push(conferences[i][5]);
            this.conferenceStart_dates.push(conferences[i][6]);
            this.conferenceEnd_dates.push(conferences[i][7]);
            this.locations.push(conferences[i][8]);
           
            // add math related translations for arc creation
            this.inner_radii.push(this.curr_radius - arc_size/2);
            this.outer_radii.push(this.curr_radius + arc_size/2);
            this.start_angles.push(((this.submission_deadlines[i])/365) * (2*Math.PI));
            this.end_angles.push(((this.decision_deadlines[i])/365) * (2*Math.PI));
            
            // handle single conference creation
            this.addConference(svg, document, this, num_confs, this.names[i], i, this.x, this.y, this.fields[i], this.colors[i],
                                 this.submission_deadlines[i], this.decision_deadlines[i], this.conferenceStart_dates[i], this.conferenceEnd_dates[i],
                                 this.notification_deadlines[i], this.locations[i], this.curr_radius, this.inner_radii[i], this.outer_radii[i],
                                 this.start_angles[i], this.end_angles[i], ring_size, arc_size, this.conferences, this.rings, this.arcs);

           // update curr_radius
           this.curr_radius += spacing;
       }
   }

   // handles addition of all conference information
   addConference(svg, document, conferences_handler, num_confs, name, i, x, y, field, color, submission_deadline, decision_deadline, conferenceStart_dates, conferenceEnd_dates, notification_deadlines, conf_locations, curr_radius, inner_radius, outer_radius,
                 start_angle, end_angle, ring_size, arc_size, conferences, rings, arcs) {
       console.log("Added conference");
       console.log(name, i, x, y, field, color, submission_deadline, decision_deadline, conferenceStart_dates, conferenceEnd_dates, notification_deadlines, conf_locations,
                                   curr_radius, inner_radius, outer_radius, start_angle, end_angle, null, null);

       var conf = new Conference(conferences_handler, name, i, x, y, field, color, submission_deadline, decision_deadline, conferenceStart_dates, conferenceEnd_dates, notification_deadlines, conf_locations,
           curr_radius, inner_radius, outer_radius, start_angle, end_angle, null, null);
       
       console.log("addConference: ", conf.x, conf.y);

       //Create conferences visuals and add to visualization handler arrays 'rings' and 'arcs's
       Conference.createConfVisuals(svg, document, conferences_handler, conf, conf.x, conf.y, conf.radius, conf.start_angle, conf.end_angle, conf.conf_color, ring_size, arc_size);
       rings.push(conf.ring);
       arcs.push(conf.arc);

       conferences.push(conf);
       return num_confs + 1;
   }

   static delAndUpdate(svg, document, conferences_handler, selected_index, spacing, arc_size) {
       // remove ring and arc from d3 and svg
       console.log(conferences_handler, selected_index);
       
       conferences_handler.rings[selected_index].remove();       
       conferences_handler.arcs[selected_index].remove();
       
       console.log(conferences_handler.arcs, conferences_handler.rings);
       
       // check if you need to update the visualization
       if (conferences_handler.conferences[selected_index].conf_index < (conferences_handler.num_confs - 1)) {
           console.log("Needs updating");

           for (var i = selected_index+1; i < conferences_handler.num_confs; i++) {
               console.log("Currently updating", i);
               
               var conference = conferences_handler.conferences[i];
               conference.radius = conference.radius - spacing;
               //conference.start_angle = 
               
               
               
               console.log(conference);

               //update ring
               conference.conf_index -= 1;
               console.log(conferences_handler.rings[i]);
               conferences_handler.rings[i].attr("r", conference.radius);

               //update arc
               // 1) remove current arc
               conferences_handler.arcs[i].remove();
               conferences_handler.arcs[i] = null;
               // 2) create new, updated arc and re-add to conf object
               conferences_handler.arcs[i] = Conference.createConfArc(svg, document, conferences_handler, conference, conference.x, conference.y, conference.radius,
                                                         conference.start_angle, conference.end_angle, conference.conf_color, arc_size);
           }
       }
      conferences_handler.conferences = conferences_handler.conferences.slice(0, selected_index).concat(conferences_handler.conferences.slice(selected_index + 1, conferences_handler.conferences.length));
      
      conferences_handler.names = conferences_handler.names.slice(0, selected_index).concat(conferences_handler.names.slice(selected_index + 1, conferences_handler.names.length));
      conferences_handler.fields = conferences_handler.fields.slice(0, selected_index).concat(conferences_handler.fields.slice(selected_index + 1, conferences_handler.fields.length));
      conferences_handler.colors = conferences_handler.colors.slice(0, selected_index).concat(conferences_handler.colors.slice(selected_index + 1, conferences_handler.colors.length));
      conferences_handler.submission_deadlines = conferences_handler.submission_deadlines.slice(0, selected_index).concat(conferences_handler.submission_deadlines.slice(selected_index + 1, conferences_handler.submission_deadlines.length));
      conferences_handler.decision_deadlines = conferences_handler.decision_deadlines.slice(0, selected_index).concat(conferences_handler.decision_deadlines.slice(selected_index + 1, conferences_handler.decision_deadlines.length));
      conferences_handler.conferenceStart_dates = conferences_handler.conferenceStart_dates.slice(0, selected_index).concat(conferences_handler.conferenceStart_dates.slice(selected_index + 1, conferences_handler.conferenceStart_dates.length));
      conferences_handler.conferenceEnd_dates = conferences_handler.conferenceEnd_dates.slice(0, selected_index).concat(conferences_handler.conferenceEnd_dates.slice(selected_index + 1, conferences_handler.conferenceEnd_dates.length));
      conferences_handler.notification_deadlines = conferences_handler.notification_deadlines.slice(0, selected_index).concat(conferences_handler.notification_deadlines.slice(selected_index + 1, conferences_handler.notification_deadlines.length));
      conferences_handler.locations = conferences_handler.locations.slice(0, selected_index).concat(conferences_handler.locations.slice(selected_index + 1, conferences_handler.locations.length));
      conferences_handler.inner_radii = conferences_handler.inner_radii.slice(0, selected_index).concat(conferences_handler.inner_radii.slice(selected_index + 1, conferences_handler.inner_radii.length));
      conferences_handler.outer_radii = conferences_handler.outer_radii.slice(0, selected_index).concat(conferences_handler.outer_radii.slice(selected_index + 1, conferences_handler.outer_radii.length));
      conferences_handler.start_angles = conferences_handler.start_angles.slice(0, selected_index).concat(conferences_handler.start_angles.slice(selected_index + 1, conferences_handler.start_angles.length));
      conferences_handler.end_angles = conferences_handler.end_angles.slice(0, selected_index).concat(conferences_handler.end_angles.slice(selected_index + 1, conferences_handler.end_angles.length));
      conferences_handler.rings = conferences_handler.rings.slice(0, selected_index).concat(conferences_handler.rings.slice(selected_index + 1, conferences_handler.rings.length));
      conferences_handler.arcs = conferences_handler.arcs.slice(0, selected_index).concat(conferences_handler.arcs.slice(selected_index + 1, conferences_handler.arcs.length));

      
      //conferences_handler.

       // return updated num_confs
       return conferences_handler.num_confs - 1;
   }

   // creates line on visualization indicating the day
   createDateLine(svg, data_handler, now, x, y, r) {
       //handle date conversion for finding correct angle
       var converted_date = data_handler.convertDateToNum(now);
       console.log(converted_date);
       var date_angle = (converted_date/365) * (2*Math.PI);
       console.log(date_angle);
       var newly_built_date_line = d3.svg.line.radial().angle(date_angle).radius(function(d) { return d; } );
       console.log(newly_built_date_line);

       //MAGIC NUMBER 15 LOOKIN REEEEAAAAAL SHIT
       var date_line = svg.append("line").attr("x1", x).attr("y1", y)
                                         .attr("x2", x + (r - 15)*Math.cos(date_angle)).attr("y2", y + (r - 15)*Math.sin(date_angle))
                                         .attr("stroke-width", 2).attr("stroke", "black");
       return date_line;
   }
   
   // creates 12 month arcs inside the smallest conference radius to show the user how time is alloted in the visualization
   createMonthsRing(svg, x, y) {
       // how month names are displayed, change this array if you would like different names to be shown
       var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

       // empty arrays to store the 12 created month arcs
       var month_arcs = [];
       var month_text_objs = [];

       // math portion to properly define size and spacing of arcs
       var spacing = (0.05*((2*Math.PI)/12));
       var arc_length = (((2*Math.PI)/12) - (2*spacing));
       var start_angle = spacing;
       var end_angle = arc_length - spacing;

       // begin creation of the 12 month arcs and their accompanying text
       for (var i = 0; i < 12; i++) {
            //init. and append new conference arc to svg
           var newly_built_arc = d3.svg.arc().innerRadius(170)
                                                 .outerRadius(190)
                                                 .startAngle(start_angle)
                                                 .endAngle(end_angle);

           var new_month_arc = svg.append("path").attr("id", months[i] + "_arc").attr("d", newly_built_arc).attr("transform", "translate("+x+", "+y+")").style("fill", "green");



           //var months_text_arc = svg.append("path").attr("id", "path_text_months").attr("d", "M75,300 A125,125 0 0,1 325,300").attr("fill", "none").style("stroke", "#AAAAAA");
           var months_text = svg.append("text").attr("id", months[i])
                                               .attr("x", 20)   //Move the text from the start angle of the arc
                                               .attr("dy", 18) //Move the text down
                                               .append("textPath").attr("xlink:href", "#"+months[i]+"_arc").style("text-anchor", "middle").text(months[i]);

           // store the created text and arc (not really necessary as of now, but it's here just in case)
           month_arcs.push(new_month_arc);
           month_text_objs.push(months_text);

           // update start and end angles for the next arc to be created
           start_angle += arc_length + 2*spacing;
           end_angle += arc_length + 2*spacing;
       }
   }
}