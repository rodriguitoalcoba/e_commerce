
document.getElementById("boton").addEventListener("click",function validacion(){
  const contraseña = document.getElementById("contraseña")
  const email = document.getElementById("email")
  const alertmail = document.getElementById("errormail")
  const alertcontra = document.getElementById("errorcontra")
  let emailvalido = false
  let contraseñavalida = false

  if(contraseña.value == ""){
  alertcontra.classList.add("oculto")
  contraseña.classList.add("is-invalid")
} else if(contraseña.classList.contains("is-invalid")){
  contraseña.classList.remove("is-invalid")
}
else{
  contraseña.classList.add("is-valid")
  alertcontra.classList.remove("oculto")
  contraseñavalida = true

}
if(email.value == ""){
  alertmail.classList.add("oculto")
  email.classList.add("is-invalid")
} else if(email.classList.contains("is-invalid")){
  email.classList.remove("is-invalid")
}
else{
  email.classList.add("is-valid")
  alertmail.classList.remove("oculto")
  emailvalido = true
}
localStorage.setItem("emailvalido", emailvalido)
localStorage.setItem("contraseñavalida", contraseñavalida)

if(contraseñavalida && emailvalido){
  location.replace("index.html")
}
});


