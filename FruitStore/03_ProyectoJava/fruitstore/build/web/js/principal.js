let cm = null;

async function cargarModuloProducto() {

    let url = "producto.html";
    let resp = await fetch(url);
    let contenido = await resp.text();

    document.getElementById("divPrincipal").innerHTML = contenido;

    cm = await import("./tabla.js");
    await cm.inicializarModulos();
}
window.cargarModuloProducto = cargarModuloProducto;

function inicializar() {
    console.log("Módulo de productos cargado.");
}
async function cargarModuloProvedores() {
    
    let url = "Provedores.html"; 
    
    let resp = await fetch(url);
    let contenido = await resp.text();
    document.getElementById("divPrincipal").innerHTML = contenido;
    
    inicializar(); 
}
window.cargarModuloProvedores = cargarModuloProvedores;

async function cargarModuloVendedore() {
    
    let url = "Vendedor.html"; 
    
    let resp = await fetch(url);
    let contenido = await resp.text();
    document.getElementById("divPrincipal").innerHTML = contenido;
    
    inicializar(); 
}
window.cargarModuloVendedore = cargarModuloVendedore;

async function cargarModuloCategoria() {
    // Como producto.html está en la misma carpeta que principal.html, 
    // no necesitas poner "modulos/" en la URL
    let url = "Categoria.html"; 
    
    let resp = await fetch(url);
    let contenido = await resp.text();
    document.getElementById("divPrincipal").innerHTML = contenido;
    
    cm = await import("./categoria.js");
    await cm.inicializarModuloss();
}

window.cargarModuloCategoria = cargarModuloCategoria;

export async function cargarModuloVentas() {
    
    let url = "ventas.html"; 
    
    let resp = await fetch(url);
    let contenido = await resp.text();
    document.getElementById("divPrincipal").innerHTML = contenido;
    
    inicializar(); 
}

window.cargarModuloVentas = cargarModuloVentas;


