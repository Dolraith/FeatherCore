/* global global */

var SQL = require(global.classPaths.sql);

class Data_Class{
    constructor(query = "select *", callback = function(data){}){
        this.table = "notable";
        this.data = {};
        this.data["_id"] = null;
        this.data["_created"] = Date();
        this.data["_modified"] = Date();
    }

    fields(dictionary){
        for (var key in dictionary){
            this.data[key] = dictionary[key];
        }
    }

    inflate(dictionary){
        for(var i in dictionary){
            if(i === "_created" || i === "_modified")continue;
            if(i === "_id" && dictionary[i] === "null")continue;
            this.set(i, dictionary[i]);
        }
    }

    set(property, value){
        if(this.data[property] === undefined){
            throw new Error("No property " + property +" in this data class.");
        }
        this.data[property] = value;
    }
    get(property){
        return this.data[property];
    }
    getData(){
        return this.data;
    }

    async load(){
        new SQL(this.query + " from " + this.table, this.loaded);        
    }

    loaded(){}

    async loadOne(query){
        var fullQuerry = "select * from " + this.table + " where " + query + " limit 1";
        await SQL.load(fullQuerry, this.loadedOne.bind(this));
        if(this.data["_id"] === null){
            return null;
        }
        return this;
    }

    loadedOne(data){
        for(var key in data[0]){
            this.data[key] = data[0][key];
        }
    }
    
    async save(){
        this.data["_modified"] = Date();
        var cols = [];
        var data = this.getData();
        for(var key in data){
            if(key === "_modified" || key === "_created")continue;
            if(key === "_id" && (data[key] === "null" || data[key] === null))continue;
            cols.push(" " + key + " = \"" + data[key] + "\"");
        }
        var fullQuerry = '';
        if(data["_id"] !== null){
            fullQuerry = "UPDATE " + this.table + " SET " + cols.join(',') + " WHERE _id=" + data["_id"] + ";";
            var result = await SQL.save(fullQuerry);
        }
        else{
            fullQuerry = "INSERT INTO " + this.table + " SET " + cols.join(',') + ";";
            var result = await SQL.save(fullQuerry);
            if(result === null)return null;
            this.data['_id'] = Number(result.insertId);
        } 
        return this.data["_id"];
    }
}
module.exports = Data_Class;