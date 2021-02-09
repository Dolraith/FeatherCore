/* global __dirname, global */

//global var listing
//_body     -> finalized body component
//_router   -> the router
//_response -> the response object
//_query    -> the query of the request
//--------

//Requires
const express = require("express");
const glob = require("glob");
const router = require("./modules/feather_core/classes/router");
const dependency_dictionary = require('./modules/feather_core/classes/dependency_dictionary');
const Settings = require("./settings.js");
const favicon = require("serve-favicon");
//--------
const app = express();
const port = 99;
global._router = router.getInstance();
global.settings = Settings;
global.server_root = __dirname;
global._dependency_dictionary = new dependency_dictionary();
global.classPaths = {
    controller: __dirname + "/modules/feather_core/classes/controller",
    view: __dirname + "/modules/feather_core/classes/view"
};

app.use(favicon(Settings.getPathFavicon()));
//serve static files
app.use("/*.js", express.static('public'));
app.use("/*.css", express.static('public'));
//todo: images
app.all("/*", (req, res) => {
    global._response = res;
    global._query = res.query;
    //Set up dependencies
    //module dependencies
    glob(__dirname + "/*/*/dependencies.js", {}, (err, files) => {
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
    require(__dirname + "/dependencies.js");
    //set up routes and execute
    glob(__dirname + "/*/*/routes.js", {}, (err, files) => {
        if (err) {
            //TODO: Handle errors here
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
            res.send("Unknown path." + safePath);
        } else {
            var control = require(controller);
            new control();
        }
    });
});

app.listen(port, () => {
    console.log(`Feather Core Listening at http://localhost:${port}`);
});

function safify(url) {
    if (url === "") {
        return "/";
    }
}
