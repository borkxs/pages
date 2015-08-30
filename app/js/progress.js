var books = [{ title: "Drive",
    isbn: "1594484805",
    page: 34,
    total: 223
}, {
    title: "The Signal and the Noise",
    isbn: "9780143125082",
    page: 20,
    total: 454
}, {
    title: "On the Shortness of Life",
    isbn: "0143036327",
    page: 33,
    total: 106
}, {
    title: "House of Leaves",
    isbn: "0375703764",
    page: 106,
    total: 528
}, {
    title: "So Good They Can't...",
    isbn: "9781455509126",
    page: 230,
    total: 230
}, {
    title: "The Clean Coder",
    isbn: "9780137081073",
    page: 204,
    total: 204
}, {
    title: "Letters From a Stoic",
    isbn: "0140442103",
    page: 231,
    total: 231
}];

books
    .sort( function ( a, b ) {
        return progress( a ) > progress( b );
        function progress ( data ) { return data.page / data.total; }
    })
    .forEach(makeChart);

function makeChart(data, i) {
    var width = 180,
        height = 271,
        twoPi = 2 * Math.PI,
        progress = data.page / data.total,
        total = 100, // must be hard-coded if server doesn't report Content-Length
        formatPercent = d3.format(".0%");

    var arc = d3.svg.arc()
        .startAngle(0)
        .innerRadius(50)
        .outerRadius(70);

    var arc2 = d3.svg.arc()
        .startAngle(0)
        .innerRadius(0)
        .outerRadius(70);

    var containerClass = "book-" + i,
        selector = "." + containerClass;
    
    $("body").append('<div class="book ' + containerClass + '"></div>');

    // if ( data.isbn )
    $( selector ).append('<img class="image" src="http://covers.openlibrary.org/b/isbn/' + data.isbn + '-M.jpg" />');

    var svg = d3.select( selector )
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    $( selector ).append('<div class="text"></div>')
    $( selector + ' .text' ).append('<h3>' + data.title + '</h3>');
    $( selector + ' .text'  ).append('<h4>' +  "(" + data.page + "/" + data.total + ")" + '</h4>');

    var meter = svg.append("g")
        .attr("class", "progress-meter");

    meter.append("path")
        .attr("class", "circle")
        .attr("d", arc2.endAngle(twoPi));

    meter.append("path")
        .attr("class", "background")
        .attr("d", arc.endAngle(twoPi));

    var foreground = meter.append("path")
        .attr("class", "foreground");

    var progressText = meter.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ".35em");

    var title = meter.append("text")
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .attr("dy", "6.5em");

    var pageCount = meter.append("text")
        .attr("class", "pages")
        .attr("text-anchor", "middle")
        .attr("dy", "8em");

    // Arc
    foreground
        .attr("d", arc.endAngle(twoPi * progress));

    // Text
    progressText.text(formatPercent(progress));
    // title.text(data.title);
    // pageCount.text( "(" + data.page + "/" + data.total + ")" );

    if ( progress == 1 )
        foreground.attr("class", "done");
    else if ( progress < 1 && progress >= 0.25 )
        foreground.attr("class", "reading");
    else if ( progress < 0.25 && progress > 0.1 )
        foreground.attr("class", "started");
    else
        foreground.attr("class", "opened");

}


