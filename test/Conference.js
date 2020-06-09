/**
 * Conference class
 */
class Conference {                                                                                                           //
    //////////////////////////////////////////////// constructor /////////////////////////////////////////////////////////// //
    constructor(conferences_handler, conf_name, conf_url, conf_index, x, y, conf_field, conf_color,                       // //
                submission_deadline, decision_deadline, conferenceStart_date, conferenceEnd_date, abstract_deadline,      // //
                conf_location, notes, radius, inner_radius, outer_radius, start_angle, end_angle,                         // //
                conf_dates_start_angle, conf_dates_end_angle, ring, arc, abstract_arc, conf_dates_arc) {                  // //
        // //
        // var. having to do with conference info.                                                                        // //
        this.conferences_handler = conferences_handler;                                                                   // //
        this.conf_name = conf_name;                                                                                       // //
        this.conf_url = conf_url;                                                                                         // //
        this.conf_index = conf_index;                                                                                     // //
        this.conf_field = conf_field;                                                                                     // //
                                                                                                                          // //
        this.conf_location = conf_location;                                                                               // //
        this.notes = notes;                                                                                               // //
                                                                                                                          // //
        // var. having to do with conference vis.                                                                         // //
        this.x = x;                                                                                                       // //
        this.y = y;                                                                                                       // //
        this.radius = radius;                                                                                             // //
        this.inner_radius = inner_radius;                                                                                 // //
        this.outer_radius = outer_radius;                                                                                 // //
        this.conf_dates_start_angle = conf_dates_start_angle;                                                             // //
        this.conf_dates_end_angle = conf_dates_end_angle;                                                                 // //
        this.start_angle = start_angle;                                                                                   // //
        this.end_angle = end_angle;                                                                                       // //
        this.conf_color = conf_color;                                                                                     // //
                                                                                                                          // //
        // var. having to do with both conf. vis. & conf. info.                                                           // //
        this.submission_deadline = submission_deadline;                                                                   // //
        this.decision_deadline = decision_deadline;                                                                       // //
        this.conferenceStart_date = conferenceStart_date;                                                                 // //
        this.conferenceEnd_date = conferenceEnd_date;                                                                     // //
        this.abstract_deadline = abstract_deadline;                                                                       // //
                                                                                                                          // //
                                                                                                                          // //
        // change ring and arc size here                                                                                  // //
        this.ring_size = 3;                                                                                               // //
        this.arc_size = 10;                                                                                               // //
                                                                                                                          // //
        // conf. shapes                                                                                                   // //
        this.ring = ring;                                                                                                 // //
        this.arc = arc;                                                                                                   // //
        this.abstract_arc = abstract_arc;                                                                                 // //
        this.conf_dates_arc = conf_dates_arc;                                                                             // //
    }                                                                                                                     // //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// //
    //
    //////////// creates conference ring visualization and appends it to svg obj, also adds onclick event to ring ////////// //
    /*********************************************************************************************                        // //
     * createConfRing                                                                            *                        // //
     * @params svg, document, conference, x, y, radius, color, ring_size                         *                        // //
     * svg: svg object, used to add created shapes into svg                                      *                        // //
     * document: html document obj, necessary to pass into showDetails function inside onclick   *                        // //
     * conferences_handler: VisualizationHandler obj, necessary to pass into showDetail function *                        // //
     * conference: conference obj, used for info inside of it                                    *                        // //
     * color: color of circle or arc                                                             *                        // //
     *********************************************************************************************/                       // //
    static createConfRing(svg, document, conferences_handler, conference, color) {                                        // //
        var defs = svg.append("defs");                                                                                    // //
                                                                                                                          // //
        var dropShadowFilter = defs.append('svg:filter')                                                                  // //
            .attr('id', 'drop-shadow')                                                                                      // //
            .attr('filterUnits', "userSpaceOnUse")                                                                          // //
            .attr('width', '250%')                                                                                          // //
            .attr('height', '250%');                                                                                        // //
        dropShadowFilter.append('svg:feGaussianBlur')                                                                     // //
            .attr('in', 'SourceGraphic')                                                                                    // //
            .attr('stdDeviation', 2)                                                                                        // //
            .attr('result', 'blur-out');                                                                                    // //
        dropShadowFilter.append('svg:feOffset')                                                                           // //
            .attr('in', 'color-out')                                                                                        // //
            .attr('dx', 3)                                                                                                  // //
            .attr('dy', 3)                                                                                                  // //
            .attr('result', 'the-shadow');                                                                                  // //
        dropShadowFilter.append('svg:feBlend')                                                                            // //
            .attr('in', 'SourceGraphic')                                                                                    // //
            .attr('in2', 'the-shadow')                                                                                      // //
            .attr('mode', 'normal');                                                                                        // //
                                                                                                                            // //
                                                                                                                            // //
                                                                                                                            // //
        //init. and append new conference ring to svg                                                                     // //
        console.log("createConfRing: ", svg, document);                                                                   // //
        var new_conf_ring = svg.append("circle").attr("cx", conferences_handler.x).attr("cy", conferences_handler.y)      // //
            .attr("r", conferences_handler.curr_radius)                               // //
            .attr("stroke", color)                                                    // //
            .attr("stroke-width", conference.ring_size)                               // //
            .style("fill", "none")                                                    // //
            .style("filter", "url(#drop-shadow)")                                     // //
            .on("click", function() {                                                 // //
                showDetails(svg, document, conferences_handler, conference);          // //
                selected_conf_index = conference.conf_index;                          // //
            });                                                                       // //
                                                                                      // //
                                                                                      // //
                                                                                      // //
                                                                                      // //
        console.log("createConfRing: ", new_conf_ring);                                                                   // //
        return new_conf_ring;                                                                                             // //
    }                                                                                                                     // //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// //
    //
    ///////////////////////////////// creates large conference arc for first and final deadlines /////////////////////////// //
    /*********************************************************************************************                        // //
     * createConfArc                                                                             *                        // //
     * @params: svg, document, conference, x, y, radius, start_angle, end_angle, color, arc_size *                        // //
     * svg: svg object, used to add created shapes into svg                                      *                        // //
     * document: html document obj, necessary to pass into showDetails function inside onclick   *                        // //
     * conferences_handler: VisualizationHandler obj                                             *                        // //
     * conference: conference obj, used for info inside of it                                    *                        // //
     * start_angle, end_angle: used to define start and end points if arc is being created       *                        // //
     * color: color of circle or arc                                                             *                        // //
     *********************************************************************************************/                       // //
    static createConfArc(svg, document, conferences_handler, conference, start_angle, end_angle, color) {                 // //
        //init. and append new conference arc to svg                                                                      // //
        var newly_built_arc = d3.svg.arc().innerRadius(conference.radius - (conference.arc_size/2))         // //
            .outerRadius(conference.radius + (conference.arc_size/2))     // //
            .startAngle(start_angle)                                                    // //
            .endAngle(end_angle);                                                       // //
                                                                                        // //
        var new_conf_arc = svg.append("path")                                                                             // //
            .attr("d", newly_built_arc)                                                                  // //
            .attr("transform", "translate("+conferences_handler.x+", "+conferences_handler.y+")")        // //
            .style("fill", color)                                                                        // //
            .on("click", function() {                                                                    // //
                showDetails(svg, document, conferences_handler, conference);                             // //
                selected_conf_index = conference.conf_index;                                             // //
            });                                                                                          // //
        return new_conf_arc;                                                                                              // //
    }                                                                                                                     // //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// //
    //
    /////////////////////////////////// creates arc for actual conference dates in white /////////////////////////////////// //
    /*********************************************************************************************                        // //
     * createConfDatesArc                                                                        *                        // //
     * @params: svg, document, conference, x, y, radius, start_angle, end_angle, color, arc_size *                        // //
     * svg: svg object, used to add created shapes into svg                                      *                        // //
     * document: html document obj, necessary to pass into showDetails function inside onclick   *                        // //
     * conferences_handler: VisualizationHandler obj                                             *                        // //
     * conference: conference obj, used for info inside of it                                    *                        // //
     * start_angle, end_angle: used to define start and end points if arc is being created       *                        // //
     *********************************************************************************************/                       // //
    static createConfDatesArc(svg, document, conferences_handler, conference, start_angle, end_angle) {                   // //
        //init. and append new conference arc to svg                                                                      // //
        var newly_built_arc = d3.svg.arc().innerRadius(conference.radius - (conference.arc_size/2))         // //
            .outerRadius(conference.radius + (conference.arc_size/2))     // //
            .startAngle(start_angle)                                                    // //
            .endAngle(end_angle);                                                       // //
                                                                                        // //
        var new_conf_arc = svg.append("path")                                                                             // //
            .attr("d", newly_built_arc)                                                                  // //
            .attr("transform", "translate("+conferences_handler.x+", "+conferences_handler.y+")")        // //
            .style("fill", "#ffffff")                                                                    // //
            .on("click", function() {                                                                    // //
                showDetails(svg, document, conferences_handler, conference);                             // //
                selected_conf_index = conference.conf_index;                                             // //
            });                                                                                          // //
        return new_conf_arc;                                                                                              // //
    }                                                                                                                     // //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// //
    //
    ////////////////////////////////////// creates arc for abstract deadline in white ////////////////////////////////////// //
    /*********************************************************************************************                        // //
     * createConfAbstractDeadlineArc                                                             *                        // //
     * @params: svg, document, conference, x, y, radius, start_angle, end_angle, color, arc_size *                        // //
     * svg: svg object, used to add created shapes into svg                                      *                        // //
     * document: html document obj, necessary to pass into showDetails function inside onclick   *                        // //
     * conferences_handler: VisualizationHandler obj                                             *                        // //
     * conference: conference obj, used for info inside of it                                    *                        // //
     *********************************************************************************************/                       // //
    static createConfAbstractDeadlineArc(svg, document, conferences_handler, conference) {                                // //
        //init. and append new conference arc to svg                                                                      // //
        var arc_spacing = (Math.PI/360)*2;                                                                                // //
                                                                                                                          // //
        var abstract_deadline_angle = (((conference.abstract_deadline)/365) * (2*Math.PI));// - arc_spacing*30;           // //
        // //
        var newly_built_arc = d3.svg.arc().innerRadius(conference.radius - (conference.arc_size/2))         // //
            .outerRadius(conference.radius + (conference.arc_size/2))         // //
            .startAngle(abstract_deadline_angle - arc_spacing)                              // //
            .endAngle(abstract_deadline_angle + arc_spacing);                               // //
                                                                                            // //
        var new_conf_arc = svg.append("path")                                                                             // //
            .attr("d", newly_built_arc)                                                                  // //
            .attr("transform", "translate("+conferences_handler.x+", "+conferences_handler.y+")")        // //
            .style("fill", "#ffffff")                                                                    // //
            .on("click", function() {                                                                    // //
                showDetails(svg, document, conferences_handler, conference);                             // //
                selected_conf_index = conference.conf_index;                                             // //
            });                                                                                          // //
        return new_conf_arc;                                                                                              // //
                                                                                                                          // //
                                                                                                                          // //
    }                                                                                                                     // //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// //
    //
    ////////////////////////////////////// creates arc for submission deadline in white //////////////////////////////////// //
    /*********************************************************************************************                        // //
     * createConfDatesArc                                                                        *                        // //
     * @params: svg, document, conference, x, y, radius, start_angle, end_angle, color, arc_size *                        // //
     * svg: svg object, used to add created shapes into svg                                      *                        // //
     * document: html document obj, necessary to pass into showDetails function inside onclick   *                        // //
     * conferences_handler: VisualizationHandler obj                                             *                        // //
     * conference: conference obj, used for info inside of it                                    *                        // //
     *********************************************************************************************/                       // //
    static createConfSubmissionDeadlineArc(svg, document, conferences_handler, conference) {                             // //
        //init. and append new conference arc to svg                                                                      // //
        var arc_spacing = (Math.PI/360)*2;                                                                                // //
                                                                                                                          // //
        var abstract_deadline_angle = (((conference.submission_deadline)/365) * (2*Math.PI));// - arc_spacing*30;         // //
        // //
        var newly_built_arc = d3.svg.arc().innerRadius(conference.radius - (conference.arc_size/2))         // //
            .outerRadius(conference.radius + (conference.arc_size/2))         // //
            .startAngle(abstract_deadline_angle - arc_spacing)                              // //
            .endAngle(abstract_deadline_angle + arc_spacing);                               // //
                                                                                            // //
        var new_conf_arc = svg.append("path")                                                                             // //
            .attr("d", newly_built_arc)                                                                  // //
            .attr("transform", "translate("+conferences_handler.x+", "+conferences_handler.y+")")        // //
            .style("fill", "#ffffff")                                                                    // //
            .on("click", function() {                                                                    // //
                showDetails(svg, document, conferences_handler, conference);                             // //
                selected_conf_index = conference.conf_index;                                             // //
            });                                                                                          // //
        return new_conf_arc;                                                                                              // //
                                                                                                                          // //
                                                                                                                          // //
    }                                                                                                                     // //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// //
    //
    /*                                                                                                                       //
     * createConfVisuals                                                                                                     //
     *                                                                                                                       //
     * Uses the two previous function to handle all Conference visualization creation                                        //
     */                                                                                                                      //
    static createConfVisuals(svg, document, conferences_handler, conf, start_angle, end_angle,                               //
                             conf_color, conf_start_angle, conf_end_angle) {                                                 //
        console.log("createConfVisuals:", "end_angle:", end_angle);                                                         //
        if (isNaN(end_angle)) {                                                                                             //
            conf.ring = Conference.createConfRing(svg, document, conferences_handler, conf, conf_color);                   //
            conf.abstract_arc = Conference.createConfSubmissionDeadlineArc(svg, document, conferences_handler, conf);      //
        } else {                                                                                                            //
            conf.ring = Conference.createConfRing(svg, document, conferences_handler, conf, conf_color);                    //
            conf.arc = Conference.createConfArc(svg, document, conferences_handler, conf,                                   //
                start_angle, end_angle, conf_color);                                        //
            console.log("createConfVisuals:", conf_start_angle, conf_end_angle);                                            //
            conf.conf_dates_arc = Conference.createConfDatesArc(svg, document, conferences_handler,                         //
                conf, conf_start_angle, conf_end_angle);                    //
                                                                            //
            console.log("createConfVisuals:", "conf", conf);                                                                //
                                                                                                                            //
            if ((conf.abstract_deadline != "") && (conf.abstract_deadline != null)) {                                       //
                conf.abstract_arc = Conference.createConfAbstractDeadlineArc(svg, document, conferences_handler, conf);     //
            }                                                                                                               //
        }                                                                                                                   //
    }                                                                                                                        //
}                                                                                                                            //
module.exports = Conference;