
const App = require("../../_core/app");
const storage = require("electron-json-storage");
const {dialog} = require('electron').remote;
const CONST = require("../../_core/constants");

class SelectController{

    constructor($location, $timeout){
        this.$location = $location;
        this.$timeout = $timeout;
        this.sourceFile = null;

        console.info("SelectController initialized");
    }

    openDialog(){
        console.info("SelectController:openDialog");
        let _that = this;

        dialog.showOpenDialog({
            properties: ['openFile']
        },
        (file) => {
            _that.$timeout(() => {
                if (file && file.length > 0)
                    _that.sourceFile = file[0];
            }, 10);
        });
    }

    loadApp(){
        console.info("SelectController:loadApp - prepare to load url", this.sourceFile);

        let app = new App();
        app.createFromUrl(this.sourceFile);
        
        // Set last recent app in storage
        storage.set(CONST.STORAGE.LAST_APP, app, (err)=>{
            if(err) throw err;
        });

        this.$location.url("/view");
    }
}
SelectController.$inject = ["$location", "$timeout"];

module.exports = SelectController;