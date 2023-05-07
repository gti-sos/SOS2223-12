<script>
    //@ts-nocheck
    import { Table } from "sveltestrap";
    import { onMount } from "svelte";
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    let datos = [];
    let result = "";
    let resultStatus = "";

    let ejeX = [];

    let API = "https://sos2223-12.ew.r.appspot.com/api/v2/library";

    let datos2 = [];
    let result2 = "";
    let resultStatus2 = "";

    let identificador = [];
    let id_localidad = [];
    let codigo_postal = [];

    let temperatura = [];

    onMount(async () => {
        getDatos();
    });

    const url =
        "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=35.5&lon=-78.5";
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key":
                "3a5ba83276msh70e73b2e1abd13ap194ca1jsn0827834bd966",
            "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
        },
    };

    async function getDatos() {
        resultStatus = result = "";
        const res = await fetch(url, options);

        if (res.ok) {
            try {
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                datos = data.data;
                datos.forEach((element) => {
                    ejeX.push(element["wind_cdir_full"]);
                    temperatura.push(element["temp"]);

                    identificador.push(0);
                    id_localidad.push(0);
                    codigo_postal.push(0);
                });
            } catch (error) {
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        } else {
            console.log("Error al devolver la gráfica");
        }
        resultStatus2 = result2 = "";
        const res2 = await fetch(API, {
            method: "GET",
        });

        if (res2.ok) {
            try {
                const valores2 = await res2.json();
                result2 = JSON.stringify(valores2, null, 2);

                datos2 = valores2;
                datos2.sort((a, b) =>
                    a.province_name > b.province_name
                        ? 1
                        : b.province_name > a.province_name
                        ? -1
                        : 0
                );
                datos2.sort((a, b) =>
                    a.modified > b.modified
                        ? 1
                        : b.modified > a.modified
                        ? -1
                        : 0
                );
                datos2.forEach((datos2) => {
                    console.log(datos2);

                    identificador.push(datos2["identifier"]);
                    id_localidad.push(datos2["locality_id"]);
                    codigo_postal.push(datos2["postcode"]);
                    ejeX.push(datos2.province_name + "-" + datos2.modified);

                    ratting.push(0);
                });
            } catch (error) {
                console.log(`Error devolviendo la gráfica: ${error}`);
            }
            const status2 = await res2.status;
            resultStatus2 = status2;
        } else {
            console.log("Error al cargar la gráfica");
        }

        await delay(500);
        loadChartMAS();
    }

    async function loadChartMAS() {
        Highcharts.chart('container6', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Bibliotecas y vientos',
            style: {
                fontWeight: 'bold',
                fontFamily: 'Times New Roman',
                fontSize: 40,
            },
        },
        
        subtitle: {
            text: 'Gráfica con HighCharts',
            style:{
                fontFamily: 'Times New Roman',
                fontWeight: 'bold',
                fontSize: 12,
                color: 'black'
            },
        },
        xAxis: {
            title:{
                text: "viento | Provincia-Año",
                style: {
                    fontWeight: 'bold'
                }
            },
            categories: ejeX,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Valor',
                style: {
                    fontWeight: 'bold'
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y: 2f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
            pointPadding: 0.2,
            borderWidth: 2,
            borderColor: "#000"
            }
        },
        series: [{
            name: 'Temperatura',
            data: temperatura
        },{
            name: 'Identificador',
            data: identificador

        }, {
            name: 'Id de la localidad',
            data: id_localidad

        }, {
            name: 'Código postal',
            data: codigo_postal

        }],
        responsive: {
                rules: [{
                    condition: {
                        maxWidth: 1000
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        });
    }
</script>

<h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size:50px; font-weight:bold">Integraciones</h1>
<div style="text-align: center; font-family:'Times New Roman', Times, serif; font-weight: bold; font-size:20px; color:blue">
    Integración 2: Datos del tiempo.
    <br>
</div>
<hr style="text-align: right; margin-left: 100px; margin-right: 100px;">

<main>
<figure class="highcharts-figure" style="margin-left: 25px; margin-right:25px">
    <div id="container6"></div>
    <p class="highcharts-description" style="text-align:center">
        Gráfica de las bibliotecas y el viento.
    </p>
</figure>
<br>
</main>
