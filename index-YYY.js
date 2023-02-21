//Hacer los algoritmos:
// Álvaro: temperatura media de Sevilla en 10 días.
var lista = [27.57, 27.19, 27.57, 26.11, 26.05, 27.23, 25.52, 27.19, 27.72, 27.76];

// Prueba 1.
var resultado1 = 0;

lista.forEach(function(a){
    resultado1 += a;
});
console.log("Prueba 1 -> La temperatura media de Sevilla en 10 días es: " +resultado1/10);

//Prueba 2.
var resultado2 = 0;
var i = 0;
function b(){
    resultado2 += lista[i];
    i++;
}
lista.forEach(b);
console.log("Prueba 2 -> La temperatura media de Sevilla en 10 días es: " +resultado2/10);

// Jorge

// Víctor