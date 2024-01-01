/* global global */
Controller = require(global.classPaths.controller);
Data_User = require(global.classPaths.data.user);
Data_Factory = require(global.classPaths.data_factory);

const bcrypt = require('bcrypt');

class CIndex extends Controller {
    async index(){
        this.setView('modules/feather_core/users/_views/v_register');
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

        const factory = new Data_Factory(Data_User);        
        var existant = await factory.query('email="' + email + '"');
        if(existant === null){
            /** @type {Data_User} */
            var user = new Data_User();
            user.set("email",email);
            user.set("password",bcrypt.hashSync(password,10));
            var result = await user.save();
            this.setView({success:true,_id:user.get("_id")});
            return;
        }else{
            this.setView({success:false, message:"Duplicate User Email"});
        }      
    }
};
module.exports=CIndex;