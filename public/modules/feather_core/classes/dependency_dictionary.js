class dependency_dictionary{
    constructor(){
        this.dependencies = {};
    }
    setDependency(name, jsArray, cssArray){
        this.dependencies[name] = {
            js: jsArray,
            css: cssArray
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

}
module.exports = dependency_dictionary;