window.onload = function(){new Vue({
    el: "#vuemain",
    data(){return{
        email:'',
        password:'',
        passwordConfirm:''
    }},
    methods:{
        async register(){
            if(this.password == ''){
                alert("Need a password.");
                return;
            }
            if(this.email == ''){
                alert("Need an email.");
                return;
            }
            if(this.password != this.passwordConfirm){
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
                    password:this.password,

                })
                }
            );
            var data = await fetch(request).then((response) => response.json());
            console.log(data);
            if(data.success){
                alert("User created, poke Dol to get it activvated, currently making this invite only because is publicly accessible and there's permissions behind logging in. Also, don't wreck my stuff.");
            }else{
                alert(data.message);
            }
            
        }
    }
})
}