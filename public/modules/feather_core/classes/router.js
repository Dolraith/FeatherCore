/* global global */
class RouterInner {
    routes = {};   

    getRoutes() {
        return JSON.stringify(this.routes);
    }

    getController(url) {
        var path = url;
        var action = 'index';
        if (this.routes[url] === undefined) {
            var parts = url.split('/');
            if(parts.length == 1){
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