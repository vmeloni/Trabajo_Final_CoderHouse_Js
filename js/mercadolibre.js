
function ordenarPrecioMeli(a,b){
    var resultado = a.price - b.price;
    return resultado;
 }
 
function traerDatos(busqueda){
    $.get(`https://api.mercadolibre.com/sites/MLA/search?q=${busqueda}` , /** +busqueda = poner parámetro de lo que quiero buscar en la función del onclick */
        function(response, status) {
            const results = response.results
            //console.log(response.results);
            const resultadosSeleccion = results.map ( element => {
                let aux = {
                    title: element.title,
                    img: element.thumbnail,
                    id: element.id,
                    price: element.price,
                    stock: element.available_quantity,
                    link: element.permalink,
                }
                return aux;
            })  ;   
            //console.log(resultadosSeleccion);
            let vinoCards="";
            resultadosSeleccion.sort(ordenarPrecioMeli);
            for(i=0; i < resultadosSeleccion.length && i<8; i++ ) {
                vinoCards += `
                <div class="container">
                <div class="row style-lista">
                    <div class="col-6">${resultadosSeleccion[i].title}</div>
                    <div class="col-3">$ ${resultadosSeleccion[i].price}</div>
                    <div class="col-3"><button type="button" class="button-checkout"><a href="${resultadosSeleccion[i].link}" class="link-checkout"> Ver oferta </a></button></div>
                </div>
            </div>
                `
            }

            $("#mercadolibre").html(vinoCards);
            
        }
        )

} 

// GENERACIÓN LINK DE PAGO PARA MERCADO PAGO

async function generarMercadoPago(){
    let carrito_meli = [];
    carrito.forEach(item => {
        carrito_meli.push(
            {
                title: item["producto"].nombre,
                description: item["producto"].nombre,
                category_id:"Chipá",
                quantity: parseInt(item["cantidad"]),
                currency_id: "ARS",
                unit_price:item["producto"].precio*1.21,         
            }
        );
    }) ;

    const response = await fetch('https://api.mercadopago.com/checkout/preferences',{
         method:"POST",
         headers: {
             Authorization: "Bearer TEST-6860691441159942-051920-7d9f10ef3c3e3d3956e6da9fa7448c2f-90216890",
         },
         body: JSON.stringify({
             items: carrito_meli
         })
     });
     const data = await response.json()
     console.log(data);
     window.location.href=data["sandbox_init_point"]; 
 
 } 


 