
/* global global */

global.classPaths.data.core = 
{
    user: global.server_root + "/modules/feather_core/classes/data/core_user",
    permission: global.server_root + "/modules/feather_core/classes/data/core_permission"
};

global._permissions.addPermissions([
    {name:"core_admin",label:"Core Admin",module:"Core"}
]);