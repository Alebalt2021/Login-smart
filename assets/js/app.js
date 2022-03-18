const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const contenedor = document.querySelector(".contenedor");

sign_up_btn.addEventListener("click", () => {
    contenedor.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    contenedor.classList.remove("sign-up-mode");
});



//Contraseñas 
var eye = document.getElementById('Eye');
var input = document.getElementById('Input');
eye.addEventListener("click", function(){
    if (input.type === "password") {
        input.type = "text";
        eye.style.opacity = 0.8;
    } else {
        input.type = "password";
        eye.style.opacity = 0.2;
    }
})

var ojo = document.getElementById('Ojo');
var pass = document.getElementById('Input-pass');
ojo.addEventListener("click", function(){
    if (pass.type === "password") {
        pass.type = "text";
        ojo.style.opacity = 0.8;
    } else {
        pass.type = "password";
        ojo.style.opacity = 0.2;
    }
})