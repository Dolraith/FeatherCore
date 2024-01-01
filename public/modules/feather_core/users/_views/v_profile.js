/* global global */

const View = require(global.classPaths.view);
class v_profile extends View{
    init(){
        this.addDependency('bootstrap');
        this.addDependency('vue');
        this.addDependency([{name:'vue',path:'/modules/feather_core/users/_js/j_profile.js'}],'modules');
        this.setTemplate('modules/feather_core/users/_templates/t_profile.html');
    }    
}
module.exports = v_profile;