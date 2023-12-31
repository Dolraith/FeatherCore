/* global __dirname */

/**
 * Return the path to the favicon currently to be used by this project.
 * @returns {String}
 */
 module.exports.getPathFavicon = function(){
    return __dirname + "/modules/feather_core/images/favicon.png";
};

/**
 * Returns the name of the site for the tab
 * @returns {String}
 */
 module.exports.getSiteName = function(){
    return "Feather Core";
};

/**
 * /**
 * Returns the connection info for the database
 * @param environment - the env for the db connection
 * @returns {username, password, schema}
 */
 module.exports.getDBConnection = function(environment = "dev"){
    if(environment === "dev") {
        return {
            host: 'localhost', 
            user:"hoarder", 
            password: "PreciousSt0nes!",
            connectionLimit: 15,
            database:"feather_core"
        };
    }else{
        return {
            "username": "default",
            "password": null,
            "schema": null
        };
    }
};