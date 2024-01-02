/* global global */
class RouterInner {
    routes = {};   
    nav = {};

    getRoutes() {
        return JSON.stringify(this.routes);
    }

    getController(url) {
        var path = url;
        var action = 'index';
        if (this.routes[url] === undefined) {
            var parts = url.split('/');
            if(parts.length === 1){
                return null;
            }else{
                action = parts[parts.length - 1];
                parts.pop();
                url = parts.join("/");
                if(this.routes[url] === undefined){
                    return null;
                }
            }
        }
        //return global.server_root + "/" + this.routes[url];
        path = global.server_root + "/" + this.routes[url];
        return {path:path, action:action};
    }

    setRoutes(routes, controller) {
        for (var route of routes) {
            this.routes[route] = controller;
        }
    }
    
    setNav(module, route, text, permission) {
        const nav_item = "<li class='nav-item'><a class='nav-link' href='"+route+"'>"+text+"</a></li>\n";
        if(this.nav[module] === undefined){
            this.nav[module] = [];
        }
        this.nav[module].push({permission:permission,nav_item:nav_item});
    }
    /**
     * Returns all registered nav items.
     * @returns {String|RouterInner.getNavs.result}
     */
    async getNavs(){
        var result = "";
        var sections = Object.keys(this.nav).sort();
        for(var section_name of sections){
            result += "<h3>"+section_name+"</h3>\n";
            result += "<div class='navbar'>\n";
            result += "<ul class='navbar-nav'>";
            for(var item of this.nav[section_name]){
                if(await global._permissions.checkPermission(item.permission)){
                    result += item.nav_item;
                }
                                
            }
            result += "</ul>";
            result += "</div>";
        }
        return result;
    }
}

//make the router a singleton
class Router {
    constructor() {
        throw new Error("Use router.getInstance");
    }
    static getInstance() {
        if (!Router.instance) {
            Router.instance = new RouterInner();
        }
        return Router.instance;
    }
}

module.exports = Router;