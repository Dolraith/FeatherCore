class dependency_dictionary{
    constructor(){
        this.dependencies = {};
        //vue components are a little special
        this.components = {};
    }
    setDependency(name, jsArray, cssArray, templateArray){
        this.dependencies[name] = {
            js: jsArray,
            css: cssArray,
            templates: templateArray
        }
    }
    getDependency(name){
        return this.dependencies[name];
    }
    getDependencyInclude(name, spacer=''){

        if(this.dependencies[name] === undefined){
            return '';            
        }else{            
            var result = spacer + '<!--'+name+'-->\n';
            var dep = this.dependencies[name];
            for(var type in dep){
                for(var line in dep[type]){
                    result += spacer + dep[type][line] + "\n";
                }
            }
            return result;
        }
    }
    setComponent (component){
        this.components[component.name] = {
            name: component.name,
            js: component.js,
            css: component.css,
            template: component.template
        }
    }
    getComponentTemplate(componentName){
        //console.log(this.components);
        if(componentName in this.components){
            if('template' in this.components[componentName]){
                return this.components[componentName].template;
            }
        }
        return "";
    }
    getComponent(component){
        return this.components[component];
    }
}
module.exports = dependency_dictionary;