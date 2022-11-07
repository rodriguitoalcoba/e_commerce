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
            verImagenes()
            
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
        
        if(informacionProducto.cost && informacionProducto.currency && informacionProducto.description && informacionProducto.category && informacionProducto.soldCount !== "" && informacionProducto.images) {
            document.getElementById("precio").textContent = `${informacionProducto.cost}`
            document.getElementById("descripcion").textContent = `${informacionProducto.description}`
            document.getElementById("categoria").textContent = `${informacionProducto.category}`
            document.getElementById("vendidos").textContent = `${informacionProducto.soldCount}`
            document.getElementById("btnC").setAttribute("onclick",`addCarro(${informacionProducto.id})`)
        }
        verRelacionados()
}
function verImagenes(){

    for (let i = 0; i < informacionProducto.images.length; i++) {
        const imgs = informacionProducto.images[i];
        
        document.getElementById("imagenes").innerHTML += `
        <img src="${imgs}" class="col-3 cursor-active" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}"> 
        `
      document.querySelector(".carousel-inner").getElementsByTagName("img")[i].src = `${imgs}`

    }
}



function verComentarios() {
    
for (let comments of comentarios) {
    
     document.getElementById("comentarios").innerHTML += `
     <div class="mt-2">
     <b>${comments.user} - <span class="fw-light">${comments.dateTime}</span></b>
     <p class="mb-0">${comments.description}</p>`+estrellas(comments.score)+`
     </div>
     ` 
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




    function agregarComentario() {
        const com = document.getElementById("comentarioUsuario")
        const puntuado = document.getElementById("puntaje")
        let comOK = false
        let puntuadoOK = false
        let fecha = new Date()
        
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
            
                document.getElementById("comentarios").innerHTML +=  `
                    <div class="mt-2 ">
                     <b>${localStorage.getItem("Usuario")} -<span class="fw-light"> ${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDate()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}</span></b>
                     <p class="mb-0">${com.value}</p>`+estrellas(puntuado.value)+`
                     </div>
                     ` 
             }          
        }
       
function verRelacionados(){
     for(let i = 0; i < informacionProducto.relatedProducts.length; i++){
         let proRel = informacionProducto.relatedProducts[i];
           
         document.getElementById("productosRelacionados").innerHTML +=`
           <div class=" mt-3 cursor-active" onclick="datosLs(${proRel.id})">
           <h4>${proRel.name}</h4>
           <img class="img-thumbnail" src="${proRel.image}"/>
           </div>
           `

        }
}
    





     
        
    

    
    


    
    
    
