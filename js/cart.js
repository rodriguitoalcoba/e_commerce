// const carro = document.querySelector("#carro")
const totalHtml = document.getElementById("total");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
let costo = [];
let subTotal = "";
const inputs = document.getElementsByTagName("input")
let validacionOk = 0
let sb = 0
let envioPrecio = 0;

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(`${CART_INFO_URL}${25801}${EXT_TYPE}`).then(function (resultObj) {
    if (resultObj.status === "ok") {
      carrito = resultObj.data.articles;

      console.log(carrito);
      if (!localStorage.getItem("carrito")) {
        localStorage.setItem("carrito", JSON.stringify(carrito));
      }

      carro();
      MostrarHtml();      
    }
  });
});

function carro() {
  if (JSON.parse(localStorage.getItem("carrito")).length == 0) {
    document.getElementById("todo").classList.add("d-none");
  }

  for (let i = 0; i < JSON.parse(localStorage.getItem("carrito")).length; i++) {
    const producto = JSON.parse(localStorage.getItem("carrito"))[i];
    {
      const { name, image, currency, unitCost, id, count } = producto;

      const row = document.createElement("tr");

      row.innerHTML = `<td>
                         <img src="${image}" width="100px">
                        </td>
                        <td>${name}</td>
                        <td>${currency} ${unitCost}</td>
                        <td><input  id="cantidad${i}" type="number"  min="1" value="${1}"></td>
                        <td id="subtotal${i}"><b>${  currency + " " + unitCost}</b></td>
                        <td><a href="#" class="borrar" onclick="borrarProducto(${i})">x</a>
                        </td>
                        `;

      contenedorCarrito.appendChild(row);
     
      if (currency == "UYU") {
        let obj = {
          count: 1,
          precio: JSON.parse(localStorage.getItem("carrito"))[i].unitCost / 40,
        }
        costo.push(obj);
      } else {
        let obj = {
          count: 1,
          precio: JSON.parse(localStorage.getItem("carrito"))[i].unitCost,
        }
        costo.push(obj);
      }
      

     
      document.getElementById("cantidad" + i).addEventListener("input", () => {
       
        if (document.getElementById("cantidad" + i).value >= 1) {
          let precio =
            producto.unitCost * document.getElementById("cantidad" + i).value;
       
          subTotal = `<b>${producto.currency + " " + precio}</b>`;
          document.getElementById("subtotal" + i).innerHTML = subTotal;

         
          costo[i].count = parseInt(document.getElementById("cantidad" + i).value);


if (document.getElementById("premium").checked) {
     MostrarHtml()
    calcularEnvios(`1.15`, `0.15 `)
    
}
if (document.getElementById("standar").checked) {
  MostrarHtml()
  calcularEnvios(`1.05`, `0.05 `)
  
  
}
      
if (document.getElementById("express").checked) {
  MostrarHtml()
  calcularEnvios(`1.07`, `0.07 `)
  
}
      
        
          MostrarHtml()
        }
      });
    }
    
  }
  
}

function MostrarHtml() {
  let total = ""
  let subTotal = ""
  let envio = ""

  sb = 0
  for (let i = 0; i < costo.length; i++) {
      const objetos = costo[i];
      sb += objetos.precio * objetos.count
  } 

  subTotal= `Usd <span id="precioSubtotal"> ${sb}</span>
        `;
  envio = ` <span id="precioEnvio"> Usd ${envioPrecio}</span>`;

  total = `Usd <span id="precioTotal"> ${sb + parseInt(envioPrecio)}</span>
        `;

  document.getElementById("subtotalPrecio").innerHTML = subTotal;
  document.getElementById("totalEnvio").innerHTML = envio;
  document.getElementById("totalPrecio").innerHTML = total;
  
}

function calcularEnvios(n, d) {
  let enviosP = (sb * n).toFixed(2);
  document.getElementById("precioTotal").textContent = `${enviosP} `;

  envioPrecio = (sb * d).toFixed(2);
console.log(sb,d);
  document.getElementById("precioEnvio").textContent = `Usd ${envioPrecio} `;
}



const borrarProducto = (n) => {
  let borrar = JSON.parse(localStorage.getItem("carrito"));

  borrar.splice(n, 1);

  localStorage.setItem("carrito", JSON.stringify(borrar));

  location.reload();
};




