var SQL = require(global.classPaths.sql)

class Data_Class{
    constructor(query = "select *", callback = function(data){}){
        this.table = "notable"
        this.data = {}
        this.data["_id"] = null;
        this.data["_created"] = Date();
        this.data["_modified"] = Date();
    }

    fields(dictionary){
        for (var key in dictionary){
            this.data[key] = dictionary[key];
        }
    }

    async load(){
        new SQL(this.query + " from " + this.table, this.loaded)        
    }

    loaded(){
        //console.log(this.data)
    }

    async loadOne(query){
        var fullQuery = "select * from " + this.table + " where " + query + " limit 1"
        await SQL.load(fullQuery, this.loadedOne.bind(this))
    }

    loadedOne(data){
        for(var key in data[0]){
            this.data[key] = data[0][key]
        }
    }

    async save(){

    }
}
module.exports = Data_Class