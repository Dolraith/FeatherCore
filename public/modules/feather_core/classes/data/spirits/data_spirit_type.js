Data_Class = require(global.classPaths.data_super);
var SQL = require(global.classPaths.sql);

async function id(id = 0, callback){
    user = new Data_Spirit_Type();
    user.loadOne("_id = " + id);
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
async function many_query(query=null, dataOnly=false){
    if(dataOnly){
        var curQuery = "SELECT * FROM spirit_type";
        if(query != null){
            curQuery += "WHERE " + query;
        }
        curQuery += " Order By type, element";
        var rows = await SQL.load(curQuery,function(){});
        return rows;
    }else{
        throw new Error("Implement This.");
    }
}
class Data_Spirit_Type extends Data_Class{
    constructor(){
        super()
        this.table = "spirit_type";
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
            magic:0,
            phys_init:"",
            astral_init:"",
            source:"",
            special:"",
            weakness:''
        })
    }
}

module.exports = {id, query, make, many_ids, many_query}