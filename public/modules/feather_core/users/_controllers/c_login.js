/* global global */
Controller = require(global.classPaths.controller);
Data_User = require(global.classPaths.data.core.user);
Data_Factory = require(global.classPaths.data_factory);
const bcrypt = require('bcrypt');

class CIndex extends Controller {
    async index(){
        this.setView('modules/feather_core/users/_views/v_login');
    }
    async attempt(){
        var email = this._request.body.email;
        var password = this._request.body.password;
        
        const factory = new Data_Factory(Data_User);        
        var user = await factory.query('email="' + email + '"');
        if(user === null){
            this.setView({messagge:"No login for you!", success:false});
        }
        else if(bcrypt.compareSync(password,user.get("password"))){
            if(user.get("active") === 1){
                this.setView({message:'Logged in!', success:true, _id:user._id});
                global._permissions.clearPermissions();
                this.login(user.data["_id"]);
            }else{
                this.setView({message:"Your user is not active, sorry.", success:false});
            }
        }else{
            this.setView({message:"No login for you!", success:false});
        }
    }
};
module.exports=CIndex;