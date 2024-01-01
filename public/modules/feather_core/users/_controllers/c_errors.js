/* global global */
const Controller = require(global.classPaths.controller);
class CIndex extends Controller {
    async index(){
        this.setView('modules/feather_core/users/_views/v_errDefault');
    }
    async err403(){
        this.setView('modules/feather_core/users/_views/v_err403');
    }
};
module.exports=CIndex;