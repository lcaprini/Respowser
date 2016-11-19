
const Promise = require('bluebird');
const storage = Promise.promisifyAll(require('electron-json-storage'));

class StorageService {

    constructor(){}

    get(key){
        return storage.getAsync(key).then(
            (data) => {
                return data;
            },
            (err) => {
                throw err;
            }
        );
    }

    set(key, value){
        return storage.setAsync(key, value).then(
            () => {
                return ;
            },
            (err) => {
                throw err;
            }
        );
    }

    static factory(){
        return new StorageService();
    }
}
StorageService.factory.$inject = [];
module.exports = StorageService;