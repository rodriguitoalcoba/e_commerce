//VARIABLES
let minimo = undefined;
let maximo = undefined;
let listaProductos = []
const ascendente = "asc"
const descendente = "desc"
const importancia = "rel"






//FUNCIONES



function Lista(){
let agregarAlHtml = `` 

    for(let i = 0; i < listaProductos.length; i++){ 
        let productos = listaProductos[i];

        if (
            (minimo == undefined || (minimo != undefined && parseInt(productos.cost) >= minimo)) &&
            (maximo == undefined || (maximo != undefined && parseInt(productos.cost) <= maximo)) 
        ){
        agregarAlHtml += `
        <div class="list-group-item list-group-item-action cursor-active articulo">
        <div onclick="datosLs(${productos.id})" class="row">
        <div class="col-3">
        
            <img (${productos.id})" src= ${productos.image} alt="product image" class="img-thumbnail">
        </div>
        <div class="col ">
            <div class="d-flex w-100 justify-content-between">
                <div class="mb-1">
                <h3><span > ${productos.name}</span> - ${productos.currency} ${productos.cost}</h3> 
                <p> `+ productos.description +`</p> 
                </div>
                <small class="text-muted"> ${productos.soldCount} vendidos</small> 
                </div>
            </div>
            

        </div>
    </div>
        `}
        document.getElementById("pro").innerHTML = agregarAlHtml; 
        
    }
    
    document.getElementById("buscador").addEventListener("keyup", e=>{

        if (e.target.matches("#buscador")){
      
            document.querySelectorAll(".articulo").forEach(product =>{
      
              if (product.textContent.toLowerCase().includes(e.target.value.toLowerCase())) {
                product.classList.remove("filtro")
              }
                else{
                    product.classList.add("filtro")
                }
                  
            })
      }
    })
}



function ordenado(condicion, lista){
    let listaOrdenada = []; 
    if (condicion === ascendente)
    listaOrdenada = lista.sort(function(a, b) {
      if ( a.cost < b.cost ){ return -1; }
      if ( a.cost > b.cost ){ return 1; }
      return 0;
  })
  else if (condicion === descendente){
        listaOrdenada = lista.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
      }else if (condicion === importancia) {
        listaOrdenada = lista.sort((a, b) => {
            if (a.soldCount > b.soldCount) {
                return -1;
            }
            if (a.soldCount < b.soldCount) {
                return 1;
            }
            return 0;
        });
    }
    return listaOrdenada
  }


//EVENTOS


//Para que carguen los productos
document.addEventListener("DOMContentLoaded", function(e){
  getJSONData(PRODUCTS_URL+localStorage.getItem("catID")+".json").then(function(resultObj){
      if (resultObj.status === "ok")

      {
          listaProductos = resultObj.data.products;
          Lista();
      }
  console.log(listaProductos);
  });

  //Filtrar de mayor a menor
  document.getElementById("sortDesc").addEventListener("click", () =>{  
    Lista(ordenado(descendente,listaProductos))
    })

    //Filtrar de menor a mayor
    document.getElementById("sortAsc").addEventListener("click", () =>{  
      Lista(ordenado(ascendente,listaProductos))
      })


    //Filtrar por más vendidos
    document.getElementById("sortByCount").addEventListener("click", () =>{  
        Lista(ordenado(importancia,listaProductos))
        })

    //Filtrar por máximo    
    document.getElementById("filtro").addEventListener("click", () => {
        maximo = document.getElementById("maximo").value;
                
        if (maximo != undefined && maximo != "" && parseInt(maximo) >= 0) {
            maximo = parseInt(maximo);
        } else {
            maximo = undefined;
        }
        Lista()
        });

//Filtrar por mínimo
    document.getElementById("filtro").addEventListener("click", () => {
    minimo = document.getElementById("minimo").value;
    
        if (minimo != undefined && minimo != "" && parseInt(minimo) >= 0) {
            minimo = parseInt(minimo);
        } else {
            minimo = undefined;
        }

            Lista();
        });
   
});



//Para Limpiar lo anterioirmente buscado
document.getElementById("Limpiar").addEventListener("click", () => {
    document.getElementById("minimo").value = "";
    document.getElementById("maximo").value = "";

    minimo = undefined;
    maximo = undefined;

    Lista(listaProductos);

    
});




document.getElementById("pro").addEventListener("click", () => {
        
        location.replace("product-info.html")    
                   
})








