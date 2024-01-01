/* global global */

const Utility = require('./utility');
class view {
    constructor(viewData,permissions){
        this.dependencies = {
            js:[],
            css:[],
            named:[],
            modules:[],
            components:[]
        };
        this._data = viewData;
        this._vueData = {};
        this.permissions = permissions;
        this.header = 'modules/feather_core/_templates/header.html';
        this.footer = 'modules/feather_core/_templates/footer.html';
        this.template = null;
        this.vueRender = false;
        this.init();
    }
    getPageTemplate(){
        var compiled_template = '';
        var header = Utility.getChunk(this.header);
        header = header.replace("<?dependency_marker?>",this.getDependensies());
        header = header.replace("<?nav_marker>",global._router.getNavs());

        var footer = Utility.getChunk(this.footer);
        footer = footer.replaceAll("<?data_marker?>", JSON.stringify(this._vueData) + "," + this.wrapComponents());
        footer = footer.replaceAll("<?template_marker?>", this.getTemplates());

        if(this.vueRender){
            header = header.replace("<?tag_marker?>","<div id='vuemain'></div><template id='vuetemplate'><div>");
            footer = footer.replace("<?tag_marker?>","</div></template>");
        }else{
            header = header.replace("<?tag_marker?>","<div id='vuemain'>");
            footer = footer.replace("<?tag_marker?>","</div>");
        }
        
        if(this.permissions.logged_in === false){
            header = header.replace("<?secure?>","hidden");
        }else{
            header = header.replace("<?secure?>","");
        }

        compiled_template+=header;
        if(this.template!==null){
            compiled_template+=Utility.getChunk(this.template);
        }

        compiled_template+=footer;
        return compiled_template;
    }

    setVueData(key, value){
        this._vueData[key] = value;
    }
    getDataProp(key){
        return this._data[key];
    }

    setHeader(headerPath){
        this.header = headerPath;
    }

    setFooter(footerPath){
        this.footer = footerPath;
    }

    setTemplate(templatePath){
        this.template = templatePath;
    }


    getDependensies(){
        var spacer = "        "
        var result = ""
        for(var i of this.dependencies.named){
            result += global._dependency_dictionary.getDependencyInclude(i, spacer);
        }
        result += spacer + '<!-- free-floating css -->\n';
        for(var i of this.dependencies.css){
            result += "<link rel=\"stylesheet\" href=\"" + i + "\">\n";
        }
        result += spacer + '<!-- free-floating js -->\n';
        for(var i of this.dependencies.js){
            result += spacer + "<script src=\"" + i + "\"></script>\n";
        }
        result += spacer + "<!-- module scripts -->\n";
        for(var i of this.dependencies.modules){
            result += spacer + "<script type='module'>\n";
            result += spacer + "    import * as " + i.name + " from '" + i.path + "';\n";
            result += spacer + "    window._" + i.name + " = " + i.name+";\n";
            result += spacer + "</script>\n";
        }
        result += spacer + "<!-- components scripts -->\n";
        for(var i of this.dependencies.components){
            var component = global._dependency_dictionary.getComponent(i);
            result += spacer + "<script type='module'>\n";
            result += spacer + "    import * as " + component.name + " from '" + component.js + "';\n";
            result += spacer + "    window._" + component.name + " = " + component.name+";\n";
            result += spacer + "</script>\n";
        }
        //<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        //<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>


        //do this with brain
        return result;
    }

    getTemplates(){
        var result = "";

        for(var template of this.dependencies.components){
            var path = global._dependency_dictionary.getComponentTemplate(template);
            result += "\n<!------>\n";
            result += Utility.getChunk(path);

        }
        return result;
    }

    /**
     * Adds a dependency. Takes either 1 or 2 params. If 1, it should be a registered dependency package (see dependency_dictionary), if 2 it should be an array of files and their type (js or css)
     * @param {string|Array} packageOrArray - either the dependency package name or an array of appropriate includes
     * @param {string} type - if present, the dependency file array type. if absent signifies that it's a named dependency
     */
    addDependency(packageOrArray, type=null){
        //toggle between body in div vs body in template
        if(packageOrArray == 'vue') this.vueRender = true;
        if(type === null){
            this.addDependencyPackage(packageOrArray);
        }else{
            this.addDependencyFiles(packageOrArray, type);
        }
    }
    addDependencyPackage(name){
        this.dependencies.named.push(name);
    }


    addComponent(name){
        this.dependencies.components.push(name);
    }

    addDependencyFiles(array, type){
        if(this.dependencies[type] === undefined){
            this.dependencies[type] = array;
        }else{
            this.dependencies[type] = [...this.dependencies[type], ...array];
        }
    }

    wrapComponents(){
        var result = [];
        for(var i of this.dependencies.components){
            result.push("\"" + i + "\"");
        }
        result = "[" + result.join(',') + "]";
        return result;
    }
}

module.exports = view;