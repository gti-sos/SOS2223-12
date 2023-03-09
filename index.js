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
// F05
const BASE_API_URL = "/api/v1";
var bodyParser = require("body-parser");

app.use(bodyParser.json());

var agroclimatic = [
    {
        province: "Sevilla",
        zone: "Los Palacios y Villafranca",
        date: "04/07/2021",
        maximun_temperature: 37.57,
        minimun_temperature: 18.77,
        medium_temperature: 27.57,
        maximun_humidity: 80.3,
        minimun_humidity: 21.45,
        medium_humidity: 52.3
    }
];

// GET
app.get(BASE_API_URL+"/agroclimatic", (request,response) => {
    response.json(agroclimatic);
    console.log("New GET to /agroclimatic");
});

// POST
app.post(BASE_API_URL+"/agroclimatic", (request,response) => {
    var newAgroclimatic = request.body;
    
    
    console.log(`newAgroclimatic = ${JSON.stringify(newAgroclimatic, null, 2)}`);
       
    console.log("New POST to /newAgroclimatic");
    
    agroclimatic.push(newAgroclimatic);
    
    response.sendStatus(201);
});

// ruta del algortimo de Jorge
app.use(require('./samples/index-jfr'));


// ruta del algoritmo de Víctor

app.use(require('./samples/index-vem'));