
const appName = "Respowser";

require('angular-material');
require('angular-route');

// Inizializzo i moduli
const SelectModule = require('./select/select.module');
const ViewModule = require('./view/view.module');

let app = angular.module(appName, [
    'ngMaterial',
    'ngRoute',
    SelectModule.name,
    ViewModule.name
]);

function run($rootScope){
    console.log(`Starting the ${appName} app`);

    $rootScope.appName = appName;
}
run.$inject = ['$rootScope'];
app.run(run);

function router($routeProvider){
    $routeProvider
        .otherwise({
            redirectTo : '/select'
        })
}
router.$inject = ["$routeProvider"];
app.config(router);

module.exports = app;