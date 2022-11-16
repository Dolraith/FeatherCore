const Utility = require('./utility');
class view {
    constructor(){
        this.dependencies = {
            js:[],
            css:[],
            named:[]
        }
        this.header = 'modules/feather_core/default/_templates/header.html';
        this.footer = 'modules/feather_core/default/_templates/footer.html';
        this.template = null;
    }
    getPageTemplate(){
        var compiled_template = '';
        var header = Utility.getChunk(this.header);
        header = header.replace("<?dependency_marker?>",this.getDependensies());
        compiled_template+=header;
        if(this.template!==null){
            compiled_template+=Utility.getChunk(this.template);
        }
        compiled_template+=Utility.getChunk(this.footer);
        return compiled_template;
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
        result += '<!-- free-floating css -->\n';
        for(var i of this.dependencies.css){
            result += "<link rel=\"stylesheet\" href=\"" + i + "\">\n";
        }
        result += spacer + '<!-- free-floating js -->\n';
        for(var i of this.dependencies.js){
            result += spacer + "<script src=\"" + i + "\"></script>\n";
        }
        //<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        //<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>


        //do this with brain
        return result;
    }

    /**
     * Adds a dependency. Takes either 1 or 2 params. If 1, it should be a registered dependency package (see dependency_dictionary), if 2 it should be an array of files and their type (js or css)
     * @param {string|Array} packageOrArray - either the dependency package name or an array of appropriate includes
     * @param {string} type - if present, the dependency file array type. if absent signifies that it's a named dependency
     */
    addDependency(packageOrArray, type=null){
        if(type === null){
            this.addDependencyPackage(packageOrArray);
        }else{
            this.addDependencyFiles(packageOrArray, type);
        }
    }
    addDependencyPackage(name){
        this.dependencies.named.push(name);
    }
    
    addDependencyFiles(array, type){
        if(this.dependencies[type] === undefined){
            this.dependencies[type] = array;
        }else{
            this.dependencies[type] = [...this.dependencies[type], ...array];
        }
    }

}

module.exports = view;