const productos = [
{
        id: 01,
        marca: "GARNIER",
        precio: 2300,
        tipo: "Agua micelar"
        },
        {
        id: 02,
        marca: "CERAVE",
        precio: 6000,
        tipo: "Limpiador facial"
        },
        {
        id: 03,
        marca: "LOREAL",
        precio: 4300,
        tipo: "Serum"
        },
        {
        id: 04,
        marca: "LOREAL PARIS",
        precio: 5900,
        tipo: "Contorno de ojos"
        },
        {
        id: 05,
        marca: "CETAPHIL",
        precio: 5600,
        tipo: "Crema hidratante"
        },
        {
        id: 06,
        marca: "DERMAGLOS",
        precio: 2900,
        tipo: "Protector solar"
        }
];
        
let carritoDeCompras = [];    
let todosProductos = productos.map(producto => `${producto.id} - ${producto.tipo} de ${producto.marca} a $${producto.precio}`);
        
const bienvenida = alert(`¡Bienvenido/a a SkincareShop!`);

function agregarAlCarrito () {
let productoEncontrado = ""
let agregarProducto = Number(prompt(`Seleccione un producto para agregar al carrito con número: \n${todosProductos.join("\n")}`));
        if (agregarProducto > 0 && agregarProducto < productos.length) {
        productoEncontrado = productos.find(producto => producto.id === agregarProducto)
        carritoDeCompras.push(productoEncontrado);
        } else {
        alert(`No se encontró el producto: ${agregarProducto}`);
        }
};

agregarAlCarrito();


let agregarMas = prompt(`¿Quieres comprar otro producto? Responder con si o no`)
        
while(agregarMas === `si`){
        agregarAlCarrito()
        agregarMas = prompt(`¿Te gustaría otro producto? Responder con si o no`)
}

console.log(carritoDeCompras);

let buscarProductos = carritoDeCompras.map(producto => `${producto.tipo} de ${producto.marca} a $${producto.precio}`);
let productosEnCarrito = alert(`CARRITO: \n${buscarProductos.join("\n")}`);


function totalPagar () {
        const total = carritoDeCompras.reduce((cosas, cadaProducto) => cosas + cadaProducto.precio, 0)
        let preguntaDePagar = prompt(`¿Desea pagar el total? (si o no)
        Total: $${total}`)
        if (preguntaDePagar === `si`) {
        alert(`Debe pagar un total de $${total}`)
        }else{
        alert(`Salga de la tienda`)
        }
}

totalPagar();

