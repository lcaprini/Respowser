
class MainController{
    constructor($rootScope, devices){
        console.log("Inizializzazione MainController");

        this.$rootScope = $rootScope;
        this.devices = devices;
        this.selectedDevice = {
            model : "iPhone 6",
            width: 375,
            height: 667,
            userAgent : "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
        };

        console.log(devices.getList());

        let webview = document.querySelector("#webview");
        webview.addEventListener("dom-ready", () => {
            webview.getWebContents().openDevTools({mode:"right"});
        });
    }

    getSourceFile(){
        console.log("getSourceFile", this.$rootScope.sourceFile);
        return this.$rootScope.sourceFile;
    }

    getDevice(){
        return this.selectedDevice;
    }

    setDevice(deviceID){
        if(deviceID == 1){
            this.selectedDevice = {
                model : "Nexus 5X",
                width: 412,
                height: 732,
                userAgent : "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36"
            };
        }
        else {
            this.selectedDevice = {
                model : "iPhone 6",
                width: 375,
                height: 667,
                userAgent : "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
            }
        }
        let webview = document.querySelector("#webview");
        console.log("webview", webview);

        webview.setUserAgent(this.selectedDevice.userAgent);
        webview.reload();
    }
}
MainController.$inject = ["$rootScope", "DevicesService"];

module.exports = MainController;