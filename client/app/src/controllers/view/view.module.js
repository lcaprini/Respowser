
const Controller = require(`./view.controller`);

function router($routeProvider){
    $routeProvider
        .when('/view',{
            templateUrl  : `${__dirname}/view.html`,
            controller   : Controller,
            controllerAs : "$ctrl",
            resolve      : {
                device : [
                    "DevicesService",
                    (devices) => {
                        // Get last used device
                        return devices.getLastDevice();
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