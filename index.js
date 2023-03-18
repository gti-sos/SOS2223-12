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
var backend_aml = require("./backend/index-aml");
var backend_jfr = require("./backend/index-jfr");
var backend_vem = require("./backend/index-vem");


// ruta del algoritmo de Álvaro F04
app.use(require("./samples/index-aml"));


// F05
const BASE_API_URL = "/api/v1";
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use("/", express.static("./public"));

backend_aml(app);
backend_jfr(app);
backend_vem(app);


/*
var agroclimatic = [{
    province: "Sevilla",
    year: 2021,
    maximun_temperature: 37.57,
    minimun_temperature: 18.77,
    medium_temperature: 27.57 
},{
    province: "Huelva",
    year: 2020,
    maximun_temperature: 36.42,
    minimun_temperature: 17.55,
    medium_temperature: 27.19
},{
    province: "Sevilla",
    year: 2021,
    maximun_temperature: 36.16,
    minimun_temperature: 18.69,
    medium_temperature: 27.57
},{
    province: "Huelva",
    year: 2021,
    maximun_temperature: 34.63,
    minimun_temperature: 17.62,
    medium_temperature: 26.11
},{
    province: "Sevilla",
    year: 2021,
    maximun_temperature: 34.69,
    minimun_temperature: 17.55,
    medium_temperature: 26.05
},{
    province: "Sevilla",
    year: 2020,
    maximun_temperature: 37.76,
    minimun_temperature: 16.95,
    medium_temperature: 27.23
},{
    province: "Huelva",
    year: 2021,
    maximun_temperature: 34.68,
    minimun_temperature: 16.62,
    medium_temperature: 25.52
},{
    province: "Sevilla",
    year: 2020,
    maximun_temperature: 36.56,
    minimun_temperature: 18.5,
    medium_temperature: 27.19
},{
    province: "Huelva",
    year: 2020,
    maximun_temperature: 37.3,
    minimun_temperature: 18.5,
    medium_temperature: 27.72,
},{
    province: "Huelva",
    year: 2020,
    maximun_temperature: 37.77,
    minimun_temperature: 18.3,
    medium_temperature: 27.76
}
];*/


// ruta del algortimo de Jorge
app.use(require('./samples/index-jfr'));


/*
var pollution = [];

var datos3= [
    {
        province: "sevilla",
        year: 2021, 
        NO2: 45.0,
        O3: 25.875,
        SO2:3.0 
    },{
        province: "huelva",
        year: 2020, 
        NO2: 20.0,
        O3: 19.486,
        SO2: 5.0
    },{
        province: "sevilla",
        year: 2021, 
        NO2: 4.0,
        O3: 36.875,
        SO2: 7.0
    },{
        province: "huelva",
        year: 2021, 
        NO2: 43.0,
        O3: 23.625,
        SO2: 2.0
    },{
        province: "sevilla",
        year: 2021, 
        NO2: 5.0,
        O3: 37.5,
        SO2: 6.0 
    },{
        province: "sevilla",
        year: 2020, 
        NO2: 74.0,
        O3: 10.25,
        SO2: 9.0
    },{
        province: "huelva",
        year: 2021, 
        NO2: 36.0,
        O3: 21.125,
        SO2: 2.0
    },{
        province: "sevilla",
        year: 2020, 
        NO2: 40.0,
        O3: 16.875,
        SO2: 5.0
    },{
        province: "huelva",
        year: 2020, 
        NO2: 47.0,
        O3: 16.875,
        SO2: 10.0
    },{
        province: "huelva",
        year: 2020, 
        NO2: 25.0,
        O3: 16.785,
        SO2: 10.1
    }
]

*/


// ruta del algoritmo de Víctor

app.use(require('./samples/index-vem'));

/*

var library = [];
var datos2= [
        {
            identifier: 872,
            locality_id: 160,
            modified: 2021,
            postcode: 41460,
            province_name: "Sevilla"
        },{
            identifier: 873,
            locality_id: 161,
            modified: 2021,
            postcode: 41804,
            province_name: "Huelva"
        }, {
            identifier: 874,
            locality_id: 162,
            modified: 2021,
            postcode: 41640,
            province_name: "Sevilla"
        }, {
            identifier: 875,
            locality_id: 166,
            modified: 2021,
            postcode: 41720,
            province_name: "Huelva"
        }, {
            identifier: 876,
            locality_id: 168,
            modified: 2021,
            postcode: 41928,
            province_name: "Sevilla"
        },{
            identifier: 877,
            locality_id: 172,
            modified: 2020,
            postcode: 41610,
            province_name: "Sevilla"
        },{
            identifier: 878,
            locality_id: 173,
            modified: 2020,
            postcode: 41566,
            province_name: "Sevilla"
        },{
            identifier: 879,
            locality_id: 177,
            modified: 2020,
            postcode: 41360,
            province_name: "Sevilla"
        }, {
            identifier: 880,
            locality_id: 178,
            modified: 2020,
            postcode: 41470,
            province_name: "Huelva"
        },{
            identifier: 881,
            locality_id: 181,
            modified: 2020,
            postcode: 41840,
            province_name: "Huelva"
        }
    ] 
*/