const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";


let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
    
}

function cerrar() {
  localStorage.removeItem("emailvalido")
  localStorage.removeItem("contraseñavalida")
  location.replace("login.html")
}

function datosLs(id){
  localStorage.setItem("id", id)
  window.location = "product-info.html" 
}

document.addEventListener("DOMContentLoaded", function(){
  const perfil = document.getElementsByClassName("nav-item")[3];
  perfil.innerHTML = ` 
  
  <div class="dropdown ">
  
  <a  class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" id="desplegar"> ${localStorage.getItem("Usuario")}</a>
  
  <div class="dropdown-menu w-100" aria-labelledby="desplegar">
  
  <a href="cart.html" class="dropdown-item">Mi Carrito</a>
  <a href="my-profile.html" class="dropdown-item">Mi Perfil</a>
  <p class="dropdown-item cursor-active" onclick="cerrar()" id="salir">Cerrar Sesión</p>
  
  </div>
  </div>
  `;
});

