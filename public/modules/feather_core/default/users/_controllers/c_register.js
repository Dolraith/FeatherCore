/* global global */
var Controller = require(global.classPaths.controller);
var Data_User = require(global.classPaths.data.user)

class CIndex extends Controller {
    async index(){
        var bob = await(Data_User.id(2))
        //console.log(bob)
        this.setView('modules/feather_core/default/users/_views/v_register');
    }
};
module.exports=CIndex