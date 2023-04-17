import Datastore from "nedb";
var db = new Datastore();

const BASE_API_URL = "/api/v2";

function loadBackend_vem2 (app){

    var datos= [
        {
            identifier: 869,
            locality_id: 160,
            modified: 2016,
            postcode: 41460,
            province_name: "Sevilla"
        },{
            identifier: 870,
            locality_id: 161,
            modified: 2017,
            postcode: 41804,
            province_name: "Sevilla"
        }, {
            identifier: 871,
            locality_id: 162,
            modified: 2018,
            postcode: 41640,
            province_name: "Sevilla"
        }, {
            identifier: 872,
            locality_id: 163,
            modified: 2019,
            postcode: 41461,
            province_name: "Sevilla"
        }, {
            identifier: 873,
            locality_id: 164,
            modified: 2020,
            postcode: 41876,
            province_name: "Sevilla"
        },{
            identifier: 874,
            locality_id: 165,
            modified: 2021,
            postcode: 41636,
            province_name: "Sevilla"
        },{
            identifier: 969,
            locality_id: 260,
            modified: 2016,
            postcode: 21374,
            province_name: "Huelva"
        },{
            identifier: 970,
            locality_id: 261,
            modified: 2017,
            postcode: 21135,
            province_name: "Huelva"
        }, {
            identifier: 971,
            locality_id: 262,
            modified: 2018,
            postcode: 21610,
            province_name: "Huelva"
        },{
            identifier: 972,
            locality_id: 263,
            modified: 2019,
            postcode: 21346,
            province_name: "Huelva"
        },{
            identifier: 973,
            locality_id: 264,
            modified: 2020,
            postcode: 21347,
            province_name: "Huelva"
        },{
            identifier: 974,
            locality_id: 265,
            modified: 2021,
            postcode: 21306,
            province_name: "Huelva"
        },{
            identifier: 769,
            locality_id: 360,
            modified: 2016,
            postcode: 29160,
            province_name: "Malaga"
        },{
            identifier: 770,
            locality_id: 361,
            modified: 2017,
            postcode: 29207,
            province_name: "Malaga"
        },{
            identifier: 771,
            locality_id: 362,
            modified: 2018,
            postcode: 29375,
            province_name: "Malaga"
        },{
            identifier: 772,
            locality_id: 363,
            modified: 2019,
            postcode: 29055,
            province_name: "Malaga"
        },{
            identifier: 773,
            locality_id: 364,
            modified: 2020,
            postcode: 29323,
            province_name: "Malaga"
        },{
            identifier: 774,
            locality_id: 365,
            modified: 2021,
            postcode: 29070,
            province_name: "Malaga"
        },{
            identifier: 669,
            locality_id: 460,
            modified: 2016,
            postcode: 14155,
            province_name: "Cordoba"
        },{
            identifier: 670,
            locality_id: 461,
            modified: 2017,
            postcode: 14226,
            province_name: "Cordoba"
        },{
            identifier: 671,
            locality_id: 462,
            modified: 2018,
            postcode: 14269,
            province_name: "Cordoba"
        },{
            identifier: 672,
            locality_id: 463,
            modified: 2019,
            postcode: 14310,
            province_name: "Cordoba"
        },{
            identifier: 673,
            locality_id: 464,
            modified: 2020,
            postcode: 14079,
            province_name: "Cordoba"
        },{
            identifier: 674,
            locality_id: 465,
            modified: 2021,
            postcode: 14166,
            province_name: "Cordoba"
        }
    ]

    db.insert(datos);
    console.log("Datos insertados de library-V2.")

    //Redireccionar
    app.get(BASE_API_URL+'/library/docs', (req, res) => {
        res.redirect('https://documenter.getpostman.com/view/25989524/2s93XsY6Kz');
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

        db.find({}, {_id: 0}, (err, filteredList) => {
            // Comprobamos los errores que han podido surgir
            if(err){
                console.log(`Error getting library`);
                // El estado es el 500 de Internal Server Error
                response.sendStatus(500);
            // Comprobamos si existen datos:
            }else{
                // Tenemos que inicializar los valores necesarios para filtrar: tenemos que ver el limit y offset
                let i = -1;
                if(!request.query.offset){ 
                  var offset = -1;
                }else{ 
                  var offset = parseInt(request.query.offset);
                }
                // Tenemos que filtrar los datos, para ver cada posible campo y devolver true si no se pasa en la query, 
                // y si es un parámetro en la query se comprueba la condicion
                let datitos = filteredList.filter((x) => {
                    return (((request.query.modified == undefined)||(parseInt(request.query.modified) === x.modified))&&
                    ((request.query.from == undefined)||(parseInt(request.query.from) <= x.modified))&&
                    ((request.query.to == undefined)||(parseInt(request.query.to) >= x.modified))&&
                    ((request.query.province_name == undefined)||(request.query.province_name === x.province_name))&&
                    ((request.query.identifier_over == undefined)||(parseFloat(request.query.identifier_over) <= x.identifier))&&
                    ((request.query.identifier_under == undefined)||(parseFloat(request.query.identifier_under) >= x.identifier))&&
                    ((request.query.locality_id_over == undefined)||(parseFloat(request.query.locality_id_over) <= x.locality_id))&&
                    ((request.query.locality_id_under == undefined)||(parseFloat(request.query.locality_id_under) >= x.locality_id))&&
                    ((request.query.postcode_over == undefined)||(parseFloat(request.query.postcode_over) <= x.postcode))&&
                    ((request.query.postcode_under == undefined)||(parseFloat(request.query.postcode_under) >= x.postcode)));
                }).filter((x) => {
                    // La paginación
                    i = i+1;
                    if(request.query.limit==undefined){ 
                      var cond = true;
                    }else{ 
                      var cond = (parseInt(offset) + parseInt(request.query.limit)) >= i;
                    }
                    return (i>offset)&&cond;
                });

                // Comprobamos si tras el filtrado sigue habiendo datos, si no hay:
            if(datitos.length == 0){
                console.log(`library not found`);
                  // Estado 404: Not Found
                  response.status(404).json(datitos);

              // Si por el contrario encontramos datos
            }else{
                console.log(`Datos de library devueltos: ${datitos.length}`);
                // Devolvemos dichos datos, estado 200: OK
                response.json(datitos);

            }  
        }
    })
        /*const from = request.query.from;
        const to = request.query.to;
        db.find({}, (err, library)=>{
            if (from && to && !err) {
                const provinciasAño = library.filter(x => {return x.modified >= from && x.modified <= to}); 
                if (from > to) {
                    response.status(400).json("El rango de años especificado es inválido");
                
                }else{
                    response.status(200).json(provinciasAño.map((c)=>{
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
                }else if(province_name && modified && identifier && locality_id && postcode){
                    const filtradas = library.filter(r => r.province_name == province_name && r.modified == modified && r.identifier >= identifier
                        && r.locality_id >= locality_id && r.postcode >= postcode);
                    console.log("Nuevo GET en /library con provincia, año, identificador, id de la localidad y código postal");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province_name && modified && identifier && locality_id){
                    const filtradas = library.filter(r => r.province_name == province_name && r.modified == modified && r.identifier >= identifier
                        && r.locality_id >= locality_id);
                    console.log("Nuevo GET en /library con provincia, año, identicador e id de la localidad");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province_name && modified && identifier && postcode){
                    const filtradas = library.filter(r => r.province_name == province_name && r.modified == modified && r.identifier >= identifier
                        && r.postcode >= postcode);
                    console.log("Nuevo GET en /library con provincia, año, identicador y código postal");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province_name && modified && locality_id && postcode){
                    const filtradas = library.filter(r => r.province_name == province_name && r.modified == modified && r.locality_id >= locality_id
                        && r.postcode >= postcode);
                    console.log("Nuevo GET en /library con provincia, año, id de la localidad y código postal");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province_name && identifier && locality_id && postcode){
                    const filtradas = library.filter(r => r.province_name == province_name && r.identifier >= identifier && 
                        r.locality_id >= locality_id && r.postcode >= postcode);
                    console.log("Nuevo GET en /library con provincia, identificador, id de la provincia y código postal");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province_name && modified && identifier){
                    const filtradas = library.filter(r => r.province_name == province_name && r.modified == modified && r.identifier >= identifier);
                    console.log("Nuevo GET en /library con provincia, año e identificador");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province_name && modified && locality_id){
                    const filtradas = library.filter(r => r.province_name == province_name && r.modified == modified && r.locality_id >= locality_id);
                    console.log("Nuevo GET en /library con provincia, año e id de la localidad");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province_name && modified && postcode){
                    const filtradas = library.filter(r => r.province_name == province_name && r.modified == modified && r.postcode >= postcode);
                    console.log("Nuevo GET en /library con provincia, año y código postal");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province_name && identifier && locality_id){
                    const filtradas = library.filter(r => r.province_name == province_name && r.identifier >= identifier && 
                        r.locality_id >= locality_id);
                    console.log("Nuevo GET en /library con provincia, identificador e id de la localidad");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province_name && identifier && postcode){
                    const filtradas = library.filter(r => r.province_name == province_name && r.identifier >= identifier && 
                        r.postcode >= postcode);
                    console.log("Nuevo GET en /library con provincia, identificador y código postal");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(province_name && locality_id && postcode){
                    const filtradas = library.filter(r => r.province_name == province_name && r.locality_id >= locality_id &&
                        r.postcode >= postcode);
                    console.log("Nuevo GET en /library con provincia, id de la localidad y código postal");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(modified && identifier && locality_id){
                    const filtradas = library.filter(r => r.modified == modified && r.identifier >= identifier &&
                        r.locality_id >= locality_id);
                    console.log("Nuevo GET en /library con año, identificador e id de la localidad");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(modified && identifier && postcode){
                    const filtradas = library.filter(r => r.modified == modified && r.identifier >= identifier &&
                        r.postcode >= postcode);
                    console.log("Nuevo GET en /library con año, identificador y código postal");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(modified && locality_id && postcode){
                    const filtradas = library.filter(r => r.modified == modified && r.locality_id >= locality_id &&
                        r.postcode >= postcode);
                    console.log("Nuevo GET en /library con año, id de la localidad y código postal");  
                    response.status(200);
                    response.json(filtradas.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }else if(identifier && locality_id && postcode){
                    const filtradas = library.filter(r => r.identifier >= identifier && r.locality_id >= locality_id
                        && r.postcode >= postcode);
                    console.log("Nuevo GET en /library con identificador, id de la localidad y código postal");  
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
                }else if(modified && identifier && locality_id && postcode){
                    const filtradas = library.filter(r => r.modified == modified && r.identifier >= identifier && r.locality_id >= locality_id
                        && r.postcode >= postcode);
                    console.log("Nuevo GET en /library con año, identificador, id de la localidad y código postal");  
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
                    response.json(library.map((c)=>{
                        delete c._id;
                        return c;
                    }));
                }  
            }else{
                console.log("Error al dar los datos");
                response.sendStatus(500);
            }
        }); */
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
                    
                } else if(filtro.length == 1){
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
        console.log("Datos de /library/:province_name/:modified");
    });

    // POST nuevo dato, si ya existe -> 409, si el dato no tiene el mismo número de propiedades -> 400
    app.post(BASE_API_URL + "/library", (request, response) => {
        const province_name = request.body.province_name;
        const modified = request.body.modified;
        const identifier = request.body.identifier;
        const locality_id = request.body.locality_id;
        const postcode = request.body.postcode;

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
                filteredList = filteredList.filter((obj)=>
                                {
                                    return(province_name == obj.province_name && modified == obj.modified && identifier == obj.identifier &&
                                        locality_id == obj.locality_id && postcode == obj.postcode)
                                });
                if (filteredList.length !=0) {
                    response.status(409).json(`El recurso ya existe.`);
                } else {
                    db.insert(request.body);
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
        const province_name = request.params.province_name;
        const body = request.body;
        if (province_name === body.province_name) {
            const requiredFields = ['province_name', 'modified', 'identifier', 'locality_id', 'postcode'];
                for (const field of requiredFields) {
                    if (!request.body.hasOwnProperty(field)) {
                    return response.status(400).json(`Falta alguno de los campos: ${field}`);
                    }
                }
        
            db.update({ province_name: province_name}, 
                { $set: 
                    { modified: body.modified, 
                    identifier: body.identifier, 
                    locality_id: body.locality_id, 
                    postcode: body.postcode} }, {}, (err, numAffected) => {
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

    app.put(BASE_API_URL + "/library/:province_name/:modified", (request, response) => {
        const province_name = request.params.province_name;
        const modified = parseInt(request.params.modified);
        const body = request.body;

        // Verifica si los valores de año coinciden
        if (province_name === body.province_name && modified === body.modified) {
            // Actualiza el registro en la base de datos
            const requiredFields = ['province_name', 'modified', 'identifier', 'locality_id', 'postcode'];
            for (const field of requiredFields) {
                if (!request.body.hasOwnProperty(field)) {
                return response.status(400).json(`Falta alguno de los campos: ${field}`);
                }
            }
                db.update(
                    { province_name: province_name, modified: modified},
                    { $set: {
                        identifier: body.identifier,
                        locality_id: body.locality_id,
                        postcode: body.postcode}},{},

                    function (err, numReplaced) {
                        if(err){
                            console.log("Se ha producido un error al actualizar el dato");
                            response.sendStatus(500);
                        }else if (numReplaced === 1) {
                            console.log("Nuevo PUT a /library/:province_name/:modified");
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

    app.delete(BASE_API_URL+"/library/:province_name/:modified", (request, response) => {
        const province_name = request.params.province_name;
        const modified = request.params.modified;
        db.remove({province_name : province_name , modified : parseInt(modified)}, {}, (err, numRemoved)=>{
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
        console.log("Se ha borrado la provincia en /library/:province_name");
    });
    


};

export { loadBackend_vem2 };