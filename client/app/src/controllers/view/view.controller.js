
const App = require("../../_core/app");
const Device = require("../../_core/device");
const CONST = require("../../_core/constants");

class ViewController{

    constructor(DevicesService, StorageService, $q, device){
        console.info("ViewController:constructor");
        this._DevicesService = DevicesService;
        this._StorageService = StorageService;
        this.$q = $q;

        // Get the list of all available devices
        this.devicesList = this._DevicesService.getDevices();

        // Update device info from router resolve
        this.device = this.updateDevice(new Device(device));

        // Initialize default app
        this.initDefaultApp();
    }

    initDefaultApp(){
        console.info("ViewController:initDefaultApp");

        var path = require('path').dirname(require.main.filename);
        this.loadApp(path+"/www/index.html");
    }

    updateDevice(device){
        console.info("ViewController:updateDevice");

        if(device.isPortrait) {
            device.setPortrait();
            // Calc available height
            document.querySelector("#device").style.transform = "scale(0.32)";
        }
        else{
            device.setLandscape();
            // Calc available height
            document.querySelector("#device").style.transform = "scale(0.32)";
        }

        return device;
    }

    loadApp(sourceFile){
        console.info("SelectController:loadApp - prepare to load url", sourceFile);

        let app = new App();
        app.createFromUrl(sourceFile);

        // Set app as last recent in storage
        this._StorageService.set(CONST.STORAGE.LAST_APP, app);

        let display = document.querySelector("#display");
        const loadFrame = () => {
            console.log("loadFrame");
            display.removeEventListener("dom-ready", loadFrame);
            display.loadURL(`file://${app.full}`, {
                userAgent : this.device.userAgent
            });
            display.getWebContents().enableDeviceEmulation({
                screenPosition : this.device.type,
            });
        };
        display.addEventListener("dom-ready", loadFrame);
    }
}
ViewController.$inject = ["DevicesService", "StorageService", "$q", "device"];

module.exports = ViewController;