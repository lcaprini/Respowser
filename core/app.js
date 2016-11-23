
const path = require("path");
const ORIENTATIONS = require("core/constants").ORIENTATIONS;
const DEVICES = require("core/constants").DEVICES;

class App {

    constructor(){
        // Name
        this.name = "My app";

        // Main index file
        this.index       = "index.html";
        // Parent folder
        this.folder      = "www";
        // Directory path
        this.path        = "./www";
        // Complete url
        this.url         = "./www/index.html";

        // Orientations settings
        this.orientation = ORIENTATIONS.PORTRAIT;
        this.availableOrientations = [
            ORIENTATIONS.PORTRAIT,
            ORIENTATIONS.LANDSCAPE
        ];

        // Device settings
        this.model = "iPhone 6s";
        this.type = DEVICES.TYPES.SMARTPHONE;
        this.availableTypes = [
            DEVICES.TYPES.SMARTPHONE,
            DEVICES.TYPES.TABLET
        ];
        this.os = DEVICES.OSS.IOS;
        this.availableOSs = [
            DEVICES.OSS.IOS,
            DEVICES.OSS.ANDROID,
            DEVICES.OSS.WINDOWS
        ];
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