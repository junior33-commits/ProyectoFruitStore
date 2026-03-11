let proveedores = [];

export async function inicializarModulo() {
    await consultarProveedores();
}

async function consultarProveedores() {
    let url = "../api/proveedor/getAll";
    let resp = await fetch(url);
    let datos = await resp.json();

    if (datos.exception != null) {
        Swal.fire("Error", datos.exception, "error");
        return;
    }

    proveedores = datos;
    fillTableProveedores();
}

function fillTableProveedores() {
    let contenido = "";

    for (let i = 0; i < proveedores.length; i++) {
        // Siguiendo tu lógica de categorías: 1 es Activo
        let estatusTexto = proveedores[i].estatus == 1 ? "Activo" : "Inactivo";

        contenido += `
            <tr>
                <td>${proveedores[i].nombre}</td>
                <td>${proveedores[i].razonSocial}</td>
                <td>${proveedores[i].rfc}</td>
                <td>${proveedores[i].telefonoMovil}</td>
                <td>${estatusTexto}</td>
                <td>
                    <button class="btn btn-sm btn-info"
                        onclick="mostrarDetalleProveedor(${i})">
                        Editar
                    </button>
                </td>
            </tr>
        `;
    }

    document.getElementById("tbodyProveedores").innerHTML = contenido;
}

window.mostrarDetalleProveedor = function(index) {
    let p = proveedores[index];

    // Sincronizado con los IDs de tu HTML
    document.getElementById("txtIdProveedor").value = p.idProveedor;
    document.getElementById("txtNombreProveedor").value = p.nombre;
    document.getElementById("txtRazonSocial").value = p.razonSocial;
    document.getElementById("txtRFC").value = p.rfc;
    document.getElementById("txtDireccion").value = p.direccion;
    document.getElementById("txtTelefonoFijo").value = p.telefonoFijo;
    document.getElementById("txtTelefonoMovil").value = p.telefonoMovil;
    document.getElementById("txtEmailProveedor").value = p.email;
    document.getElementById("cmbEstatusProveedor").value = p.estatus;
};

window.limpiar = function() {
    document.getElementById("txtIdProveedor").value = "";
    document.getElementById("txtNombreProveedor").value = "";
    document.getElementById("txtRazonSocial").value = "";
    document.getElementById("txtRFC").value = "";
    document.getElementById("txtDireccion").value = "";
    document.getElementById("txtTelefonoFijo").value = "";
    document.getElementById("txtTelefonoMovil").value = "";
    document.getElementById("txtEmailProveedor").value = "";
    document.getElementById("cmbEstatusProveedor").value = "1";
};

window.guardarProveedor = async function() {
    let id = document.getElementById("txtIdProveedor").value;
    let nombre = document.getElementById("txtNombreProveedor").value;

    if (nombre.trim() === "") {
        Swal.fire("Campos incompletos", "Escribe el nombre", "warning");
        return;
    }

    let proveedor = {
        idProveedor: id == "" ? 0 : parseInt(id),
        nombre: nombre,
        razonSocial: document.getElementById("txtRazonSocial").value,
        rfc: document.getElementById("txtRFC").value,
        direccion: document.getElementById("txtDireccion").value,
        telefonoFijo: document.getElementById("txtTelefonoFijo").value,
        telefonoMovil: document.getElementById("txtTelefonoMovil").value,
        email: document.getElementById("txtEmailProveedor").value,
        estatus: parseInt(document.getElementById("cmbEstatusProveedor").value)
    };

    let params = new URLSearchParams();
    params.append("datosProveedor", JSON.stringify(proveedor));

    let resp = await fetch("../api/proveedor/save", {
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

    Swal.fire("Éxito", "Proveedor guardado", "success");
    window.limpiar();
    await consultarProveedores();
};

window.eliminarProveedor = async function() {
    let id = document.getElementById("txtIdProveedor").value;

    if (id == "") {
        Swal.fire("Selecciona un proveedor", "", "warning");
        return;
    }

    let params = new URLSearchParams();
    params.append("id", id);

    await fetch("../api/proveedor/delete", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    });

    Swal.fire("Eliminado", "Proveedor inactivado", "success");
    window.limpiar();
    await consultarProveedores();
};