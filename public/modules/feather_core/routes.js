/* global global */
global._router.setRoutes(['/'], 'modules/feather_core/default/_controllers/c_index');
global._router.setRoutes(['login'], 'modules/feather_core/default/users/_controllers/c_login');
global._router.setRoutes(['register'], 'modules/feather_core/default/users/_controllers/c_register');

/* To be moved over to hoard */
global._router.setRoutes(['spirits'], 'modules/feather_core/default/spirits/_controllers/c_spirits')