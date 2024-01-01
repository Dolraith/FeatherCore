/* global global */
var Controller = require(global.classPaths.controller);
class CProfile extends Controller {
    async index(){    
        this.setView('modules/feather_core/users/_views/v_profile');
    }
};
module.exports=CProfile;