/* global global */
/**
 * public/modules/feather_core/classes/dependency_dictionary.setDependency(name,cssArray,jsArray,html template array);
 */
global._dependency_dictionary.setDependency(
    'bootstrap',
    [
//        '<link href="/assets/css/bootstrap.min.css" rel="stylesheet">',
        '<link href="/assets/css/bootstrap_custom.css" rel="stylesheet">',
        '<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" rel="stylesheet">',
//         '<link rel="stylesheet" type="text/css" href="/overrides/css/bootstrap_theme.css"/>',
        '<link rel="stylesheet" type="text/css" href="/overrides/css/project.css"/>'
    ],
    [
        '<script src="/assets/js/bootstrap.bundle.min.js"></script>'
    ]
);
global._dependency_dictionary.setDependency(
    'vue',
    [],
    [
        '<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>'
    ],
    []
);
//setComponent ({name:name, js:'', css:[], template:''})
global._dependency_dictionary.setComponent({
    name:'Counter',
    js:'/modules/feather_core/_vueComponents/counter.js',
    template: 'modules/feather_core/_vueComponents/counter.template'
});