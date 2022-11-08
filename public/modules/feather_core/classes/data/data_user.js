Data_Class = require(global.classPaths.data_super)
async function id(id = 0, callback){
    user = new Data_User();
    await user.loadOne("_id = " + id);
    return user;
}
function query(query="select * from this.table ORDER BY _id DESC LIMIT 1"){}
function many_ids([]){}
function many_query(query="select * from this.table"){}
class Data_User extends Data_Class{
    constructor(){
        super()
        this.table = "users";
        this.fields({
            "username": "",
            "password": ""
        })
    }
}

module.exports = {id, query, many_ids, many_query}