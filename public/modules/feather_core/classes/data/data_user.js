Data_Class = require(global.classPaths.data_super)
async function id(id = 0, callback){
    user = new Data_User().loadOne("_id = " + id);
    return user;
}
async function query(query){
    user = new Data_User().loadOne(query);
    return user;
}
function make(){
    return new Data_User();
}
function many_ids([]){}
function many_query(query="select * from this.table"){}
class Data_User extends Data_Class{
    constructor(){
        super()
        this.table = "users";
        this.fields({
            email: "",
            password: "",
            active:false
        })
    }
}

module.exports = {id, query, make, many_ids, many_query}