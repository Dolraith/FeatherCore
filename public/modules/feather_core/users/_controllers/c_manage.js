/* global global */
/** @type {Data_User} */
Data_User = require(global.classPaths.data.user);
Data_Factory = require(global.classPaths.data_factory);

var Controller = require(global.classPaths.controller);
class CManage extends Controller {
    async index(){    
        this.setView('modules/feather_core/users/_views/v_manage');
        
        var factory = new Data_Factory(Data_User);
        var users = await factory.many_query("",true);
        console.log(users);
        this.setViewData("users",users);
    }
    
    async setActive(){
        var factory = new Data_Factory(Data_User);
        var id = this._request.body.user_id;
        var active = this._request.body.active;
        var user = await factory.id(id);
        user.set("active",active);
        var result = await user.save();
        console.log(result);
        this.setView({message:"Saved!", success:true, result:result});
    }
};
module.exports=CManage;