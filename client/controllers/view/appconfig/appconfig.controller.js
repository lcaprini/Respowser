
const App = require("core/app");
const CONST = require("core/constants");
const config = require("core/config");
const fs = require('fs');
const path = require("path");
const _ = require("lodash");
const Utils = require("core/utils");

class AppConfigController{

    /**
     * Initialize AppConfigController
     * @param DevicesService
     * @param StorageService
     * @param $timeout
     * @param $mdDialog
     * @param url
     * @param app
     * @param $scope
     */
    constructor(DevicesService, StorageService, $timeout, $mdDialog, url, app, $scope){
        this.DevicesService = DevicesService;
        this.StorageService = StorageService;
        this.$timeout = $timeout;
        this.$mdDialog = $mdDialog;
        this.app = (app)? app : new App();
        if(url)
            this.app.url = url;

        this.$scope = $scope;

        this.ORIENTATIONS = CONST.ORIENTATIONS;
        this.DEVICE_OSS = CONST.DEVICES.OSS;
        this.DEVICE_TYPES = CONST.DEVICES.TYPES;

        // Get the list of all available devices
        this.devicesList = this.DevicesService.getDevices();
    }

    toggle(item, list, lengthvar) {
        if(item && list) {
            let idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            }
            else {
                list.push(item);
            }
            if(lengthvar) {
                this.$scope.appForm[lengthvar].$setTouched();
                this[lengthvar] = list.length;
            }
        }
    };

    exists(item, list, lengthvar) {
        if(item && list) {
            if(lengthvar)
                this[lengthvar] = list.length;
            return list.indexOf(item) > -1;
        }
    };

    /**
     * Close dialog without creating app
     */
    closeDialog() {
        this.$mdDialog.hide();
    }

    /**
     * Create new app using form infos
     */
    createApp() {
        if(this.$scope.appForm.$valid){

            let _that = this;
            let device = _.find(this.devicesList, function(d){
                return _that.app.compatibility.types.indexOf(d.type) > -1 &&
                       _that.app.compatibility.oss.indexOf(d.os) > -1;
            });

            if(!device){
                alert("Nessun dispositivo disponibile con le caratteristiche richieste");
                return;
            }

            this.app.lastDevice = {
                model : device.model,
                orientation : this.app.compatibility.orientations[0]
            };
            let configPath = Utils.getConfigUrl(this.app.url);
            fs.writeFileSync(configPath, JSON.stringify(this.app, null, 4));
            this.$mdDialog.hide(this.app);
        }
    }

}
AppConfigController.$inject = ["DevicesService", "StorageService", "$timeout", "$mdDialog", "url", "app", "$scope"];

module.exports = AppConfigController;