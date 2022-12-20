const View = require(global.classPaths.view);
class v_index extends View{
    init(){
        this.addDependency('bootstrap');
        this.addDependency(['modules/feather_core/default/_js/j_index.js'],'js')
        this.setTemplate('modules/feather_core/default/_templates/t_index.html');
    }    
}
module.exports = v_index;