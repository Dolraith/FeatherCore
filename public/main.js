/* global __dirname, global */

//global var listing
//_body     -> finalized body component
//_router   -> the router
//_response -> the response object
//_query    -> the query of the request
//--------

//Requires
const bcrypt = require('bcrypt');
const express = require("express");
//const session = require("express-session");
const session = require('cookie-session');
const bp = require('body-parser');
//const FileStore = require("session-file-store")(session); 
const fs = require('fs');
const glob = require("glob");
const path = require('path');
const https = require('https');
const http = require('http');
const router = require("./modules/feather_core/classes/router");
const staticServer = require('node-static');
const dependency_dictionary = require('./modules/feather_core/classes/dependency_dictionary');
const Settings = require("./settings.js");
const favicon = require("serve-favicon");
//--------
const app = express();
const portU = 80;
const portS = 443;

const static_extentions = ["jpg","js","css","scss","png","vue"];

global._router = router.getInstance();
global.settings = Settings;
global.server_root = __dirname;
global._dependency_dictionary = new dependency_dictionary();
global.classPaths = {
    controller: __dirname + "/modules/feather_core/classes/controller",
    view: __dirname + "/modules/feather_core/classes/view",
    sql: __dirname + "/modules/feather_core/classes/db_maria",
    data: {
        user: __dirname + "/modules/feather_core/classes/data/data_user",
        spirits:{
            type:__dirname + "/modules/feather_core/classes/data/spirits/data_spirit_type",
            power:__dirname + "/modules/feather_core/classes/data/spirits/data_spirit_power",
            skill:__dirname + "/modules/feather_core/classes/data/spirits/data_spirit_skill",
        }
    },
    data_super: __dirname + "/modules/feather_core/classes/data_class"
};

var file = new(staticServer.Server)(__dirname);
//var sess_options = {
//    path: "./tmp/sessions/",  //directory where session files will be stored
//    useAsync: true,
//    reapInterval: 5000,
//  };
var secret = bcrypt.hashSync(new Date().toISOString(), 10);
//app.use(session({
 //   store: new FileStore(sess_options),
  //  secret: secret,
   // resave: false,
   // saveUninitialized: true
//}));
app.use(session({
    name: 'session',
    keys: [secret],
  
    // Cookie Options
    maxAge: 31536000000//365 * 24 * 60 * 60 * 1000 // 24 hours
  }))
app.use(favicon(Settings.getPathFavicon()));

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

//serve static files
//app.use("/*", express.static('public',{extensions: ['js', 'css','png']}));
//todo: images
app.all("/*", (req, res) => {

    //check if static files
    var filepath = path.normalize(req.params[0]);
    if(filepath[filepath.length-1] == '\\'){
        filepath = filepath.slice(0, filepath.length - 1);
    }
    if(filepath[0] == '.')filepath = filepath.slice(1);

    if(filepath != '' && fs.existsSync(__dirname + "/" + filepath)){
        parts = filepath.split(".");
        if(static_extentions.includes(parts[parts.length - 1])){
            file.serve(req, res);
        }        
    }
    else{
        var globroot = __dirname.replaceAll('\\','/') + "/**/";
        //Set up dependencies
        //module dependencies
        glob(globroot + "dependencies.js", {}, (err, files) => {
            if (err) {
                //TODO: Handle errors
                res.send(
                    "Dependency files are incorrectly set up. Please contact a site administrator."
                );
            }
            for (var file of files) {
                require(file);
            }
        });
        //project dependencies. project should override the modules
        //require(__dirname + "/dependencies.js");
        //set up routes and execute
        glob(globroot + "routes.js", {}, (err, files) => {
            if (err) {
                //TODO: Handle errors here
                console.log(err);
                res.send(
                    "Routes setup was done incorrectly. Please contact a site administrator."
                );
            }
            for (var file of files) {
                require(file);
            }

            var safePath = safify(req.params[0]);

            var controller = global._router.getController(safePath);
            if (controller === null) {
                res.send("Unknown path: " + safePath);
            } else {
                var Control = require(controller.path);
                new Control(req, res, controller.action);
            }
        });
    }
});

//app.listen(port, () => {
//    console.log(`Feather Core Listening at http://localhost:${port}`);
//});

const httpServer = http.createServer(app);
httpServer.listen(portU, () => {
    console.log("Feather core listening http at " + portU + ".");
});

if(fs.existsSync('/etc/letsencrypt/live/www.dolraith.com/privkey.pem')){
    const httpsServer = https.createServer({
        key: fs.readFileSync('/etc/letsencrypt/live/www.dolraith.com/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/www.dolraith.com/fullchain.pem')
    }, app);
    
    
    httpsServer.listen(portS, () => {
        console.log("Feather core listening http at " + portS + ".");
    });
}


function safify(url) {
    try{
        //if (url[0] === '.') url=url.substring(1);
        if (url === "")return "/";
        return url
    }catch(ex){
        console.log("Ecountered exception.");
        console.log(ex);
        console.log("URL in question: " + url);
        return "/";
    }
    //TODO: safify the url    
}
