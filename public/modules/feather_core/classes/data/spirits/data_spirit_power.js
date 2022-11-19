Data_Class = require(global.classPaths.data_super)
async function id(id = 0, callback){
    user = new Data_Spirit_Power().loadOne("_id = " + id);
    return user;
}
async function query(query){
    user = new Data_Spirit_Power().loadOne(query);
    return user;
}
function make(){
    return new Data_Spirit_Power();
}
function many_ids([]){}
function many_query(query="select * from this.table"){}
class Data_Spirit_Power extends Data_Class{
    constructor(){
        super()
        this.table = "users";
        this.fields({
            name:"",
            type:"",
            action:"",
            range:"",
            description:"",
            source:""
        })
    }
}

module.exports = {id, query, make, many_ids, many_query}