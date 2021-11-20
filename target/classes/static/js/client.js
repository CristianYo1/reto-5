var urlBaseClient = "http://129.159.251.35/api/Client";
var urlBaseCloud = "http://129.159.251.35/api/Cloud";

$(document).ready(getClient);

function getClient() {
    $("#info").removeAttr("style");
    hideForm();
    $.ajax({
        dataType: 'json',
        url: urlBaseClient + "/all",
        type: "GET",
        success: function (response) {
            var misItems = response;
            for (let i = 0; i < misItems.length; i++) {
                $("#allItems").append("<tr>");
                $("#allItems").append("<td>" + misItems[i].name + "</td>");
                $("#allItems").append("<td>" + misItems[i].email + "</td>");
                $("#allItems").append("<td>" + misItems[i].age + "</td>");
                $("#allItems").append('<td><button class="btn btn-link" onclick="deleteClient(' + misItems[i].idClient + ')">Borrar Cliente</button>');
                $("#allItems").append('<td><button class="btn btn-link" onclick="getClientById(' + misItems[i].idClient + ')">Actualizar Cliente</button>');
                $("#allItems").append("</tr>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function getClouds() {
    $('#cloud').empty().append('<option>Select a Cloud</option>');
    $.ajax({
        dataType: 'json',
        url: urlBaseCloud + "/all",
        type: "GET",
        success: function (response) {
            var misItems = response;
            for (let i = 0; i < misItems.length; i++) {
                $("#cloud").append("<option>" + misItems[i].name + "</option>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function getClientById(idItem) {
    console.log("Ver id: " + idItem);
    $("#formPost").removeAttr("style");
    $("#btnEditar").removeAttr("style");
    $("#btnCancelar").removeAttr("style");
    $("#email2").attr("style", "display:none");
    $("#crearcliente").attr("style", "display: none");
    $("#btncrearCliente").attr("style", "display: none");
    $("#actualizarcliente").removeAttr("style");

    let opc = confirm('Recuerde que solo puede actualizar el nombre, edad y contraseña del cliente. / Remember that you just can update the client\'s name, age, password.');
    if (opc) {
        $.ajax({
            dataType: 'json',
            url: urlBaseClient + "/" + idItem,
            type: 'GET',
            success: function (response) {
                console.log(response);

                var item = response;
                $('#idClient').val(item.idClient),
                        $("#nameClient").val(item.name);
                $("#email").val(item.email),
                        $("#password").val(item.password);
                $("#age").val(item.age);
                var elemento = {
                    id: $('#idClient').val(item.idClient),
                    name: $("#nameClient").val(),
                    password: $("#password").val(),
                    year: $("#year").val()
                };
                var dataToSend = JSON.stringify(item);

            },
            error: function (jqXHR, textStatus, errorThrown) {}
        });
    }
}

function postClient() {
    let var2 = {

        name: $("#nameClient").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        age: $("#age").val(),

    };

    console.log(var2);
    if (checkClient(var2)) {
        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),

            url: urlBaseClient + "/save",

            success: function (response) {
                console.log(response);
                console.log("Se guardo correctamente");
                alert("Se guardo correctamente");
                window.location.reload();

            }
        });
    }

}

function putClient() {
    console.log("ejecutando funcion para actualizar");
    var elemento = {
        idClient: $("#idClient").val(),
        name: $("#nameClient").val(),
        password: $("#password").val(),
        age: $("#age").val()
    };
    console.log("id :" + elemento);
    var dataToSend = JSON.stringify(elemento);
    if (checkClient(elemento)) {
        let opc = confirm('¿Está seguro que desea actualizar este cliente?\n Are you sure that you want update this client?');
        if (opc) {
            $.ajax({
                contentType: 'application/json',
                data: dataToSend,
                url: urlBaseClient + "/update",
                type: "PUT",
                success: function (response) {
                    console.log(response);
                    alert("¡Cliente editada exitosamente!");
                    location.reload();
                },
                error: function (jqXHR, textStatus, errorThrown) {

                }
            });
        }
    }
}

function deleteClient(idClient) {
    console.log("eliminando id: " + idClient);
    let opc = confirm('¿Está seguro que desea eliminar este cliente?\n Are you sure that you want delete this client?');
    if (opc) {
        console.log("eliminando id: " + idClient);
        $.ajax({

            dataType: 'json',
            url: urlBaseClient + "/" + idClient,
            type: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                204: function (response) {
                    success:{

                        alert('Se ha eliminado el cliente');
                        getClient();
                        window.location.reload();
                    }

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}
function checkClient(client) {
    if (client.age <= 0 || client.email === '' || client.name === '' || client.password === '') {
        alert("Procure no dejar campos vacíos!");
        return false;
    }
    return true;
}

function showForm() {
    $("#formPost").removeAttr("style");
    $("#btnGuardar").removeAttr("style");
    $("#btnCancelar").removeAttr("style");
    $("#btncrearCliente").attr("style", "display: none");
    $("#crearcliente").attr("style");
    getClouds();
    hideTable();

}

function cancelar() {
    window.location.href = "client.html";
}
function hideForm() {
    $("#formPost").attr("style", "display: none");
    $("#btnGuardar").attr("style", "display: none");
}

function hideTable() {
    $("#info").attr("style", "display: none");
}


