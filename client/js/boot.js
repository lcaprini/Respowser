
require('angular');
require("angular-material");
require("angular-route");
require("angular-filter");
require("angular-messages");

// Initialize appModules
const appName = "Respowser";
const ControllersModule = require("../controllers/controllers.module");
const ServicesModule = require("./services/services.module.js");
const ModulesModule = require("./modules/modules.module.js");
const FiltersModule = require("./filters/filters.module");
const DirectivesModule = require("./directives/directives.module");


// Create main app module
let app = angular.module(appName, [
    "ngMaterial",
    "ngRoute",
    "angular.filter",
    "ngMessages",

    // Inject modules
    ControllersModule.name,
    ServicesModule.name,
    ModulesModule.name,
    FiltersModule.name,
    DirectivesModule.name
]);




function run(){
    console.log(`Starting the ${appName} app`);
}
run.$inject = [];
app.run(run);



// Define main routing rules
function router($routeProvider){
    $routeProvider
        .otherwise({
            redirectTo : "/view"
        })
}
router.$inject = ["$routeProvider"];
app.config(router);

// Set icon sets
function icons($mdIconProvider){
    $mdIconProvider
        .defaultIconSet("icons/icons.svg");
}
icons.$inject = ["$mdIconProvider"];
app.config(icons);


// Boostrap of AngularJS app
angular
    .element(document)
    .ready(function () {
        let html = document.getElementsByTagName("html")[0];
        angular.bootstrap(html, [appName]);
    });