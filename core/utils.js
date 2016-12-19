
const path = require("path");
const STORAGE = require("core/constants").STORAGE;

class Utils {

    static getConfigUrl(url){
        let splits = url.split(path.sep);
        splits[splits.length - 1] = STORAGE.APP_CONFIG;
        return splits.join(path.sep);
    }
}

module.exports = Utils;