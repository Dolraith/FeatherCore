const View = require(global.classPaths.view);
class v_login extends View{
    init(){
        this.addDependency('bootstrap');
        this.addDependency('vue');
        this.addDependency(['modules/feather_core/default/users/_js/j_register.js'],'js')
        this.setTemplate('modules/feather_core/default/users/_templates/t_register.html');
    } 
}
module.exports = v_login;