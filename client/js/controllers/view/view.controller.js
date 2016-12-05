
const Device = require("core/device");
const CONST = require("core/constants");
const config = require("core/config");
const _ = require("lodash");

class ViewController{

    constructor(DevicesService, StorageService, $q, app, $timeout){
        console.info("ViewController:constructor");
        this.DevicesService = DevicesService;
        this.StorageService = StorageService;
        this.app = app;
        this.$q = $q;
        this.$timeout = $timeout;

        this.ORIENTATIONS = CONST.ORIENTATIONS;
        this.canOpenApp = config.canOpenOtherApp;

        // Get the list of all available devices
        this.devicesList = this.DevicesService.getDevices();

        // Initialize default app
        this.initDefaultApp();

        let that = this;
        window.addEventListener('resize', function(e){
            e.preventDefault();
            that.$timeout(function(){
            }, 1);
        })
    }

    initDefaultApp(){
        console.info("ViewController:initDefaultApp");

        // Initialize device from last device used for app
        this.device = new Device(_.find(this.devicesList, {model: this.app.lastDevice.model}), this.app.lastDevice.orientation);
        this.updateDeviceOrientation();
        this.canRotateDevice = this.app.compatibility.orientations.length > 1;

        var path = require('path').dirname(require.main.filename);
        this.loadApp(path + this.app.url);
    }

    dynamicScale(){
        let containerStyle = window.getComputedStyle(document.getElementById('deviceContainer'), null);
        let scale = 1;

        if(this.device.orientation == CONST.ORIENTATIONS.PORTRAIT) {
            let containerHeight = parseInt(containerStyle.height) - parseInt(containerStyle.paddingTop) - parseInt(containerStyle.paddingBottom);
            scale = containerHeight / this.device.frame.height;
        }
        else{
            let containerWidth = parseInt(containerStyle.width) - parseInt(containerStyle.paddingLeft) - parseInt(containerStyle.paddingRight);
            scale = containerWidth / this.device.frame.height;
        }

        if(scale > 1){
            scale = 1.0;
        }

        return {transform : `scale(${scale})`};
    }

    updateDeviceOrientation(){
        console.info("ViewController:updateDeviceOrientation");

        if(this.device.orientation == CONST.ORIENTATIONS.PORTRAIT) {
            this.device.setPortrait();
        }
        else{
            this.device.setLandscape();
        }
    }

    rotateDevice(){
        console.info("ViewController:rotateDevice");

        this.device.orientation = (this.device.orientation == CONST.ORIENTATIONS.PORTRAIT)? CONST.ORIENTATIONS.LANDSCAPE : CONST.ORIENTATIONS.PORTRAIT;
        this.app.lastDevice.orientation = this.device.orientation;
        this.updateDeviceOrientation();
    }

    setDevice(device){
        console.info("ViewController:setDevice", device);

        this.device = new Device(device, this.app.lastDevice.orientation);
        this.updateDeviceOrientation();
    }

    screenshot() {
        console.info("ViewController:screenshot");

        // Get display image
        // let display = document.querySelector("#display");
        // const transform = display.style.transform;
        // display.style.transform = "scale(1)";
        // display.getWebContents().capturePage({x:0, y:0, width:700, height:1334}, function(image){
        //     console.log(image.toDataURL());
        //     display.style.transform = transform;
        // });
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
ViewController.$inject = ["DevicesService", "StorageService", "$q", "app", "$timeout"];

module.exports = ViewController;