/* global global */

const View = require(global.classPaths.view);
class v_register extends View{
    init(){
        this.addDependency('bootstrap');
        this.addDependency('vue');
        this.addDependency([{name:'vue',path:'/modules/feather_core/users/_js/j_register.js'}],'modules');
        this.setTemplate('modules/feather_core/users/_templates/t_register.html');
    }    
}
module.exports = v_register;