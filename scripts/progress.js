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
    isbn: "978-1455509126",
    page: 230,
    total: 230
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
    var width = 200,
        height = 300,
        twoPi = 2 * Math.PI,
        progress = data.page / data.total,
        total = 100, // must be hard-coded if server doesn't report Content-Length
        formatPercent = d3.format(".0%");

    var arc = d3.svg.arc()
        .startAngle(0)
        .innerRadius(50)
        .outerRadius(70);

    var containerClass = "book-" + i;
    
    $("body").append('<div class="book ' + containerClass + '"></div>');

    if ( data.isbn )
        $("." + containerClass)
            .append('<img src="http://covers.openlibrary.org/b/isbn/' + data.isbn + '-M.jpg" />');

    var svg = d3.select("." + containerClass)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var meter = svg.append("g")
        .attr("class", "progress-meter");

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

    
    foreground.attr("d", arc.endAngle(twoPi * progress));
    progressText.text(formatPercent(progress));
    title.text(data.title);
    pageCount.text( "(" + data.page + "/" + data.total + ")" );

    if ( progress == 1 )
        foreground.attr("class", "complete")
}   