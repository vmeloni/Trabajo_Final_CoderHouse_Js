
class Producto {

    constructor(id,nombre,precio,imagen,stock){
      this.id = id;
      this.precio = precio;
      this.imagen = imagen;
      this.nombre = nombre;
      this.stock = stock;
    }
  
    validarStock(cantidad){
      return this.stock >= cantidad;
    }
  
    restaStock(cantidad){
      this.stock = this.stock - cantidad;
      if(cantidad > 0 && cantidad < this.stock){
        alert(`Tenemos stock. Restan ${this.stock} unidades`);
        document.getElementById("mistock").innerHTML = `
        <H6 class="rows"> Stock </H6>
        <div class="texto-recordatorio">Quedan ${this.stock} unidades
         </div>
        `;
      }
      else {
        alert(`Por favor, ingresa una cantidad disponible`)
      }
    }
  
    detalleCompra(){
      if(comprador > 0 && comprador < this.stock){

        $("#micarrito").append(`
        <div class="items-carrito">${comprador} ${this.nombre} (Precio unitario:$ ${this.precio}) por: ${this.precio*comprador}
        </div>
        `)
        
        ;} else {
 
        $("#micarrito").append(`No hay productos en el carrito`)
        }
    }
  


    iniciarDiv (posicion){
      var card = `<div class="col-lg-4 col-md-6 mb-4 card-animation">
        <div class="card h-100">
          <a href="#"><img class="card-img-top" src="${this.imagen}" alt="Foto de chipa"></a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#" class="card-titulo"> ${this.nombre}</a>
              <!-- <div class="conteo-stock"> Quedan ${this.stock} unidades disponibles </div>-->
            </h4>
			      <div class="card-subtitulo">
              <div class="precio"> $ ${this.precio} </div>
              <div class="precio-aclaracion"> Packs de 6 unidades </div>
            </div>
          </div>
          <div>
            <div class="row">
              <div class="col-8">
              <label for="cantidad_${posicion}" class="label-style"> Cantidad de packs</label>
              </div>
              <div class="col-4">
                <select name="cantidad_${posicion}" id="cantidad_${posicion}" class="select-style">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                </select>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <button class="chipa-button" id="chipa-button" onclick="agregarAlCarrito(${posicion})" >Agregar al carrito</button>
          </div>
        </div>
      </div>`;
      return card;

      
    }

    iniciarCarrito (cantidad){
        var card = `
        <div class="lista-carrito">${cantidad} ${this.nombre} $ ${this.precio}</div>`;
        return card;
      }
  
    calcularTotal (cantidad){
      let precioFinal = parseInt(this.precio*cantidad*1.21);
      return precioFinal;
    }

    calcularImpuestos(cantidad){
      return parseInt (this.precio*cantidad*0.21);
    }

    calcularSubtotal(cantidad){
      return parseInt (this.precio*cantidad);
    }
    




  }



