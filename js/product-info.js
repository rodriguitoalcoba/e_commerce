//creo la variable carro que es un array con todos los elementos del carrito
let carro = JSON.parse(localStorage.getItem("carrito"))
//objeto con los atributos que contienen los productos
let obj = {
    id : "",
    unitCost : "",
    image : "" ,
    currency : "" ,
    count : "",
    name : "",
    cantidad : 1
}


document.addEventListener("DOMContentLoaded", function(e){
    let identificador = localStorage.getItem("id")
getJSONData(`${PRODUCT_INFO_URL}${identificador}${EXT_TYPE}`).then(function (resultObj) 

{
        if (resultObj.status === "ok") {
            informacionProducto = resultObj.data;
            
            infoProducts();
            
        }
    }
);

getJSONData(`${PRODUCT_INFO_COMMENTS_URL}${identificador}${EXT_TYPE}`).then(function (resultObj) 
{
        if (resultObj.status === "ok") {
            comentarios = resultObj.data;           
            verComentarios();
            
            console.log(comentarios);
        }
    }
  );
})

function infoProducts(){
   obj.id = informacionProducto.id
   obj.currency = informacionProducto.currency
   obj.unitCost = informacionProducto.cost
   obj.count = informacionProducto.soldCount
   obj.name = informacionProducto.name
   obj.image = informacionProducto.images[0]

   if(informacionProducto.name) {
            document.getElementById("titulo").textContent = `
            ${informacionProducto.name} `
        }
        else {
            document.getElementById("titulo").textContent = `No hay información`
        }
        
        if(informacionProducto.cost && informacionProducto.currency && informacionProducto.description && informacionProducto.category && informacionProducto.soldCount && informacionProducto.images) {
            document.getElementById("precio").textContent = `${informacionProducto.cost}`
        }
}



function verComentarios() {
    let comentariosDelPro = ""
for (let comments of comentarios) {
     comentariosDelPro += `
     <div class="mt-2">
     <b>${comments.user} - <span class="fw-light">${comments.dateTime}</span></b>
     <p class="mb-0">${comments.description}</p>`+estrellas(comments.score)+`
     </div>
     ` 
     
   
document.getElementById("comentarios").innerHTML += comentariosDelPro;
 }
}


function estrellas(n){
    let puntuación = ""
        for (let i = 0; i < 5; i++) {
            
            if(i < n) {
                puntuación += `<span id="est"class="fa fa-star checked"></span>`
                
            }
            else {
                puntuación += `<span id="est"class="fa fa-star"></span>`
            }
            
        }
    return puntuación  
    }

    function carruselImg(){
        let imagenes = ""
        for (let i = 0; i < informacionProducto.images.length; i++) {
            const carru = informacionProducto.images[i];
            if(i == 0){
                imagenes += `
                <div class="carousel-item active">
                   <img src="${carru}" class="d-block w-100" alt="...">
               </div>
                `
            } else 
            imagenes += `
                <div class="carousel-item">
                   <img src="${carru}" class="d-block w-100" alt="...">
               </div>
                `
        } 
return imagenes
    }


function addCarro(id) {
    
    const existe = carro.some(obje => obje.id === id); {
        if(existe){
        alert("el elemento ya existe en el carrito")
        }
        else{
            carro.push(obj)
            localStorage.setItem("carrito",JSON.stringify(carro))
            console.log("se agrego");
        }
    }   
}


function infoProducts() {
   let tituloHTML = ""
   let contenido = ""
   let relacionado = ""
 
   obj.id = informacionProducto.id
   obj.currency = informacionProducto.currency
   obj.unitCost = informacionProducto.cost
   obj.count = informacionProducto.soldCount
   obj.name = informacionProducto.name
   obj.image = informacionProducto.images[0]


    if(informacionProducto.name) {
        tituloHTML = `
        <h2 class="mt-2">${informacionProducto.name}</h2>
        <hr>`
    }
    else {
        tituloHTML = `
        <h2>No hay información</h2>`
    }
    if(informacionProducto.cost && informacionProducto.currency && informacionProducto.description && informacionProducto.category && informacionProducto.soldCount && informacionProducto.images) {
        contenido = `
        
        <div class="d-flex justify-content-between">
        <h3 class="col-10" style="
            display: inline;
        ">Precio</h3> 
        <button id="btnC" onclick="addCarro(${informacionProducto.id})" class="btn btn-success">Comprar</button>
        <a href="cart.html" class="btn btn-success"><i class="fas fa-shopping-cart "></i></a>
        </div>
        <h4>${informacionProducto.currency} ${informacionProducto.cost}</h4>
        <br>
        <h3>Descripción</h3>
        <h4>${informacionProducto.description}</h4>
        <br>
        <h3>Categoria</h3>
        <h4>${informacionProducto.category}</h4>
        <br>
        <h3>Cantidad de Vendidos</h3>  
        <h4>${informacionProducto.soldCount}</h4>
        
    
        <div id="carouselExampleControls" class="carousel slide carousel-dark w-75 mx-auto" data-bs-ride="carousel">
  <div class="carousel-inner">`+carruselImg()+`
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div> 
<br>
<br>




        <br>
        <br>
        
        <h3>Comentarios</h3>

        <div id="comentarios">
        </div>             
        
        <div id="nuevoComentario">
        <h4 class="mt-3">Comentar</h4>
            <label></label>
            <textarea id="com" class="form-control mb-3"></textarea>
            <label for="puntuacion">Tu puntuación</label>
            <select id="punt" class="form-select w-25">
            <option selected disabled>seleccionar</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>                    
        </select>
            <button onclick="agregarComentario()" class="mt-3" id="enviar" type="submit">Enviar</button>
        </div> 

        <div id="proRel" class="d-flex justify-content-between ">
        </div>
        `
       
        
        for(let i = 0; i < informacionProducto.relatedProducts.length; i++){
         let proRel = informacionProducto.relatedProducts[i];
           relacionado +=`
           <div class=" mt-3 cursor-active" onclick="datosLs(${proRel.id})">
           <h4>${proRel.name}</h4>
           <img class="img-thumbnail" src="${proRel.image}"/>
           </div>
           `

        }
 
    }
     
        document.getElementById("info").innerHTML = tituloHTML;
        document.getElementById("info").innerHTML += contenido;
       
        document.getElementById("proRel").innerHTML += relacionado;
    }


    function agregarComentario() {
        const com = document.getElementById("com")
        const puntuado = document.getElementById("punt")
        let comOK = false
        let puntuadoOK = false
        if(com.value != "") {
       comOK = true
       com.classList.remove("is-invalid")
        } else {
          com.classList.add("is-invalid")
        }
        if(puntuado.value > 0) {
            puntuadoOK = true
            puntuado.classList.remove("is-invalid")
             } else {
               puntuado.classList.add("is-invalid")
             }
             if(comOK && puntuadoOK){
            
                    let comentarioUsuario = ""
                
                     comentarioUsuario += `
                    <div class="mt-2 ">
                     <b>${localStorage.getItem("Usuario")} - <span class="fw-light"></span></b>
                     <p class="mb-0">${com.value}</p>`+estrellas(puntuado.value)+`
                     </div>
                     ` 
                     document.getElementById("comentarios").innerHTML += comentarioUsuario;
                
             }
        console.log(com);}

    





     
        
    

    
    


    
    
    
