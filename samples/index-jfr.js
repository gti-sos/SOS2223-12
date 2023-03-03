const { Router } = require('express');
const ejercicios = Router();

ejercicios.get('/samples/jfr', (req, res)=>{
    const valorNO2 = [
        {
            province: "seville",
            date: 19/3/2021,
            NO2: 45.0,
            O3: 25.875,
            SO2: 3.0
        },{
            province: "seville",
            date: 20/3/2021,
            NO2: 20.0,
            O3: 19.486,
            SO2: 5.0
        },{
            province: "seville",
            date: 21/3/2021,
            NO2: 4.0,
            O3: 36.875,
            SO2: 7.0
        },{
            province: "seville",
            date: 22/3/2021,
            NO2: 43.0,
            O3: 23.625,
            SO2: 2.0
        },{
            province: "seville",
            date: 23/3/2021,
            NO2: 5.0,
            O3: 37.5,
            SO2: 6.0
        },{
            province: "seville",
            date: 24/3/2021,
            NO2: 74.0,
            O3: 10.25,
            SO2: 9.0
        },{
            province: "seville",
            date: 25/3/2021,
            NO2: 36.0,
            O3: 21.125,
            SO2: 2.0
        },{
            province: "seville",
            date: 26/3/2021,
            NO2: 40.0,
            O3: 16.875,
            SO2: 5.0
        },{
            province: "seville",
            date: 27/3/2021,
            NO2: 47.0,
            O3: 16.875,
            SO2: 10.0
        },{
            province: "seville",
            date: 28/3/2021,
            NO2: 25.0,
            O3: 16.875,
            SO2: 10.1
        },
        {
            province: "almeria",
            date: 28/3/2021,
            NO2: 25.0,
            O3: 16.875,
            SO2: 10.1
        },
        {
            province: "almeria",
            date: 28/3/2021,
            NO2: 25.0,
            O3: 16.875,
            SO2: 10.1
        }
    
    ]
    
    var mediaNO2 = 0;
    
    valorNO2.filter(v => v.province == "seville").forEach((v)=>{
        mediaNO2 += v.NO2;
    });
    res.json('La media de contaminacion de N02 en 10 dias en Sevilla es: ' + mediaNO2);
    
    })

module.exports = ejercicios;


/*

// Función F03

var valorNO2 = [
    {
        province: "seville",
        date: 19/3/2021,
        NO2: 45.0,
        O3: 25.875,
        SO2: 3.0
    },{
        province: "seville",
        date: 20/3/2021,
        NO2: 20.0,
        O3: 19.486,
        SO2: 5.0
    },{
        province: "seville",
        date: 21/3/2021,
        NO2: 4.0,
        O3: 36.875,
        SO2: 7.0
    },{
        province: "seville",
        date: 22/3/2021,
        NO2: 43.0,
        O3: 23.625,
        SO2: 2.0
    },{
        province: "seville",
        date: 23/3/2021,
        NO2: 5.0,
        O3: 37.5,
        SO2: 6.0
    },{
        province: "seville",
        date: 24/3/2021,
        NO2: 74.0,
        O3: 10.25,
        SO2: 9.0
    },{
        province: "seville",
        date: 25/3/2021,
        NO2: 36.0,
        O3: 21.125,
        SO2: 2.0
    },{
        province: "seville",
        date: 26/3/2021,
        NO2: 40.0,
        O3: 16.875,
        SO2: 5.0
    },{
        province: "seville",
        date: 27/3/2021,
        NO2: 47.0,
        O3: 16.875,
        SO2: 10.0
    },{
        province: "seville",
        date: 28/3/2021,
        NO2: 25.0,
        O3: 16.875,
        SO2: 10.1
    },
    {
        province: "almeria",
        date: 28/3/2021,
        NO2: 25.0,
        O3: 16.875,
        SO2: 10.1
    },
    {
        province: "almeria",
        date: 28/3/2021,
        NO2: 25.0,
        O3: 16.875,
        SO2: 10.1
    }

]

function mediaFiltrada(province, valorNO2) {
    let filtro = valorNO2.filter(x => x.province == province);
    mediaNO2 = 0;
    filtro.forEach(x => {
        mediaNO2 += x.NO2;
    });

    return mediaNO2 / filtro.length;
}

console.log("La media de NO2 en Sevilla es: ",mediaFiltrada("seville", valorNO2))
*/


