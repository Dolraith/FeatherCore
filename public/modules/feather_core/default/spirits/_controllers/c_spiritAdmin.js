/* global global */
var Controller = require(global.classPaths.controller);
var Data_User = require(global.classPaths.data.user)

class CIndex extends Controller {
    async index(){
        var bob = await(Data_User.id(2))
        //console.log(bob)
        var id = this.checkLogin();
        if(id === false){
            this.setRedirect("/err/err403");
            return;
        }
        this.setView('modules/feather_core/default/spirits/_views/v_spiritAdmin');
        user = await Data_User.id(id);
        this.setViewData("user",user.getData());
    }
};
module.exports=CIndex

