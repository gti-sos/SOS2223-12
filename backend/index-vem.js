const { request, response } = require("express");
var Datastore = require("nedb");
var db = new Datastore();

const BASE_API_URL = "/api/v1";

module.exports = (app) =>{

    var datos= [
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

    db.insert(datos);
    console.log("Datos insertados de library.")

    //Redireccionar
    app.get(BASE_API_URL+'/library/docs', (req, res) => {
        res.redirect('https://documenter.getpostman.com/view/25989524/2s93JzLfha');
    });
    //GET carga

    app.get(BASE_API_URL+"/library/loadInitialData", (request,response) => {
        console.log("New GET to /library");
        db.find({}, (err, library)=>{
        if(library.length>0){
            response.json("Los datos library estan cargados.");
            console.log("Los datos library estan cargados.")
        }else if(err){
                console.log(`Error geting /library/loadInitialData: ${err}`);
                response.sendStatus(500);
        }else{
            db.insert(datos)
            console.log(`library returned ${library.length}`);
            response.sendStatus(200);
        }
        });
        
    });

    // GET datos y tambien from y to
    app.get(BASE_API_URL+"/library", (request, response) => {
        const from = request.query.from;
        const to = request.query.to;
        db.find({}, (err, library)=>{
            if (from && to && !err) {
                const provinciasAño = library.filter(x => {return x.modified >= from && x.modified <= to}); 
                if (from >= to) {
                    response.status(400).json("El rango de años especificado es inválido");
                
                }else{
                    response.status(200);
                    response.json(provinciasAño.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                    console.log(`/GET en /library?from=${from}&to=${to}`); 
                }
            }else if(!err){
                const modified = request.query.modified;
                const province_name = request.query.province_name;
                const identifier = request.query.identifier;
                const locality_id = request.query.locality_id;
                const postcode = request.query.postcode;
                const limit = request.query.limit;
                const offset = request.query.offset;
                
                if(limit && offset){ 
                    const filtradas = pagination(request,library);
                    console.log("Nuevo GET en /library con paginación");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                    }));
                }else if(province_name && modified){
                    const filtradas = library.filter(r => r.province_name == province_name && r.modified == modified);
                    console.log("Nuevo GET en /library con provincia y año");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province_name && identifier){
                    const filtradas = library.filter(r => r.province_name == province_name && r.identifier == identifier);
                    console.log("Nuevo GET en /library con provincia e identificación");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province_name && locality_id){
                    const filtradas = library.filter(r => r.province_name == province_name && r.locality_id == locality_id);
                    console.log("Nuevo GET en /library con provincia e id de la localidad");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province_name && postcode){
                    const filtradas = library.filter(r => r.province_name == province_name && r.postcode == postcode);
                    console.log("Nuevo GET en /library con provincia y código postal");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(modified && identifier){
                    const filtradas = library.filter(r => r.modified == modified && r.identifier == identifier);
                    console.log("Nuevo GET en /library con año e identificación");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(modified && locality_id){
                    const filtradas = library.filter(r => r.modified == modified && r.locality_id == locality_id);
                    console.log("Nuevo GET en /library con año e id de la localidad");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(modified && postcode){
                    const filtradas = library.filter(r => r.modified == modified && r.postcode == postcode);
                    console.log("Nuevo GET en /library con año y código postal");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(identifier && locality_id){
                    const filtradas = library.filter(r => r.identifier == identifier && r.locality_id == locality_id);
                    console.log("Nuevo GET en /library con identificación e id de la localidad");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(identifier && postcode){
                    const filtradas = library.filter(r => r.identifier == identifier && r.postcode == postcode);
                    console.log("Nuevo GET en /library con identificación y código postal");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(locality_id && postcode){
                    const filtradas = library.filter(r => r.locality_id == locality_id && r.postcode == postcode);
                    console.log("Nuevo GET en /library con id de la localidad y código postal");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if (modified) {
                    const filtradas = library.filter(r => r.modified == parseInt(modified));
                    console.log("Nuevo GET en /library con año");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                    
                } else if(province_name){
                    const filtradas = library.filter(r => r.province_name == province_name);
                    console.log("Nuevo GET en /library con provincia");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(identifier){
                    const filtradas = library.filter(r => r.identifier == identifier);
                    console.log("Nuevo GET en /library con identificación");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(locality_id){
                    const filtradas = library.filter(r => r.locality_id == locality_id);
                    console.log("Nuevo GET en /library con id de la localidad");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(postcode){
                    const filtradas = library.filter(r => r.postcode == postcode);
                    console.log("Nuevo GET en /library con código postal");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else {
                    console.log("Nuevo GET en /library"); 
                    response.status(200);
                    response.json(pollution.map((c)=>{
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
    app.get(BASE_API_URL+"/library/:province_name", (request, response) => {
        const province_name = request.params.province_name;
        const from = request.query.from;
        const to = request.query.to;
        db.find({}, (err, library)=>{
            if (from && to && !err) {
                if (from > to) {
                    response.status(400).json("El rango de años especificado es inválido");
                } else {
                    const datosFiltrados = library.filter(x => x.province_name === province_name && x.modified >= from && x.modified <= to);
                    response.status(200).json(datosFiltrados.map((c) =>{
                        delete c._id;
                        return c;
                    }));
                    console.log(`/GET en /library/${province_name}?from=${from}&to=${to}`);
                }
            }else if(!err){
                const datosFiltrados = library.filter(x => x.province_name == province_name);
                
                if(datosFiltrados.length == 0){
                    res.status(404).json('La ruta solicitada no existe');
                }else{
                response.status(200).json(datosFiltrados.map((c)=>{
                    delete c._id;
                    return c;
                }));
                console.log(`New GET /library/${province_name}`); 
                }
                console.log(`Nuevo GET en /library/${province_name}`); 
            }else{
                response.sendStatus(500);
                console.log("No se ha podido hacer la busqueda");
            }
        });    
    });// GET datos filtrados por provincia y año
    app.get(BASE_API_URL+"/library/:province_name/:modified", (request,response) => {
        const province_name = request.params.province_name;
        const modified = request.params.modified;
        db.find({}, (err, library)=>{
            if(!err){
                var filtro = library.filter(x => x.province_name == province_name && x.modified == modified);
                if (filtro.length == 0) {            
                    response.status(404).json('La ruta solicitada no existe');
                } else {
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
        console.log("Datos de /library/:province_name/:modified");
    });

    // POST nuevo dato, si ya existe -> 409, si el dato no tiene el mismo número de propiedades -> 400
    app.post(BASE_API_URL + "/library", (request, response) => {
        const modified = request.query.modified;
        const province_name = request.query.province_name;
        const identifier = request.query.identifier;
        const locality_id = request.query.locality_id;
        const postcode = request.query.postcode;

        db.find({},function(err,filteredList){

            if(err){
                response.sendStatus(500);
            }

            // Validar que se envíen todos los campos necesarios
            const requiredFields = ['province_name', 'modified', 'identifier', 'locality_id', 'postcode'];
            for (const field of requiredFields) {
                if (!request.body.hasOwnProperty(field)) {
                return response.status(400).json(`Missing required field: ${field}`);
                }
            }
            // Verificar que la solicitud se hizo en la ruta correcta
            if (request.originalUrl != BASE_API_URL+"/library") {
                response.status(405).json('Url no permitida');
            }else{ 

                // Verificar si el recurso ya existe
                //const existingObject = evolution_stats.find(obj => obj.territory === territory && obj.period === period);
                filteredList = filteredList.filter((obj)=>
                                {
                                    return(province_name == obj.province_name && modified == obj.modified && identifier == obj.identifier &&
                                        locality_id == obj.locality_id && postcode == obj.postcode)
                                });
                //const existingObject = db.find({territory : NewEvolution.territory, period : NewEvolution.period});
                if (filteredList.length !=0) {
                    // Si el recurso ya existe, devolver un código de respuesta 409
                    response.status(409).json(`El recurso ya existe.`);
                } else {
                    // Si el recurso no existe, agregarlo a la lista y devolver un código de respuesta 201
                    db.insert(request.body);
                    //evolution_stats.push(request.body);
                    response.sendStatus(201);
                    console.log("Se ha insertado un nuevo dato");
                }
            }
        });
        console.log("New POST to /library"); 
    });

    // POST prohibido -> 405
    app.post(BASE_API_URL+"/library/:province_name", (request, response) =>{
        console.log("No se puede hacer este POST /library/:province_name");
        response.sendStatus(405);
    });

    // PUT a 1 o varias provincias -> 200, sino -> 400
    app.put(BASE_API_URL + "/library/:province_name", (request, response) => {
        const provinceId = request.params.province_name;
        const body = request.body;
    
        db.update({ province_name: provinceId }, { $set: { modified: body.modified, identifier: body.identifier, 
            locality_id: body.locality_id, postcode: body.postcode } }, {}, (err, numAffected) => {
            if (err) {
                console.log("Error actualizando el objeto: ", err);
                response.status(500).send("Error actualizando el objeto");
            } else if (numAffected === 0) {
                console.log("No se ha encontrado el objeto con la provincia especificada");
                response.status(400).send("No se ha encontrado el objeto con la provincia especificada");
            } else {
                console.log("Nuevo objeto actualizado en la base de datos");
                response.sendStatus(200);
            }
        });
    });
    // PUT a 1 o varios años -> 200, sino -> 400

    // Ruta PUT para actualizar un registro de agroclimatic en NeDB
    app.put(BASE_API_URL + "/library/:province_name/:modified", (request, response) => {
        const provinceId = request.params.province_name;
        const yearId = parseInt(request.params.modified);
        const body = request.body;

        // Verifica si los valores de año coinciden
        if (provinceId === body.province_name && yearId === body.modified) {
            // Actualiza el registro en la base de datos
            db.update(
                { province_name: provinceId, modified: yearId },
                { $set: {
                    identifier: body.identifier,
                    locality_id: body.locality_id,
                    postcode: body.postcode
                }},
                {},
                function (err, numReplaced) {
                    if (numReplaced === 1) {
                        console.log("Nuevo PUT a /library/:province_name/:modified");
                        response.status(200).send("Actualizado");
                    } else {
                        console.log("No se ha encontrado el objeto con la provincia y año especificados");
                        response.status(400).send("No se ha encontrado el objeto con la provincia y año especificados");
                    }
                }
            );
        } else {
            console.log("El año en la URL no coincide con el año en la solicitud");
            response.status(400).send("El año en la URL no coincide con el año en la solicitud");
        }
    });

    app.put(BASE_API_URL+"/library", (request,response) =>{
        console.log("No se puede hacer este PUT /library");
        response.sendStatus(405);
    });

    app.delete(BASE_API_URL+"/library", (request, response) => {
        db.remove({}, {multi : true},(err, numRemoved)=>{
            if(err){
                console.log("Error para borrar todos los datos");
                response.sendStatus(500);
            }else if(numRemoved == 0){
                response.status(500).send("No hay mas datos para borrar");
                console.log("No se encuentran mas contactos para borrar");
            }else{
                console.log("Borrados todos los datos");
                response.json(200);
                console.log(numRemoved);
            }
        
        });
        console.log("Se ha borrado /library");
    });
    
    // DELETE de una provincia -> 204 (borrado), si no se encuentra -> 404
    app.delete(BASE_API_URL+"/library/:province_name", (request, response) => {
        const province_name = request.params.province_name;
        db.remove({province_name : province_name}, {}, (err, numRemoved)=>{
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
        console.log("Se ha borrado la provincia en /library/:province_name");
    });
    


}