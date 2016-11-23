
const Controller = require("./view.controller");
const Device = require("core/device");

function router($routeProvider){
    $routeProvider
        .when('/view',{
            templateUrl  : `${__dirname}/view.html`,
            controller   : Controller,
            controllerAs : "$ctrl",
            resolve      : {
                device : [
                    "DevicesService",
                    (DevicesService) => {
                        // Get last used device
                        return DevicesService.getLastDevice();
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