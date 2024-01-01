import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
export function initVue(initData, components){    
    var vue = createApp({
        data(){
            var data = {
                email:'',
                password:'',
                passwordConfirm:''
            };
            for(i in initData){
                data[i] = initData[i];
            }
            return data;
        },
        template:"#vuetemplate",
        methods:{
            async register(){
            if(this.password === ''){
                alert("Need a password.");
                return;
            }
            if(this.email === ''){
                alert("Need an email.");
                return;
            }
            if(this.password !== this.passwordConfirm){
                alert("Passwords don't match, fixit.");
                return;
            }
            const request = new Request(
                "register/register",
                {
                  method: "POST",
                  headers: new Headers({'content-type': 'application/json'}),
                  cache: "default",
                  body: JSON.stringify({
                    email:this.email,
                    password:this.password

                })
                }
            );
            var data = await fetch(request).then((response) => response.json());
            if(data.success){
                alert("User created, poke Dol to get it activvated, currently making this invite only because is publicly accessible and there's permissions behind logging in. Also, don't wreck my stuff.");
            }else{
                alert(data.message);
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