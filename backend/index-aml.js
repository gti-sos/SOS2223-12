const { request, response } = require("express");
var Datastore = require("nedb");
var db = new Datastore();

const BASE_API_URL = "/api/v1";

module.exports = (app) =>{
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
    
    db.insert(datos);
    console.log("Insertados los datos");

    // GET carga de datos
    app.get(BASE_API_URL+"/agroclimatic/loadInitialData", (request,response) => {
        db.find({}, (err, agroclimatic)=>{
            if(agroclimatic.length > 0){
                response.json("Los datos ya se han cargado");
                console.log("Los datos ya se han cargado");
            }else if(err){
                response.sendStatus(500);
                console.log("Error al cargar los datos");
            }else{
                db.insert(datos);
                console.log("Se han insertado los datos");
                response.sendStatus(200);
            }
        });
        /*agroclimatic = datos;
        console.log("Datos cargados en /agroclimatic");
        response.sendStatus(200);*/
    });

    app.get(BASE_API_URL+"/agroclimatic/docs",(req,res)=>
    {
        res.redirect("https://documenter.getpostman.com/view/20091922/UyrDCF8G")
    });
    
    // GET datos y tambien from y to
    app.get(BASE_API_URL+"/agroclimatic", (request, response) => {
        const from = request.query.from;
        const to = request.query.to;
        db.find({}, (err, agroclimatic)=>{
            if (from && to && !err) {
                const provinciasAño = agroclimatic.filter(x => {return x.year >= from && x.year <= to}); 
                if (from >= to) {
                    response.status(400).json("El rango de años especificado es inválido");
                
                }else{
                    response.status(200);
                    response.json(provinciasAño.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                    console.log(`/GET en /agroclimatic?from=${from}&to=${to}`); 
                }
            }else if(!err){
                const { year } = request.query;
          
                if (year) {
                    const filtradas = agroclimatic.filter(r => r.year === parseInt(year));
                    console.log("Nuevo GET en /agroclimatic con año");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                } else {
                    console.log("Nuevo GET en /agroclimatic"); 
                    response.status(200);
                    response.json(agroclimatic.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }  
            }else{
                console.log("Error al dar los datos");
                response.sendStatus(500);
            }
        });
        // Buscar todas las ciudades en el período especificado
        /*if (from && to) {
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
        }*/
        console.log("GET con los datos");
    });
    
    // GET datos, provincia y from y to
    app.get(BASE_API_URL+"/agroclimatic/:province", (request, response) => {
        const province = request.params.province;
        const from = request.query.from;
        const to = request.query.to;
        
        if (from && to) {
            if (from > to) {
                response.status(400).json("El rango de años especificado es inválido");
            } else {
                const datosFiltrados = agroclimatic.filter(x => x.province === province && x.year >= from && x.year <= to);
                response.status(200).json(datosFiltrados);
                console.log(`/GET en /agroclimatic/${province}?from=${from}&to=${to}`);
            }
        }else {
            const datosFiltrados = agroclimatic.filter(x => x.province == province);
            
            if(datosFiltrados.length == 0){
                res.status(404).json('La ruta solicitada no existe');
              }else{
            response.status(200).json(datosFiltrados);
            console.log(`New GET /agroclimatic/${province}`); 
              }
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
}