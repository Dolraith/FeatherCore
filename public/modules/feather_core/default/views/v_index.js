const View = require(global.classPaths.view);
class v_index extends View{
    constructor(){        
        super();
        this.addDependency('bootstrap');
        this.setTemplate('modules/feather_core/default/templates/t_index.html');
    }    
}
module.exports = v_index;