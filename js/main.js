
/** Variables */
let i = 0;

let carrito = [] ;

let acumuladorCards = ``;
let acumuladorCarrito = ``;
let acumuladorTotal = 0;
let acumuladorImpuesto = 0;
let comprador = [];

// PRODUCTOS

const productoUno = new Producto(1,"Chorizo colorado", 1500, '/galeria/chipa-chorizo-colorado-1.png', 45);

productoUno.precio = 1500;

const productoDos = new Producto(2,"Queso Azul", 1500, '/galeria/chipa-queso-azul.png', 45);

const productoTres = new Producto(3,"Cheddar", 2000, '/galeria/chipa-cheddar.png', 60);

const productoCuatro = new Producto(4,"Dambo", 900, '/galeria/chipa-dambo.png', 23);

const productoCinco = new Producto(5,"Muzzarella", 1000, '/galeria/chipa-muzzarella.png', 0);
const productoSeis = new Producto(6,"Cuatro quesos", 2000, '/galeria/chipa-4-quesos.png', 40);

const productoSiete = new Producto(7,"Ají mala palabra", 900, '/galeria/chipa-picante.png', 40);

const productoOcho = new Producto(8,"Mediterráneo", 1200, '/galeria/chipa-mediterraneo.png', 40);

const productoNueve = new Producto(9,"Provolone", 1000, '/galeria/chipa-provolone.png', 40);

const baseDeDatosProductos = {} ;

const baseDeDatosProductos_sort = [productoUno, productoDos, productoTres, productoCuatro, productoCinco, productoSeis, productoSiete, productoOcho, productoNueve] ;

baseDeDatosProductos_sort.forEach(item => {
    baseDeDatosProductos[item.id] = item;
})


function ordenarCard (a, b) {
    var resultado = a.nombre.toLowerCase() > b.nombre.toLowerCase() ? 1 :
    a.nombre.toLowerCase() < b.nombre.toLowerCase() ? -1:0;
    return resultado;
}

function ordenarCarrito (a, b) {
    var resultado = a["producto"].nombre.toLowerCase() > b["producto"].nombre.toLowerCase() ? 1 :
    a["producto"].nombre.toLowerCase() < b["producto"].nombre.toLowerCase() ? -1:0;
    return resultado;
}

function ordenarPrecio(a,b){
   var resultado = a.precio - b.precio;
   return resultado;
}

function ordenarPrecioMayor(a,b){
    var resultado = b.precio - a.precio;
    return resultado;
 }

function iniciarCard(funcion_ordenar){
    acumuladorCards="";
    baseDeDatosProductos_sort.sort(funcion_ordenar);
    for (i=0; i < baseDeDatosProductos_sort.length; i++){
        Prod = baseDeDatosProductos_sort[i];
        acumuladorCards += Prod.iniciarDiv(i);
    };
    $("#productos").html(acumuladorCards);
}

function iniciarCarrito(){
    console.log("iniciar carrito");
    carrito.sort(ordenarCarrito);
    $('.badge').html(carrito.length);
    acumuladorCarrito = "";
    acumuladorSubtotal = 0;
    acumuladorTotal = 0;
    acumuladorImpuesto = 0;
    console.log(carrito);
    carrito.forEach(item => {
        acumuladorCarrito += item["producto"].iniciarCarrito(item["cantidad"]);
        acumuladorSubtotal += item["producto"].calcularSubtotal(item["cantidad"]);
        acumuladorImpuesto += item["producto"].calcularImpuestos(item["cantidad"]);
        acumuladorTotal += item["producto"].calcularTotal(item["cantidad"]);
    }) ;
    if(acumuladorTotal>0){
    $("#midetalle").html(`Carrito de compras ${acumuladorCarrito}
    <div class="hrsolid"></div>`);
    $("#subtotal").html(`Subtotal: $ ${acumuladorSubtotal}`);
    $("#carritoImpuestos").html(`IVA 21%: $ ${acumuladorImpuesto}
    <div class="hrsolid"></div>`);
    $("#carritoTotal").html(`Total: $ ${acumuladorTotal}`); 
    $("#misbotones").html(`
            <div class="col-lg-6">
                <div class="button-div">
                    <button class="btn-block" id="buttonVaciar" onclick="borrarCarrito()">vaciar</button>
                </div>
            </div>
            <div class="col-lg-6">
                <div id="miboton" class="button-div">
                <button id="botonCheckout" type="button" class="button-checkout btn-block"><a class="link-checkout">Ir a checkout</a></button>
                </div> 
            </div>
    `);

    $(document).ready(function(){
        $("#botonCheckout").click(function(){
            generarMercadoPago();
        });
    });

    } else {
        $("#midetalle").html(`<div>carrito vacío</div>`);
        $("#subtotal").html(``);
        $("#carritoImpuestos").html(``);
        $("#carritoTotal").html(``); 
        $("#miboton").html(``);
        }
}

