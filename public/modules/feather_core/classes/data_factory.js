var SQL = require(global.classPaths.sql)
class Data_Factory {
    constructor(dataclass){
        this.dataclass = dataclass;
    }
    async id(id){
        return await this.query("_id = " + id);
    }
    async query(query){
        var data = await new this.dataclass().loadOne(query);
        return data;
    }
    make(){
        return new this.dataclass();
    }
    async many_ids(ids,flat=false){
        example = this.make();
        if(ids.length < 1){return []};
        return await this.many_query("_id in [" + ids.join(",") + "]", flat);
    }
    async delete(id){
        var example = this.make();
        var query = "delete from " + example.table + " where _id="+id;
        var rows = await SQL.save(query);
        return (rows.affectedRows>0);
    }
    /**
     * Run a many-item query
     * @param {*} query 
     * @param {*} flat - if true results are json data objects, if false they are data_class objects
     * @returns an array of results
     */
    async many_query(query="",flat=false){
        var example = this.make();
        var fullQuerry;
        if(query.length > 0)query = " where " + query;
        var fullQuerry = "select * from " + example.table + query;
        var rawResults = await SQL.load(fullQuerry,(sqlresult)=>{return sqlresult;});
        var classResults = []; 
        for(var item in rawResults){
            var cur = new this.dataclass();
            cur.inflate(rawResults[item]);
            classResults.push(cur);
        }
        if(flat){
            var flatResults = [];
            for(var item in classResults){
                flatResults.push(classResults[item].getData());
            }
            return flatResults;
        }        
        return classResults;
    }

    /**
     * Bare query, bare results. Unsafe. Does not check table
     * @param {*} query 
     */
    async direct_query(query){
        var rawResults = await SQL.load(query,(sqlresult)=>{return sqlresult;});
        var results = [];
        for(var item in rawResults){
            results.push(rawResults[item]);
        }
        return rawResults;
    }

}
module.exports = Data_Factory;