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

var agroclimatic = [];

var datos = [
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
    },{
        province: "Sevilla",
        zone: "Los Palacios y Villafranca",
        date: "05/07/2021",
        maximun_temperature: 36.42,
        minimun_temperature: 17.55,
        medium_temperature: 27.19,
        maximun_humidity: 87.8,
        minimun_humidity: 25.9,
        medium_humidity: 53.55
    },{
        province: "Sevilla",
        zone: "Los Palacios y Villafranca",
        date: "06/07/2021",
        maximun_temperature: 36.16,
        minimun_temperature: 18.69,
        medium_temperature: 27.57,
        maximun_humidity: 80.2,
        minimun_humidity: 23.95,
        medium_humidity: 47.14
    },{
        province: "Sevilla",
        zone: "Los Palacios y Villafranca",
        date: "07/07/2021",
        maximun_temperature: 34.63,
        minimun_temperature: 17.62,
        medium_temperature: 26.11,
        maximun_humidity: 78.9,
        minimun_humidity: 22.27,
        medium_humidity: 50.92
    },{
        province: "Sevilla",
        zone: "Los Palacios y Villafranca",
        date: "08/07/2021",
        maximun_temperature: 34.69,
        minimun_temperature: 17.55,
        medium_temperature: 26.05,
        maximun_humidity: 87.2,
        minimun_humidity: 24.9,
        medium_humidity: 56.36
    },{
        province: "Sevilla",
        zone: "Los Palacios y Villafranca",
        date: "09/07/2021",
        maximun_temperature: 37.76,
        minimun_temperature: 16.95,
        medium_temperature: 27.23,
        maximun_humidity: 77.4,
        minimun_humidity: 11.53,
        medium_humidity: 43.74
    },{
        province: "Sevilla",
        zone: "Los Palacios y Villafranca",
        date: "10/07/2021",
        maximun_temperature: 34.68,
        minimun_temperature: 16.62,
        medium_temperature: 25.52,
        maximun_humidity: 88.3,
        minimun_humidity: 25.16,
        medium_humidity: 58.06
    },{
        province: "Sevilla",
        zone: "Los Palacios y Villafranca",
        date: "11/07/2021",
        maximun_temperature: 36.56,
        minimun_temperature: 18.5,
        medium_temperature: 27.19,
        maximun_humidity: 89.1,
        minimun_humidity: 17.13,
        medium_humidity: 56.23
    },{
        province: "Sevilla",
        zone: "Los Palacios y Villafranca",
        date: "12/07/2021",
        maximun_temperature: 37.3,
        minimun_temperature: 18.5,
        medium_temperature: 27.72,
        maximun_humidity: 83.6,
        minimun_humidity: 17.47,
        medium_humidity: 48.9
    },{
        province: "Sevilla",
        zone: "Los Palacios y Villafranca",
        date: "13/07/2021",
        maximun_temperature: 37.77,
        minimun_temperature: 18.3,
        medium_temperature: 27.76,
        maximun_humidity: 76.5,
        minimun_humidity: 14.84,
        medium_humidity: 46.43
    }
];

// GET carga de datos
app.get(BASE_API_URL+"/agroclimatic/loadInitialData", (request,response) => {
    agroclimatic = datos;
    console.log("New GET to /agroclimatic");
    response.sendStatus(200);
});

// GET datos
app.get(BASE_API_URL+"/agroclimatic", (request,response) => {
    response.json(agroclimatic);
    console.log("New GET to /agroclimatic");
});

// POST nuevo dato
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