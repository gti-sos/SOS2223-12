const { request, response } = require("express");
var Datastore = require("nedb");
var db = new Datastore();

const BASE_API_URL = "/api/v1";

module.exports = (app) =>{

    var datos= [
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

    db.insert(datos);
    console.log("Datos insertados.")

    //Redireccionar

    app.get(BASE_API_URL+'/pollutions/docs', (req, res) => {
        res.redirect('https://documenter.getpostman.com/view/25989057/2s93JzJzbZ');
    });

    //GET carga

    app.get(BASE_API_URL+"/pollutions/loadInitialData", (request,response) => {
        console.log("New GET to /pollutions");
        db.find({}, (err, pollution)=>{
        if(pollution.length>0){
            response.json("Hay datos cargados");
            console.log("Hay datos cargados")
        }else if(err){
                console.log(`Error geting /pollution/loadInitialData: ${err}`);
                response.sendStatus(500);
        }else{
            db.insert("Datos insertados.")
            console.log(`Pollutions returned ${pollution.length}`);
            response.sendStatus(200);
        }
        });
        
    });


}