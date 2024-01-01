/* global global, __dirname */
const ejs = require('ejs');

class Controller{
    constructor(request, response, action = null){
        this._request = request;
        this._response = response;
        this._body = '';
        this._view = null;
        this._viewData = {};
        this._mode = 'html';
        this.doAction(action);
    }

    setViewData(prop, value){
        this._viewData[prop] = value;
    }

    setRedirect(path){
        this._view = path;
        this._mode = "redirect";
    }

    setView(viewPath){
        if(typeof(viewPath) === "object"){
            this._view = JSON.stringify(viewPath);
            this._mode = 'json';
        }else{
            this._view = global.server_root+'/' + viewPath;
        }
    }

    sendFile(path){
        this._mode = 'file';
        this._view = path;
    }

    async doAction(action){
        if(action in this && typeof this[action] === 'function'){
            await this[action]();
            this.viewComposit();
        }else{
            this.sendError("Unknown action: " + action, false);
        }        
    }
    async viewComposit(){
        if(this._view === null){
            this._response.send("Critical Error - no view set for controller.");
        }else if(this._mode === 'json'){
            this._response.send(this._view);
        }else if(this._mode === 'redirect'){
            this._response.redirect(this._view);   
        }else if(this._mode === 'file'){
            this._response.sendFile(this._view);
        }else{
            var viewClass = require(this._view);
            var view = new viewClass(this._viewData,{logged_in:this.checkLogin()});
            this._response.send(ejs.render(view.getPageTemplate()));
        }
    }

    sendError(error, json){
        if(json){
            this._mode = 'json';
            this._view = error;
            this.viewComposit();
        }else{
            this._response.send("<html>" + error + "</html>");
        }
    }

    login(_id){
        this._request.session.user_id = _id;
    }
    
    logout(){
        this._request.session.user_id = null;
    }

    checkLogin(){
        if(this._request.session === undefined)return false;
        if(this._request.session.user_id === undefined || this._request.session.user_id === null)return false;
        else return this._request.session.user_id;
    }
}
module.exports = Controller;