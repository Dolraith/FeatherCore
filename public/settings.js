/* global __dirname */

/**
 * Return the path to the favicon currently to be used by this project.
 * @returns {String}
 */
module.exports.getPathFavicon = function(){
    return __dirname + "/modules/feather_core/images/favicon.png";
};

module.exports.getSiteName = function(){
    return "Feather Core";
}