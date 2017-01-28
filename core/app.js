
const path = require("path");
const STORAGE = require("core/constants").STORAGE;
const ORIENTATIONS = require("core/constants").ORIENTATIONS;
const DEVICES = require("core/constants").DEVICES;
const fs = require("fs");
const Utils = require("core/utils");

class App {

    constructor(data){
        // Name
        this.name = STORAGE.DEFAULT_APP;

        // Complete url
        this.url = path.dirname(require.main.filename) + "/www/index.html";

        this.devTools = true;

        // Device settings
        this.lastDevice = {
            model : "iPhone 6s",
            orientation : ORIENTATIONS.PORTRAIT
        };

        // Compatibility settings
        this.compatibility = {
            orientations : [
                ORIENTATIONS.PORTRAIT,
                ORIENTATIONS.LANDSCAPE
            ],
            types : [
                DEVICES.TYPES.SMARTPHONE,
                DEVICES.TYPES.TABLET
            ],
            oss : [
                DEVICES.OSS.IOS,
                DEVICES.OSS.ANDROID
            ]
        };

        if(data){
            this.createFromStorage(data);
        }
    }

    createFromStorage(app){
        this.name = app.name;
        this.url = app.url;
        this.config = Utils.getConfigUrl(app.url);
        this.devTools = app.devTools;
        this.lastDevice = app.lastDevice;
        this.compatibility = app.compatibility;
    }

    syncWithConfig(){
        if(this.config)
            fs.writeFileSync(this.config, JSON.stringify(this, null, 4));
    }

    updateDevice(device){
        this.lastDevice = {
            model : device.model,
            orientation : device.orientation
        };
        this.syncWithConfig();
    }
}

module.exports = App;