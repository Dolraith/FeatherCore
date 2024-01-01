window.onload = function(){new Vue({
    el: "#vuemain",
    data(){return{
        email:"",
        password:""
        };
    },
    template:"#vuetemplate",
    methods:{
        async login(){
            const request = new Request("login/attempt",
            {
                method: "POST",
                headers: new Headers({'content-type': 'application/json'}),
                cache: "default",
                body: JSON.stringify({
                    email:this.email,
                    password:this.password
                })
            });
            var data = await fetch(request).then((response) => response.json());
            if(data.success){
                document.location.href="/";
            }else{
                alert(data.message);
            }
        }
    }
});};