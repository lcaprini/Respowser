
const Controller = require("./view.controller");
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
                        return StorageService.get(CONST.STORAGE.DEFAULT_APP);
                }]
            }
        }
    )
}
router.$inject = ["$routeProvider"];

const angularModule = angular.module("view", [])
    .controller("ViewCtrl", Controller)
    .run()
    .config(router);

module.exports = angularModule;