
require('angular-material');
require('angular-route');

// Initialize appModules names
const appName = 'Respowser';

const ControllersModule = require('./core/controllers/controllers.module');
const ServicesModule = require('./core/services/services.module.js');
const ModulesModule = require('./core/modules/modules.module.js');
const FiltersModule = require('./core/filters/filters.module');
const DirectivesModule = require('./core/directives/directives.module');



let app = angular.module(appName, [
    'ngMaterial',
    'ngRoute',


    ControllersModule.name,
    ServicesModule.name,
    ModulesModule.name,
    FiltersModule.name,
    DirectivesModule.name
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