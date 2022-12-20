/* global global */
var Controller = require(global.classPaths.controller);
var Data_User = require(global.classPaths.data.user)

class CIndex extends Controller {
    async index(){
        this.setView({type:"logout","success":true});
    }
};
module.exports=CIndex