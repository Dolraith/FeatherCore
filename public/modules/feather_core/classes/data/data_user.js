/* global global */
Data_Class = require(global.classPaths.data_super);
class Data_User extends Data_Class{
    constructor(){
        super();
        this.table = "core_user";
        this.fields({
            email: "",
            password: "",
            active:0
        });
    }
}

module.exports = Data_User;