const fs = require('fs');
module.exports.getChunk = function(path){
    return fs.readFileSync(global.server_root+'/' + path).toString();
}