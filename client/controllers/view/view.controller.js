
const Device = require("core/device");
const CONST = require("core/constants");
const config = require("core/config");
const _ = require("lodash");
const {dialog} = require('electron').remote;

class ViewController{

    /**
     * Initialize ViewController
     * @param DevicesService
     * @param StorageService
     * @param $q
     * @param app
     * @param $timeout
     */
    constructor(DevicesService, StorageService, $q, app, $timeout){
        this.DevicesService = DevicesService;
        this.StorageService = StorageService;
        this.app = app;
        console.log(app);
        this.$q = $q;
        this.$timeout = $timeout;

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
            that.$timeout(function(){
            }, 1);
        })
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
        var path = require('path').dirname(require.main.filename);
        this.loadApp(path + this.app.url);
    }

    /**
     * Load app from its url, loading frame and set userAgent of selected device
     * @param url
     */
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

    openDialog(){
        let _that = this;

        dialog.showOpenDialog({
            properties: ['openFile']
        },
        (file) => {
            _that.$timeout(() => {
                if (file && file.length > 0)
                    _that.sourceFile = file[0];
            }, 10);
        });
    }

    /**
     * Rotate device and update info in storage
     */
    rotateDevice(){
        this.device.rotate();
        this.app.updateDevice(this.device);
        this.StorageService.set(this.app.name, this.app);
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
ViewController.$inject = ["DevicesService", "StorageService", "$q", "app", "$timeout"];

module.exports = ViewController;