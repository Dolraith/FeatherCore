/* global global */
var Controller = require(global.classPaths.controller);

class CIndex extends Controller {
    async index(){
        this.setView('modules/feather_core/_views/v_index');
        this.setViewData("user",await this.checkLogin());
        
        
    }
};
module.exports=CIndex;