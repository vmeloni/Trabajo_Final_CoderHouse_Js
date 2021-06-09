
function gracias(){
    var email = document.getElementById("email").value;
    if (!email.includes("@")) {
        $(".email-invalido").html(`<div class="texto-rojo">Ingrese un email válido para enviar el mensaje</div>`);

    } else {
        document.getElementById("form-clean").reset();
        $("#myModal").modal('toggle');
     }
}
function alerta(){
    var email = document.getElementById("email").value;
    if (!email.includes("@")) {
        $(".email-invalido").html(`<div class="texto-rojo"> email inválido</div>`);

    } else {
        $(".email-invalido").html(``);
    }
}



function gracias_suscripcion(){
    var email = document.getElementById("email_suscripcion").value;
    if (!email.includes("@")) {
        $(".email-invalido-suscripcion").html(`<div class="texto-rojo">Ingrese un email válido para enviar el mensaje</div>`);

    } else {
        document.getElementById("form-clean-suscripcion").reset();
        $("#myModal-suscripcion").modal('toggle');
     }
}
function alerta_suscripcion(){
    var email = document.getElementById("email_suscripcion").value;
    if (!email.includes("@")) {
        $(".email-invalido-suscripcion").html(`<div class="texto-rojo"> email inválido</div>`);

    } else {
        $(".email-invalido-suscripcion").html(``);
    }
}