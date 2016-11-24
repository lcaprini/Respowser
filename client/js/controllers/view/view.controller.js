
const App = require("core/app");
const Device = require("core/device");
const CONST = require("core/constants");
const _ = require("lodash");

class ViewController{

    constructor(DevicesService, StorageService, $q, app){
        console.info("ViewController:constructor");
        this.ORIENTATIONS = CONST.ORIENTATIONS;

        this.DevicesService = DevicesService;
        this.StorageService = StorageService;
        this.$q = $q;
        this.app = app;

        // Get the list of all available devices
        this.devicesList = this.DevicesService.getDevices();

        // Initialize device from last device used for app
        this.device = new Device(_.find(this.devicesList, {model: app.lastDevice.model}), app.lastDevice.orientation);
        this.updateDeviceOrientation();

        // Initialize default app
        this.initDefaultApp(app);
    }

    initDefaultApp(){
        console.info("ViewController:initDefaultApp");

        var path = require('path').dirname(require.main.filename);
        this.loadApp(path + this.app.url);
    }

    updateDeviceOrientation(){
        console.info("ViewController:updateDevice");

        if(this.device.orientation == CONST.ORIENTATIONS.PORTRAIT) {
            this.device.setPortrait();
        }
        else{
            this.device.setLandscape();
        }

        // Calc available width/height
        document.querySelector("#device").style.transform = "scale(0.32)";
    }

    rotateDevice(){
        console.info("ViewController:rotateDevice");
        this.device.orientation = !this.device.isPortrait;
        this.updateDevice();
    }

    loadApp(url){
        console.info("SelectController:loadApp", url);

        let display = document.querySelector("#display");
        const loadFrame = () => {
            console.log("loadFrame");
            display.removeEventListener("dom-ready", loadFrame);
            display.loadURL(`file://${url}`, {
                userAgent : this.device.userAgent
            });
            display.getWebContents().enableDeviceEmulation({
                screenPosition : "mobile",
            });
        };
        display.addEventListener("dom-ready", loadFrame);
    }
}
ViewController.$inject = ["DevicesService", "StorageService", "$q", "app"];

module.exports = ViewController;