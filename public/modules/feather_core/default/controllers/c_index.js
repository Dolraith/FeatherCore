/* global global */
var Controller = require(global.classPaths.controller);

class CIndex extends Controller {
    index(){
        //global._body = this.GetChunk('modules/feather_core/default/templates/t_index.html');
        this.setView('modules/feather_core/default/views/v_index');
    }
};
module.exports = CIndex;