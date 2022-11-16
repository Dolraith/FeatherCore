const View = require(global.classPaths.view);
class v_index extends View{
    constructor(){        
        super();
        this.addDependency('bootstrap');
        this.addDependency(['modules/feather_core/default/spirits/_js/j_spirits.js'],'js');
        this.addDependency('vue');
        this.setTemplate('modules/feather_core/default/spirits/_templates/t_spirits.html');
    }    
}
module.exports = v_index;