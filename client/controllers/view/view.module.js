
const Controller = require("./view.controller");
const NewApp = require("./newapp/newapp.controller");
const App = require("core/app");
const CONST = require("core/constants");

function router($routeProvider){
    $routeProvider
        .when('/view',{
            templateUrl  : `${__dirname}/view.html`,
            controller   : Controller,
            controllerAs : "$ctrl",
            resolve      : {
                app : [
                    "StorageService",
                    (StorageService) => {
                        // Get last used device
                        return StorageService.get(CONST.STORAGE.DEFAULT_APP).then(
                            (default_app) => {
                                return new App(default_app);
                            }
                        );
                }]
            }
        }
    )
}
router.$inject = ["$routeProvider"];

const angularModule = angular.module("view", [])
    .controller("ViewCtrl", Controller)
    .controller("NewAppCtrl", NewApp)
    .run()
    .config(router);

module.exports = angularModule;