/* global global */
/** @type {Data_User} */
Data_User = require(global.classPaths.data.core.user);
Data_Factory = require(global.classPaths.data_factory);
Data_Permission = require(global.classPaths.data.core.permission);

var Controller = require(global.classPaths.controller);
class CManage extends Controller {
    async index(){    
        //TODO: permissions
        this.setView('modules/feather_core/users/_views/v_manage');
        
        var factory = new Data_Factory(Data_User);
        var users = await factory.many_query(null,true);
        this.setViewData("users",users);
        
        var curPermissions = {};
        var rawCurPermissions = await (new Data_Factory(Data_Permission).many_query(null,true));
        
        for(var user of users){
            var curPermissionSet = {};
            for(var permission of global._permissions.getAllPermissions()){
                curPermissionSet[permission.name] = {
                    user_id:user._id,
                    permission_name: permission.name,
                    active:0
                };
            }
            curPermissions[user._id] = curPermissionSet;
        }       
        
        for(var item of rawCurPermissions){
            //only here to gracefully handle deleted users
            if(curPermissions[item.user_id] === undefined){
                curPermissions[item.user_id] = [];
            }
            curPermissions[item.user_id][item.permission_name] = item;
        }
        this.setViewData("curPermissions", curPermissions);
    }
    async save_permission(){
        //TODO: Permissions
        var factory = new Data_Factory(Data_Permission);
        var user_id = this._request.body.user_id;
        var permission_name = this._request.body.permission_name;
        var active = this._request.body.active;
        
        var existant = await factory.query("permission_name='" + permission_name + "' AND user_id=" + user_id);
        if(existant === null){
            var newPermission = factory.make();
            newPermission.set("user_id",user_id);
            newPermission.set("permission_name",permission_name);
            newPermission.set("active",active);
            var res = await newPermission.save();
            this.setView({message:"Created!", success:true, result:res});
        }else{
            existant.set("active",active);
            var res = await existant.save();
            this.setView({message:"Created!", success:true, result:res});
        }
    }
    async setActive(){
        //TODO: Permissions
        var factory = new Data_Factory(Data_User);
        var id = this._request.body.user_id;
        var active = this._request.body.active;
        var user = await factory.id(id);
        user.set("active",active);
        var result = await user.save();
        this.setView({message:"Saved!", success:true, result:result});
    }
};
module.exports=CManage;