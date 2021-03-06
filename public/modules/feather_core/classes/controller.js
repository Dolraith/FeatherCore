/* global global, __dirname */
const fs = require('fs');
const ejs = require('ejs');

class controller{
    constructor(action = null){
        this._body = '';
        this._view = null;
        if(action === null){
            action = 'index';
        }
        if(action in this && typeof this[action] === 'function'){
            this[action]();
        }
        
        //TODO: write good composit
        //this.badComposit();                        
        this.viewComposit();
    }

    setView(viewPath){
        this._view = global.server_root+'/' + viewPath;
    }

    viewComposit(){
        if(this._view === null){
            global._response.send("Critical Error - no view set for controller.");
        }else{
            var viewClass = require(this._view);
            var view = new viewClass();
            global._response.send(ejs.render(view.getPageTemplate()));
        }
    }

    /*
    badComposit(){
        var finalResponse = "";
        
        //header
        finalResponse += this.GetChunk(this.header);
        //includes
        //TODO: actually do includes
        if(this._view !== null){
            finalResponse += this.view.get
            finalResponse += this.view.getDependensies();

        }else{
            finalResponse += '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">\n';
        }
                
        //close head / open body
        finalResponse += '</head>\n<body>';
        //body segment generated by the controller
        finalResponse += global._body;
        //footer
        finalResponse += this.GetChunk(this.footer);
        finalResponse = ejs.render(finalResponse);
        global._response.send(finalResponse);
    }    

    setHeader(headerPath){
        this.header = headerPath;
    }
    setFooter(footerPath){
        this.footer = footerPath;
    }
    */
}
module.exports = controller;