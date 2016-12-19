
const Controller = require("./view.controller");
const AppConfig = require("./appconfig/appconfig.controller");
const App = require("core/app");
const fs = require("fs");

function router($routeProvider){
    $routeProvider
        .when('/view',{
            templateUrl  : `${__dirname}/view.html`,
            controller   : Controller,
            controllerAs : "$ctrl",
            resolve      : {
                app : [
                    "$timeout",
                    ($timeout) => {
                        return $timeout(() => {
                            let defaultApp = new App();
                            if(defaultApp.config && fs.existsSync(defaultApp.config)){
                                let readed = fs.readFileSync(defaultApp.config);
                                defaultApp.createFromStorage(JSON.parse(readed));
                            }
                            // Disable config dialog for default app
                            defaultApp.noConfig = true;

                            return defaultApp;
                        }, 200);
                }]
            }
        }
    )
}
router.$inject = ["$routeProvider"];

const angularModule = angular.module("view", [])
    .controller("ViewCtrl", Controller)
    .controller("AppConfigCtrl", AppConfig)
    .run()
    .config(router);

module.exports = angularModule;