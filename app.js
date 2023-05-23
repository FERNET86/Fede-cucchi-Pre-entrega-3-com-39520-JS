
function verificarEdad() {
  
  const edad = parseInt(prompt('Bienvenido al carrito de bebidas, para comprar en el mismo debes tener mas de 18 años de edad. Ingresa tu edad:'));

  
  if (edad >= 18) {
   
    Swal.fire({
      title: 'Genial, ya estas dentro de la tienda. Disfruta de nuestras bebidas',
      text: 'Esperamos tu compra',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  } else {
    
    Swal.fire({
      title: 'Acceso restringido',
      text: 'Debes tener al menos 18 años para acceder al carrito de bebidas.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      
      window.location.href = 'https://www.google.com/'; // luego aca voy a poner un hipervinculo con otro link de una pagina de mi proyecto.
    });
  }
}


verificarEdad();

let carrito = [] ///aqui iran los items del carrito
let stock = [] ///aqui iran los productos

////traerme los elementos del dom
const tabla = document.getElementById('items');
const selectProductos = document.getElementById('productos');
const btnAgregar = document.getElementById('agregar');
const btnOrdenar = document.getElementById('ordenar');
const btnVaciar = document.getElementById('vaciar');
const total = document.getElementById('total');

const subtotal = ( precio, cantidad ) => precio * cantidad;


///ejecutar una vez para cargar el localStorage con stock


stock.push(new Producto('Gin', 'Bombay','750ml', 7000));
stock.push(new Producto('Whisky', 'Chivas Regal', '1L', 14000));
stock.push(new Producto('Cerveza', 'Corona','´710 ml', 700));
stock.push(new Producto('Fernet', 'Branca', '1L', 2400));
stock.push(new Producto('Vodka', 'Absolut', '700ml', 5100));
stock.push(new Producto('Tequila', 'Jose Cuervo', '750ml', 10000));
stock.push(new Producto('Vino Espumante Extra bruit', 'Chandon', '750ml', 2500));
stock.push(new Producto('Vino Malbec', 'Finca las moras', '750ml', 1100));
stock.push(new Producto('Vino Sauvignon Blanc', 'Portillo','750ml', 1100 ));
stock.push(new Producto('Gaseosa', 'Coca-Cola', '750ml', 700));
stock.push(new Producto('Jugo de naranja', 'Cepita', '1L', 450 ));
stock.push(new Producto('Energizante', 'Speed', '473ml', 300));

localStorage.setItem('stock',JSON.stringify(stock));




allEventListeners();


function allEventListeners()
{
  ////agregamos un escuchador del evento cuando el DOM se carga
  window.addEventListener('DOMContentLoaded', traerItems);
  btnVaciar.addEventListener('click', vaciarCarrito);

  ///event listener de agregar un producto al carrito
  btnAgregar.addEventListener('submit', (e) =>
  {
    e.preventDefault(); ///evito el refresque
    const productoSeleccionado = stock[+selectProductos.value]; ///obtengo el producto elegido
    console.log(productoSeleccionado);
    const indiceCarrito = carrito.findIndex((item) => { return item.producto.nombre == productoSeleccionado.nombre});
    console.log(indiceCarrito);
    if (indiceCarrito != -1)
    {
      carrito[indiceCarrito].cantidad++;
    } else {
      const item = new Item(productoSeleccionado,1);
      carrito.push(item);
    }

    actualizarTablaCarrito();
    localStorage.setItem('carrito', JSON.stringify(carrito)); //actualizo el carrito en el localStorage
  });

}



function traerItems()
{
  ///traer los productos del localStorage
  ///si no hay nada inicializara stock en vacio []
  stock = JSON.parse(localStorage.getItem('stock')) || [];
  carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  popularDropDown();
  actualizarTablaCarrito();  
}


///rellenamos el dropDown de productos
function popularDropDown() {
  stock.forEach((producto,index) => {
    const option = document.createElement('option');
    option.textContent = `${producto.nombre}: ${producto.marca}: ${producto.medida}: ${producto.precio}`;
    option.value = index; ///el indice donde se encuentra este producto
    selectProductos.appendChild(option);
  });
}

function actualizarTablaCarrito()
{
  tabla.innerHTML = '';
  total.innerText = '0';
  carrito.length || btnVaciar.setAttribute('disabled', true);
  carrito.forEach((item) => {
    newRow(item);
  });
}



function newRow(item)
{
  const row = document.createElement('tr'); ///creo la fila
  const posCarrito = carrito.indexOf(item); ///posicion del item en el carrito

  
  let tdNombre = document.createElement('td');
  tdNombre.classList.add('font-white');
  tdNombre.textContent = item.producto.nombre;
  row.appendChild(tdNombre);

  let tdMarca = document.createElement('td');
  tdMarca.classList.add('font-white');
  tdMarca.textContent = item.producto.marca;
  row.appendChild(tdMarca);

  let tdMedida = document.createElement('td');
  tdMedida.classList.add('font-white');
  tdMedida.textContent = item.producto.medida;
  row.appendChild(tdMedida);

  let tdCantidad = document.createElement('td');
  tdCantidad.classList.add('font-white');
  tdCantidad.textContent = item.cantidad;
  row.appendChild(tdCantidad);

  let tdPrecio = document.createElement('td');
  tdPrecio.classList.add('font-white');
  tdPrecio.textContent = item.producto.precio;
  row.appendChild(tdPrecio);

  let tdsubtotal = document.createElement('td');
  tdsubtotal.classList.add('font-white');
  tdsubtotal.textContent = subtotal(item.producto.precio, item.cantidad);
  row.appendChild(tdsubtotal);


  const btnEliminar = document.createElement('button');
  btnEliminar.className = 'btn btn-danger';
  btnEliminar.textContent = 'Eliminar';

  btnEliminar.onclick = () => 
  {
      carrito.splice(posCarrito,1); //posicion y cantidad de elementos
      actualizarTablaCarrito();
      localStorage.setItem('carrito',JSON.stringify(carrito));
  }

  td = document.createElement('td')
  td.appendChild(btnEliminar);
  row.appendChild(td);
  tabla.appendChild(row); ///le agrego al tbody una nueva fila
  btnVaciar.removeAttribute('disabled');

  ///calculo el total que tengo ahora

 
  total.innerText = carrito.reduce((acumulador,item) => acumulador + item.producto.precio * item.cantidad,0);
}


function vaciarCarrito()
{
        Swal.fire({
          title: 'Desea eliminar los items del carrito?',
          confirmButtonText: 'Si',
          showCancelButton: true,
          cancelButtonText: 'Nop'
        }).then((resultado)=> {
            if (resultado.isConfirmed) {
              carrito = [];
              localStorage.setItem('carrito',JSON.stringify(carrito));
              actualizarTablaCarrito();
              Swal.fire({
                title: 'Carrito vaciado!',
                icon: 'success'
              });
            }
         });
          
}


/*

/// se carga el contenido del documento completamente
document.addEventListener('DOMContentLoaded', () => {
  productos = JSON.parse(localStorage.getItem('productos'));
  popularDropDown();
});

function popularDropDown()
{
 productos.forEach((producto) => {
   const option = document.createElement('option');
   option.textContent = `${producto.bebida} : ${producto.marca} : ${producto.medida} : ${producto.precio}`;
   option.value = productos.indexOf(producto); /// para luego saber el producto que esta seleccionando el usuario
   selectorProductos.appendChild(option);
  });
}
*/