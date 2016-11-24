
class DevicesService {

    constructor(){
        this.devices = require("../../devices/devices.list").devices;
    }

    getDevices(){
        return this.devices;
    }

    static factory(){
        return new DevicesService();
    }
}
DevicesService.factory.$inject = [];
module.exports = DevicesService;