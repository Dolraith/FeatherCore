/* global global, __dirname */
const ejs = require('ejs');

class Controller{
    constructor(action = null){
        this._body = '';
        this._view = null;
        if(action === null){
            action = 'index';
        }
        this.doAction(action)
    }

    setView(viewPath){
        this._view = global.server_root+'/' + viewPath;
    }

    async doAction(action){
        if(action in this && typeof this[action] === 'function'){
            await this[action]();
        }
        
        //TODO: write good composit                      
        this.viewComposit();
    }
    async viewComposit(){
        if(this._view === null){
            global._response.send("Critical Error - no view set for controller.");
        }else{
            var viewClass = require(this._view);
            var view = new viewClass();
            global._response.send(ejs.render(view.getPageTemplate()));
        }
    }
}
module.exports = Controller;