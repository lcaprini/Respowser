
const Promise = require('bluebird');
const storage = Promise.promisifyAll(require('electron-json-storage'));

class StorageService {

    constructor(){}

    /**
     * Get the element named `key` from storage
     * @param key
     * @returns {*|Promise.<TResult>}
     */
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

    /**
     * Set an element named `key` with `value` content in storage
     * @param {String} key -
     * @param {Object} value -
     * @returns {*|Promise.<TResult>}
     */
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

    /**
     * Push `value` in the element named `key` in storage
     * @param key
     * @param value
     * @returns {*}
     */
    push(key, value){
        let _that = this;
        return _that.get(key).then(
            (data) => {
                if(!data[key]){
                    data[key] = [];
                }
                data[key].push(value);
                return _that.set(key, data);
            },
            (err) => {
                throw err;
            }
        );
    }

    /**
     * Push `value` in head of the element named `key` in storage
     * @param key
     * @param value
     * @returns {*}
     */
    unshift(key, value){
        let _that = this;
        return _that.get(key).then(
            (data) => {
                if(!data[key]){
                    data[key] = [];
                }
                data[key].unshift(value);
                return _that.set(key, data);
            },
            (err) => {
                throw err;
            }
        );
    }

    /**
     * Get first item in the element named `key` in storage
     * @param key
     * @returns {*}
     */
    pop(key){
        let _that = this;
        return _that.get(key).then(
            (data) => {
                if(!data[key]){
                    return null;
                }
                let item = data[key].pop(value);
                return _that.set(key, data).then(
                    (data) => {
                        return item;
                    },
                    (err) => {
                        throw err;
                    });
            },
            (err) => {
                throw err;
            }
        );
    }

    /**
     * Get last item in the element named `key` in storage
     * @param key
     * @returns {*}
     */
    shift(key){
        let _that = this;
        return _that.get(key).then(
            (data) => {
                if(!data[key]){
                    return null;
                }
                let item = data[key].shift(value);
                return _that.set(key, data).then(
                    (data) => {
                        return item;
                    },
                    (err) => {
                        throw err;
                    });
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