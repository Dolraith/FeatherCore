/* global __dirname, global */

//global var listing
//_body     -> finalized body component
//_router   -> the router
//_response -> the response object
//_query    -> the query of the request
//--------

//Requires
const express = require('express');
const glob = require('glob');
const router = require('./modules/feather_core/classes/router');
const Settings = require('./settings.js');
const favicon = require('serve-favicon');
//--------

const app = express();
const port = 99;
global._router = router.getInstance();
global.server_root = __dirname;
global.classPaths = {
    controller:__dirname+"/modules/feather_core/classes/controller"
};
 
app.use(favicon(Settings.getPathFavicon()));
app.all('/*', (req, res) => {    
    global._response = res;
    global._query = res.query;    
    glob(__dirname + '/*/*/routes.js', {}, (err, files)=>{
        if(err){
            //TODO: Handle errors here
            res.send("Routes setup was done incorrectly. Please contact a site administrator.");
        }
        for(var file of files){
            console.log(file);
            require(file);
        }
        
        var safePath = safify(req.params[0]);
        
        
        var controller = global._router.getController(safePath);
        if(controller === null){
            
            res.send("Unknown path." + safePath);
            
        }else{
            var control = require(controller);
            new control();
        }
    }); 
});

app.listen(port, () => {
  console.log(`Feather Core Listening at http://localhost:${port}`);
});

function safify(url){
    if(url === ''){
        return '/';
    }
}