function agregarAlCarrito (ubicarProducto) {
    Prod = baseDeDatosProductos_sort[ubicarProducto];
    comprador = document.getElementById("cantidad_" + ubicarProducto).value;
    if (Prod.validarStock(comprador)){
        carrito.push({"producto": Prod, "cantidad": comprador});
        localStorage.setItem("carrito", carrito_para_storage());
        iniciarCarrito();
        //iniciarCard();
    }
} 

function borrarCarrito(){

    carrito= [];
    localStorage.setItem("carrito", carrito_para_storage());
    iniciarCarrito();
    //iniciarCard();
}

function carrito_para_storage(){
    let resultado = []
    carrito.forEach(item => {
        resultado.push({"producto": item["producto"].id, "cantidad": item["cantidad"]})
    }) ;
    return JSON.stringify(resultado);
}

function carrito_desde_storage(){
    let carrito_storage = JSON.parse(localStorage.getItem("carrito")) || [] ;
    carrito_storage.forEach(item => {
        carrito.push({"producto": baseDeDatosProductos[item["producto"]], "cantidad": item["cantidad"]})
    }) ;
}

// Contenido para HTML

function freezar(){
    $("#divFreezer").html(`
    <div class="container">
        <div class="row">
            <div class="col-lg-6">
                <div>
                    <div class="section-title">Cuidados de tu chipá en el congelador</div>
                    <ul class="lista-coccion">
                        <li> Duran 3 meses máximo si los congelás en el freezer</li>
                        <li> Para cocinarlos, no necesitás descongelarlos previamente. Solo precalentar el horno <span class="cocinar-link">(los mismos pasos de calentar chipá al horno)</span></li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-6"><img src="galeria/congelar-chipa.png" class="img-fluid foto"></div>
        </div>
    </div> 
    `)
}

function sustentabilidad(){
    $("#divSustentable").html(`
       	<div class="container">
			<div class="row">
				<div class="col-lg-6">
					<img class="img-fluid foto" src="galeria/somos-sustentables.png">
				</div>
				<div class="col-lg-6">
					<div class="section-title mt-5">Emprendimiento sustentable</div>
						<ul class="lista-coccion">
							<li>Usamos bolsas compostables</li>
							<li>Nuestras tarjetas son de papel reciclado</li>
							<li>Usamos materia prima de primera calidad</li>
							<p class="tip-coccion">Nos importa el cuidado del medio ambiente y los productos que consumimos.</p>
						</ul>
				</div>
			</div>
		</div>
    `)
}

