// ruta dinámica /cool
var cool = require("cool-ascii-faces");
var express = require("express");

var app = express();
var port = 12345

app.get("/faces", (request, response) => {
    response.send(cool());
    console.log("Nueva carita");
});

app.listen(port);
console.log("Servidor funcionando");

/*
Escribe "Servidor funcionando" cuando realmente el servidor está escuchando, 
el anterior lo escribe un poco antes de que empiece a funcionar
app.listen(port, () => {
    console.log(`Servidor funcionando ${port}`);
})
*/

// ruta del algoritmo de Álvaro



// ruta del algortimo de Jorge



// ruta del algoritmo de Víctor