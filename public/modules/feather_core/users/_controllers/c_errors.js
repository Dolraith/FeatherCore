/* global global */
const Controller = require(global.classPaths.controller);
/** @type {Data_User} */
const Data_User = require(global.classPaths.data.user);
const bcrypt = require('bcrypt');

class CIndex extends Controller {
    async index(){
        this.setView('modules/feather_core/users/_views/v_errDefault');
    }
    async err403(){
        this.setView('modules/feather_core/users/_views/v_err403');
    }
};
module.exports=CIndex;