Data_Class = require(global.classPaths.data_super)
async function id(id = 0, callback){
    user = new Data_Spirit_Type().loadOne("_id = " + id);
    return user;
}
async function query(query){
    user = new Data_Spirit_Type().loadOne(query);
    return user;
}
function make(){
    return new Data_Spirit_Type();
}
function many_ids([]){}
function many_query(query="select * from this.table"){}
class Data_Spirit_Type extends Data_Class{
    constructor(){
        super()
        this.table = "users";
        this.fields({
            type:"",
            element:"",
            body:0,
            agility:0,
            reaction:0,
            strength:0,
            willpower:0,
            logic:0,
            intuition:0,
            charisma:0,
            phys_init:"",
            astral_init:"",
            source:"",
            special:""
        })
    }
}

module.exports = {id, query, make, many_ids, many_query}