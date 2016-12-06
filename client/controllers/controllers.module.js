
const View = require("./view/view.module");

const angularModule = angular.module("controllers", [
    View.name
]);

module.exports = angularModule;