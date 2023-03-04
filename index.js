// ruta dinámica /cool
var cool = require("cool-ascii-faces");
var express = require("express");

var app = express();
var port = process.env.PORT || 12345;

app.get("/cool", (request, response) => {
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
app.use(require("./samples/index-aml"));


// ruta del algortimo de Jorge
app.use(require('./samples/index-jfr'));


// ruta del algoritmo de Víctor

app.use(require('./samples/index-vem'));