
const Controller = require(`./select.controller`);

function router($routeProvider){
    $routeProvider
        .when('/select',{
            templateUrl  : `${__dirname}/select.html`,
            controller   : Controller,
            controllerAs : "$ctrl"
        }
    )
}
router.$inject = ["$routeProvider"];

const angularModule = angular.module("select", [])
    .controller("SelectCtrl", Controller)
    .run()
    .config(router);

module.exports = angularModule;