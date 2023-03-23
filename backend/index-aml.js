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
    console.log("Insertados los datos en Agroclimatic");

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
    });

    app.get(BASE_API_URL+"/agroclimatic/docs",(req,res)=>
    {
        res.redirect("https://documenter.getpostman.com/view/25974627/2s93JzLg1D");
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
                const year = request.query.year;
                const province = request.query.province;
                const temp_max = request.query.maximun_temperature;
                const temp_min = request.query.minimun_temperature;
                const temp_med = request.query.medium_temperature;
                const limit = request.query.limit;
                const offset = request.query.offset;
                
                if(limit && offset){ 
                    const filtradas = pagination(request,agroclimatic);
                    console.log("Nuevo GET en /agroclimatic con paginación");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                    }));
                }else if(province && year && temp_max && temp_min && temp_med){
                    const filtradas = agroclimatic.filter(r => r.province == province && r.year == year && r.maximun_temperature >= temp_max
                        && r.minimun_temperature >= temp_min && r.medium_temperature >= temp_med);
                    console.log("Nuevo GET en /agroclimatic con provincia, año, temperaturas maxima, minima y media");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province && year && temp_max && temp_min){
                    const filtradas = agroclimatic.filter(r => r.province == province && r.year == year && r.maximun_temperature >= temp_max
                        && r.minimun_temperature >= temp_min);
                    console.log("Nuevo GET en /agroclimatic con provincia, año, temperatura maxima y minima");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province && year && temp_max && temp_med){
                    const filtradas = agroclimatic.filter(r => r.province == province && r.year == year && r.maximun_temperature >= temp_max
                        && r.medium_temperature >= temp_med);
                    console.log("Nuevo GET en /agroclimatic con provincia, año, temperatura maxima y media");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province && year && temp_min && temp_med){
                    const filtradas = agroclimatic.filter(r => r.province == province && r.year == year && r.minimun_temperature >= temp_min
                        && r.medium_temperature >= temp_med);
                    console.log("Nuevo GET en /agroclimatic con provincia, año, temperatura minima y media");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province && temp_max && temp_min && temp_med){
                    const filtradas = agroclimatic.filter(r => r.province == province && r.maximun_temperature >= temp_max && 
                        r.minimun_temperature >= temp_min && r.medium_temperature >= temp_med);
                    console.log("Nuevo GET en /agroclimatic con provincia, temperatura maxima, minima y media");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(year && temp_max && temp_min && temp_med){
                    const filtradas = agroclimatic.filter(r => r.year == year && r.maximun_temperature >= temp_max && r.minimun_temperature >= temp_min
                        && r.medium_temperature >= temp_med);
                    console.log("Nuevo GET en /agroclimatic con año, temperatura maxima, minima y media");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province && year && temp_max){
                    const filtradas = agroclimatic.filter(r => r.province == province && r.year == year && r.maximun_temperature >= temp_max);
                    console.log("Nuevo GET en /agroclimatic con provincia, año y temperatura maxima");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province && year && temp_min){
                    const filtradas = agroclimatic.filter(r => r.province == province && r.year == year && r.minimun_temperature >= temp_min);
                    console.log("Nuevo GET en /agroclimatic con provincia, año y temperatura minima");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province && year && temp_med){
                    const filtradas = agroclimatic.filter(r => r.province == province && r.year == year && r.medium_temperature >= temp_med);
                    console.log("Nuevo GET en /agroclimatic con provincia, año y temperatura media");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province && temp_max && temp_min){
                    const filtradas = agroclimatic.filter(r => r.province == province && r.maximun_temperature >= temp_max && 
                        r.minimun_temperature >= temp_min);
                    console.log("Nuevo GET en /agroclimatic con provincia, temperatura maxima y minima");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province && temp_max && temp_med){
                    const filtradas = agroclimatic.filter(r => r.province == province && r.maximun_temperature >= temp_max && 
                        r.medium_temperature >= temp_med);
                    console.log("Nuevo GET en /agroclimatic con provincia, temperatura maxima y media");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province && temp_min && temp_med){
                    const filtradas = agroclimatic.filter(r => r.province == province && r.minimun_temperature >= temp_min &&
                        r.medium_temperature >= temp_med);
                    console.log("Nuevo GET en /agroclimatic con provincia, temperatura minima y media");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(year && temp_max && temp_min){
                    const filtradas = agroclimatic.filter(r => r.year == year && r.maximun_temperature >= temp_max &&
                        r.minimun_temperature >= temp_min);
                    console.log("Nuevo GET en /agroclimatic con año, temperatura maxima y minima");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(year && temp_max && temp_med){
                    const filtradas = agroclimatic.filter(r => r.year == year && r.maximun_temperature >= temp_max &&
                        r.medium_temperature >= temp_med);
                    console.log("Nuevo GET en /agroclimatic con año, temperatura maxima y media");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(year && temp_min && temp_med){
                    const filtradas = agroclimatic.filter(r => r.year == year && r.minimun_temperature >= temp_min &&
                        r.medium_temperature >= temp_med);
                    console.log("Nuevo GET en /agroclimatic con año, temperatura minima y media");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(temp_max && temp_min && temp_med){
                    const filtradas = agroclimatic.filter(r => r.maximun_temperature >= temp_max && r.minimun_temperature >= temp_min
                        && r.medium_temperature >= temp_med);
                    console.log("Nuevo GET en /agroclimatic con temperatura maxima, minima y media");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province && year){
                    const filtradas = agroclimatic.filter(r => r.province == province && r.year == year);
                    console.log("Nuevo GET en /agroclimatic con provincia y año");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province && temp_max){
                    const filtradas = agroclimatic.filter(r => r.province == province && r.maximun_temperature >= temp_max);
                    console.log("Nuevo GET en /agroclimatic con provincia y temperatura maxima");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province && temp_min){
                    const filtradas = agroclimatic.filter(r => r.province == province && r.minimun_temperature >= temp_min);
                    console.log("Nuevo GET en /agroclimatic con provincia y temperatura minima");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province && temp_med){
                    const filtradas = agroclimatic.filter(r => r.province == province && r.medium_temperature >= temp_med);
                    console.log("Nuevo GET en /agroclimatic con provincia y temperatura media");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(year && temp_max){
                    const filtradas = agroclimatic.filter(r => r.year == year && r.maximun_temperature >= temp_max);
                    console.log("Nuevo GET en /agroclimatic con año y temperatura maxima");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(year && temp_min){
                    const filtradas = agroclimatic.filter(r => r.year == year && r.minimun_temperature >= temp_min);
                    console.log("Nuevo GET en /agroclimatic con año y temperatura minima");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(year && temp_med){
                    const filtradas = agroclimatic.filter(r => r.year == year && r.medium_temperature >= temp_med);
                    console.log("Nuevo GET en /agroclimatic con año y temperatura media");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(temp_max && temp_min){
                    const filtradas = agroclimatic.filter(r => r.maximun_temperature >= temp_max && r.minimun_temperature >= temp_min);
                    console.log("Nuevo GET en /agroclimatic con temperatura maxima y temperatura minima");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(temp_max && temp_med){
                    const filtradas = agroclimatic.filter(r => r.maximun_temperature >= temp_max && r.medium_temperature >= temp_med);
                    console.log("Nuevo GET en /agroclimatic con temperatura maxima y temperatura media");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(temp_min && temp_med){
                    const filtradas = agroclimatic.filter(r => r.minimun_temperature >= temp_min && r.medium_temperature >= temp_med);
                    console.log("Nuevo GET en /agroclimatic con temperatura minima y temperatura media");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if (year) {
                    const filtradas = agroclimatic.filter(r => r.year === parseInt(year));
                    console.log("Nuevo GET en /agroclimatic con año");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                    
                } else if(province){
                    const filtradas = agroclimatic.filter(r => r.province === province);
                    console.log("Nuevo GET en /agroclimatic con provincia");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(temp_max){
                    const filtradas = agroclimatic.filter(r => r.maximun_temperature >= temp_max);
                    console.log("Nuevo GET en /agroclimatic con temperatura maxima");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(temp_min){
                    const filtradas = agroclimatic.filter(r => r.minimun_temperature >= temp_min);
                    console.log("Nuevo GET en /agroclimatic con temperatura minima");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(temp_med){
                    const filtradas = agroclimatic.filter(r => r.medium_temperature >= temp_med);
                    console.log("Nuevo GET en /agroclimatic con temperatura media");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else {
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
        console.log("GET con los datos");
    });
    
    // Paginacion
    function pagination(request, lista){
        var res = [];
        const limit = request.query.limit;
        const offset = request.query.offset;
        
        if(limit < 1 || offset < 0 || offset > lista.length){
            res.push("Hay un error en los parametros offset y limit");
            return res;
        }else{
        res = lista.slice(offset,parseInt(limit)+parseInt(offset));
        return res;
        }     
    };

    // GET datos, provincia y from y to
    app.get(BASE_API_URL+"/agroclimatic/:province", (request, response) => {
        const province = request.params.province;
        const from = request.query.from;
        const to = request.query.to;
        db.find({}, (err, agroclimatic)=>{
            if (from && to && !err) {
                if (from > to) {
                    response.status(400).json("El rango de años especificado es inválido");
                } else {
                    const datosFiltrados = agroclimatic.filter(x => x.province === province && x.year >= from && x.year <= to);
                    response.status(200).json(datosFiltrados.map((c) =>{
                        delete c._id;
                        return c;
                    }));
                    console.log(`/GET en /agroclimatic/${province}?from=${from}&to=${to}`);
                }
            }else if(!err){
                const datosFiltrados = agroclimatic.filter(x => x.province == province);
                
                if(datosFiltrados.length == 0){
                    res.status(404).json('La ruta solicitada no existe');
                }else{
                response.status(200).json(datosFiltrados.map((c)=>{
                    delete c._id;
                    return c;
                }));
                console.log(`New GET /agroclimatic/${province}`); 
                }
                console.log(`Nuevo GET en /agroclimatic/${province}`); 
            }else{
                response.sendStatus(500);
                console.log("No se ha podido hacer la busqueda");
            }
        });    
    });
    
    
    // GET datos filtrados por provincia y año
    app.get(BASE_API_URL+"/agroclimatic/:province/:year", (request,response) => {
        const province = request.params.province;
        const year = request.params.year;
        db.find({}, (err, agroclimatic)=>{
            if(!err){
                var filtro = agroclimatic.filter(x => x.province == province && x.year == year);
                if (filtro.length == 0) {            
                    response.status(404).json('La ruta solicitada no existe');
                }else if(filtro.length == 1){
                    filtro.forEach(element => {
                        delete element._id;
                    });
                    response.send(JSON.stringify(filtro[0], null, 2));
                }else {
                    response.status(200).json(filtro.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }
            }else{
                console.log("No se ha podido obtener los datos");
                response.sendStatus(500);
            }   
        });
        console.log("Datos de /agroclimatic/:province/:year");
    });
    
    // POST nuevo dato, si ya existe -> 409, si el dato no tiene el mismo número de propiedades -> 400
    app.post(BASE_API_URL + "/agroclimatic", (request, response) => {
        const province = request.body.province;
        const year = request.body.year;
        const temp_max = request.body.maximun_temperature;
        const temp_min = request.body.minimun_temperature;
        const temp_med = request.body.medium_temperature;

        db.find({},function(err,filteredList){

            if(err){
                response.sendStatus(500);
            }

            // Validar que se envíen todos los campos necesarios
            const requiredFields = ['province', 'year', 'maximun_temperature', 'minimun_temperature', 'medium_temperature'];
            for (const field of requiredFields) {
                if (!request.body.hasOwnProperty(field)) {
                return response.status(400).json(`Falta alguno de los campos: ${field}`);
                }
            }
            // Verificar que la solicitud se hizo en la ruta correcta
            if (request.originalUrl != BASE_API_URL+"/agroclimatic") {
                response.status(405).json('Url no permitida');
            }else{ 

                // Verificar si el recurso ya existe
                filteredList = filteredList.filter((obj)=>
                                {
                                    return(province == obj.province && year == obj.year && temp_max == obj.maximun_temperature &&
                                        temp_min == obj.minimun_temperature && temp_med == obj.medium_temperature)
                                });
                
                if (filteredList.length !=0) {
                    // Si el recurso ya existe, devolver un código de respuesta 409
                    response.status(409).json(`El recurso ya existe.`);
                } else {
                    // Si el recurso no existe, agregarlo a la lista y devolver un código de respuesta 201
                    db.insert(request.body);
                   
                    response.sendStatus(201);
                    console.log("Se ha insertado un nuevo dato");
                }
            }
        });
        console.log("New POST to /agroclimatic"); 
    });
    
    // POST prohibido -> 405
    app.post(BASE_API_URL+"/agroclimatic/:province", (request, response) =>{
        console.log("No se puede hacer este POST /agroclimatic/:province");
        response.sendStatus(405);
    });
    
    // PUT a 1 o varias provincias -> 200, sino -> 400
    app.put(BASE_API_URL + "/agroclimatic/:province", (request, response) => {
        const province = request.params.province;
        const body = request.body;
        if (province === body.province) {
            const requiredFields = ['province', 'year', 'maximun_temperature', 'minimun_temperature', 'medium_temperature'];
                for (const field of requiredFields) {
                    if (!request.body.hasOwnProperty(field)) {
                    return response.status(400).json(`Falta alguno de los campos: ${field}`);
                    }
                }
        
            db.update({ province: province }, 
                { $set: 
                    { year: body.year, 
                    maximun_temperature: body.maximun_temperature, 
                    minimun_temperature: body.minimun_temperature, 
                    medium_temperature: body.medium_temperature} }, {}, (err, numAffected) => {
                if (err) {
                    console.log("Error actualizando el objeto: ", err);
                    response.status(500).send("Error actualizando el objeto");
                } else if (numAffected === 0) {
                    console.log("No se ha encontrado el objeto con la provincia especificada");
                    response.status(400).send("No se ha encontrado el objeto con la provincia especificada");
                } else {
                    console.log("Nuevo objeto actualizado en la base de datos");
                    response.status(200).send("Actualizado");
                }
            });
        }else {
            console.log("La provincia en la URL no coincide con la provincia en la solicitud");
            response.status(400).send("La provincia en la URL no coincide con la provincia en la solicitud");
        }
    });
    
    // PUT a 1 o varios años -> 200, sino -> 400
    app.put(BASE_API_URL + "/agroclimatic/:province/:year", (request, response) => {
        const province = request.params.province;
        const year = parseInt(request.params.year);
        const body = request.body;

        // Verifica si los valores de año coinciden
        if (province === body.province && year === body.year) {
            // Actualiza el registro en la base de datos
            const requiredFields = ['province', 'year', 'maximun_temperature', 'minimun_temperature', 'medium_temperature'];
            for (const field of requiredFields) {
                if (!request.body.hasOwnProperty(field)) {
                return response.status(400).json(`Falta alguno de los campos: ${field}`);
                }
            }
                db.update(
                    { province: province, year: year},
                    { $set: {
                        maximun_temperature: body.maximun_temperature,
                        minimun_temperature: body.minimun_temperature,
                        medium_temperature: body.medium_temperature}},{},

                    function (err, numReplaced) {
                        if(err){
                            console.log("Se ha producido un error al actualizar el dato");
                            response.sendStatus(500);
                        }else if (numReplaced === 1) {
                            console.log("Nuevo PUT a /agroclimatic/:province/:year");
                            response.status(200).send("Actualizado");
                        } else {
                            console.log("No se ha encontrado el objeto con la provincia y año especificados");
                            response.status(400).send("No se ha encontrado el objeto con la provincia y año especificados");
                        }
                    }
                );   
        } else {
            console.log("El año o provincia en la URL no coincide con el año o provincia en la solicitud");
            response.status(400).send("El año o provincia en la URL no coincide con el año o provincia en la solicitud");
        }
    });
    
    // PUT prohibido -> 405
    app.put(BASE_API_URL+"/agroclimatic", (request,response) =>{
        console.log("No se puede hacer este PUT /agroclimatic");
        response.sendStatus(405);
    });
    
    // DELETE entero -> 200, si no se encuentra  -> 404
    app.delete(BASE_API_URL+"/agroclimatic", (request, response) => {
        db.remove({}, {multi : true},(err, numRemoved)=>{
            if(err){
                console.log("Error para borrar todos los datos");
                response.sendStatus(500);
            }else if(numRemoved == 0){
                response.status(404).send("No hay mas datos para borrar");
                console.log("No se encuentran mas contactos para borrar");
            }else{
                console.log("Borrados todos los datos");
                response.json(200);
                console.log(numRemoved);
            }
        });
        console.log("Se ha borrado /agroclimatic");
    });
    
    // DELETE de una provincia -> 204 (borrado), si no se encuentra -> 404
    app.delete(BASE_API_URL+"/agroclimatic/:province", (request, response) => {
        const province = request.params.province;
        db.remove({province : province}, {}, (err, numRemoved)=>{
            if(err){
                console.log("Error para borrar todos los datos");
                response.status(500).send("Error");

            }else if(numRemoved === 0){
                console.log("No se encuentran datos");
                response.status(400).send("No se encuentran datos");
            }else{
                console.log("Borrado el dato");
                response.status(200).send("Se ha borrado el dato");
            }
        });
        console.log("Se ha borrado la provincia en /agroclimatic/:province");
    });
    // DELETE de provincia y año
    app.delete(BASE_API_URL+"/agroclimatic/:province/:year", (request, response) => {
        const province = request.params.province;
        const year = request.params.year;
        db.remove({province : province , year : parseInt(year)}, {}, (err, numRemoved)=>{
            if(err){
                console.log("Error para borrar todos los datos");
                response.status(500).send("Error");

            }else if(numRemoved == 0){
                console.log("No se encuentran datos");
                response.status(400).send("No se encuentran datos");
            }else{
                console.log("Borrado el dato");
                response.status(200).send("Se ha borrado el dato");
            }
        });
        console.log("Se ha borrado la provincia en /agroclimatic/:province");
    });
}