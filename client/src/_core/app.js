
const path = require("path");

class App {

    constructor(){
        this.full = null;       // Complete url
        this.path = null;       // Directory path
        this.folder = null;     // Parent folder
        this.index = null;      // Main html file
        this.name = "test";       // Name
    }

    createFromUrl(url){
        this.full = url;
        this.path = path.dirname(url);
        this.folder = url.split(path.sep).splice((-2))[0];
        this.index = path.basename(url);
        this.name = url.split(path.sep).splice((-2))[0];

    }

    createFromData(data) {
        this.full = this.full || null;
        this.path = data.path || null;
        this.folder = data.folder || null;
        this.index = data.index || null;
        this.name = data.name || null;
    }
}

module.exports = App;