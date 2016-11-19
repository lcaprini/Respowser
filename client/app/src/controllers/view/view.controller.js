
const App = require("../../_core/app");
const storage = require("electron-json-storage");
const CONST = require("../../_core/constants");

class ViewController{

    constructor(devices, storage, $q){
        console.info("ViewController:constructor");
        this.devices = devices;
        this.storage = storage;
        this.$q = $q;





        // let webview = document.querySelector("#webview");
        // webview.addEventListener("dom-ready", () => {
        //     webview.getWebContents().openDevTools();
        // });

        this.init();
    }

    init(){
        this.devicesList = this.devices.getDevices();
        this.$q.all([
            this.devices.getLastDevice(),
            this.storage.get(CONST.STORAGE.LAST_APP)
        ])
        .then(
            (datas) => {
                this.device = datas[0];
                this.app = datas[1];

                console.log("device", this.device);
                console.log("app", this.app);
            }
        );
    }
}
ViewController.$inject = ["DevicesService", "StorageService", "$q"];

module.exports = ViewController;