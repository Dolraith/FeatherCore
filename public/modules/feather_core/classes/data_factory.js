var SQL = require(global.classPaths.sql)
class Data_Factory {
    constructor(dataclass){
        this.dataclass = dataclass;
    }
    async id(id = 0, callback){
        user = new this.dataclass().loadOne("_id = " + id);
        return user;
    }
    async query(query){
        user = new this.dataclass().loadOne(query);
        return user;
    }
    make(){
        return new this.dataclass();
    }
    async many_ids(ids,flat=false){
        example = this.make();
        if(ids.length < 1){return []};
        return await this.many_query("_id in [" + ids.join(",") + "]", flat);
    }
    /**
     * Run a many-item query
     * @param {*} query 
     * @param {*} flat - if true results are json data objects, if false they are data_class objects
     * @returns an array of results
     */
    async many_query(query="",flat=false){
        var example = this.make();
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

}
module.exports = Data_Factory;