(function () {
    'use strict';
    var angular = require('angular'),
        d3 = require('d3'),
        Pages;

    require('angular-ui-router');

    Pages = angular.module('Pages', ['ui.router']);

    Pages.directive('pagesPercentage', function () {
        return {
            templateUrl: 'partials/percentage.html',
            scope: {
                book: '=pagesPercentage'
            },
            link: function (scope) {
                angular.extend(scope, scope.book);
            }
        };
    });

    Pages.controller('RootController', function ($scope, $http) {
        var width = 180,
            height = 271,
            twoPi = 2 * Math.PI,
            formatPercent = d3.format(".0%"),
            arc = d3.svg.arc().startAngle(0).innerRadius(50).outerRadius(70),
            arc2 = d3.svg.arc().startAngle(0).innerRadius(0).outerRadius(70);

        console.log("twoPi", twoPi);

        function getProgress(book) {
            return Math.round(parseFloat((100 * book.page / book.total).toFixed(2)));
        }

        $http.get('data/books.json').then(function (books) {
            $scope.books = books.data.map(function (book) {
                var progress = getProgress(book) / 100;

                angular.extend(book, {
                    width: width,
                    height: height,
                    progress: progress,
                    percentage: formatPercent(progress),
                    circle: arc2.endAngle(twoPi)(),
                    background: arc.endAngle(twoPi)(),
                    done: arc.endAngle(twoPi * progress)()
                });

                if (progress === 1) {
                    book.foregroundClass = "done";
                } else if (progress < 1 && progress >= 0.25) {
                    book.foregroundClass = "reading";
                } else if (progress < 0.25 && progress > 0.1) {
                    book.foregroundClass = "started";
                } else {
                    book.foregroundClass = "opened";
                }

                return book;
            });
            console.log('$scope.books', $scope.books);
        });
    });

    Pages.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('root', {
            url: '/',
            templateUrl: 'partials/root.html',
            controller: 'RootController'
        });
    });
}());