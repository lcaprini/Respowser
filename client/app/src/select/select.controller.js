
class SelectController{

    constructor($rootScope, $location, $timeout){
        console.log("Inizializzazione SelectController");
        this.sourceFile = null;
        this.$rootScope = $rootScope;
        this.$location = $location;
        this.$timeout = $timeout;
    }

    openDialog(){
        const {dialog} = require('electron').remote;
        let _that = this;

        dialog.showOpenDialog({
            properties: ['openFile']
        },
        function (file) {
            _that.$timeout(() => {
                if (file && file.length > 0)
                    _that.sourceFile = file[0];
            }, 10);
        });
    }

    loadApp(){
        console.log("Carica la url", this.sourceFile);

        this.$rootScope.sourceFile = this.sourceFile;
        this.$location.url("/view");
    }
}
SelectController.$inject = ["$rootScope", "$location", "$timeout"];

module.exports = SelectController;