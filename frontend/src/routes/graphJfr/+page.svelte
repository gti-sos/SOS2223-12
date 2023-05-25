<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <title>SOS2223-12-Gráficas Contaminaciones</title>
</svelte:head>

<script>
    // @ts-nocheck
    import {onMount} from "svelte";
    const delay = ms => new Promise(res => setTimeout(res, ms));
    import { dev } from "$app/environment"; 


    let API = "/api/v2/graphJfr";
    let graph = [];

    let provincia_año = [];
    let NO2 = [];
    let O3 = [];
    let SO2 = [];

    let result = "";
    let resultStatus = "";

    onMount(async () =>{
        getGraph()
    });

    if(dev)
        API = "http://localhost:12345"+API


    async function getGraph(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "GET"
            });
            if(res.ok){
                try{
                    const valores = await res.json();
                    result = JSON.stringify(valores, null, 2);
                    graph = valores;
                    graph.forEach(graph =>{
                        console.log(graph);
                        provincia_año.push(graph.province+"-"+graph.year);
                        NO2.push(parseFloat(graph["NO2"]));
                        O3.push(parseFloat(graph["O3"]));
                        SO2.push(parseFloat(graph["SO2"]));
                        
                    });
                    await delay(500);
                    loadChart(); 
                }catch(error){
                    console.log(`Error devolviendo la gráfica: ${error}`);
                }
                const status = await res.status;
                resultStatus = status;
            }else{
                console.log("Error al cargar la gráfica");
            }
        }


    async function loadChart(){  
        
        Highcharts.chart('container', {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Estadísticas Contaminaciones',
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
                text: "Provincia-Año",
                style: {
                    fontWeight: 'bold'
                }
            },
            categories: provincia_año,
            crosshair: true
        },
        yAxis: {
            min: 0,
            max: 70,
            title: {
                text: 'Nivel de Contaminación',
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
            name: 'NO2',
            data: NO2

        }, {
            name: 'O3',
            data: O3

        }, {
            name: 'SO2',
            data: SO2

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

 
<main>
    <figure class="highcharts-figure" style="margin-left: 25px; margin-right:25px">
        <div id="container"></div>
        <p class="highcharts-description" style="text-align:center">
            Gráfico de linea sobre las Estadísticas de Contaminación de diferentes provincias de Andalucía en los últimos años.
        </p>
    </figure>
</main>