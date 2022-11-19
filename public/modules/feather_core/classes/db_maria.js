/* global global */
var mariadb = require('mariadb');

async function load(query, callback){
    if (!("mysql" in global)){
        global.mysql = new DB_Maria()
    }
    var conn;
    var rows = null;
    try {
        conn = await global.mysql.pool.getConnection();
        var rows = await conn.query(query);
        delete rows.meta;
        callback(rows)
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
}

async function save(query){
    if (!("mysql" in global)){
        global.mysql = new DB_Maria()
    }
    var conn;
    var rows = null;
    try {
        conn = await global.mysql.pool.getConnection();
        console.log(query);
        var rows = await conn.query(query,{insertIdAsNumber: true});
        delete rows.meta;
        
        console.log(rows);

    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end();
        return rows;
    }   
}

class DB_Maria{
    constructor(){
        var conInfo = global.settings.getDBConnection()
        this.pool = mariadb.createPool(conInfo);
    }
}

module.exports={load,save}