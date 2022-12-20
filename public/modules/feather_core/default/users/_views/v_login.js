const View = require(global.classPaths.view);
class v_login extends View{
    init(){
        this.addDependency('bootstrap');
        this.addDependency('vue');
        this.addDependency([{name:'vue',path:'/modules/feather_core/default/users/_js/j_login.js'}],'modules');
        this.setTemplate('modules/feather_core/default/users/_templates/t_login.html');
    }    
}
module.exports = v_login;