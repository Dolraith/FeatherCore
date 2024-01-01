/* global global */

const View = require(global.classPaths.view);
class v_index extends View{
    init(){
        this.addDependency('bootstrap');        
        this.addDependency('vue');
        this.addDependency([{name:'vue',path:'/modules/feather_core/_js/j_index.js'}],'modules');
        this.setTemplate('modules/feather_core/_templates/t_index.html');
        
        this.setVueData("user", this.getDataProp("user"));
        console.log(this.getDataProp("user"));
    }    
}
module.exports = v_index;