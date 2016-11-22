
const angular = require('angular');
const App = require('./app');

angular
    .element(document)
    .ready(function () {
        let html = document.getElementsByTagName("html")[0];
        angular.bootstrap(html, [App.name]);
    });
