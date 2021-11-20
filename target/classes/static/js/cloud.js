var urlBaseCloud = "http://129.159.251.35/api/Cloud";
var urlBaseCategory = "http://129.159.251.35/api/Category";
$(document).ready(getCloud);
$(document).ready(autoInicio);

function getCloud() {
    $("#info").removeAttr("style");
    hideForm();
    $.ajax({
        dataType: 'json',
        url: urlBaseCloud + "/all",
        type: "GET",
        success: function (response) {
            console.log(response);
            var misItems = response;
            for (let i = 0; i < misItems.length; i++) {
                $("#allItems").append("<tr>");
                $("#allItems").append("<td>" + misItems[i].name + "</td>");
                $("#allItems").append("<td>" + misItems[i].brand + "</td>");
                $("#allItems").append("<td>" + misItems[i].year + "</td>");
                $("#allItems").append("<td>" + misItems[i].description + "</td>");
                $("#allItems").append("<td>" + misItems[i].category.name == null ? "No hay categorias" : misItems[i].category.name + "</td>");
                $("#allItems").append('<td><button class="btn btn-link" onclick="deleteCloud(' + misItems[i].id + ')">Borrar Nube</button>');
                $("#allItems").append('<td><button class="btn btn-link" onclick="getCloudById(' + misItems[i].id + ')">Actualizar Nube</button>');
                $("#allItems").append("</tr>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function getCloudById(idCloud) {
    console.log("Ver id: " + idCloud);
    $("#formPost").removeAttr("style");
    $("#btnEditar").removeAttr("style");
    $("#btnCancelar").removeAttr("style");
    $("#categorydata").attr("style", "display:none");
    $("#crearnube").attr("style", "display: none");
    $("#btncrearNube").attr("style", "display: none");
    $("#actualizarnube").removeAttr("style");
    console.log("id ver : " + idCloud);
    let opc = confirm('Recuerde que solo puede actualizar la marca, nombre, año y descripción de la nube. / Remember that you just can update the cloud\'s brand, name, year and description.');
    if (opc) {
        $.ajax({
            dataType: 'json',
            url: urlBaseCloud + "/" + idCloud,
            type: 'GET',
            success: function (response) {
                console.log(response);
                var item = response;
                $("#brand").val(item.brand),
                        $("#year").val(item.year);
                $("#categoryid").val(item.categoryid);
                $("#nameCloud").val(item.name);
                $("#descriptionCloud").val(item.description);
                var elemento = {
                    id: $('#idCloud').val(item.id),
                    brand: $("#brand").val(),
                    year: $("#year").val(),
                    name: $("#nameCloud").val(),
                    description: $("#descriptionCloud").val()
                };
                var dataToSend = JSON.stringify(item);

            },
            error: function (jqXHR, textStatus, errorThrown) {}
        });
    }
}

function autoInicio() {
    console.log("Se esta ejecutando el autoinicio");
    $.ajax({
        url: urlBaseCategory + "/all",
        type: "GET",
        dataType: 'json',
        success: function (json) {
            console.log(json);
            categorias = json;
            show(json);
        },
    })

}

function show(json) {
    var opciones;
    for (var i = 0; i < json.length; i++) {
        opciones += `
            <option value="${json[i].id}">${json[i].name}</option>`;
    }
    ;
    $("#categoryname").html(opciones);
}

function postCloud() {
    $("#formPost").removeAttr("style");
    let var2 = {

        brand: $("#brand").val(),
        name: $("#nameCloud").val(),
        year: $("#year").val(),
        description: $("#descriptionCloud").val(),
        category: {id: +$("#categoryname").val()},
    };

    console.log(var2.category);
    if (checkCloud(var2)) {

        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),

            url: urlBaseCloud + "/save",

            success: function (json, status, xhr) {
                console.log("Se guardo correctamente");
                alert("Se guardo correctamente");
                window.location.reload()

            },

            error: function (jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se guardo correctamente");


            }
        });
    }
    ;

}

function putCloud() {
    console.log("ejecutando funcion para actualizar");


    var elemento = {
        id: $("#idCloud").val(),
        brand: $("#brand").val(),
        name: $("#nameCloud").val(),
        year: $("#year").val(),
        description: $("#descriptionCloud").val()
    }

    var dataToSend = JSON.stringify(elemento);
    if (checkCloud(elemento)) {
        let opc = confirm('¿Está seguro que desea actualizar esta nube?\n Are you sure that you want update this cloud?');
        if (opc) {

            $.ajax({
                contentType: 'application/json',
                data: dataToSend,
                url: urlBaseCloud + "/update",
                type: "PUT",
                success: function (response) {
                    alert("¡Nube editada exitosamente!");
                    location.reload();
                },
                error: function (jqXHR, textStatus, errorThrown) {

                }
            });
        }
    }
}

function deleteCloud(id) {
    console.log("eliminando id: " + id);
    let opc = confirm('¿Está seguro que desea eliminar esta categoria?\n Are you sure that you want delete this category?');
    if (opc) {

        $.ajax({
            dataType: 'json',
            url: urlBaseCloud + "/" + id,
            type: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                204: function (response) {
                    success:{
                        // console.log(response);
                        alert('Se ha eliminado la nube');
                        getCloud();
                        window.location.reload();
                    }

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}

function show(json) {
    var opciones;
    for (var i = 0; i < json.length; i++) {
        opciones += `
            <option value="${json[i].id}">${json[i].name}</option>`;
    }
    ;
    $("#categoryname").html(opciones);
}

function checkCloud(cloud) {
    if (cloud.id <= 0 || cloud.brand === '' || cloud.year === '' || cloud.name === '' || cloud.categoryid <= '' || cloud.description <= '') {
        alert("Procure no dejar campos vacíos!");
        return false;
    }
    return true;
}
function showForm() {
    $("#formPost").removeAttr("style");
    $("#btnGuardarNube").removeAttr("style");
    $("#btnCancelar").removeAttr("style");
    $("#btncrearNube").attr("style", "display: none");
    $("#crearnube").attr("style");
    hideTable();
    autoInicio();
}

function hideForm() {
    $("#formPost").attr("style", "display: none");
    $("#btnGuardarNube").attr("style", "display: none");
}

function cancelar() {
    window.location.href = "cloud.html";
}
function hideTable() {
    $("#info").attr("style", "display: none");
}


