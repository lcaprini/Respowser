
require("angular-material");
require("angular-route");
const config = require("../../../config");

// Initialize appModules
const appName = "Respowser";
const ControllersModule = require("./controllers/controllers.module");
const ServicesModule = require("./services/services.module.js");
const ModulesModule = require("./modules/modules.module.js");
const FiltersModule = require("./filters/filters.module");
const DirectivesModule = require("./directives/directives.module");


// Create main app module
let app = angular.module(appName, [
    "ngMaterial",
    "ngRoute",

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
            redirectTo : config.selectMode? "/select" : "/view"
        })
}
router.$inject = ["$routeProvider"];
app.config(router);



module.exports = app;