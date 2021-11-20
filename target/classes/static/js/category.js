var urlBaseCategory = "http://129.159.251.35:80/api/Category";
$(document).ready(getCategory);

function getCategory() {
    $("#info").removeAttr("style");
    hideForm();
    $.ajax({
        dataType: 'json',
        url: urlBaseCategory + "/all",
        type: "GET",
        success: function (response) {
            console.log(response)
            var misItems = response;
            for (let i = 0; i < misItems.length; i++) {
                $("#allItems").append("<tr>");
                $("#allItems").append("<td>" + misItems[i].name + "</td>");
                $("#allItems").append("<td>" + misItems[i].description + "</td>");
                if (misItems[i].clouds.length == 0) {
                $("#allItems").append("<td>Sin clouds</td>");
                }
                for (let j = 0; j < misItems[i].clouds.length; j++) {
                    $("#allItems").append("<li>" + misItems[i].clouds[j].name + "</li>");
                }
                $("#allItems").append('<td><button class="btn btn-link" onclick="deleteCategory(' + misItems[i].id + ')">Borrar</button>');
                $("#allItems").append('<td><button class="btn btn-link" onclick="getCategoryById(' + misItems[i].id + ')">Actualizar categoria</button>');
                $("#allItems").append("</tr>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

var getClouds = function () {
    $('#cloud').empty().append('<option>Select a Cloud</option>');
    $.ajax({
        dataType: 'json',
        url: "http://129.159.251.35/api/Cloud/all",
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


var getCategoryById = function (idCategoria) {
    console.log("Ver id: " + idCategoria);
    $("#formPost").removeAttr("style");
    $("#btnEditar").removeAttr("style");
    $("#btnCancelar").removeAttr("style");
    $("#btncrearCategoria").attr("style", "display: none");
    $("#crearcategoria").attr("style");
    let opc = confirm('Recuerde que solo puede actualizar el nombre y descripción de la categoria. / Remember that you just can update the category\'s  name, and description.');
    if (opc) {
        $.ajax({
            dataType: 'json',
            url: urlBaseCategory + "/" + idCategoria,
            type: 'GET',
            success: function (response) {
                console.log(response);

                var item = response;
                $("#nameCategory").val(item.name),
                        $("#descriptionCategory").val(item.description)
                var elemento = {
                    id: $("#id").val(item.id),
                    name: $("#nameCategory").val(),
                    description: $("#descriptionCategory").val(),
                }
                var dataToSend = JSON.stringify(item);

            },
            error: function (jqXHR, textStatus, errorThrown) {}
        });
    }
}

function postCategory() {
    let category = {

        name: $("#nameCategory").val(),
        description: $("#descriptionCategory").val()
    };
    console.log(category);
    if (checkCategory(category)) {
        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(category),
            url: "http://129.159.251.35/api/Category/save",
            statusCode: {
                201: function (response) {
                    success: {
                        console.log(response);
                        console.log("Se guardo correctamente");
                        alert("Se guardo correctamente");
                        window.location.reload();
                    }
                }
            }
        });
    }
}

function putCategory() {
    console.log("ejecutando funcion para actualizar");

    var elemento = {
        id: $("#id").val(),
        name: $("#nameCategory").val(),
        description: $("#descriptionCategory").val()
    };
    console.log("id :" + elemento);
    var dataToSend = JSON.stringify(elemento);
    if (checkCategory(elemento)) {
        let opc = confirm('¿Está seguro que desea actualizar esta categoria?\n Are you sure that you want update this category?');
        if (opc) {
            $.ajax({

                contentType: 'application/json',
                data: dataToSend,
                url: urlBaseCategory + "/update",
                type: "PUT",
                success: function (response) {
                    alert("¡Categoria editada exitosamente!");
                    location.reload();
                },
                error: function (jqXHR, textStatus, errorThrown) {

                }
            });
        }
    }
}

function deleteCategory(idElemento) {
    console.log("eliminando id: " + idElemento);
    let opc = confirm('¿Está seguro que desea eliminar esta categoria?\n Are you sure that you want delete this category?');
    if (opc) {

        $.ajax({
            dataType: 'json',
            url: urlBaseCategory + "/" + idElemento,
            type: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                204: function (response) {
                    success:{
                        // console.log(response);
                        alert('Se ha eliminado la categoria');
                        getCategory();
                        window.location.reload();
                    }

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}
function checkCategory(category) {
    if (category.name <= 0 || category.description === '') {
        alert("Procure no dejar campos vacíos!");
        return false;
    }
    return true;
}

function showForm() {
    $("#formPost").removeAttr("style");
    $("#btnGuardar").removeAttr("style");
    $("#btnCancelar").removeAttr("style");
    $("#btncrearCategoria").attr("style", "display: none");
    $("#crearcategoria").attr("style");

    // getClouds();
    hideTable();
}

function cancelar() {
    window.location.href = "cloud.html";
}

function hideForm() {
    $("#formPost").attr("style", "display: none");
    $("#btnGuardar").attr("style", "display: none");

}

function hideTable() {
    $("#info").attr("style", "display: none");
}

