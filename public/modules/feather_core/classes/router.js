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
    
    setNav(nav_level, route, text, permission) {
        //TODO: permissions
        const nav_item = "<li class='nav-item'><a class='nav-link' href='"+route+"'>"+text+"</a></li>\n";
        this.nav[nav_level].push(nav_item);
    }
    /**
     * Returns all registered nav items.
     * @returns {String|RouterInner.getNavs.result}
     */
    getNavs(){
        var result = "";
        for(var section in this.nav){
            result += "<h3>"+section+"</h3>\n";
            result += "<div class='navbar'>\n";
            result += "<ul class='navbar-nav'>";
            for(var item of this.nav[section]){
                result += item;
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