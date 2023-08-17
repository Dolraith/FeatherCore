/* global global */
/**
 * public/modules/feather_core/classes/dependency_dictionary.setDependency(name,cssArray,jsArray,html template array);
 */
global._dependency_dictionary.setDependency(
    'bootstrap',
    [
        '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">',
        '<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" rel="stylesheet">',
        '<link rel="stylesheet" type="text/css" href="/overrides/css/bootstrap_theme.css"/>',
        '<link rel="stylesheet" type="text/css" href="/overrides/css/project.css"/>',
    ],
    [
        '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>',
    ]
);
global._dependency_dictionary.setDependency(
    'vue',
    [],
    [
        '<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>',
    ],
    []
);
//setComponent ({name:name, js:'', css:[], template:''})
global._dependency_dictionary.setComponent({
    name:'Counter',
    js:'/modules/feather_core/default/_vueComponents/counter.js',
    template: 'modules/feather_core/default/_vueComponents/counter.template'
})