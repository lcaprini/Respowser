
class Device {

    constructor(device){
        this.model = device.model;
        this.userAgent = device.userAgent;
        this.type = device.type;
        this.thumb = device.thumb;
        this.frame = {
            image : device.frame.image,
            width : device.frame.width,
            height : device.frame.height,
            top : device.frame.top,
            right : device.frame.right,
            bottom : device.frame.bottom,
            left : device.frame.left,
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
        this.isPortrait = device.isPortrait || true;
        this.isLandscape = !this.isPortrait;
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
            top : `${this.frame.top}px`,
            left : `${this.frame.left}px`
        };
        this.isPortrait = true;
        this.isLandscape = !this.isPortrait;
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
            top : `${this.frame.left}px`,
            left : `${this.frame.bottom}px`
        };
        this.isPortrait = false;
        this.isLandscape = !this.isPortrait;
    }
}

module.exports = Device;