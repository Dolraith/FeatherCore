import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
export function initVue(initData, components){    
    var vue = createApp({
        data(){
            var data = {};
            for(i in initData){
                data[i] = initData[i];
            }
            return data;
        },
        template:"#vuetemplate",
        methods:{
        }
    });
    for(var i in components){
        vue.component(i, components[i]);
    }
    vue.mount('#vuemain');
    window.vue = vue;
}