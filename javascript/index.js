let productos = [];
fetch("./javascript/productos.json")
        .then(response => response.json())
        .then(info => {
                productos = info;
                cargarProductos(productos)
        })

const btnArrow = document.querySelector('.btnDeslizar');
const colorTema = document.querySelector('#colorTema');
let temaOscuroLocalStorage = localStorage.getItem('temaOscuro');
const contenedorTienda = document.querySelector('.contenedorTienda');
const contenedorProductos = document.querySelector('#contenedorProductos');
const btnCategorias = document.querySelectorAll('.btn-categoria');

const btnScrollClick = btnArrow.addEventListener('click', () => {
        window.scroll({
        top: innerHeight,
        left: 0,
        behavior: "smooth",
        });
});
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
function cargarProductos(elegirProductoPorCategoria) {
        contenedorProductos.innerHTML = ' ';
        elegirProductoPorCategoria.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = 
        `
                <img class="img-producto" src="${producto.img}" alt="${producto.tipo} de ${producto.marca}">
                <div class="texto-producto">
                <h4 class="tipo-producto">${producto.tipo}</h4>
                <h5 class="marca">${producto.marca}</h5>
                <p class="precio">$${producto.precio}</p>
                <button class="btn-agregar-carrito" id="${producto.id}">Agregar al carrito</button>
                </div>
        `;
        contenedorProductos.append(card);
        });
};
cargarProductos(productos);
btnCategorias.forEach( cadaCategoria => {
        cadaCategoria.addEventListener('click', (e) => {
        btnCategorias.forEach( cadaCategoria => cadaCategoria.classList.remove('seleccionoCategoria'));
        e.currentTarget.classList.add('seleccionoCategoria');
        if(e.currentTarget.id != 'todos-los-productos'){
                const productosPorCategoria = productos.filter(producto =>
                producto.categoria.id === e.currentTarget.id);
        cargarProductos(productosPorCategoria)
        }else {
                cargarProductos(productos)
        }
        });
});

let carrito;
let carritoGuardado = JSON.parse(localStorage.getItem('carrito'))
if (carritoGuardado) {
        carrito = carritoGuardado;
} else {
carrito = [];
}
document.addEventListener('click', (e) => {
        if (e.target.matches('.card .texto-producto .btn-agregar-carrito')) {
        agregarAlCarrito(e)
        }
});
const agregarAlCarrito = (e) =>{
        Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto agregado',
                showConfirmButton: false,
                timer: 500
        })
        const botonCard = e.target;
        const buscarCard = productos.find(producto => producto.id ===  botonCard.id);
        carrito.push(buscarCard);
        localStorage.setItem('carrito', JSON.stringify(carrito));
}