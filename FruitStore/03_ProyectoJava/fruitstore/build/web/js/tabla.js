let productos = [];
let categorias = [];

export async function inicializarModulos() {
    await consultarCategorias();
    await consultarProductos();
    await consultarVendedores();
}

/* ================= PRODUCTOS ================= */

async function consultarProductos() {
    let url = "../api/producto/getAll";
    let resp = await fetch(url);
    let datos = await resp.json();

    if (datos.error != null) {
        Swal.fire("Error", "Error al consultar productos", "warning");
        return;
    }

    if (datos.exception != null) {
        Swal.fire("Error", datos.exception, "error");
        return;
    }

    productos = datos;
    fillTableProductos();
}

function fillTableProductos() {
    let contenido = "";

    for (let i = 0; i < productos.length; i++) {
        contenido += `
            <tr>
                <td>${productos[i].nombre}</td>
                <td>${productos[i].categoria.nombre}</td>
                <td>${productos[i].precioVenta}</td>
                <td>${productos[i].estatus}</td>
                <td>
                    <button class="btn btn-sm btn-info"
                        onclick="mostrarDetalleProducto(${i})">
                        Editar
                    </button>
                </td>
            </tr>
        `;
    }

    document.getElementById("tbodyProductos").innerHTML = contenido;
}


async function consultarCategorias() {
    let url = "../api/categoria/getAll";
    let resp = await fetch(url);
    let datos = await resp.json();

    if (datos.error != null) {
        Swal.fire("Error", "Error al consultar categorías", "warning");
        return;
    }

    if (datos.exception != null) {
        Swal.fire("Error", datos.exception, "error");
        return;
    }

    categorias = datos;
    fillComboBoxCategorias();
}

function fillComboBoxCategorias() {
    let contenido = "";

    for (let i = 0; i < categorias.length; i++) {
        contenido += `
            <option value="${categorias[i].id}">
                ${categorias[i].nombre}
            </option>
        `;
    }

    document.getElementById("cmbCategoria").innerHTML = contenido;
}


window.mostrarDetalleProducto = function (index) {
    let p = productos[index];

    document.getElementById("txtIdProducto").value = p.id;
    document.getElementById("txtNombreProducto").value = p.nombre;
    document.getElementById("txtPrecioProducto").value = p.precioVenta;
    document.getElementById("cmbCategoria").value = p.categoria.id;
};

window.nuevoProducto = function () {

    document.getElementById("txtIdProducto").value = "";
    document.getElementById("txtNombreProducto").value = "";
    document.getElementById("txtPrecioProducto").value = "";
    document.getElementById("cmbCategoria").selectedIndex = 0;
};

window.guardarProducto = async function () {

    let id = document.getElementById("txtIdProducto").value;
    let nombre = document.getElementById("txtNombreProducto").value;
    let precio = document.getElementById("txtPrecioProducto").value;
    let idCategoria = document.getElementById("cmbCategoria").value;

    if (nombre.trim() === "" || precio.trim() === "") {
        Swal.fire("Campos incompletos", "Llena todos los campos", "warning");
        return;
    }

    let producto = {
        id: id == "" ? 0 : parseInt(id),
        nombre: nombre,
        precioVenta: parseFloat(precio),
        estatus: 1,
        categoria: {
            id: parseInt(idCategoria)
        }
    };

    let params = new URLSearchParams();
    params.append("producto", JSON.stringify(producto));

    let resp = await fetch("../api/producto/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    });

    let datos = await resp.json();

    if (datos.error != null) {
        Swal.fire("Error", datos.error, "error");
        return;
    }

    if (datos.exception != null) {
        Swal.fire("Error", datos.exception, "error");
        return;
    }

    Swal.fire("Éxito", "Producto guardado correctamente", "success");

    nuevoProducto();
    await consultarProductos();
};

window.eliminarProducto = async function () {

    let id = document.getElementById("txtIdProducto").value;

    if (id == "") {
        Swal.fire("Selecciona un producto", "Debes elegir uno de la tabla", "warning");
        return;
    }

    let confirmacion = await Swal.fire({
        title: "¿Eliminar producto?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    });

    if (!confirmacion.isConfirmed) return;

    let resp = await fetch(`../api/producto/delate?id=${id}`, {
        method: "POST"
    });

    let datos = await resp.json();

    if (datos.error != null) {
        Swal.fire("Error", datos.error, "error");
        return;
    }

    if (datos.exception != null) {
        Swal.fire("Error", datos.exception, "error");
        return;
    }

    Swal.fire("Eliminado", "Producto eliminado correctamente", "success");

    nuevoProducto();
    await consultarProductos();
};