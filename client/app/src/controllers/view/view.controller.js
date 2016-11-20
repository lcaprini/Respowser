
const App = require("../../_core/app");
const storage = require("electron-json-storage");
const CONST = require("../../_core/constants");

class ViewController{

    constructor(devices, storage, $q){
        console.info("ViewController:constructor");
        this.devices = devices;
        this.storage = storage;
        this.$q = $q;
        this.init();
    }

    init(){
        let _that = this;

        this.devicesList = this.devices.getDevices();
        this.$q.all([
            this.devices.getLastDevice(),
            this.storage.get(CONST.STORAGE.LAST_APP)
        ])
        .then(
            (datas) => {
                this.device = datas[0];
                this.app = datas[1];

                document.querySelector("#device").style.transform = "scale(0.32)";

                let webview = document.querySelector("#webview");

                const loadApp = () => {
                    console.log("loadApp");
                    webview.removeEventListener('dom-ready', loadApp);
                    webview.loadURL("file://"+this.app.full, {
                        userAgent : this.device.userAgent
                    });
                    webview.getWebContents().enableDeviceEmulation({
                        screenPosition : "mobile",
                    });
                };
                webview.addEventListener('dom-ready', loadApp);
            }
        );
    }

    calculateDeviceSize(device){

        let container = document.querySelector("#deviceContainer");




        return device;
    }
}
ViewController.$inject = ["DevicesService", "StorageService", "$q"];

module.exports = ViewController;