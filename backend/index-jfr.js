const { request, response } = require("express");
var Datastore = require("nedb");
var db = new Datastore();

const BASE_API_URL = "/api/v1";

module.exports = (app) =>{

    var datos= [
        {
            province: "sevilla",
            year: 2019, 
            NO2: 45.0,
            O3: 25.875,
            SO2:3.0 
        },{
            province: "sevilla",
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
            year: 2019, 
            NO2: 43.0,
            O3: 23.625,
            SO2: 2.0
        },{
            province: "huelva",
            year: 2020, 
            NO2: 5.0,
            O3: 37.5,
            SO2: 6.0 
        },{
            province: "huelva",
            year: 2021, 
            NO2: 74.0,
            O3: 10.25,
            SO2: 9.0
        },{
            province: "malaga",
            year: 2019, 
            NO2: 36.0,
            O3: 21.125,
            SO2: 2.0
        },{
            province: "malaga",
            year: 2020, 
            NO2: 40.0,
            O3: 16.875,
            SO2: 5.0
        },{
            province: "malaga",
            year: 2021, 
            NO2: 47.0,
            O3: 16.875,
            SO2: 10.0
        },{
            province: "cordoba",
            year: 2019, 
            NO2: 25.0,
            O3: 16.785,
            SO2: 10.1
        }
    ]

    db.insert(datos);
    console.log("Datos insertados Pollutions.")

    //Redireccionar

    app.get(BASE_API_URL+'/pollutions/docs', (req, res) => {
        res.redirect('https://documenter.getpostman.com/view/25989057/2s93JzJzbZ');
    });

    //GET carga

    app.get(BASE_API_URL+"/pollutions/loadInitialData", (request,response) => {
        console.log("New GET to /pollutions");
        db.find({}, (err, pollution)=>{
        if(pollution.length>0){
            response.json("Los datos Pollutions estan cargados.");
            console.log("Los datos Pollutions estan cargados.")
        }else if(err){
                console.log(`Error geting /pollution/loadInitialData: ${err}`);
                response.sendStatus(500);
        }else{
            db.insert(datos)
            console.log(`Pollutions returned ${pollution.length}`);
            response.sendStatus(200);
        }
        });
        
    });

    // GET datos y tambien from y to
    app.get(BASE_API_URL+"/pollutions", (request, response) => {
        const from = request.query.from;
        const to = request.query.to;
        db.find({}, (err, pollution)=>{
            if (from && to && !err) {
                const provinciasAño = pollution.filter(x => {return x.year >= from && x.year <= to}); 
                if (from >= to) {
                    response.status(400).json("El rango de años especificado es inválido");
                
                }else{
                    response.status(200);
                    response.json(provinciasAño.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                    console.log(`/GET en /pollutions?from=${from}&to=${to}`); 
                }
            }else if(!err){
                const year = request.query.year;
                const province = request.query.province;
                const NO2 = request.query.NO2;
                const O3 = request.query.O3;
                const SO2 = request.query.SO2;
                const limit = request.query.limit;
                const offset = request.query.offset;
                
                if(limit && offset){ 
                    const filtradas = pagination(request,pollution);
                    console.log("Nuevo GET en /pollutions con paginación");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                    delete c._id;
                    return c;
                    }));
                }else if(province && year){
                    const filtradas = pollution.filter(r => r.province == province && r.year == year);
                    console.log("Nuevo GET en /pollutions con provincia y año");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province && year && NO2 && O3 && SO2){
                    const filtradas = pollution.filter(r => r.province == province && r.year == year && r.NO2 >= NO2
                        && r.O3 >= O3 && r.SO2 >= SO2);
                    console.log("Nuevo GET en /pollutions con provincia, año, NO2, O3 y SO2");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province && year && NO2 && O3){
                    const filtradas = pollution.filter(r => r.province == province && r.year == year && r.NO2 >= NO2
                        && r.O3 >= O3);
                    console.log("Nuevo GET en /pollutions con provincia, año, NO2 y O3");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province && year && NO2 && SO2){
                    const filtradas = pollution.filter(r => r.province == province && r.year == year && r.NO2 >= NO2
                        && r.SO2 >= SO2);
                    console.log("Nuevo GET en /pollutions con provincia, año, NO2 y SO2");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province && year && O3 && SO2){
                    const filtradas = pollutions.filter(r => r.province == province && r.year == year && r.O3 >= O3
                        && r.SO2 >= SO2);
                    console.log("Nuevo GET en /pollutions con provincia, año, O3 y SO2");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province && NO2 && O3 && SO2){
                    const filtradas = pollution.filter(r => r.province == province && r.NO2 >= NO2 && 
                        r.O3 >= O3 && r.SO2 >= SO2);
                    console.log("Nuevo GET en /pollutions con provincia, NO2, O3 y SO2");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province && year && NO2){
                    const filtradas = pollution.filter(r => r.province == province && r.year == year && r.NO2 >= NO2);
                    console.log("Nuevo GET en /pollutions con provincia, año y NO2");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province && year && O3){
                    const filtradas = pollution.filter(r => r.province == province && r.year == year && r.O3 >= O3);
                    console.log("Nuevo GET en /pollutions con provincia, año y O3");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province && year && SO2){
                    const filtradas = pollution.filter(r => r.province == province && r.year == year && r.SO2 >= SO2);
                    console.log("Nuevo GET en /pollutions con provincia, año y SO2");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province && NO2 && O3){
                    const filtradas = pollution.filter(r => r.province == province && r.NO2 >= NO2 && 
                        r.O3 >= O3);
                    console.log("Nuevo GET en /pollutions con provincia, NO2 y O3");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province && NO2 && SO2){
                    const filtradas = pollution.filter(r => r.province == province && r.NO2 >= NO2 && 
                        r.SO2 >= SO2);
                    console.log("Nuevo GET en /pollutions con provincia, NO2 y SO2");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province && O3 && SO2){
                    const filtradas = pollution.filter(r => r.province == province && r.O3 >= O3 &&
                        r.SO2 >= SO2);
                    console.log("Nuevo GET en /pollutions con provincia, O3 y SO2");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(year && NO2 && O3){
                    const filtradas = pollution.filter(r => r.year == year && r.NO2 >= NO2 &&
                        r.O3 >= O3);
                    console.log("Nuevo GET en /pollutions con año, NO2 y O3");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(year && NO2 && SO2){
                    const filtradas = pollution.filter(r => r.year == year && r.NO2 >= NO2 &&
                        r.SO2 >= SO2);
                    console.log("Nuevo GET en /pollutions con año, NO2 y SO2");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(year && O3 && SO2){
                    const filtradas = pollution.filter(r => r.year == year && r.O3 >= O3 &&
                        r.SO2 >= SO2);
                    console.log("Nuevo GET en /pollutions con año, O3 y SO2");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(NO2 && O3 && SO2){
                    const filtradas = pollution.filter(r => r.NO2 >= NO2 && r.O3 >= O3
                        && r.SO2 >= SO2);
                    console.log("Nuevo GET en /pollutions con NO2, O3 y SO2");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province && year){
                    const filtradas = pollution.filter(r => r.province == province && r.year == year);
                    console.log("Nuevo GET en /pollutions con provincia y año");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(year && NO2 && O3 && SO2){
                    const filtradas = pollution.filter(r => r.year == year && r.NO2 >= NO2 && r.O3 >= O3
                        && r.SO2 >= SO2);
                    console.log("Nuevo GET en /pollutions con año, NO2, O3 y SO2");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province && NO2){
                    const filtradas = pollution.filter(r => r.province == province && r.NO2 == NO2);
                    console.log("Nuevo GET en /pollutions con provincia y NO2");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province && O3){
                    const filtradas = pollution.filter(r => r.province == province && r.O3 == O3);
                    console.log("Nuevo GET en /pollutions con provincia y O3");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province && SO2){
                    const filtradas = pollution.filter(r => r.province == province && r.SO2 == SO2);
                    console.log("Nuevo GET en /pollutions con provincia y SO2");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(year && NO2){
                    const filtradas = pollution.filter(r => r.year == year && r.NO2 == NO2);
                    console.log("Nuevo GET en /pollutions con año y NO2");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(year && O3){
                    const filtradas = pollution.filter(r => r.year == year && r.O3 == O3);
                    console.log("Nuevo GET en /pollutions con año y O3");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(year && SO2){
                    const filtradas = pollution.filter(r => r.year == year && r.SO2 == SO2);
                    console.log("Nuevo GET en /pollutions con año y SO2");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(NO2 && O3){
                    const filtradas = pollution.filter(r => r.NO2 == NO2 && r.O3 == O3);
                    console.log("Nuevo GET en /pollutions con NO2 y O3");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(NO2 && SO2){
                    const filtradas = pollution.filter(r => r.NO2 == NO2 && r.SO2 == SO2);
                    console.log("Nuevo GET en /pollutions con NO2 y SO2");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(O3 && SO2){
                    const filtradas = pollution.filter(r => r.O3 == O3 && r.SO2 == SO2);
                    console.log("Nuevo GET en /pollutions con O3 y SO2");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if (year) {
                    const filtradas = pollution.filter(r => r.year === parseInt(year));
                    console.log("Nuevo GET en /pollutions con año");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                    
                } else if(province){
                    const filtradas = pollution.filter(r => r.province === province);
                    console.log("Nuevo GET en /pollutions con provincia");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(NO2){
                    const filtradas = pollution.filter(r => r.NO2 == NO2);
                    console.log("Nuevo GET en /pollutions con NO2");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(O3){
                    const filtradas = pollution.filter(r => r.O3 == O3);
                    console.log("Nuevo GET en /pollutions con O3");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(SO2){
                    const filtradas = pollution.filter(r => r.SO2 == SO2);
                    console.log("Nuevo GET en /pollutions con SO2");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else {
                    console.log("Nuevo GET en /pollutions"); 
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
    app.get(BASE_API_URL+"/pollutions/:province", (request, response) => {
        const province = request.params.province;
        const from = request.query.from;
        const to = request.query.to;
        db.find({}, (err, pollution)=>{
            if (from && to && !err) {
                if (from > to) {
                    response.status(400).json("El rango de años especificado es inválido");
                } else {
                    const datosFiltrados = pollution.filter(x => x.province === province && x.year >= from && x.year <= to);
                    response.status(200).json(datosFiltrados.map((c) =>{
                        delete c._id;
                        return c;
                    }));
                    console.log(`/GET en /pollutions/${province}?from=${from}&to=${to}`);
                }
            }else if(!err){
                const datosFiltrados = pollution.filter(x => x.province == province);
                
                if(datosFiltrados.length == 0){
                    response.status(404).json('La ruta solicitada no existe');
                }else{
                response.status(200).json(datosFiltrados.map((c)=>{
                    delete c._id;
                    return c;
                }));
                console.log(`New GET /pollution/${province}`); 
                }
                console.log(`Nuevo GET en /pollution/${province}`); 
            }else{
                response.sendStatus(500);
                console.log("No se ha podido hacer la busqueda");
            }
        });    
    });
    // GET datos filtrados por provincia y año
    app.get(BASE_API_URL+"/pollutions/:province/:year", (request,response) => {
        const province = request.params.province;
        const year = request.params.year;
        db.find({}, (err, pollution)=>{
            if(!err){
                var filtro = pollution.filter(x => x.province == province && x.year == year);
                if (filtro.length == 0) {            
                    response.status(404).json('La ruta solicitada no existe');
                }else if(filtro.length == 1){
                    filtro.forEach(element => {
                        delete element._id;
                    });
                    response.status(200).send(JSON.stringify(filtro[0], null, 2));
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
        console.log("Datos de /pollutions/:province/:year");
    });

    // POST nuevo dato, si ya existe -> 409, si el dato no tiene el mismo número de propiedades -> 400
    app.post(BASE_API_URL + "/pollutions", (request, response) => {
        const province = request.body.province;
        const year = request.body.year;
        const NO2 = request.body.NO2;
        const O3 = request.body.O3;
        const SO2 = request.body.SO2;

        db.find({},function(err,filteredList){

            if(err){
                response.sendStatus(500);
            }

            // Validar que se envíen todos los campos necesarios
            const requiredFields = ['province', 'year', 'NO2', 'O3', 'SO2'];
            for (const field of requiredFields) {
                if (!request.body.hasOwnProperty(field)) {
                return response.status(400).json(`Missing required field: ${field}`);
                }
            }
            // Verificar que la solicitud se hizo en la ruta correcta
            if (request.originalUrl != BASE_API_URL+"/pollutions") {
                response.status(405).json('Url no permitida');
            }else{ 

                // Verificar si el recurso ya existe
                //const existingObject = evolution_stats.find(obj => obj.territory === territory && obj.period === period);
                filteredList = filteredList.filter((obj)=>
                                {
                                    return(province == obj.province && year == obj.year && NO2 == obj.NO2 &&
                                        O3 == obj.O3 && SO2 == obj.SO2)
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
        console.log("New POST to /pollutions"); 
    });

    // POST prohibido -> 405
    app.post(BASE_API_URL+"/pollutions/:province", (request, response) =>{
        console.log("No se puede hacer este POST /pollutions/:province");
        response.sendStatus(405);
    });
    
    // PUT a 1 o varias provincias -> 200, sino -> 400
    app.put(BASE_API_URL + "/pollutions/:province", (request, response) => {
        const province = request.params.province;
        const body = request.body;
        if (province === body.province) {
            const requiredFields = ['province', 'year', 'NO2', 'O3', 'SO2'];
                for (const field of requiredFields) {
                    if (!request.body.hasOwnProperty(field)) {
                    return response.status(400).json(`Falta alguno de los campos: ${field}`);
                    }
                }
        
            db.update({ province: province }, 
                { $set: 
                    { year: body.year, 
                    NO2: body.NO2, 
                    O3: body.O3, 
                    SO2: body.SO2} }, {}, (err, numAffected) => {
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

    app.put(BASE_API_URL + "/pollutions/:province/:year", (request, response) => {
        const province = request.params.province;
        const year = parseInt(request.params.year);
        const body = request.body;

        // Verifica si los valores de año coinciden
        if (province === body.province && year === body.year) {
            // Actualiza el registro en la base de datos
            const requiredFields = ['province', 'year', 'NO2', 'O3', 'SO2'];
            for (const field of requiredFields) {
                if (!request.body.hasOwnProperty(field)) {
                return response.status(400).json(`Falta alguno de los campos: ${field}`);
                }
            }
                db.update(
                    { province: province, year: year},
                    { $set: {
                        NO2: body.NO2,
                        O3: body.O3,
                        SO2: body.SO2}},{},

                    function (err, numReplaced) {
                        if(err){
                            console.log("Se ha producido un error al actualizar el dato");
                            response.sendStatus(500);
                        }else if (numReplaced === 1) {
                            console.log("Nuevo PUT a /pollutions/:province/:year");
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

    //put prohibido

    app.put(BASE_API_URL+"/pollutions", (request,response) =>{
        console.log("No se puede hacer este PUT /pollutions");
        response.sendStatus(405);
    });

    //delete todo

    app.delete(BASE_API_URL+"/pollutions", (request, response) => {
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
        console.log("Se ha borrado /pollutions");
    });
    
    // DELETE de una provincia -> 204 (borrado), si no se encuentra -> 404
    app.delete(BASE_API_URL+"/pollutions/:province", (request, response) => {
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
        console.log("Se ha borrado la provincia en /pollutions/:province");
    });

    // DELETE de provincia y año
    app.delete(BASE_API_URL+"/pollutions/:province/:year", (request, response) => {
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
        console.log("Se ha borrado la provincia en /pollutions/:province");
    });
    


}