function cardsCoccion(){
    $("#cardCoccion").html(`
        <div class="section-title">Cómo cocinar tu chipa</div>
        <div class="card-group" >
            <div class="card">
                <div class="icon-card">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-flame" width="34" height="34" viewBox="0 0 24 24" stroke-width="1.5" stroke="#e2bc1a" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 12c2 -2.96 0 -7 -1 -8c0 3.038 -1.773 4.741 -3 6c-1.226 1.26 -2 3.24 -2 5a6 6 0 1 0 12 0c0 -1.532 -1.056 -3.94 -2 -5c-1.786 3 -2.791 3 -4 2z" />
                    </svg>
                </div>
            <div class="card-body">
                <h5 class="card-title">Horno</h5>
                <p class="card-text"><small class="text-muted">Nivel fácil</small></p>
                    <ul class="lista-coccion">
                        <li>Precalentar el horno a temperatura fuerte</li>
                        <li>Colocar las bolitas en una fuente (sin aceitar)</li>
                        <li>Ingresá la bandeja al horno (ya bien caliente)</li>
                        <li>Dejar por 15/20 minutos</li>
                        <p class="tip-coccion">Tip: Si el queso se escapa de las bolitas y la masa está dorada...¡Ya están listas!</p>
                    </ul>
            </div>
            </div>
            <div class="card">
                <div class="icon-card">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-flame" width="34" height="34" viewBox="0 0 24 24" stroke-width="1.5" stroke="#e2bc1a" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 12c2 -2.96 0 -7 -1 -8c0 3.038 -1.773 4.741 -3 6c-1.226 1.26 -2 3.24 -2 5a6 6 0 1 0 12 0c0 -1.532 -1.056 -3.94 -2 -5c-1.786 3 -2.791 3 -4 2z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-flame" width="34" height="34" viewBox="0 0 24 24" stroke-width="1.5" stroke="#e2bc1a" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 12c2 -2.96 0 -7 -1 -8c0 3.038 -1.773 4.741 -3 6c-1.226 1.26 -2 3.24 -2 5a6 6 0 1 0 12 0c0 -1.532 -1.056 -3.94 -2 -5c-1.786 3 -2.791 3 -4 2z" />
                    </svg>
                </div>
            <div class="card-body">
                <h5 class="card-title">Parrilla</h5>
                <p class="card-text"><small class="text-muted">Nivel medio</small></p>
                    <ul class="lista-coccion">
                        <li>Precalentar la fuente sin los bollos en la parrilla</li>
                        <li>Colocar las bolitas en la fuente (sin aceitar) una vez que haya tomado temperatura</li>
                        <li>Dejar por 15/20 minutos y en ese intevalor darlos vuelta así queda pareja la cocción</li>
                        <p class="tip-coccion">Tip: Si tapás la fuente podés hacerlos ahumados ¡Acompañalos con vino o cerveza!</p>
                    </ul>
            </div>
            </div>
            <div class="card card-sugerencia">
                <div class="icon-card">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bulb" width="34" height="34" viewBox="0 0 24 24" stroke-width="1.5" stroke="#bd4a8e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
                        <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
                        <line x1="9.7" y1="17" x2="14.3" y2="17" />
                    </svg>
                </div>
            <div class="card-body">
                <h5 class="card-title">Mandanos tu sugerencia</h5>
                <p class="card-text">Si querés probar alguna manera diferente de cocinar chipá y no querés arriesgar los tuyos, nosotros lo probamos por vos.</br>
                También podes comentarnos si te gustaría ver gustos nuevos.
                </p>
                <div class="contenedorBotonSugerencia">
                    <button type="submit" class="chipa1-button" id="enviarIdea">Enviar sugerencia</button>
                </div>
            </div>
            </div>
        </div>
    `);
}

function conocenos(){
    $("#contenidoConocenos").html(`
	    <div class="container">
            <div class="row" id="contenidoConocenos">
                <div class="col-lg-6">
                    <div class="conocenos-saludo">La receta de los Ávalos</div>
                    <div class="conocenos-texto">¡Hola! Soy María Agustina Ávalos. Vine a Buenos Aires en el 2015 y de Corrientes 	me traje la súper receta especial de chipá de la familia, que ya está aprobadísima en amigos y compañeros de trabajo. <br> Por eso decidí lanzarme en el 2020 con este emprendimiento. Me gustaría saber qué te parece, aunque te spoileo que te va a encantar.</div>
                    <div class="link-div">
                        <div class="seguime-insta">¡Seguime en Instagram!</div>
                        <a href="https://www.instagram.com/chipa.lacorren/" class="link-insta"> @chipa.lacorren</a>
                    </div>
                </div>	
                <div class="col-lg-6"><img src="galeria/soy-agustina-ls.png" class="img-fluid foto"  alt="foto-agustina-fundadora">
                </div>
            </div>
		</div>      
    `    
    )
}

