
const ORIENTATIONS = require("core/constants").ORIENTATIONS;

class Device {

    constructor(device, orientation = ORIENTATIONS.PORTRAIT){
        this.model = device.model;
        this.userAgent = device.userAgent;
        this.type = device.type;
        this.os = device.os;
        this.thumb = device.thumb;
        this.frame = {
            image : device.frame.image,
            width : device.frame.width,
            height : device.frame.height,
            portraitMargin : {
                top: device.frame.portraitMargin.top,
                left : device.frame.portraitMargin.left
            },
            landscapeMargin : {
                top : device.frame.landscapeMargin.top,
                left : device.frame.landscapeMargin.left
            }
        };
        this.frameStyle = {
            width: "0px",
            height: "0px"
        };
        this.display = {
            width : device.display.width,
            height : device.display.height,
            ratio : device.display.ratio
        };
        this.displayStyle = {
            width : "0px",
            height : "0px",
            transform : "scale(1)",
            top : "0px",
            left : "0px"
        };
        this.orientation = orientation;
    }

    setPortrait(){
        this.frameStyle = {
            width : `${this.frame.width}px`,
            height : `${this.frame.height}px`
        };
        this.displayStyle = {
            width : `${this.display.width}px`,
            height : `${this.display.height}px`,
            transform : `scale(${this.display.ratio})`,
            top : `${this.frame.portraitMargin.top}px`,
            left : `${this.frame.portraitMargin.left}px`
        };
        this.orientation = ORIENTATIONS.PORTRAIT;
    }

    setLandscape(){
        this.frameStyle = {
            width : `${this.frame.width}px`,
            height : `${this.frame.height}px`
        };
        this.displayStyle = {
            width : `${this.display.height}px`,
            height : `${this.display.width}px`,
            transform : `scale(${this.display.ratio})`,
            top : `${this.frame.landscapeMargin.top}px`,
            left : `${this.frame.landscapeMargin.left}px`
        };
        this.orientation = ORIENTATIONS.LANDSCAPE;
    }
}

module.exports = Device;