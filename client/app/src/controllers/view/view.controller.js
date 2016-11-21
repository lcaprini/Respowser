
const App = require("../../_core/app");
const CONST = require("../../_core/constants");

class ViewController{

    constructor(DevicesService, StorageService, $q, device){
        console.info("ViewController:constructor");
        this.DevicesService = DevicesService;
        this.StorageService = StorageService;
        this.$q = $q;

        this.device = device;

        this.init();
    }

    init(){
        console.info("ViewController:init");

        let _that = this;

        // Get the list of all available devices
        this.devicesList = this.DevicesService.getDevices();

        // Set last device orientation
        this.portrait = this.device.portrait;
        // Update/Initialize device
        this.updateDevice(this.device);

        // Initialize default app
        var path = require('path').dirname(require.main.filename);
        this.loadApp(path+"/www/index.html");
    }

    updateDevice(device){
        console.info("ViewController:updateDevice");

        if(this.portrait) {
            this.device = this.DevicesService.calcPortraitDimensions(device);
            // Calc available height
            document.querySelector("#device").style.transform = "scale(0.32)";
        }
        else{

        }
    }

    loadApp(sourceFile){
        console.info("SelectController:loadApp - prepare to load url", sourceFile);

        let app = new App();
        app.createFromUrl(sourceFile);

        // Set app as last recent in storage
        this.StorageService.set(CONST.STORAGE.LAST_APP, app);

        let webview = document.querySelector("#webview");
        const loadFrame = () => {
            console.log("loadFrame");
            webview.removeEventListener("dom-ready", loadFrame);
            webview.loadURL(`file://${app.full}`, {
                userAgent : this.device.userAgent
            });
            webview.getWebContents().enableDeviceEmulation({
                screenPosition : "mobile",
            });
        };
        webview.addEventListener("dom-ready", loadFrame);
    }
}
ViewController.$inject = ["DevicesService", "StorageService", "$q", "device"];

module.exports = ViewController;