function formulario_contacto(){
    $("#formulario_contacto").html(`
        <div class="container formulario forminterno">
            <div class="section-title">Contactate con nosotros</div>
            <form  id="form-clean">

                <div class="form-group">
                    <label for="sel1" class="lista-coccion">Selecciona un tipo de contacto</label>
                    <select class="form-control" id="sel1">
                    <option>Pedido</option>
                    <option>Consulta</option>
                    <option>Sugerencia</option>
                    <option>Otros</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="email" class="lista-coccion">E-mail</label>
                    <input type="email" class="form-control" placeholder="Ingresa tu email" id="email" onblur="alerta()">
                    <div class="email-invalido"></div>
                </div>

                <div class="form-group">
                    <label for="comment" class="lista-coccion">Comentario</label>
                    <textarea class="form-control" rows="5" placeholder="Ingresa tu comentario" id="comment"></textarea>
                </div>
            </form>
            <button type="submit" class="btn button-ver-ofertas" onclick="gracias()" >Enviar</button>
        </div>
    `)
}

function footer(){
    $("#footer").html(`
    <div class="container">
        <div class="row">
            <div class="col-lg-4 col-md-12">
                <div class="row datos-footer">
                    <div class="col-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#c9de00" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <circle cx="12" cy="11" r="3" />
                        <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                    </svg> 
                    </div>
                    <div class="col-10"> <a class="text-footer" id="infoPedidos"> San Telmo, CABA, Buenos Aires, Argentina</a></div>
                </div>
                <div class="row datos-footer">
                    <div class="col-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-instagram " style="text-align: center" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#c9de00" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <rect x="4" y="4" width="16" height="16" rx="4" />
                            <circle cx="12" cy="12" r="3" />
                            <line x1="16.5" y1="7.5" x2="16.5" y2="7.501" />
                            </svg>
                    </div>
                    <div class="col-10"><a href="https://www.instagram.com/chipa.lacorren/" class="text-footer">@chipa.lacorren</a></div>
                </div>
                <div class="row datos-footer">
                    <div class="col-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mail" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#c9de00" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <rect x="3" y="5" width="18" height="14" rx="2" />
                            <polyline points="3 7 12 13 21 7" />
                        </svg>
                    </div>
                    <div class="col-10 "> <a href="mailto: chipa.lacorren@gmail.com" class="text-footer"> chipa.lacorren@gmail.com</a></div>
                </div>
            </div>
            <div class="col-lg-8 col-md-12">
                <div id="suscribite">
                    <div class="texto-suscripcion"> Suscribite para estar actualizado de nuestras novedades y promociones</div>
                    <div class="row">
                        <div class="col-lg-10">
                            <form id="form-clean-suscripcion">
                                <div class="input-container">
                                    <input type="email" class="form-control" placeholder="Ingresa tu email" id="email_suscripcion" onblur="alerta_suscripcion()">
                                </div>
                                <div class="email-invalido-suscripcion"></div>
                            </form>
                        </div>
                        <div class="col-lg-2">
                            <button type="submit" onclick="gracias_suscripcion()" class="btn button-suscripcion btn-block">Enviar</button>
                        </div>
                    </div>	
                </div>
            </div>
        </div>
    </div>
    `)
}

// ANIMACIONES

