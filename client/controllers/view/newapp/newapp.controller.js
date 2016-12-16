
const App = require("core/app");
const Device = require("core/device");
const CONST = require("core/constants");
const config = require("core/config");
const _ = require("lodash");
const {dialog} = require('electron').remote;

class NewAppController{

    /**
     * Initialize NewAppController
     * @param DevicesService
     * @param StorageService
     * @param $timeout
     * @param $mdDialog
     * @param url
     */
    constructor(DevicesService, StorageService, $timeout, $mdDialog, url){
        this.DevicesService = DevicesService;
        this.StorageService = StorageService;
        this.$timeout = $timeout;
        this.$mdDialog = $mdDialog;
        this.app = new App();
        this.app.url = url;

        this.ORIENTATIONS = CONST.ORIENTATIONS;
        this.DEVICE_OSS = CONST.DEVICES.OSS;
        this.DEVICE_TYPES = CONST.DEVICES.TYPES;

        // Get the list of all available devices
        this.devicesList = this.DevicesService.getDevices();

    }

    toggle(item, list) {
        if(item && list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            }
            else {
                list.push(item);
            }
        }
    };

    exists(item, list) {
        if(item && list) {
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

    }

}
NewAppController.$inject = ["DevicesService", "StorageService", "$timeout", "$mdDialog", "url"];

module.exports = NewAppController;