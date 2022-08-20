
let categoriesArray = [];
const product_url = "https://japceibal.github.io/emercado-api/cats_products/101.json";

function Lista(p){
    let agregarAlHtml = "";

    for(let i = 0; i < p.length; i++){ 
        let productos = p[i];
        agregarAlHtml += `
        <div class="row">
        <div class="col-3">
            <img src= ${productos.image} alt="product image" class="img-thumbnail">
        </div>
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <div class="mb-1">
                <h3>${productos.name} - ${productos.currency} ${productos.cost}</h3> 
                <p> `+ productos.description +`</p> 
                </div>
                <small class="text-muted"> ${productos.soldCount} vendidos</small> 
            </div>

        </div>
    </div>
        `
        document.getElementById("pro").innerHTML = agregarAlHtml; 
    }
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(product_url).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            p = resultObj.data.products;
            Lista(p);
        }
    });
});