var VisualizationHandler = require('../VisualizationHandler.js');
var DataHandler = require('../DataHandler.js');
var Conference = require('../Conference.js');

var expect = require('chai').expect;

const d3 = require('d3');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM("<!DOCTYPE html><html><script type=\"text/javascript\" src=\"VisualizationHandler.js\"></script><script type=\"text/javascript\" src=\"Conference.js\"></script><script type=\"text/javascript\" src=\"DataHandler.js\"></script><body></body></html>");

describe('#Conference', function() {
    beforeEach(function() {

    });
    
    context('without arguments passed into Conference', function() {
        var conference_obj = new Conference();
        
        it('should return NaN', function() {
            expect(conference_obj).to.equal(NaN);
        });
    });
    
    context('with all arguments passed into Conference', function() {
        var svg_width = dom.window.document.body.clientWidth / 2;
        var svg_height = dom.window.document.body.clientHeight;
        var svg = d3.select(dom.window.document).select("body").append("svg").attr("width", svg_width).attr("height", svg_height);
        
        var data_handler = new DataHandler();
        var conference = [];
        var conferences = [['name']];
        var num_confs = 1;
        var conferences_handler = new VisualizationHandler(svg, dom.window.document, svg_width/2, svg_height/2, conferences, num_confs, data_handler);
        
        var conference_obj = new Conference(conferences_handler, conference[0], conference[1], conference[2], conference[3], conference[4],
                                            conference[5], conference[6], conference[7], conference[8], conference[9], conference[10],
                                            conference[10], conference[11], conference[12], conference[13], conference[14], conference[15],
                                            conference[16], conference[17], conference[18], conference[19], conference[20],
                                            conference[21], conference[22]);
        
        it('should return a non null object', function() {
            expect(conference_obj.to.not.equal(NaN));
        });
    });

});
