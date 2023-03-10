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

// ruta del algoritmo de Álvaro F04
app.use(require("./samples/index-aml"));

// F05
const BASE_API_URL = "/api/v1";
var bodyParser = require("body-parser");

app.use(bodyParser.json());

var agroclimatic = [/*{
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
}*/
];

var datos = [
    {
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
];

// GET carga de datos
app.get(BASE_API_URL+"/agroclimatic/loadInitialData", (request,response) => {
    agroclimatic = datos;
    console.log("Datos cargados en /agroclimatic");
    response.sendStatus(200);
});
/*
app.get(BASE_API_URL+"/agroclimatic/loadInitialData", (req, res) => {
    if (agroclimatic.length == 0) {
      agroclimatic.push({
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
    });
      res.json(agroclimatic)
      //res.json('Se han creado ' + datos_random.length + ' datos');
      console.log("Se han creado datos")
    } else {
      res.json('El arreglo ya contiene datos');
      //res.json(datos_random)
      console.log('El arreglo ya contiene datos')
    }
});
*/
// GET datos y tambien from y to
app.get(BASE_API_URL+"/agroclimatic", (request, response) => {
    const from = request.query.from;
    const to = request.query.to;

    // Buscar todas las ciudades en el período especificado
    if (from && to) {
        const provinciasAño = agroclimatic.filter(x => {
        return x.year >= from && x.year <= to;
    }); 
        if (from >= to) {
            response.status(400).json("El rango de años especificado es inválido");
        
        }else{
            response.status(200);
            response.json(provinciasAño);
            console.log(`/GET en /agroclimatic?from=${from}&to=${to}`); 
        }
    }else{
        const { year } = request.query;
  
        if (year) {
            const filtradas = agroclimatic.filter(r => r.year === parseInt(year));
            console.log("Nuevo GET en /agroclimatic con año");  
            response.status(200).json(filtradas);
        } else {
            console.log("Nuevo GET en /agroclimatic"); 
            response.status(200).json(agroclimatic);
        }  
    }
    console.log("GET con los datos");
});

// GET datos, provincia y from y to
app.get(BASE_API_URL+"/agroclimatic/:province", (request, response) => {
    const province = request.params.province;
    const from = request.query.from;
    const to = request.query.to;
    //const year = request.query.year;
    
    if (from && to) {
        if (from > to) {
            response.status(400).json("El rango de años especificado es inválido");
        } else {
            const datosFiltrados = agroclimatic.filter(x => x.province === province && x.year >= from && x.year <= to);
            response.status(200).json(datosFiltrados);
            console.log(`/GET en /agroclimatic/${province}?from=${from}&to=${to}`);
        }
    } /*else if (year) {
        const datosFiltrados = agroclimatic.filter( x.year === year); //x => x.province === province &&
        if(datosFiltrados.length === 0){
            res.status(404).json('La ruta solicitada no existe');
          }else{
        response.status(200).json(datosFiltrados);
        console.log(`New GET /agroclimatic/${province} con año`);   
          }
    }*/else {
        const datosFiltrados = agroclimatic.filter(x => x.province == province);
        
        if(datosFiltrados.length == 0){
            res.status(404).json('La ruta solicitada no existe');
          }else{
        response.status(200).json(datosFiltrados);
        console.log(`New GET /agroclimatic/${province}`); 
          }
        //response.status(200).json(datosFiltrados);
        console.log(`Nuevo GET en /agroclimatic/${province}`); 
    }
});


// GET datos filtrados por provincia y año
app.get(BASE_API_URL+"/agroclimatic/:province/:year", (request,response) => {
    const province = request.params.province;
    const year = request.params.year;
    var filtro = agroclimatic.filter(x => x.province == province && x.year == year);
    if (filtro.length == 0) {
        
        response.status(404).json('La ruta solicitada no existe');
      } else {
        response.status(200).json(filtro);
      }
      console.log("Datos de /agroclimatic/:province/:year");
});

// POST nuevo dato, si ya existe -> 409, si el dato no tiene el mismo número de propiedades -> 400
app.post(BASE_API_URL + "/agroclimatic", (request, response) => {
    var nuevo_dato = request.body;
    var nuevo_dato_Str = JSON.stringify(nuevo_dato);
    var numero_parametros = 5;

    if (Object.keys(nuevo_dato).length !== numero_parametros) {
        response.status(400).send("El número de parámetros es incorrecto");

    }else if (agroclimatic.some(x => JSON.stringify(x) === nuevo_dato_Str)) {
        response.status(409).send("El elemento ya existe");

    } else {
        console.log(`nuevo_dato = ${JSON.stringify(nuevo_dato, null, 2)}`);
        console.log("Nuevo dato en /agroclimatic");
        agroclimatic.push(nuevo_dato);
        response.sendStatus(201);
    }
});

// POST prohibido -> 405
app.post(BASE_API_URL+"/agroclimatic/:province", (request, response) =>{
    console.log("No se puede hacer este POST /agroclimatic/:province");
    response.sendStatus(405);
});

// PUT a 1 o varias provincias -> 200, sino -> 400
app.put(BASE_API_URL + "/agroclimatic/:province", (request, response) => {
    var provinceId = request.params.province;
    var body = request.body;
    var updated = false;
    
    if (provinceId === body.province) { // verifica si los valores de provincia coinciden
        agroclimatic = agroclimatic.map(x => {
            if (x.province === provinceId) {
                x.year = body.year;
                x.maximun_temperature = body.maximun_temperature;
                x.minimun_temperature = body.minimun_temperature;
                x.medium_temperature = body.medium_temperature;
                updated = true;
            }
            return x;
        });
    
        if (updated) {
            console.log("Nuevo PUT a /agroclimatic/:province");
            response.sendStatus(200);
        } else {
            console.log("No se ha encontrado el objeto con la provincia especificada");
            response.status(400).send("No se ha encontrado el objeto con la provincia especificada");
        }
    } else {
        console.log("La provincia en la URL no coincide con la provincia en la solicitud");
        response.status(400).send("La provincia en la URL no coincide con la provincia en la solicitud");
    }
});

// PUT a 1 o varios años -> 200, sino -> 400
app.put(BASE_API_URL + "/agroclimatic/:province/:year", (request, response) => {
    var provinceId = request.params.province;
    var yearId = request.params.year;
    var body = request.body;
    var updated = false;
  
    if (provinceId === body.province && yearId == parseInt(body.year)) { // verifica si los valores de año coinciden
      agroclimatic = agroclimatic.map(x => {
        if (x.province === provinceId && x.year == yearId) {
          x.maximun_temperature = body.maximun_temperature;
          x.minimun_temperature = body.minimun_temperature;
          x.medium_temperature = body.medium_temperature;
          updated = true;
        }
        return x;
      });
  
      if (updated) {
        console.log("Nuevo PUT a /agroclimatic/:province/:year");
        response.status(200).send("Actualizado");
      } else {
        console.log("No se ha encontrado el objeto con la provincia y año especificados");
        response.status(400).send("No se ha encontrado el objeto con la provincia y año especificados");
      }
    } else {
      console.log("El año en la URL no coincide con el año en la solicitud");
      response.status(400).send("El año en la URL no coincide con el año en la solicitud");
    }
  });

// PUT prohibido -> 405
app.put(BASE_API_URL+"/agroclimatic", (request,response) =>{
    console.log("No se puede hacer este PUT /agroclimatic");
    response.sendStatus(405);
});

// DELETE entero -> 200, si no se encuentra  -> 404
app.delete(BASE_API_URL+"/agroclimatic", (request, response) => {
    if (!request.body || Object.keys(request.body).length === 0) {
        agroclimatic = [];
        response.status(200).send("Los datos se han borrado correctamente");
    }else{
        const { year, province } = request.body; // Buscar el objeto     
        const objectIndex = agroclimatic.findIndex(x => x.year === year && x.province === province);

        if (objectIndex.length == 0) { // Si el objeto no se encuentra devuelve 404    
            response.status(404).send("El objeto no existe");

        } else { // Si se encuentra el objeto, eliminarlo y devolver 200    
            agroclimatic.splice(objectIndex, 1);
            response.sendStatus(200);
        }
    }
    console.log("Se ha borrado /agroclimatic");
});

// DELETE de una provincia -> 204 (borrado), si no se encuentra -> 404
app.delete(BASE_API_URL+"/agroclimatic/:province", (request, response) => {
    const province = request.params.province;
    const filtro = agroclimatic.filter(r => r.province === province);
  
    if (filtro.length === 0) {
        response.status(404).json("No se encontraron datos para esa provincia");
    } else {
        const dato = agroclimatic.filter(r => r.province !== province);
        const borrar = dato.length !== agroclimatic.length;
        agroclimatic = dato;

        if (borrar) {
            response.status(204).send("Se ha borrado la provincia");
        } else {
            response.status(404).send("No se encontraron datos que coincidan con los criterios de eliminación para esa provincia");
        }
    }
    console.log("Se ha borrado la provincia en /agroclimatic/:province");
});

// ruta del algortimo de Jorge
app.use(require('./samples/index-jfr'));

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

//GET carga de datos

app.get(BASE_API_URL+"/pollutions/loadInitialData", (request, response)=>{
    pollution = datos3;
    console.log("GET de carga en /pollutions");
    response.sendStatus(200);
});

//GET normal y from-to

app.get(BASE_API_URL+"/pollutions", (request, response) => {
    const from = request.query.from;
    const to = request.query.to;

    // Buscar todas las ciudades en el período especificado
    if (from && to) {
        const provinceYear = pollution.filter(x => {
        return x.year >= from && x.year <= to;
    }); 
        if (from >= to) {
            response.status(400).json("El rango de años especificado es inválido.");
        
        }else{
            response.status(200);
            response.json(provinceYear);
            console.log(`/GET /pollutions?from=${from}&to=${to}`); 
        }
    }else{
        const { year } = request.query;
  
        if (year) {
            const filtradas = pollution.filter(r => r.year === parseInt(year));
            console.log("New GET /pollutions con año");  
            response.status(200).json(filtradas);
        } else {
            console.log("New GET /pollutions"); 
            response.status(200).json(pollution);
        }  
    }
    console.log("GET datos");
});

//GET provincia y from-to

app.get(BASE_API_URL+"/pollutions/:province", (request, response) => {
    const province = request.params.province;
    const from = request.query.from;
    const to = request.query.to;
    //const year = request.query.year;
    
    if (from && to) {
        if (from > to) {
            response.status(400).json("El rango de años especificado es inválido");
        } else {
            const datosFiltrados = agroclimatic.filter(x => x.province === province && x.year >= from && x.year <= to);
            response.status(200).json(datosFiltrados);
            console.log(`/GET en /pollutions/${province}?from=${from}&to=${to}`);
        }
    } else {
        const datosFiltrados = pollution.filter(x => x.province == province);
        
        if(datosFiltrados.length == 0){
            res.status(404).json('La ruta solicitada no existe');
          }else{
        response.status(200).json(datosFiltrados);
        console.log(`New GET /pollutions/${province}`); 
          }
        //response.status(200).json(datosFiltrados);
        console.log(`Nuevo GET en /pollutions/${province}`); 
    }
});


// GET datos filtrados por provincia y año

app.get(BASE_API_URL+"/pollutions/:province/:year", (request,response) => {
    const province = request.params.province;
    const year = request.params.year;
    var filtro = pollution.filter(x => x.province == province && x.year == year);
    if (filtro.length == 0) {
        
        response.status(404).json('La ruta solicitada no existe');
      } else {
        response.status(200).json(filtro);
      }
      console.log("Datos de /pollutions/:province/:year");
});

//POST con error 409 (ya existe)
app.post(BASE_API_URL + "/pollutions", (request, response) => {
    var newPollution = request.body;
    var newPollutionStr = JSON.stringify(newPollution);
    var expectedParams = 5;

    
    if (Object.keys(newPollution).length !== expectedParams) {
        
        response.status(400).send("El número de parámetros es incorrecto");

    }else if (pollution.some(x => JSON.stringify(x) === newPollutionStr)) {
        
        response.status(409).send("El elemento ya existe");

    } else {
        
        console.log(`newPollution = ${JSON.stringify(newPollution, null, 2)}`);
        console.log("New POST to /pollutions");
        pollution.push(newPollution);
        response.sendStatus(201);
    }
});

//POST prohibido 405

app.post(BASE_API_URL+"/pollutions/:province", (request, response) =>{
    console.log("No se puede hacer este POST /pollutions/:province");
    response.sendStatus(405);
});

// PUT a 1 o varias provincias -> 200, sino -> 400
app.put(BASE_API_URL + "/pollutions/:province", (request, response) => {
    var provinceId = request.params.province;
    var body = request.body;
    var updated = false;
    
    if (provinceId === body.province) { // verifica si los valores de provincia coinciden
        pollution = pollution.map(x => {
            if (x.province === provinceId) {
                x.year = body.year;
                x.NO2 = body.NO2;
                x.O3 = body.O3;
                x.SO2 = body.SO2;
                updated = true;
            }
            return x;
        });
    
        if (updated) {
            console.log("New PUT /pollutions/:province");
            response.sendStatus(200);
        } else {
            console.log("No se ha encontrado el objeto con la provincia especificada");
            response.status(400).send("No se ha encontrado el objeto con la provincia especificada");
        }
    } else {
        console.log("La provincia en la URL no coincide con la provincia en la solicitud");
        response.status(400).send("La provincia en la URL no coincide con la provincia en la solicitud");
    }
});



// PUT a 1 o varios años -> 200, sino -> 400
app.put(BASE_API_URL + "/pollutions/:province/:year", (request, response) => {
    var provinceId = request.params.province;
    var yearId = request.params.year;
    var body = request.body;
    var updated = false;
  
    if (provinceId === body.province && yearId == parseInt(body.year)) { // verifica si los valores de año coinciden
      pollution = pollution.map(x => {
        if (x.province === provinceId && x.year == yearId) {
            x.NO2 = body.NO2;
            x.O3 = body.O3;
            x.SO2 = body.SO2;
          updated = true;
        }
        return x;
      });
  
      if (updated) {
        console.log("New PUT /pollutions/:province/:year");
        response.status(200).send("Actualizado");
      } else {
        console.log("No se ha encontrado el objeto con la provincia y año especificados");
        response.status(400).send("No se ha encontrado el objeto con la provincia y año especificados");
      }
    } else {
      console.log("El año en la URL no coincide con el año en la solicitud");
      response.status(400).send("El año en la URL no coincide con el año en la solicitud");
    }
  });

// PUT prohibido -> 405
app.put(BASE_API_URL+"/pollutions", (request,response) =>{
    console.log("No se puede hacer este PUT /pollutions");
    response.sendStatus(405);
});

// DELETE entero -> 200, si no se encuentra  -> 404
app.delete(BASE_API_URL+"/pollutions", (request, response) => {
    if (!request.body || Object.keys(request.body).length === 0) {
        pollution = [];
        response.status(200).send("Los datos se han borrado correctamente");
    }else{
        const { year, province } = request.body; // Buscar el objeto     
        const objectIndex = pollution.findIndex(x => x.year === year && x.province === province);

        if (objectIndex.length == 0) { // Si el objeto no se encuentra devuelve 404    
            response.status(404).send("El objeto no existe");

        } else { // Si se encuentra el objeto, eliminarlo y devolver 200    
            pollution.splice(objectIndex, 1);
            response.sendStatus(200);
        }
    }
    console.log("Se ha borrado /pollution");
});

// DELETE de una provincia -> 204 (borrado), si no se encuentra -> 404
app.delete(BASE_API_URL+"/pollutions/:province", (request, response) => {
    const province = request.params.province;
    const filtro = pollution.filter(r => r.province === province);
  
    if (filtro.length === 0) {
        response.status(404).json("No se encontraron datos para esa provincia");
    } else {
        const dato = pollution.filter(r => r.province !== province);
        const borrar = dato.length !== pollution.length;
        pollution = dato;

        if (borrar) {
            response.status(204).send("Se ha borrado la provincia");
        } else {
            response.status(404).send("No se encontraron datos que coincidan con los criterios de eliminación para esa provincia");
        }
    }
    console.log("Se ha borrado la provincia en /pollutions/:province");
});


// ruta del algoritmo de Víctor

app.use(require('./samples/index-vem'));

var library = [];

var datos2 = [
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
];


// GET carga de datos
app.get(BASE_API_URL+"/library/loadInitialData", (request,response) => {
    library = datos2;
    console.log("Datos cargados en /library");
    response.sendStatus(200);
});

// GET datos y tambien from y to
app.get(BASE_API_URL+"/library", (request, response) => {
    const from = request.query.from;
    const to = request.query.to;

    // Buscar todas las ciudades en el período especificado
    if (from && to) {
        const provinciasAño = agroclimatic.filter(x => {
        return x.modified >= from && x.modified <= to;
    }); 
        if (from >= to) {
            response.status(400).json("El rango de años especificado es inválido");
        
        }else{
            response.status(200);
            response.json(provinciasAño);
            console.log(`/GET en /library?from=${from}&to=${to}`); 
        }
    }else{
        const { modified } = request.query;
  
        if (modified) {
            const filtradas = library.filter(r => r.modified === parseInt(modified));
            console.log("Nuevo GET en /library con año");  
            response.status(200).json(filtradas);
        } else {
            console.log("Nuevo GET en /library"); 
            response.status(200).json(library);
        }  
    }
    console.log("GET con los datos");
});

// GET datos, provincia y from y to
app.get(BASE_API_URL+"/library/:province_name", (request, response) => {
    const province_name = request.params.province_name;
    const from = request.query.from;
    const to = request.query.to;
    
    if (from && to) {
        if (from > to) {
            response.status(400).json("El rango de años especificado es inválido");
        } else {
            const datosFiltrados = library.filter(x => x.province_name === province_name && x.modified >= from && x.modified <= to);
            response.status(200).json(datosFiltrados);
            console.log(`/GET en /library/${province_name}?from=${from}&to=${to}`);
        }
    } 
    else {
        const datosFiltrados = library.filter(x => x.province_name == province_name);
        
        if(datosFiltrados.length == 0){
            res.status(404).json('La ruta solicitada no existe');
          }else{
        response.status(200).json(datosFiltrados);
        console.log(`New GET /library/${province_name}`); 
          }
        console.log(`Nuevo GET en /library/${province_name}`); 
    }
});


// GET datos filtrados por provincia y año
app.get(BASE_API_URL+"/library/:province_name/:modified", (request,response) => {
    const province_name = request.params.province_name;
    const modified = request.params.modified;
    var filtro = library.filter(x => x.province_name == province_name && x.modified == modified);
    if (filtro.length == 0) {
        
        response.status(404).json('La ruta solicitada no existe');
      } else {
        response.status(200).json(filtro);
      }
      console.log("Datos de /library/:province_name/:modified");
});

// POST nuevo dato, si ya existe -> 409, si el dato no tiene el mismo número de propiedades -> 400
app.post(BASE_API_URL + "/library", (request, response) => {
    var nuevo_dato2 = request.body;
    var nuevo_dato2_Str = JSON.stringify(nuevo_dato2);
    var numero_parametros = 5;

    if (Object.keys(nuevo_dato2).length !== numero_parametros) {
        response.status(400).send("El número de parámetros es incorrecto");

    }else if (library.some(x => JSON.stringify(x) === nuevo_dato2_Str)) {
        response.status(409).send("El elemento ya existe");

    } else {
        console.log(`nuevo_dato = ${JSON.stringify(nuevo_dato2, null, 2)}`);
        console.log("Nuevo dato en /library");
        library.push(nuevo_dato2);
        response.sendStatus(201);
    }
});

// POST prohibido -> 405
app.post(BASE_API_URL+"/library/:province_name", (request, response) =>{
    console.log("No se puede hacer este POST /library/:province_name");
    response.sendStatus(405);
});

// PUT a 1 o varias provincias -> 200, sino -> 400
app.put(BASE_API_URL + "/library/:province_name", (request, response) => {
    var provinceId = request.params.province_name;
    var body = request.body;
    var updated = false;
    
    if (provinceId === body.province_name) { // verifica si los valores de provincia coinciden
        library = library.map(x => {
            if (x.province_name === provinceId) {
                x.identifier = body.identifier;
                x.locality_id = body.locality_id;
                x.modified = body.modified;
                x.postcode = body.postcode;
                updated = true;
            }
            return x;
        });
    
        if (updated) {
            console.log("Nuevo PUT a /library/:province_name");
            response.sendStatus(200);
        } else {
            console.log("No se ha encontrado el objeto con la provincia especificada");
            response.status(400).send("No se ha encontrado el objeto con la provincia especificada");
        }
    } else {
        console.log("La provincia en la URL no coincide con la provincia en la solicitud");
        response.status(400).send("La provincia en la URL no coincide con la provincia en la solicitud");
    }
});

// PUT a 1 o varios años -> 200, sino -> 400
app.put(BASE_API_URL + "/library/:province_name/:modified", (request, response) => {
    var provinceId = request.params.province_name;
    var yearId = request.params.modified;
    var body = request.body;
    var updated = false;
  
    if (provinceId === body.province_name && yearId == parseInt(body.modified)) { // verifica si los valores de año coinciden
      library = library.map(x => {
        if (x.province_name === provinceId && x.modified == yearId) {
            x.identifier = body.identifier;
            x.locality_id = body.locality_id;
            x.postcode = body.postcode;
          updated = true;
        }
        return x;
      });
  
      if (updated) {
        console.log("Nuevo PUT a /library/:province_name/:modified");
        response.status(200).send("Actualizado");
      } else {
        console.log("No se ha encontrado el objeto con la provincia y año especificados");
        response.status(400).send("No se ha encontrado el objeto con la provincia y año especificados");
      }
    } else {
      console.log("El año en la URL no coincide con el año en la solicitud");
      response.status(400).send("El año en la URL no coincide con el año en la solicitud");
    }
});

app.put(BASE_API_URL+"/library", (request,response) =>{
    console.log("No se puede hacer este PUT /library");
    response.sendStatus(405);
});

// DELETE entero -> 200, si no se encuentra  -> 404
app.delete(BASE_API_URL+"/library", (request, response) => {
    if (!request.body || Object.keys(request.body).length === 0) {
        library = [];
        response.status(200).send("Los datos se han borrado correctamente");
    }else{
        const { modified, province_name } = request.body; // Buscar el objeto     
        const objectIndex = library.findIndex(x => x.modified === modified && x.province_name === province_name);

        if (objectIndex.length == 0) { // Si el objeto no se encuentra devuelve 404    
            response.status(404).send("El objeto no existe");

        } else { // Si se encuentra el objeto, eliminarlo y devolver 200    
            library.splice(objectIndex, 1);
            response.sendStatus(200);
        }
    }
    console.log("Se ha borrado /library");
});

// DELETE de una provincia -> 204 (borrado), si no se encuentra -> 404
app.delete(BASE_API_URL+"/library/:province_name", (request, response) => {
    const province_name = request.params.province_name;
    const filtro = library.filter(r => r.province_name === province_name);
  
    if (filtro.length === 0) {
        response.status(404).json("No se encontraron datos para esa provincia");
    } else {
        const dato2 = library.filter(r => r.province_name !== province_name);
        const borrar = dato2.length !== library.length;
        library = dato2;

        if (borrar) {
            response.status(204).send("Se ha borrado la provincia");
        } else {
            response.status(404).send("No se encontraron datos que coincidan con los criterios de eliminación para esa provincia");
        }
    }
    console.log("Se ha borrado la provincia en /library/:province_name");
});

// Manejador de errores
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) {
    // Enviar una respuesta con un código de estado 400 Bad Request si hay un error de sintaxis en el JSON
    res.status(400).json('La solicitud contiene un JSON no válido');
    } else if (err.status === 401) {
    // Enviar una respuesta con un código de estado 401 Unauthorized si no se proporcionó un token de autenticación válido
    res.status(401).json('No se proporcionó un token de autenticación válido');
    } else {
    // Enviar una respuesta con un código de estado 500 Internal Server Error si ocurrió un error no previsto
    res.status(500).json('Ha ocurrido un error interno en el servidor');
    }
    });
  
  //VERIFICAR SI METODO POST ES A ESA URL
    app.use((req, res, next) => {
      // Verificar si la solicitud es un POST y si no es en la ruta correcta
      if (req.method === 'POST' && req.originalUrl !== '/api/v1/agroclimatic') {
        res.status(405).json('Método no permitido');
        return;
      }
    
      // Enviar una respuesta con un código de estado 404 Not Found si la ruta no se encuentra
      res.status(404).json('La ruta solicitada no existe');
    });
    
  // Manejador de rutas no encontradas
  app.use((req, res) => {
    // Enviar una respuesta con un código de estado 404 Not Found si la ruta no se encuentra
    res.status(404).json('La ruta solicitada no existe');
  });
  