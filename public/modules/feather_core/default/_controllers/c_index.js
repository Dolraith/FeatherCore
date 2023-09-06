/* global global */
var Controller = require(global.classPaths.controller);
var Data_User = require(global.classPaths.data.user)

class CIndex extends Controller {
    async index(){
        var bob = await(Data_User.id(2))
        this.setView('modules/feather_core/default/_views/v_index');
    }
};
module.exports=CIndex