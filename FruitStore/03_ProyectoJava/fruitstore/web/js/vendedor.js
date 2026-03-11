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