function validar() {
  validacionOk = 0
  validarDireccion()
  validarEnvios()
  validarModal()
  validarTarjeta()
  validarTransferencia()
if(validacionOk == 3){
  document.getElementById("alertaCompra").classList.remove("hide")
  setTimeout(function () {
    document.getElementById("alertaCompra").classList.add("hide")
  },3000)
}
}


function validarDireccion() {

  const calle = document.getElementById("calle");
  
  const esquina = document.getElementById("esquina");
  
  const numero = document.getElementById("numero");

  
  if(calle.value == ""){
    calle.classList.add("is-invalid")
  }
  else{
    calle.classList.remove("is-invalid")
    calle.classList.add("is-valid")
  }
  if(esquina.value == ""){
    esquina.classList.add("is-invalid")
  }
  else{
    esquina.classList.remove("is-invalid")
    esquina.classList.add("is-valid")
  }
  if(numero.value == ""){
    numero.classList.add("is-invalid")
  }
  else{
    numero.classList.remove("is-invalid")
    numero.classList.add("is-valid")
  }
  
  if(!numero.value == "" && !calle.value == "" && !esquina.value == ""){
    validacionOk++
  }

}
function validarModal() {
  btnModal()
  const metTarjeta = document.getElementById("tarjeta")
  const metCuenta = document.getElementById("transferencia")
  

  if (metTarjeta.checked) {
    for (const input of inputs) {
      if (input.classList.contains("transInp")) {
        input.value = ""
        input.classList.remove("is-invalid")
        input.classList.remove("is-valid")
        input.disabled = true
      }
    else {
      input.disabled = false
    }
  }

      
}
    
   if (metCuenta.checked) {
    for (const input of inputs) {
      if (input.classList.contains("tarjetainp")) {
        input.value = ""
        input.classList.remove("is-invalid")
        input.classList.remove("is-valid")
        input.disabled = true
      }
      else {
        input.disabled = false
      }
  }
}

} 

function btnModal(){

  if(document.getElementById("tarjeta").checked || document.getElementById("transferencia").checked){
     document.getElementById("guardar").disabled = false
 
   }
 }

function validarTransferencia() {
  if(document.getElementById("transferencia").checked) {
    if (document.getElementById("numCuenta").value == ""  || document.getElementById("numCuenta").value.length != 16) {
      document.getElementById("numCuenta").classList.add("is-invalid")
    }
    else{
      document.getElementById("numCuenta").classList.remove("is-invalid")
      document.getElementById("numCuenta").classList.add("is-valid")
      validacionOk ++
      document.getElementById("metodoDePago").textContent = "Transferencia Bancaria"
    }

   
  }
}


function validarTarjeta() {
  
  if(document.getElementById("tarjeta").checked) {
    
    if (document.getElementById("numTarjeta").value == "" || document.getElementById("numTarjeta").value.length != 16 ) {
      document.getElementById("numTarjeta").classList.add("is-invalid")
    }
    else{
      document.getElementById("numTarjeta").classList.remove("is-invalid")
      document.getElementById("numTarjeta").classList.add("is-valid")
      
    }
    
    if (document.getElementById("codigoTarjeta").value == "" || document.getElementById("codigoTarjeta").value.length != 3 ) {
      document.getElementById("codigoTarjeta").classList.add("is-invalid")
    }
    else{
      document.getElementById("codigoTarjeta").classList.remove("is-invalid")
      document.getElementById("codigoTarjeta").classList.add("is-valid")
    }
    
    if (document.getElementById("vencimientoTarjeta").value == "") {
      document.getElementById("vencimientoTarjeta").classList.add("is-invalid")
    }
    else{
      document.getElementById("vencimientoTarjeta").classList.remove("is-invalid")
      document.getElementById("vencimientoTarjeta").classList.add("is-valid")
    }
    if(document.getElementById("numTarjeta").classList.contains("is-valid") && document.getElementById("codigoTarjeta").classList.contains("is-valid") && document.getElementById("vencimientoTarjeta").classList.contains("is-valid")){
      validacionOk++
      document.getElementById("metodoDePago").textContent = "Tarjeta de crédito"
    }
  }
}

function validarEnvios() {
  if (!document.getElementById("premium").checked && !document.getElementById("standar").checked && !document.getElementById("express").checked) {
    document.getElementById("envioMsj").classList.add("d-block")
  }
  else{
    document.getElementById("envioMsj").classList.remove("d-block")
    validacionOk++
  }
}



 
 