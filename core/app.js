
const path = require("path");
const STORAGE = require("core/constants").STORAGE;
const ORIENTATIONS = require("core/constants").ORIENTATIONS;
const DEVICES = require("core/constants").DEVICES;

class App {

    constructor(){
        // Name
        this.name = STORAGE.DEFAULT_APP;

        // Complete url
        this.url = "/www/index.html";

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
                DEVICES.OSS.ANDROID,
                // DEVICES.OSS.WINDOWS
            ]
        }
    }

    createFromStorage(app){
        this.name = app.name;
        this.url = app.url;
        this.lastDevice = app.lastDevice;
        this.compatibility = app.compatibility;

        return this;
    }

    createFromUrl(url){
        this.name = url.split(path.sep).splice((-2))[0];
        this.url = url;

        return this;
    }

    updateDevice(device){
        this.lastDevice = {
            model : device.model,
            orientation : device.orientation
        }
    }
}

module.exports = App;