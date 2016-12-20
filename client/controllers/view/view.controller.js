
const App = require("core/app");
const Device = require("core/device");
const CONST = require("core/constants");
const config = require("core/config");
const Utils = require("core/utils");
const _ = require("lodash");
const {dialog} = require('electron').remote;
const fs = require('fs');
const path = require("path");

class ViewController{

    /**
     * Initialize ViewController
     * @param DevicesService
     * @param StorageService
     * @param $q
     * @param app
     * @param $timeout
     * @param $mdDialog
     */
    constructor(DevicesService, StorageService, $q, app, $timeout, $mdDialog){
        this.DevicesService = DevicesService;
        this.StorageService = StorageService;
        this.$q = $q;
        this.$timeout = $timeout;
        this.$mdDialog = $mdDialog;
        this.app = app;
        console.log(app);

        this.ORIENTATIONS = CONST.ORIENTATIONS;
        this.canOpenApp = !config.singleApp;

        // Get the list of all available devices
        this.devicesList = this.DevicesService.getDevices();

        // Initialize device
        this.initDevice();

        // Initialize default app
        this.initDefaultApp();

        let that = this;
        window.addEventListener('resize', function(e){
            e.preventDefault();
            that.$timeout(() => {}, 1);
        });
    }

    /**
     * Initialize device from last device used for app
     */
    initDevice(){
        this.device = new Device(_.find(this.devicesList, {model: this.app.lastDevice.model}), this.app.lastDevice.orientation);
        this.canRotateDevice = this.app.compatibility.orientations.length > 1;
        this.device.load();
    }

    /**
     * Initialize the default app
     */
    initDefaultApp(){
        let _that = this;

        let display = document.querySelector("#display");
        const loadFrame = () => {
            display.removeEventListener("dom-ready", loadFrame);
            _that.loadApp(this.app.url);
        };
        display.addEventListener("dom-ready", loadFrame);
    }

    /**
     * Load app from its url, loading frame and set userAgent of selected device
     * @param url
     */
    loadApp(url){
        console.info("ViewController:loadApp", url);

        let display = document.querySelector("#display");
        display.loadURL(`file://${url}`, {
            userAgent : this.device.userAgent
        });
        display.getWebContents().enableDeviceEmulation({
            screenPosition : 'mobile',
        });
        display.getWebContents().openDevTools();
    }

    /**
     * Allow app open by selecting its main html file.
     * If app was already configured open it;
     * open config modal otherwise
     */
    openApp(){
        let _that = this;

        dialog.showOpenDialog({
            properties: ['openFile']
        },
        (file) => {
            _that.$timeout(() => {
                if (file && file.length > 0){

                    // Find app configuration, if exists
                    let configPath = Utils.getConfigUrl(file[0]);

                    // If configuration file exists open the app
                    if(fs.existsSync(configPath)){
                        let readed = fs.readFileSync(configPath);
                        _that.openNewApp(JSON.parse(readed));
                    }
                    // Otherwise open modal to create new app from URL
                    else {
                        this.$mdDialog.show({
                            controller: 'AppConfigCtrl',
                            controllerAs: '$ctrl',
                            templateUrl: `${__dirname}/appconfig/appconfigDialog.html`,
                            parent: angular.element(document.body),
                            disableParentScroll: true,
                            hasBackdrop: false,
                            clickOutsideToClose: false,
                            locals: {
                                url : file[0],
                                app : null
                            },
                            escapeToClose: true}).then(
                            (appData) => {
                                _that.openNewApp(appData);
                            },
                            () => {}
                        );
                    }
                }
            }, 10);
        });
    };
    openNewApp(appData){
        this.$timeout(() => {
        let _newApp = new App(appData);
        this.app = _newApp;
        this.initDevice();
        this.loadApp(_newApp.url);
    }, 5);
};

    /**
     * Refresh app without reload frame
     */
    refreshApp(){
        let display = document.querySelector("#display");
        display.getWebContents().reload();
    }

    /**
     * Rotate device and update info in storage
     */
    rotateDevice(){
        this.device.rotate();
        this.app.updateDevice(this.device);
    }

    viewSettings(){
        let _that = this;
        this.$mdDialog.show({
            controller: 'AppConfigCtrl',
            controllerAs: '$ctrl',
            templateUrl: `${__dirname}/appconfig/appconfigDialog.html`,
            parent: angular.element(document.body),
            disableParentScroll: true,
            hasBackdrop: false,
            clickOutsideToClose: false,
            locals: {
                url : null,
                app : angular.copy(this.app)
            },
            escapeToClose: true}).then(
            (appData) => {
                _that.openNewApp(appData);
            },
            () => {}
        );
    }

    /**
     * Set selected device and update in storage
     * @param device
     */
    setDevice(device){
        this.device = new Device(device, this.app.lastDevice.orientation);
        this.app.updateDevice(this.device);
        this.StorageService.set(this.app.name, this.app);
        this.device.load();
    }

}
ViewController.$inject = ["DevicesService", "StorageService", "$q", "app", "$timeout", "$mdDialog"];

module.exports = ViewController;