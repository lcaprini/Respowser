
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
                    this.storage.set(CONST.STORAGE.LAST_DEVICE, device);
                }

                return device;
            },
            (err) => {
                throw err;
            }
        );
    }

    static factory(StorageService){
        return new DevicesService(StorageService);
    }
}
DevicesService.factory.$inject = ["StorageService"];
module.exports = DevicesService;