function iniciarHero(){
    $("#hero").animate({top: '-600px',opacity:0});
    $("#hero").animate({top: '0px', opacity: 1}, 1000);
    $("#titulo-hero").animate({ opacity: 0});
    $("#titulo-hero").animate({ opacity: 0}, 1500);
    $("#titulo-hero").animate({ opacity: 1});
    $("#titulo-hero-1").animate({ opacity: 0});
    $("#titulo-hero-1").animate({ opacity: 0}, 1500);
    $("#titulo-hero-1").animate({ opacity: 1});
    $("#boton-hero").animate({opacity: 0});
    $("#boton-hero").animate({opacity: 0}, 1500);
    $("#boton-hero").animate({opacity: 1});
}

function iniciarNotificacion (){
$(document).ready(function(){
    $("#suscripcion_usuario").click(function(){
      $("#container_mensaje").toggle();
      $("#alert_success").animate({top: '0px'}, 500);
      $("#alert_success").animate({top: '-10px',}, 200);
      $("#alert_success").animate({top: '-10px', opacity:1}, 800);
      $("#alert_success").animate({opacity:0,}, 1500);
    });
  });
}

function scrollDivProductos (){
    $("#comprar").click(
        function(){
            $('html, body').animate({
                scrollTop: $("#container-productos").offset().top
            }, 1000);
        }
    )
}

function scrollDivButtonHeroComprar (){
    $("#comprar-chipa").click(
        function(){
            $('html, body').animate({
                scrollTop: $("#container-productos").offset().top
            }, 1000);
        }
    )
}

function scrollDivComoCocinar (){
    $("#cocinarchipa").click(
        function(){
            $('html, body').animate({
                scrollTop: $("#cocina-chipa").offset().top
            }, 1000);
        }
    )
}

function scrollDivFreezarChipa (){
    $("#freezarchipa").click(
        function(){
            $('html, body').animate({
                scrollTop: $("#freezar-chipa").offset().top
            }, 1000);
        }
    )
}

function scrollDivSustentabilidad (){
    $("#emprendimientosustentable").click(
        function(){
            $('html, body').animate({
                scrollTop: $("#emprendimiento-sustentable").offset().top
            }, 1000);
        }
    )
}

function scrollDivConocenos (){
    $("#conocenos").click(
        function(){
            $('html, body').animate({
                scrollTop: $("#conoce-receta").offset().top
            }, 1000);
        }
    )
}

function scrollDivPedidos (){
    $("#pedidos").click(
        function(){
            $('html, body').animate({
                scrollTop: $("#pedidos-retiros").offset().top
            }, 1000);
        }
    )
}

function scrollDivContactanos(){
    $("#contactanos").click(
        function(){
            $('html, body').animate({
                scrollTop: $("#enviar_sugerencia").offset().top
            }, 1000);
        }
    )
}

function scrollDivEnviarIdea(){
    $("#enviarIdea").click(
        function(){
            $('html, body').animate({
                scrollTop: $("#enviar_sugerencia").offset().top
            }, 1000);
        }
    )
}

function scrollDivInfoPedidos(){
    $("#infoPedidos").click(
        function(){
            $('html, body').animate({
                scrollTop: $("#pedidos-retiros").offset().top
            }, 1000);
        }
    )
}
// interacción con usuario

$(document).ready(function(){
    $("#botonOrdenarMenor").click(function(){
        iniciarCard(ordenarPrecio);
    });
});

$(document).ready(function(){
    $("#botonOrdenarMayor").click(function(){
        iniciarCard(ordenarPrecioMayor);
    });
});

$(document).ready(function(){
    $("#botonOrdenarAlfabeto").click(function(){
        iniciarCard(ordenarCard);
    });
});

// FUNCIONES - Inicializadas

iniciarCard(ordenarCard);
carrito_desde_storage();
iniciarCarrito();
iniciarHero();
cardsCoccion();
freezar();
conocenos();
sustentabilidad();
formulario_contacto();
footer();
iniciarNotificacion();
scrollDivProductos();
scrollDivButtonHeroComprar();
scrollDivFreezarChipa();
scrollDivSustentabilidad();
scrollDivComoCocinar();
scrollDivConocenos();
scrollDivPedidos();
scrollDivContactanos();
scrollDivEnviarIdea();
scrollDivInfoPedidos();
