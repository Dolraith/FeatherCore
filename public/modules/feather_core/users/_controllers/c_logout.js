/* global global */
var Controller = require(global.classPaths.controller);
class CIndex extends Controller {
    async index(){    
        this.logout();
        this.setRedirect("/");
    }
};
module.exports=CIndex;