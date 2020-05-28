/**
 * Conference Class
 */
class Conference {
    // constructor (must include all fields atm)
    constructor(conferences_handler, conf_name, conf_url, conf_index, x, y, conf_field, conf_color, submission_deadline, decision_deadline,
                conferenceStart_date, conferenceEnd_date, notification_deadline, conf_location, radius, inner_radius, outer_radius, start_angle, end_angle,
                conf_dates_start_angle, conf_dates_end_angle, ring, arc) {
        // var. having to do with conference info.
        this.conferences_handler = conferences_handler;
        this.conf_name = conf_name;
        this.conf_url = conf_url;
        this.conf_index = conf_index;
        this.conf_field = conf_field;
        this.conf_color = conf_color;

        // var. having to do with conference vis.
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.inner_radius = inner_radius;
        this.outer_radius = outer_radius;
        this.conf_dates_start_angle = conf_dates_start_angle;
        this.conf_dates_end_angle = conf_dates_end_angle;
        this.start_angle = start_angle;
        this.end_angle = end_angle;

        // var. having to do with both conf. vis. & conf. info.
        this.submission_deadline = submission_deadline;
        this.decision_deadline = decision_deadline;
        this.conferenceStart_date = conferenceStart_date;
        this.conferenceEnd_date = conferenceEnd_date;
        this.notification_deadline = notification_deadline;
        this.conf_location = conf_location;
        
        // change ring and arc size here
        this.ring_size = 3;
        this.arc_size = 10;

        // conf. shapes
        this.ring = ring;
        this.arc = arc;
    }

     /**
     * showDetails
     * @params document, conference
     * document: used to append created elements to html
     * conference: used to grab data necessary to populate created elements
     *
     * showDetails is in charge of displaying the data corresponding to each conference.
     * It is a base template and used for all conferences, as they should all have the same
     * data fields.
     */
    //showDetails(document, conference) {
    //    // new elements are added dynamically on conference visualization click. This means that objects
    //    // need to be deleted and re-added each time a new conference is clicked. This array and fo r loop
    //    //
    //    // handles conference descriptive element deletions
    //    var details_element_ids = ["conferenceName", "mainParagraph", "deleteButton"];
    //    for (var i = 0; i < details_element_ids.length; i++) {
    //        if (document.getElementById(details_element_ids[i])){
    //            var elem = document.getElementById(details_element_ids[i]);
    //            elem.remove();
    //        }
    //    }
    //
    //    //create a new container that will appear on the left side of the screen
    //    var container2 = document.createElement("div");
    //    container2.setAttribute("style","float: left;");
    //    document.body.appendChild(container2);
    //
    //    var container3 = document.createElement("div2");
    //    container3.setAttribute("style","float: absolute;");
    //    container3.style.position = "absolute";
    //    container3.style.left = 1025 + 'px';
    //    container3.style.top = 175 +'px';
    //    document.body.appendChild(container3);
    //
    //    // Header element, will contain Conference Name
    //    var h1 = document.createElement('h1');
    //    h1.id = "conferenceName";
    //    h1.textContent = conference.conf_name;
    //    h1.style.color = conference.conf_color;
    //    var left = document.clientWidth/2;
    //    var top = document.clientHeight/2;
    //    //h1.style.left = left;
    //    //h1.style.top = top;
    //    //h1.setAttribute("style", "position: left; z-index: 1; left: "+left+"; top: "+top+"; width:200px; height:20px;");
    //    //h1.style.zIndex = 1;
    //    container2.appendChild(h1);
    //    //container2.appendChild(h1);
    //
    //    // Paragraph element, unknown what this will contain
    //    var p1 = document.createElement('p1');
    //    p1.id = "mainParagraph";
    //    p1.setAttribute("style", "position: absolute; z-index: 1; left: "+left+"; top: "+top+"; width:190px; height:100px;");
    //    p1.textContent = "Conference Topic: " + conference.conf_field + "\r\nLocation: " + conference.conf_location + "\r\nSubmission Deadline: " + conference.submission_deadline + "\r\nNotification Deadline: " + conference.notification_deadline + "\r\nFinal Version Due: " + conference.decision_deadline;
    //    p1.setAttribute('class', 'note');
    //    p1.setAttribute('vertical-align', 'baseline');
    //    container2.appendChild(p1);
    //
    //    var deleteButton = document.createElement("button");
    //    deleteButton.innerHTML = "Delete Conference";
    //    deleteButton.id = "deleteButton";
    //    deleteButton.width = "20px";
    //    deleteButton.height = "100px";
    //    deleteButton.top = "100px";
    //    deleteButton.left = "20px";
    //    container3.appendChild(deleteButton);
    //
    //    deleteButton.onclick = function() {
    //        VisualizationHandler.delAndUpdate();
    //    }
    //}

