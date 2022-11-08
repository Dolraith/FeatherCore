const View = require(global.classPaths.view);
class v_index extends View{
    constructor(){        
        super();
        this.addDependency('bootstrap');
        this.addDependency(['module/feather_core/default/js/j_index.js'],'js')
        this.setTemplate('modules/feather_core/default/templates/t_index.html');
    }    
}
module.exports = v_index;