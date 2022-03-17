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
var Eye = document.getElementById("#Eye");
var input = document.getElementById("#pass-new");
Eye.addEventListener("click", () => {
        if (input.type === "password") {
            input.type = "text";
            Eye.style.opacity = 0.8;
        } else {
            input.type = "password";
            Eye.style.opacity = 0.2;
        }
    })

var ojo = document.getElementById("#ojo");
var input = document.getElementById("#pass-ojo");
ojo.addEventListener("click", function () {
    if (input.type === "password") {
        input.type = "text";
        ojo.style.opacity = 0.8;
    } else {
        input.type = "password";
        ojo.style.opacity = 0.2;
    }
})
