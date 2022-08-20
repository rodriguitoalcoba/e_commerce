document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    localStorage 
    let contraseñavalida = localStorage.getItem("contraseñavalida")
    let emailvalido = localStorage.getItem("emailvalido")
    console.log(emailvalido)
    if (!contraseñavalida && !emailvalido){
        location.replace("rodriguitoalcoba.github.io/e_commerce/login.html")
    }
});