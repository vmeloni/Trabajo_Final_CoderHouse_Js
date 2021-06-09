class Zonas {
	constructor (zona,precio,entrega){
	this.zona = zona;
	this.precio = precio;
	this.entrega = entrega;
	}

  agregarZona_lista (div_id){
    let div = document.createElement("li");
    div.innerHTML = `
    <div class="row">
        <div class="col-4 zona-items"> ${this.zona}</div>
        <div class="col-4 zona-items"> $ ${this.precio}</div>
        <div class="col-4 zona-items"> ${this.entrega}</div>
    </div>
    `;
    document.getElementById(div_id).appendChild(div);
}
}

const zona1 = new Zonas ("San Telmo", 0.00 ,"24 hs");
const zona2 = new Zonas ("Retiro", 100, "24 hs");
const zona3 = new Zonas ("Monserrat", 100, "24 hs");
const zona4 = new Zonas ("Puerto Madero", 100, "24 hs");
const zona5 = new Zonas ("Barrio Norte", 130, "24 hs");
const zona6 = new Zonas ("Almagro", 150, "48 hs");
const zona7 = new Zonas ("San Nicolás", 130, "24 hs");
const zona8 = new Zonas ("Palermo", 150, "48 hs");


const baseDeDatosZonas = [zona1, zona2, zona3, zona4, zona5, zona6, zona7, zona8] ;

function ordenarZona (a, b) {
    var resultado = a.zona.toLowerCase() > b.zona.toLowerCase() ? 1 :
    a.zona.toLowerCase() < b.zona.toLowerCase() ? -1:0;
    return resultado;
}

function iniciarZona (){
    baseDeDatosZonas.sort(ordenarZona);
    document.getElementById("listaDelivery").innerHTML = "";
    baseDeDatosZonas.forEach(item => item.agregarZona_lista("listaDelivery"));
    $("#listaDelivery").css({
    "color": "var(--negro)",
    "font-size": "0.8em",
});
    $("#listaDelivery").html();
}


function buscadorBarrios() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("listaDelivery");
  li = ul.getElementsByTagName('li');

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("div")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}  


iniciarZona();