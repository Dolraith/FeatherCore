/* global global */
var Controller = require(global.classPaths.controller);
class CIndex extends Controller {
    async index(){    
        this.logout();
        global._permissions.clearPermissions();
        this.setRedirect("/");
    }
};
module.exports=CIndex;