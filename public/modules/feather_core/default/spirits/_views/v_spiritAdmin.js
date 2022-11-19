const View = require(global.classPaths.view);
class v_index extends View{
    constructor(data){        
        super(data);
        this.addDependency('bootstrap');
        this.addDependency(['modules/feather_core/default/spirits/_js/j_spiritAdmin.js'],'js');
        this.addDependency('vue');
        this.setTemplate('modules/feather_core/default/spirits/_templates/t_spiritAdmin.html');
        user = this.getDataProp("user");
        console.log(user);
    }    
}
module.exports = v_index;