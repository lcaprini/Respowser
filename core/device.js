
const ORIENTATIONS = require("core/constants").ORIENTATIONS;

class Device {

    /**
     * Initialize Device form list's infos and orientation
     * @param device
     * @param orientation
     */
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

    /**
     * Dynamically calculate device container scale factor, using #deviceContainer size in DOM
     * @returns {{transform: string}}
     */
    calcDynamicScale(){
        let containerStyle = window.getComputedStyle(document.getElementById('deviceContainer'), null);
        let scale = 1;

        let containerHeight = parseInt(containerStyle.height) - parseInt(containerStyle.paddingTop) - parseInt(containerStyle.paddingBottom);
        let containerWidth = parseInt(containerStyle.width) - parseInt(containerStyle.paddingLeft) - parseInt(containerStyle.paddingRight);
        let frameHeight = (this.orientation == ORIENTATIONS.PORTRAIT)? this.frame.height : this.frame.width;
        let frameWidth = (this.orientation == ORIENTATIONS.PORTRAIT)? this.frame.width : this.frame.height;

        // If container is tall enought to contains scaled frame I use width ratio
        if (((frameHeight * containerWidth) / frameWidth) < containerHeight) {
            scale = containerWidth / frameWidth;
        }
        // I use height ratio otherwise
        else {
            scale = containerHeight / frameHeight;
        }

        if(scale > 1){
            scale = 1.0;
        }

        return {transform : `scale(${scale})`};
    }

    /**
     * Set frame and display in portrait mode
     */
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

    /**
     * Set frame and display in landscape mode
     */
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

    /**
     * Load device frame and display consider device's orientation
     */
    load(){
        if(this.orientation == ORIENTATIONS.PORTRAIT) {
            this.setPortrait();
        }
        else{
            this.setLandscape();
        }
    }

    /**
     * Rotate device
     */
    rotate(){
        if(this.orientation == ORIENTATIONS.PORTRAIT){
            this.orientation = ORIENTATIONS.LANDSCAPE;
            this.setLandscape();
        }
        else {
            this.orientation = ORIENTATIONS.PORTRAIT;
            this.setPortrait();
        }
    }
}

module.exports = Device;