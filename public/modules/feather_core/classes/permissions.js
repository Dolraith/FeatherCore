class Permissions{
    all_permissions = [];
    cur_permissions = null;
    _request; //this gets set in the controller constructor
    
    constructor(){}
    /**
     * Adds all permissions in the passed in array to the global list.
     * @param {[{name,label,module}]} permissions
     * @returns {undefined}
     */
    addPermissions(permissions){
        for(var permission of permissions){
            this.all_permissions.push(permission);
        }
    }
    
    /**
     * Gets all permissions that exist on the current instance
     * @returns [string]
     */
    getAllPermissions(){
        return this.all_permissions;
    }
    
    /**
     * Clears the permission cache.
     * @returns {undefined}
     */
    clearPermissions(){
        this.cur_permissions = null;
    }
    /**
     * Gets all permissions current user has
     * @returns [string]
     */
    async getCurPermissions(){
        var Data_Factory = require("./data_factory");
        var Core_Permission = require("./data/core_permission");
        if(this.cur_permissions === null){
            this.cur_permissions = [];
            //can't have permissions if not logged in
            if(this._request.session !== undefined){
                if(this._request.session.user_id){
                    //the login permission
                    this.cur_permissions.push({active:1,permission_name:"login"});
                    var permissions = await new Data_Factory(Core_Permission).many_query("user_id="+this._request.session.user_id, true);
                    for(var item of permissions){
                        this.cur_permissions.push(item);
                    }
                }else this.cur_permissions.push({active:1,permission_name:"logout"});                        
            }else this.cur_permissions.push({active:1,permission_name:"logout"});                        
        }
        return this.cur_permissions;
    }
    
    /**
     * Checks if current user has the asked-for permission.
     * @param {string} permission - permission_name to check, return true if null
     * @returns {bool} true if yes, false if no
     */
    async checkPermission(permission){        
        if(permission === null)return true;
        var perm = await this.getCurPermissions();
        for(var item of perm){
            if(item.permission_name === permission && item.active === 1){
                return true;
            }
        }
        return false;
    }
}
module.exports = Permissions;