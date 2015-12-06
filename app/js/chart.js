var $ = require('jquery'),
    d3 = require('d3');

module.exports = function makeChart(data, i) {

    "use strict";

    var width = 180,
        height = 271,
        twoPi = 2 * Math.PI,
        progress = data.progress / 100,
        formatPercent = d3.format(".0%"),

        arc = d3.svg.arc()
                .startAngle(0)
                .innerRadius(50)
                .outerRadius(70),

        arc2 = d3.svg.arc()
                .startAngle(0)
                .innerRadius(0)
                .outerRadius(70),

        containerClass = "book-" + i,
        selector = "." + containerClass,

        svg,
        meter,
        foreground,
        progressText,
        title,
        pageCount;

    $("body").append('<div class="book ' + containerClass + '"></div>');

    // if ( data.isbn )
    $(selector).append('<img class="image" src="http://covers.openlibrary.org/b/isbn/' + data.isbn + '-M.jpg" />');

    svg = d3.select(selector)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    $(selector).append('<div class="text"></div>');
    $(selector + ' .text').append('<h3>' + data.title + '</h3>');
    $(selector + ' .text').append('<h4>' + "(" + data.page + "/" + data.total + ")" + '</h4>');

    meter = svg.append("g")
        .attr("class", "progress-meter");

    meter.append("path")
        .attr("class", "circle")
        .attr("d", arc2.endAngle(twoPi));

    meter.append("path")
        .attr("class", "background")
        .attr("d", arc.endAngle(twoPi));

    foreground = meter.append("path")
        .attr("class", "foreground");

    progressText = meter.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ".35em");

    title = meter.append("text");
    title.attr("class", "title")
        .attr("text-anchor", "middle")
        .attr("dy", "6.5em");

    pageCount = meter.append("text");
    pageCount.attr("class", "pages")
        .attr("text-anchor", "middle")
        .attr("dy", "8em");

    // Arc
    foreground
        .attr("d", arc.endAngle(twoPi * progress));

    // Text
    progressText.text(formatPercent(progress));
    // title.text(data.title);
    // pageCount.text( "(" + data.page + "/" + data.total + ")" );

    if (progress === 1) {
        foreground.attr("class", "done");
    } else if (progress < 1 && progress >= 0.25) {
        foreground.attr("class", "reading");
    } else if (progress < 0.25 && progress > 0.1) {
        foreground.attr("class", "started");
    } else {
        foreground.attr("class", "opened");
    }

};