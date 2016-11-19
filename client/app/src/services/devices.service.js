
class DevicesService {

    constructor($http){
        this.$http = $http;
    }

    getList(){
        return this.list;
    }

    getDevices(){
        var _that = this;
        this.$http.get('datas/devices.json').then(
            (response)=>{
                _that.list = response.data.list;
                console.warn("devices success", response);
            },
            (err)=>{
                console.error("devices error", err);
            }
        )
    }
    static factory($http){
        return new DevicesService($http);
    }
}
DevicesService.factory.$inject = ['$http'];
module.exports = DevicesService;