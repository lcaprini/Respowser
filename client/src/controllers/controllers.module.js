
const Select = require("./select/select.module");
const View = require("./view/view.module");

const angularModule = angular.module("controllers", [
        // Select.name,
        View.name
    ])
;

module.exports = angularModule;