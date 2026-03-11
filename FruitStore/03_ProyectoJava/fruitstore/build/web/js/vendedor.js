let vendedores = [];

export async function inicializarModulos(){
    await consultarVendedores();
}

async function consultarVendedores(){
    let url = '../api/vendedor/getAll';
    let resp = await fetch(url);
    let datos = await resp.json();
    if(datos.exception != null){
        Swal.fire("Error", datos.exception, "error");
        return;
    }
    
    vendedores = datos;
    fillTableVendedores();
}

function fillTableVendedores(){
    let contenido = "";
    for(let i = 0; i < vendedores.length; i++){
        let estatusTexto = vendedores[i].estatus == 1 ? "Activo" : "Inactivo";
        let generoTexto = vendedores[i].genero == "M" ? "Masculino" :
            vendedores[i].genero == "F" ? "Femenino" : "Otro"; 
        contenido += 
            `
                <tr> 
                    <td>${vendedores[i].idVendedor}</td>
                    <td>${vendedores[i].nombre}</td>
                    <td>${vendedores[i].fechaNac}</td>
                    <td>${generoTexto}</td>
                    <td>${vendedores[i].telefono}</td>
                    <td>${vendedores[i].email}</td>
                    <td>${estatusTexto}</td>
                    <td>
                    <button class="btn btn-sm btn-info"
                        onclick="mostrarDetalleVendedor(${i})">
                        Editar
                    </button>
                </td>
            `;
    }
    document.getElementById("tblVendedores").innerHTML = contenido;
}
window.mostrarDetalleVendedor = function(index){
    let v = vendedores[index];
    document.getElementById("txtIdVendedor").value = v.idVendedor;
    document.getElementById("txtNombreVendedor").value = v.nombre;
    document.getElementById("txtFechaNac").value = v.fechaNac;
    document.getElementById("cmbGenero").value = v.genero;
    document.getElementById("txtTelefono").value = v.telefono;
    document.getElementById("txtEmailVendedor").value = v.email;
    document.getElementById("cmbEstatusVendedor").value = v.estatus;

    document.getElementById("txtCalle").value = v.calle;
    document.getElementById("txtNumExt").value = v.numExt;
    document.getElementById("txtNumInt").value = v.numInt;
    document.getElementById("txtColonia").value = v.colonia;
    document.getElementById("txtCP").value = v.cp;
    document.getElementById("txtCiudad").value = v.ciudad;
    document.getElementById("txtEstado").value = v.estado;
    document.getElementById("txtPais").value = v.pais;
    document.getElementById("txtFechaAlta").value = v.fechaAlta;
};

window.nuevoVendedor = async function(){
    document.getElementById("txtIdVendedor").value = "";
    document.getElementById("txtNombreVendedor").value = "";
    document.getElementById("txtFechaNac").value = "";
    document.getElementById("cmbGenero").value = "M";
    document.getElementById("txtTelefono").value = "";
    document.getElementById("txtEmailVendedor").value = "";

    document.getElementById("txtCalle").value = "";
    document.getElementById("txtNumExt").value = "";
    document.getElementById("txtNumInt").value = "";
    document.getElementById("txtColonia").value = "";
    document.getElementById("txtCP").value = "";
    document.getElementById("txtCiudad").value = "";
    document.getElementById("txtEstado").value = "";
    document.getElementById("txtPais").value = "";
    document.getElementById("txtFechaAlta").value = "";
};

window.eliminarVendedor = async function(){
    let id = document.getElementById("txtIdVendedor").value;
    if(id == ""){
        Swal.fire("Selecciona un vendedor", "", "warning");
        return;
    }
    await fetch(`../api/vendedor/delete?id=${id}`, {
        method: "POST"
    });
    Swal.fire("Eliminado", "Vendedor Eliminado", "succes");
    nuevoVendedor();
    await consultarVendedores();
};

window.guardarVendedor = async function(){
    let id = document.getElementById("txtIdVendedor").value;
    let nombre = document.getElementById("txtNombreVendedor").value;
    
    if(nombre.trim() === ""){
        Swal.fire("Campos incompletos", "Escribe el nombre", "warning");
        return;
    }
    
    let vendedor = {
        id: id == "" ? 0 : parseInt(id),
        nombre: nombre,
        fechaNac: document.getElementById("txtFechaNac").value,
        genero: document.getElementById("cmbGenero").value,
        telefono: document.getElementById("txtTelefono").value,
        email: document.getElementById("txtEmailVendedor").value,
        calle: document.getElementById("txtCalle").value,
        numExt: document.getElementById("txtNumExt").value,
        numInt: document.getElementById("txtNumInt").value,
        colonia: document.getElementById("txtColonia").value,
        cp: document.getElementById("txtCP").value,
        ciudad: document.getElementById("txtCiudad").value,
        estado: document.getElementById("txtEstado").value,
        pais: document.getElementById("txtPais").value,
        fechaAlta: document.getElementById("txtFechaAlta").value,
        estatus: parseInt(document.getElementById("cmbEstatusVendedor").value)
    };
    
    let params = new URLSearchParams();
    params.append("vendedor", JSON.stringify(vendedor));
    
    let resp = await fetch("../api/vendedor/save",{
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    });
    
    let datos = await resp.json();
    if(datos.exception != null){
        Swal.fire("Error", datos.exception, "error");
        return;
    }
    
    Swal.fire("Éxito", "Vendedor guardado", "success");
    nuevoVendedor();
    await consultarVendedores();
}