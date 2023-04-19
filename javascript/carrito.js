const colorTema = document.querySelector('#colorTema');
let temaOscuroLocalStorage = localStorage.getItem('temaOscuro');
const contenedorTienda = document.querySelector('.contenedorTienda');
const contenedorCarrito = document.querySelector('.contenedor-carrito')
const carritoDeTienda = JSON.parse(localStorage.getItem('carrito'));
const botonVaciarCarrito = document.querySelector('.vaciar-carrito');
const totalCarrito = document.querySelector('.total-carrito');
const contenedorFinalizarCompra =document.querySelector('.contenedor-finalizar-compra');
const botonFinalizarCompra = document.querySelector('.btn-finalizar-compra');

const activarTema = () => {
    contenedorTienda.classList.add('temaOscuro');
    localStorage.setItem('temaOscuro', 'true');
};
const desactivarTema = () => {
    contenedorTienda.classList.remove('temaOscuro');
    localStorage.setItem('temaOscuro', 'false');
};
if(temaOscuroLocalStorage === 'true'){
    activarTema()
}else {
    desactivarTema()
};
colorTema.addEventListener('click', () => {
    temaOscuroLocalStorage = localStorage.getItem('temaOscuro');
    if(temaOscuroLocalStorage === 'true'){
        desactivarTema()
    }else {
        activarTema()
    }
});
function cargarProductosCarrito() {
    if (carritoDeTienda && carritoDeTienda.length > 0) {
        contenedorCarrito.innerHTML = '';
        carritoDeTienda.forEach(producto => {
            const cardCarrito = document.createElement('div');
            cardCarrito.classList.add('card-carrito');
            cardCarrito.innerHTML = 
            `
            <img class="img-producto-carrito" src="${producto.img}" alt="${producto.tipo} de ${producto.marca}">
            <div class="texto-producto-carrito">
                <div class="tipo-marca-producto-carrito">
                    <h4 class="tipo-producto-carrito">${producto.tipo}</h4>
                    <h5 class="marca-carrito">${producto.marca}</h5>
                </div>
                <div class="precio-eliminar-carrito">
                    <div class="texto-precio-carrito">
                        <p class="precio-carrito">$${producto.precio}</p>
                    </div>
                    <button class="eliminar-carrito" id="${producto.id}">ELIMINAR</button>
                </div>
            </div>
            `
            contenedorCarrito.append(cardCarrito)
        });
    btnEliminar();
    totalDeProductosCarrito()
    }else {
        contenedorCarrito.innerHTML = '';
        const sinProductos = document.createElement('h5');
        sinProductos.classList.add('sin-producto-carrito')
        sinProductos.innerHTML = '"No hay productos en el carrito"';
        contenedorCarrito.append(sinProductos);
        contenedorFinalizarCompra.classList.add('borrar-contenedor');
    };
};
cargarProductosCarrito();
function btnEliminar() {
    const btnParaEliminar = document.querySelectorAll('.eliminar-carrito')
    btnParaEliminar.forEach(btn => {
        btn.addEventListener('click', eliminarCardCarrito)
    });
};
function eliminarCardCarrito(e) {
    const btnEliminarId = e.currentTarget.id;
    const encontrarProducto = carritoDeTienda.findIndex(producto => producto.id === btnEliminarId);
    carritoDeTienda.splice(encontrarProducto, 1);
    cargarProductosCarrito();
    localStorage.setItem('carrito', JSON.stringify(carritoDeTienda))
};
function totalDeProductosCarrito() {
    const calcularTotal = carritoDeTienda.reduce((sum, producto) => sum + producto.precio, 0);
    totalCarrito.innerText = `TOTAL: $${calcularTotal}`
}
botonVaciarCarrito.addEventListener('click', vaciarCarrito)
function vaciarCarrito() {
    Swal.fire({
        title: 'Segur@?',
        text: "Tus productos se van a eliminar!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#19275f',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
            carritoDeTienda.length = 0;
            localStorage.setItem('carrito', JSON.stringify(carritoDeTienda));
            cargarProductosCarrito()
            Swal.fire(
                'Eliminado!',
                'Eliminaste tus productos',
                'success'
            )
        }
    })
};
botonFinalizarCompra.addEventListener('click', finalizarCompra)
function finalizarCompra() {
    
    Swal.fire('Gracias por tu compra!')
    carritoDeTienda.length = 0;
    localStorage.setItem('carrito', JSON.stringify(carritoDeTienda));
    contenedorFinalizarCompra.classList.add('borrar-contenedor');
    contenedorCarrito.innerHTML = '';
    const compraRealizada = document.createElement('h5');
    compraRealizada.classList.add('texto-compra-realizada')
    compraRealizada.innerHTML = '"Compra realizada"';
    contenedorCarrito.append(compraRealizada);
};