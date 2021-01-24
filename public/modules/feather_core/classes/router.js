/* global global */

class RouterInner {
    routes = {};   

    getRoutes() {
        return JSON.stringify(this.routes);
    }

    getController(url) {
        if (this.routes[url] === undefined) {
            return null;
        }
        return global.server_root + "/" + this.routes[url];
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