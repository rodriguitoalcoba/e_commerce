//Selecciono el input contraseña
const contraseña = document.getElementById("contraseña")
//Selecciono el input email
const email = document.getElementById("email")
//Selecciono la alerta de email
const alertmail = document.getElementById("alertEmail")
//Selecciono la alerta de contraseña
const alertcontra = document.getElementById("alertContra")
// hago un booleano para la contraseña y otro para el email
let emailvalido = false
let contraseñavalida = false


// esta funcion es llamada con un onclick y oninput
function validar() {
  // si el valor de contraseña es igual a un string vacío
  if(contraseña.value == ""){
    //muestro la alerta y le agrego la clase invalida
    alertcontra.classList.add("d-block")
    contraseña.classList.add("is-invalid")
  }
  else{
    // sino remuevo la alerta y la clase invalida, agrego la clase valida, a contraseñavalida le doy el valor de true
   //y guardo en el local storage el item contraseñavalida dandole el valor de la variable anteriormente mencionada
    alertcontra.classList.remove("d-block")
    contraseña.classList.remove("is-invalid")
    contraseña.classList.add("is-valid")
    contraseñavalida = true
    localStorage.setItem("contraseñavalida", contraseñavalida)
  
  }
  //con email hago exactamente lo mismo
  if(email.value == ""){
    alertmail.classList.add("d-block")
    email.classList.add("is-invalid")
  } 
  else{
    alertmail.classList.remove("d-block")
    email.classList.remove("is-invalid")
    email.classList.add("is-valid")
    emailvalido = true
    localStorage.setItem("emailvalido", emailvalido)
  }
  
}

function redirigir() {
  //si ambos valores son true redirigo al index y guardo en el local storage el item usuario al cual le doy el valor del email
  if(contraseñavalida && emailvalido){
    location.replace("index.html")
    localStorage.setItem("Usuario", email.value)
  }
}

contraseña.addEventListener("keypress",function(e){
  if (e.key === "Enter") {
    validar()
    redirigir()
    
  }
})
email.addEventListener("keypress",function(e){
  if (e.key === "Enter") {
    validar()
    redirigir()
    
  }
})
