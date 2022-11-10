//Selecciono los inputs del formulario
const nombre = document.getElementById("nombre")
const nombre2 = document.getElementById("segundoNombre")
const apellido = document.getElementById("apellido")
const apellido2 = document.getElementById("segundoApellido")
const email = document.getElementById("email")
const tel = document.getElementById("telefono")
const imagen = document.getElementById("imagen")
const inputImagen = document.getElementById("inpImagen")


addEventListener("DOMContentLoaded", ()=>{
    //Si no existe en el local storage el item "emailvalido" redirige al login
    if(!localStorage.getItem("emailvalido")){
        location.replace("login.html")
    }
    mostrarDatos()
    
})

function mostrarDatos() {
  
    //al input email le doy el valor del item usuario
    email.value = `${localStorage.getItem("Usuario")}`
    // si en local storage existe el item nombre hago que le de su valor al input nombre
    if(!localStorage.getItem("imagen")){
      imagen.src = "img/img_perfil.png"
    }
    else{
     imagen.setAttribute("src",localStorage.getItem("imagen"))

    }

if(localStorage.getItem("nombre")){
    nombre.value = `${localStorage.getItem("nombre")}`
}
// si en local storage existe el item apellido hago que le de su valor al input apellido
if(localStorage.getItem("apellido")){
    apellido.value = `${localStorage.getItem("apellido")}`
}
// si en local storage existe el item nombre2 hago que le de su valor al input segundo nombre
if(localStorage.getItem("nombre2")){
    nombre2.value = `${localStorage.getItem("nombre2")}`
}
// si en local storage existe el item apellido2 hago que le de su valor al input segundo apellido
if(localStorage.getItem("apellido2")){
    apellido2.value = `${localStorage.getItem("apellido2")}`
}
// si en local storage existe el item tel hago que le de su valor al input telefono
if(localStorage.getItem("tel")){
    tel.value = `${localStorage.getItem("tel")}`
}
}

function validarDatos() {

    if(nombre.value == ""){
        document.getElementById("alertaNombre").classList.add("d-block")
      }
      
      else{
        document.getElementById("alertaNombre").classList.remove("d-block")
        localStorage.setItem("nombre", nombre.value)
      }
      
    if(apellido.value == ""){
        document.getElementById("alertaApellido").classList.add("d-block")
      }
      
      else{
        document.getElementById("alertaApellido").classList.remove("d-block")
        localStorage.setItem("apellido", apellido.value)
      }
      
      if(!nombre2.value == ""){
        localStorage.setItem("nombre2", nombre2.value)
      }
      if(!apellido2.value == ""){
        localStorage.setItem("apellido2", apellido2.value)
      }
      if(tel.value !== "" && tel.value.length >= 6){
        localStorage.setItem("tel", tel.value)
      }
      if(inputImagen !== ""){
        localStorage.setItem("imagen", URL.createObjectURL(inputImagen.files[0]))
      }


}

inputImagen.addEventListener("change", function () {
  const reader = new FileReader();

  reader.addEventListener("load",()=>{
    imagen.src = reader.result
    localStorage.setItem("imagen", reader.result)
  })

  reader.readAsDataURL(this.files[0]);
  
})
