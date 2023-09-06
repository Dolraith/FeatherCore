/* global global */
const Controller = require(global.classPaths.controller);
/** @type {Data_User} */
const Data_User = require(global.classPaths.data.user)
const bcrypt = require('bcrypt');

class CIndex extends Controller {
    async index(){
        this.setView('modules/feather_core/default/users/_views/v_login');
    }
    async attempt(){
        var email = this._request.body.email;
        var password = this._request.body.password;
        var user = await Data_User.query("email=\""+email+"\"");
        if(user == null){
            this.setView({messagge:"No login for you!", success:false});
        }
        else if(bcrypt.compareSync(password,user.get("password"))){
            if(user.get("active") == true){
                this.setView({message:'Logged in!', success:true, _id:user._id});
                this.login(user.data["_id"]);
            }else{
                this.setView({message:"Your user is not active, sorry.", success:false});
            }
        }else{
            this.setView({message:"No login for you!", success:false});
        }
    }
};
module.exports=CIndex