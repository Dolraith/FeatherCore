Data_Class = require(global.classPaths.data_super);
var SQL = require(global.classPaths.sql);

async function id(id = 0, callback){
    user = new Data_Spirit_Skill()
    user.loadOne("_id = " + id);
    return user;
}
async function query(query){
    user = new Data_Spirit_Skill().loadOne(query);
    return user;
}
function make(){
    return new Data_Spirit_Skill();
}
function many_ids([]){}
async function many_query(query=null, dataOnly=false){
    if(dataOnly){
        var curQuery = "SELECT * FROM spirit_skill";
        if(query != null){
            curQuery += "WHERE " + query;
        }
        curQuery += " Order By name";
        var rows = await SQL.load(curQuery,function(){});
        return rows;
    }else{
        throw new Error("Implement This.");
    }
}
class Data_Spirit_Skill extends Data_Class{
    constructor(){
        super()
        this.table = "spirit_skill";
        this.fields({
            name:"",
            attribute:""
        })
    }
}

module.exports = {id, query, make, many_ids, many_query}