/* global global */
Data_Class = require(global.classPaths.data_super);
class Data_User extends Data_Class{
    constructor(){
        super();
        this.table = "core_permission";
        this.fields({
            user_id:0,
            permission_name:"",
            active:1
        });
    }
}

module.exports = Data_User;