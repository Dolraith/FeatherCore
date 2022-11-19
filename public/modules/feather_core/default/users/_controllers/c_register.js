/* global global */
var Controller = require(global.classPaths.controller);
var Data_User = require(global.classPaths.data.user);
const bcrypt = require('bcrypt');

class CIndex extends Controller {
    async index(){
        var bob = await(Data_User.id(2))
        //console.log(bob)
        this.setView('modules/feather_core/default/users/_views/v_register');
    }
    async register(){
        var email = this._request.body.email;
        var password = this._request.body.password;
        if(!email){
            this.setView({success:false,message:"Valid email needed."});
        }
        if(!password){
            this.setView({success:false,message:"Valid password needed."});
        }

        var existant = await(Data_User.query("email=\"" + email + "\""));
        console.log(existant);
        if(existant === null){
            /** @type {Data_User} */
            var user = Data_User.make();
            user.set("email",email);
            user.set("password",bcrypt.hashSync(password,10));
            var result = await user.save();
            this.setView({success:true,_id:user.get("_id")});
            return;
        }else{
            this.setView({success:false, message:"Duplicate User Email"})
        }      
    }
};
module.exports=CIndex