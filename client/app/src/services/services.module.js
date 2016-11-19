
const Devices = require("./devices.service");

const angularModule = angular.module("services", [])
    .factory(Devices.name, Devices)
;

module.exports = angularModule;