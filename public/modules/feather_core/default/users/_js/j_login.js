window.onload = function(){new Vue({
    el: "#vuemain",
    data(){return{
        email:"",
        password:""
    }},
    methods:{
        async login(){
            const request = new Request("login/attempt",
            {
                method: "POST",
                headers: new Headers({'content-type': 'application/json'}),
                cache: "default",
                body: JSON.stringify({
                    email:this.email,
                    password:this.password,
                })
            });
            var data = await fetch(request).then((response) => response.json());
            alert(data.message);
            console.log(data);
        }
    }
})}