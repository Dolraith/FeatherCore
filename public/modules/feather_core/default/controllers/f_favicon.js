/* global global */
var Controller = require(global.classPaths.controller);
class favicon extends Controller {
    index(){
        global._response += "Child Ran!";
    }
};
module.exports = favicon;