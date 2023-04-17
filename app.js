let precioitem;
let nombreitem;
let cantidad;
let nombreusuario;
let total = 0; 
let ticket = ``;

alert("bienvenido al carrito de Bebidas!!!");
nombreusuario = prompt("ingrese su nombre");
do {
    nombreitem = prompt("ingrese nombre de la bebida");
    precioitem = Number(prompt("ingrese precio"));

    while (precioitem <0) {
        precioitem = Number(prompt("precio invalido, ingrese otro"));
    }

    cantidad = parseInt(prompt("ingrese cantidad"));

    while (cantidad < 0 ) {
        cantidad = Number(prompt("cantidad invalida, ingrese otra"));
    } 
        ticket = ticket + `nombre del item: ${nombreitem} \n precio unitatio: $${precioitem} cantidad: ${cantidad} subtotal: ${cantidad*precioitem} \n`
        total = total + cantidad * precioitem;
        
    
    opcion = prompt("Desea ingresar otro item");

} while(opcion == "si");

alert(`${ticket} El total para ${nombreusuario} es de: $${total}`);