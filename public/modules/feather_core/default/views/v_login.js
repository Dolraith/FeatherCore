const View = require(global.classPaths.view);
class v_login extends View{
    constructor(){        
        super();
        this.addDependency('bootstrap');
        this.addDependency(['module/feather_core/default/js/j_login.js'],'js')
        this.setTemplate('modules/feather_core/default/templates/t_login.html');
    }    
}
module.exports = v_login;