    /**
     * createConfRing
     * @params svg, document, conference, x, y, radius, color, ring_size
     * svg: svg object, used to add created shapes into svg
     * x, y: Cartesian coordinates of the center of circle or arc to be created on the canvas
     * radius: the radius of the circle or arc being created
     * start_angle, end_angle: used to define start and end points if arc is being created
     * color: color of circle or arc
     * ring_size: width of stroke for ring
     *
     * Creates conference ring
     */
    //Create Conference Visualizations (ring & arc), and add click handlers. TODO: SHOULD CLICK HANDLERS BE TAKEN CARE OF IN THE SAME FUNCTION???
    static createConfRing(svg, document, conferences_handler, data_handler, conference, x, y, radius, color) {
        //init. and append new conference ring to svg
        console.log("createConfRing: ", svg, document);
        var new_conf_ring = svg.append("circle").attr("cx", x).attr("cy", y)
                                                .attr("r", radius)
                                                .attr("stroke", color).attr("stroke-width", conference.ring_size)
                                                .style("fill", "none")
                                                .on("click", function() {
                                                    showDetails(svg, document, conferences_handler, data_handler, conference);
                                                    selected_conf_index = conference.conf_index;
                                                });
                                                
        console.log("createConfRing: ", new_conf_ring);
        return new_conf_ring;
    }

    /*
     * createConfArc
     * @params: svg, document, conference, x, y, radius, start_angle, end_angle, color, arc_size
     * svg: svg object, used to add created shapes into svg
     * x, y: Cartesian coordinates of the center of circle or arc to be created on the canvas
     * radius: the radius of the circle or arc being created
     * start_angle, end_angle: used to define start and end points if arc is being created
     * color: color of circle or arc
     * arc_size: width of stroke for arc
     * Creates Conference arc indicating all deadlines
     */
    static createConfArc(svg, document, conferences_handler, data_handler, conference, x, y, radius, start_angle, end_angle, color) {
        //init. and append new conference arc to svg
        var newly_built_arc = d3.svg.arc().innerRadius(radius - (conference.arc_size/2))
                                              .outerRadius(radius + (conference.arc_size/2))
                                              .startAngle(start_angle)
                                              .endAngle(end_angle);

        var new_conf_arc = svg.append("path").attr("d", newly_built_arc).attr("transform", "translate("+x+", "+y+")").style("fill", color)
                                                .on("click", function() {
                                                    showDetails(svg, document, conferences_handler, data_handler, conference);
                                                    selected_conf_index = conference.conf_index;
                                                });
        return new_conf_arc;
    }
    
    static createConfDatesArc(svg, document, conferences_handler, data_handler, conference, x, y, radius, start_angle, end_angle) {
        //init. and append new conference arc to svg
        var newly_built_arc = d3.svg.arc().innerRadius(radius - (conference.arc_size/2))
                                              .outerRadius(radius + (conference.arc_size/2))
                                              .startAngle(start_angle)
                                              .endAngle(end_angle);

        var new_conf_arc = svg.append("path").attr("d", newly_built_arc).attr("transform", "translate("+x+", "+y+")").style("fill", "#ffffff")
                                                .on("click", function() {
                                                    showDetails(svg, document, conferences_handler, data_handler, conference);
                                                    selected_conf_index = conference.conf_index;
                                                });
        return new_conf_arc;
    }
    
    static createConfNotificationsDeadlineArc(svg, document, conferences_handler, data_handler, conference, x, y, radius) {
        //init. and append new conference arc to svg
        var arc_spacing = (Math.PI/360)*2;
        
        var notification_deadline_angle = (((conference.notification_deadline)/365) * (2*Math.PI));
        
        var newly_built_arc = d3.svg.arc().innerRadius(radius - (conference.arc_size/2))
                                          .outerRadius(radius + (conference.arc_size/2))
                                          .startAngle(notification_deadline_angle - arc_spacing)
                                          .endAngle(notification_deadline_angle + arc_spacing);

        var new_conf_arc = svg.append("path").attr("d", newly_built_arc).attr("transform", "translate("+x+", "+y+")").style("fill", "#ffffff")
                                                .on("click", function() {
                                                    showDetails(svg, document, conferences_handler, data_handler, conference);
                                                    selected_conf_index = conference.conf_index;
                                                });
        return new_conf_arc;
        
        
    }   

    /*
     * createConfVisuals
     *
     * Uses the two previous function to handle all Conference visualization creation
     */
    static createConfVisuals(svg, document, conferences_handler, data_handler, conf, x, y, radius, start_angle, end_angle, conf_color, conf_start_angle, conf_end_angle) {
        console.log("createConfVisuals: ", x, y);
        conf.ring = Conference.createConfRing(svg, document, conferences_handler, data_handler, conf, x, y, radius, conf_color);
        conf.arc = Conference.createConfArc(svg, document, conferences_handler, data_handler, conf, x, y, radius, start_angle, end_angle, conf_color);
        console.log("createConfVisuals: ", conf_start_angle, conf_end_angle);
        conf.conf_dates_arc = Conference.createConfDatesArc(svg, document, conferences_handler, data_handler, conf, x, y, radius, conf_start_angle, conf_end_angle);
        
        if ((conf.notification_deadline != "") && (conf.notification_deadline != null)) {
            conf.notification_deadline_arcs = Conference.createConfNotificationsDeadlineArc(svg, document, conferences_handler, data_handler, conf, x, y, radius);
        }
    }
}