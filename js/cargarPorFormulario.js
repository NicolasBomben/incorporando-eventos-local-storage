class Producto{

    constructor(nombre,precio,talle) {
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.talle = talle;
    }

}


//defino las variables que uso en el DOM.
const formulario = document.getElementById("formulario");
const productoC = document.getElementById("cargarNombre");
const precioC = document.getElementById("cargarPrecio");
const talleC = document.getElementById("cargarTalle");

//declaro array vacio donde se van a ir guardando las cargas de productos.
const arrayProductos = [];

//id storage
let contador = 0;

//funcion al cargar la pagina
window.addEventListener("load", () =>{
    for(let i = 0; i < localStorage.length; i++){
        let clave = localStorage.key(i);
        let producto = localStorage.getItem(clave);
        arrayProductos.push(JSON.parse(producto));
        contador = i + 1;
    }
    cargarListaProductos();
});

//funcion doonde cargo los productos
function cargarListaProductos(){
    
    for( const productos of arrayProductos){
        //div donde muestro los productos cargados por pantalla
        let contenedor = document.createElement("div");
        //con inner muestro el listadoDeProductos
        contenedor.innerHTML = `<p> Nombre: ${productos.nombre}</p>
                                <p> Precio: ${productos.precio}</p>
                                <p> Talle:  ${productos.talle}</p>`
    document.body.appendChild(contenedor);
    }
    
}

//carga y envio de formulario
formulario.addEventListener("submit", enviarFormulario);

function enviarFormulario(e){
    e.preventDefault();

    let producto = new Producto(productoC.value, precioC.value, talleC.value);

    //limpio los outputs
    productoC.value = "";
    precioC.value = "";
    talleC.value = "";

    let idProducto = "producto" + contador;
    contador ++;

    localStorage.setItem(idProducto, JSON.stringify(producto));
    arrayProductos.push(producto);
    cargarListaProductos();

}
