
const path = require("path");
const ORIENTATIONS = require("core/constants").ORIENTATIONS;
const DEVICES = require("core/constants").DEVICES;

class App {

    constructor(){
        // Name
        this.name = "My app";

        // Complete url
        this.url         = "/www/index.html";

        // Device settings
        this.lastDevice = {
            model : "iPhone 6s",
            type : DEVICES.TYPES.SMARTPHONE,
            os : DEVICES.OSS.IOS,
            orientation : ORIENTATIONS.PORTRAIT
        };

        // Compatibility settings
        this.compatibility = {
            orientation : [
                ORIENTATIONS.PORTRAIT,
                ORIENTATIONS.LANDSCAPE
            ],
            type : [
                DEVICES.TYPES.SMARTPHONE,
                DEVICES.TYPES.TABLET
            ],
            os : [
                DEVICES.OSS.IOS,
                DEVICES.OSS.ANDROID,
                DEVICES.OSS.WINDOWS
            ]
        }
    }

    createFromUrl(url){
        this.full = url;
        this.path = path.dirname(url);
        this.folder = url.split(path.sep).splice((-2))[0];
        this.index = path.basename(url);
        this.name = url.split(path.sep).splice((-2))[0];

    }

    createFromData(data) {
        this.full = this.full || null;
        this.path = data.path || null;
        this.folder = data.folder || null;
        this.index = data.index || null;
        this.name = data.name || null;
    }
}

module.exports = App;