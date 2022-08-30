
let categoriesArray = [];
const product_url = "https://japceibal.github.io/emercado-api/cats_products/101.json";

function Lista(p){
let agregarAlHtml = `
<div class="text-center p-4">
  <h2>Productos</h2>
  <p class="lead">
  Verás aquí todos los productos de la categoría Autos.</p>
</div>
<div class="container">
  <div class="row">
    <div class="col text-end">
      <div class="btn-group btn-group-toggle mb-4" data-bs-toggle="buttons">
        <input type="radio" class="btn-check" name="options" id="sortAsc">
        <label class="btn btn-light" for="sortAsc">A-Z</label>
        <input type="radio" class="btn-check" name="options" id="sortDesc">
        <label class="btn btn-light" for="sortDesc">Z-A</label>
        <input type="radio" class="btn-check" name="options" id="sortByCount" checked>
        <label class="btn btn-light" for="sortByCount"><i class="fas fa-sort-amount-down mr-1"></i></label>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-6 offset-lg-6 col-md-12 mb-1 container">
      <div class="row container p-0 m-0">
        <div class="col">
          <p class="font-weight-normal text-end my-2">Cant.</p>
        </div>
        <div class="col">
          <input class="form-control" type="number" placeholder="min." id="rangeFilterCountMin">
        </div>
        <div class="col">
          <input class="form-control" type="number" placeholder="máx." id="rangeFilterCountMax">
        </div>
        <div class="col-3 p-0">
          <div class="btn-group" role="group">
            <button class="btn btn-light btn-block" id="rangeFilterCount">Filtrar</button>
            <button class="btn btn-link btn-sm" id="clearRangeFilter">Limpiar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="list-group" id="cat-list-container">
    </div>
  </div>
</div>
`;

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
    getJSONData(PRODUCTS_URL+localStorage.getItem("catID")+".json").then(function(resultObj){
        if (resultObj.status === "ok")
        {
            p = resultObj.data.products;
            Lista(p);
        }
    });
});