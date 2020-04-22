import * as d3 from 'd3';

var node = document.createElement('div');

var width = 200,
    height = 200;

var svg = d3.select(node).append("svg")
    .attr("width", width)
    .attr("height", height);

var defs = svg.append("defs");

defs.append("clipPath")
    .attr("id", "circle1")
    .append("circle")
    .attr("cx", 50)
    .attr("cy", 20)
    .attr("r", 18);

defs.append("clipPath")
    .attr("id", "circle2")
    .append("circle")
    .attr("cx", 50)
    .attr("cy", 20)
    .attr("r", 18);

export default node;
