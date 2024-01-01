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
            async flipActive(user){
                if(user.active){
                    const body = JSON.stringify({user_id:user._id,active:0});
                    const request = new Request("manage_users/setActive",
                    {
                        method: "POST",
                        headers: new Headers({'content-type': 'application/json'}),
                        cache: "default",
                        body: body
                    });
                    var result = await fetch(request).then((response) => response.json());
                    if(result.success){
                        user.active = 0;
                    }
                }else{
                    const body = JSON.stringify({user_id:user._id,active:1});
                    const request = new Request("manage_users/setActive",
                    {
                        method: "POST",
                        headers: new Headers({'content-type': 'application/json'}),
                        cache: "default",
                        body: body
                    });
                    var result = await fetch(request).then((response) => response.json());
                    if(result.success){
                        user.active = 1;
                    }
                }
            }
        }
    });
    for(var i in components){
        vue.component(i, components[i]);
    }
    vue.mount('#vuemain');
    window.vue = vue;
}