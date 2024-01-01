/* global global */
global._router.setRoutes(['/'], 'modules/feather_core/_controllers/c_index');
global._router.setRoutes(['login'], 'modules/feather_core/users/_controllers/c_login');
global._router.setRoutes(['logout'], 'modules/feather_core/users/_controllers/c_logout');
global._router.setRoutes(['register'], 'modules/feather_core/users/_controllers/c_register');

/* Errors */
global._router.setRoutes(['err'], 'modules/feather_core/users/_controllers/c_errors');