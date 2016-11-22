
const Storage = require("./storage.service");
const Devices = require("./devices.service");

const angularModule = angular.module("services", [])
        .factory(Storage.name, Storage)
        .factory(Devices.name, Devices)
;

module.exports = angularModule;