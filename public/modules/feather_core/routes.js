/* global global */
global._router.setRoutes(['/'], 'modules/feather_core/_controllers/c_index');
global._router.setRoutes(['login'], 'modules/feather_core/users/_controllers/c_login');
global._router.setRoutes(['logout'], 'modules/feather_core/users/_controllers/c_logout');
global._router.setRoutes(['manage_users'], 'modules/feather_core/users/_controllers/c_manage');
global._router.setRoutes(['profile'], 'modules/feather_core/users/_controllers/c_profile');
global._router.setRoutes(['register'], 'modules/feather_core/users/_controllers/c_register');

/* Errors */
global._router.setRoutes(['err'], 'modules/feather_core/users/_controllers/c_errors');

/* Navbar config */
global._router.setNav("Core", "/manage_users", "Manage Users", "core_admin");
global._router.setNav("Core", "/profile", "User Profile", "login");
global._router.setNav("Core", "/login", "Log In", "logout");
global._router.setNav("Core", "/logout", "Log Out", "login");