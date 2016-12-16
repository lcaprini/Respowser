
const path = require("path");
const STORAGE = require("core/constants").STORAGE;
const ORIENTATIONS = require("core/constants").ORIENTATIONS;
const DEVICES = require("core/constants").DEVICES;
const _ = require("lodash");

class App {

    constructor(data){
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
        };

        if(data){
            // If data is String assume is the URL
            if(_.isString(data)){
                this.createFromUrl(data);
            }
            // If data is an object assume is a stored app
            else if(_.isObject(data)){
                this.createFromStorage(data);
            }
        }
    }

    createFromStorage(app){
        this.name = app.name;
        this.url = app.url;
        this.lastDevice = app.lastDevice;
        this.compatibility = app.compatibility;
    }

    createFromUrl(url){
        this.name = url.split(path.sep).splice((-2))[0];
        this.url = url;
    }

    updateDevice(device){
        this.lastDevice = {
            model : device.model,
            orientation : device.orientation
        }
    }
}

module.exports = App;