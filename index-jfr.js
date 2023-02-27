// 1.Array con valores numéricos. (Contaminación de NO2.)

var valorNO = [45.0,20.0,4.0,43.0,5.0,74.0,36.0,40.0,47.0,25.0];

var mediaNO = 0;

valorNO.forEach((v)=>{
    mediaNO += v;
});

console.log("1.La contaminación media en 10 dias de N0 es: ", mediaNO/valorNO.length);

// 2.Array con varios datos incluidos los numéricos, escogemos solo el valor numérico para hacer la media.

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
    }
]

var mediaNO2 = 0;

valorNO2.forEach((v)=>{
    mediaNO2 += v.NO2;
});

console.log("2.La contaminación media en 10 dias de N0 es: ", mediaNO2/valorNO2.length);

function mediaFiltrada(province, valorNO2) {
    let filtro = valorNO2.filter(x => x.province == province);
    total = 0;
    filtro.forEach(x => {
        total += x.NO2;
    });

    return total / filtro.length;
}

console.log(mediaFiltrada("seville", valorNO2))



