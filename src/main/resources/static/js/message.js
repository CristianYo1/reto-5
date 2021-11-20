var urlBaseMessage = "http://129.159.251.35/api/Message";
var urlBaseClient = "http://129.159.251.35/api/Client";
var urlBaseCloud = "http://129.159.251.35/api/Cloud";

$(document).ready(getMessage);
function getMessage() {
    $("#info").removeAttr("style");
    hideForm();

    $.ajax({
        url: urlBaseClient + "/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            clientes = respuesta
            cargarClientes(clientes);

        }
    });
    $.ajax({
        url: urlBaseCloud + "/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            nubes = respuesta
            cargarCloud(nubes);
        }
    });


    $.ajax({
        dataType: 'json',
        url: urlBaseMessage + "/all",
        type: "GET",
        success: function (response) {
            var misItems = response;
            for (let i = 0; i < misItems.length; i++) {
                $("#allItems").append("<tr>");
                $("#allItems").append("<td>" + misItems[i].messageText + "</td>");
                $("#allItems").append("<td>" + misItems[i].cloud.name + "</td>");
                $("#allItems").append("<td>" + misItems[i].client.name + "</td>");
                $("#allItems").append('<td><button class="btn btn-link" onclick="deleteMessage(' + misItems[i].idMessage + ')">Borrar Mensaje</button>');
                $("#allItems").append('<td><button class="btn btn-link" onclick="getMessageById(' + misItems[i].idMessage + ')">Actualizar Mensaje</button>');
                $("#allItems").append("</tr>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function cargarClientes(clientes) {
    var opciones;
    for (var i = 0; i < clientes.length; i++) {
        opciones += `
            <option value="${clientes[i].idClient}">${clientes[i].name}</option>`;
    }
    $("#client").html(opciones);
}

function cargarCloud(nubes) {
    var opciones;
    for (var i = 0; i < nubes.length; i++) {
        opciones += `
            <option value="${nubes[i].id}">${nubes[i].name}</option>`;
    }
    $("#cloud").html(opciones);
}

function getMessageById(idMessage) {
    console.log("Ver id: " + idMessage);
    $("#formPost").removeAttr("style");
    $("#btnEditar").removeAttr("style");
    $("#btnCancelar").removeAttr("style");
    $("#nube").attr("style", "display:none");
    $("#cliente").attr("style", "display:none");
    $("#mensaje").attr("style", "display:none");
     $("#crearmensaje").attr("style", "display: none");
    $("#btncrearMensaje").attr("style", "display: none");
    $("#actualizarmensaje").removeAttr("style");
    console.log("id ver : " + idMessage);
    let opc = confirm('Recuerde que solo puede actualizar el mensaje / Remember that you just can update the message text');
    if (opc) {
        $.ajax({
            dataType: 'json',
            url: urlBaseMessage + "/" + idMessage,
            type: 'GET',
            success: function (response) {
                console.log(response);
                var item = response;
                $("#messageText").val(item.messageText),
                        $("#cloud").val(item.cloud.name);
                $("#client").val(item.client.name);
                var elemento = {
                    idMessage: $('#idMessage').val(item.idMessage),
                    messageText: $("#messageText").val(),
                    cloud: $("#cloud").val(),
                    client: $("#client").val()
                };
                var dataToSend = JSON.stringify(item);

            },
            error: function (jqXHR, textStatus, errorThrown) {}
        });
    }
}


function postMessage() {
    let var2 = {

        messageText: $("#messageText").val(),
        cloud: {id: +$("#cloud").val()},
        client: {idClient: +$("#client").val()},

    };

    console.log(var2);
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),

        url: urlBaseMessage + "/save",

        success: function (response) {
            console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()

        }  
    });

}


function putMessage() {
    console.log("ejecutando funcion para actualizar");

    var elemento = {
        idMessage: $("#idMessage").val(),
        messageText: $("#messageText").val(),
    };
    console.log("nn:" + elemento.idMessage);
    var dataToSend = JSON.stringify(elemento);
    if (checkMessage(elemento)) {
        let opc = confirm('¿Está seguro que desea actualizar este mensaje?\n Are you sure that you want update this message?');
        if (opc) {
            $.ajax({
                contentType: 'application/json',
                data: dataToSend,
                url: urlBaseMessage + "/update",
                type: "PUT",
                success: function (response) {
                    alert("Edición exitosa!");
                    location.reload();
                },
                error: function (jqXHR, textStatus, errorThrown) {

                }
            });
        }
    }
}

function deleteMessage(idMessage) {
    console.log("eliminando id: " + idMessage);
    let opc = confirm('¿Está seguro que desea eliminar este mensaje?\n Are you sure that you want delete this messsage?');
    if (opc) {

        $.ajax({
            dataType: 'json',
            url: urlBaseMessage + "/" + idMessage,
            type: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                204: function (response) {
                    success:{
                        // console.log(response);
                        alert('Se ha eliminado el mensaje');
                        getMessage();
                        window.location.reload();
                    }

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}

function checkMessage(message) {
    if (message.idMessage <= 0 || message.messageText === '' || message.cloud === '' || message.client === '') {
        alert("Procure no dejar campos vacíos!");
        return false;
    }
    return true;
}

function showForm() {
    $("#formPost").removeAttr("style");
    $("#btnGuardar").removeAttr("style");
    $("#btnCancelar").removeAttr("style");
     $("#crearnube").attr("style", "display: none");
    $("#btncrearNube").attr("style", "display: none");
    $("#actualizarnube").removeAttr("style");
     $("#crearmensaje").attr("style", "display: none");
    $("#btncrearMensaje").attr("style", "display: none");
    $("#actualizarmensaje").removeAttr("style");
    hideTable();

}

function cancelar() {
    window.location.href = "message.html";
}

function hideForm() {
    $("#formPost").attr("style", "display: none");
    $("#btnGuardar").attr("style", "display: none");
}

function hideTable() {
    $("#info").attr("style", "display: none");
}






