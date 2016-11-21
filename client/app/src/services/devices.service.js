
const CONST = require("../_core/constants");

class DevicesService {

    constructor(StorageService){
        this.storage = StorageService;

        this.devices = require("../../devices/devices");
    }

    getDevices(){
        return this.devices;
    }

    getLastDevice(){
        return this.storage.get(CONST.STORAGE.LAST_DEVICE).then(
            (device) => {
                // If no device was setted
                // set first phone in list manually
                if(!device.name) {
                    device = this.devices.phones[0];
                    device.portrait = true;
                    this.storage.set(CONST.STORAGE.LAST_DEVICE, device);
                }

                return device;
            },
            (err) => {
                throw err;
            }
        );
    }

    calcPortraitDimensions(device){
        let deviceStyle = {
            "background-image" : `url(devices/frames/${device.frame.image})`,
            "background-size" : `${device.width}px ${device.height}px`,
            "width" : `${device.width}px`,
            "height" : `${device.height}px`,
            "padding" : `${device.frame.top}px ${device.frame.right}px ${device.frame.bottom}px ${device.frame.left}px`
        };
        let displayStyle = {
            "width" : `${device.display.width}px`,
            "height" : `${device.display.height}px`,
            "transform" : `scale(${device.display.ratio})`
        };
        device.deviceStyle = deviceStyle;
        device.displayStyle = displayStyle;
        return device;
    }

    calcLandscapeDimensions(device){
        let deviceStyle = {
            "background-image" : `url(devices/${device.frame.image})`,
            "background-size" : `${device.width}px ${device.height}px`,
            "width" : `${device.height}px`,
            "height" : `${device.width}px`,
            "padding" : `${device.frame.left}px ${device.frame.top}px ${device.frame.right}px ${device.frame.bottom}px`
        };
        let displayStyle = {
            "width" : `${device.display.height}px`,
            "height" : `${device.display.width}px`,
            "transform" : `scale(${device.display.ratio})`
        };
        device.deviceStyle = deviceStyle;
        device.displayStyle = displayStyle;
        return device;
    }

    static factory(StorageService){
        return new DevicesService(StorageService);
    }
}
DevicesService.factory.$inject = ["StorageService"];
module.exports = DevicesService;