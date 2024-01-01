/* global global */

const View = require(global.classPaths.view);
class v_login extends View{
    init(){
        this.addDependency('bootstrap');
        this.addDependency(['modules/feather_core/users/_js/j_login.js'],'js');
        this.setTemplate('modules/feather_core/users/_templates/t_errDefault.html');
    }    
}
module.exports = v_login;