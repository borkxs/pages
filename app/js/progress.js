var $ = require('jquery'),
    _ = require('underscore'),
    d3 = require('d3');

var chart = require('./chart');

function handleBooks(books) {

    "use strict";

    books.forEach(function (book) {
        book.progress = Math.round(parseFloat((100 * book.page / book.total).toFixed(2)));
    });

    books = _(books).sortBy('progress').forEach(chart);
}

$.get('data/books.json', handleBooks);