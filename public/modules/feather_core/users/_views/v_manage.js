/* global global */

const View = require(global.classPaths.view);
class v_manage extends View{
    init(){
        this.addDependency('bootstrap');
        this.addDependency('vue');
        this.addDependency([{name:'vue',path:'/modules/feather_core/users/_js/j_manage.js'}],'modules');
        this.setTemplate('modules/feather_core/users/_templates/t_manage.html');
        
        this.setVueData("users", this.getDataProp("users"));
    }    
}
module.exports = v_manage;