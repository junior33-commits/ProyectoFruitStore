let categorias = [];

export async function inicializarModuloss() {
    await consultarCategorias();
}

async function consultarCategorias() {

    let url = "../api/categoria/getAll";
    let resp = await fetch(url);
    let datos = await resp.json();

    if (datos.exception != null) {
        Swal.fire("Error", datos.exception, "error");
        return;
    }

    categorias = datos; 
    fillTableCategorias();
}

function fillTableCategorias() {

    let contenido = "";

    for (let i = 0; i < categorias.length; i++) {

        let estatusTexto = categorias[i].estatus == 1 ? "Inactivo" : "Activo";

        contenido += `
            <tr>
                <td>${categorias[i].nombre}</td>
                <td>${estatusTexto}</td>
                <td>
                    <button class="btn btn-sm btn-info"
                        onclick="mostrarDetalleCategoria(${i})">
                        Editar
                    </button>
                </td>
            </tr>
        `;
    }

    document.getElementById("tbodyCategorias").innerHTML = contenido;
}

window.mostrarDetalleCategoria = function(index) {

    let c = categorias[index];

    document.getElementById("txtIdCategoria").value = c.id;
    document.getElementById("txtNombreCategoria").value = c.nombre;
};

window.nuevaCategoria = function() {

    document.getElementById("txtIdCategoria").value = "";
    document.getElementById("txtNombreCategoria").value = "";
};

window.guardarCategoria = async function() {

    let id = document.getElementById("txtIdCategoria").value;
    let nombre = document.getElementById("txtNombreCategoria").value;

    if (nombre.trim() === "") {
        Swal.fire("Campos incompletos", "Escribe el nombre", "warning");
        return;
    }

    let categoria = {
        id: id == "" ? 0 : parseInt(id),
        nombre: nombre,
        estatus: 1
    };

    let params = new URLSearchParams();
    params.append("categoria", JSON.stringify(categoria));

    let resp = await fetch("../api/categoria/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    });

    let datos = await resp.json();

    if (datos.exception != null) {
        Swal.fire("Error", datos.exception, "error");
        return;
    }

    Swal.fire("Éxito", "Categoría guardada", "success");

    nuevaCategoria();
    await consultarCategorias();
};

window.eliminarCategoria = async function() {

    let id = document.getElementById("txtIdCategoria").value;

    if (id == "") {
        Swal.fire("Selecciona una categoría", "", "warning");
        return;
    }

    await fetch(`../api/categoria/delete?id=${id}`, {
        method: "POST"
    });

    Swal.fire("Eliminada", "Categoría eliminada", "success");

    nuevaCategoria();
    await consultarCategorias();
};