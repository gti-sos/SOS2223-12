<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<script>
    // @ts-nocheck
    import {onMount} from "svelte";
    import { dev } from "$app/environment";

    let API = "/api/v2/graphAml";
    let graph = [];

    let result = "";
    let resultStatus = "";

    const delay = ms => new Promise(res => setTimeout(res, ms));

    if(dev)
        API = "http://localhost:12345"+API

    onMount(async () =>{
        getGraph()
    });

    async function getGraph(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "GET"
            });
            try{
                const valores = await res.json();
                result = JSON.stringify(valores, null, 2);
                graph = valores;
                loadChart(graph);
            }catch(error){
                console.log(`Error devolviendo la gráfica: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
    }


    async function loadChart(graphAll){
        await delay(1000);

        Highcharts.chart('container', {

        title: {
            text: 'Estadísticas Agroclimáticas',
            align: 'center',
            
        },

        subtitle: {
            align: 'left'
        },

        xAxis: {
            title: {
                text: 'Año'
            }
            
        },

        yAxis: {
            title:{
                text: 'Temperaturas'
            },
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 2016,
            }
        },

        series: [{
            name: 'Sevilla - Temperatura Máxima',
            data: graphAll.map((x) => [x[1], x[2]])
        },{
            name: 'Sevilla - Temperatura Mínima',
            data: graphAll.map((x) => [x[1], x[3]])
        },{
            name: 'Sevilla - Temperatura Media',
            data: graphAll.map((x) => [x[1], x[4]])
        }/*,{
            name: 'Huelva - Temperatura Máxima',
            data: graphAll.map((x) => [x[1], x[2]])
        },{
            name: 'Huelva - Temperatura Mínima',
            data: graphAll.map((x) => [x[1], x[3]])
        },{
            name: 'Huelva - Temperatura Media',
            data: graphAll.map((x) => [x[1], x[4]])
        },{
            name: 'Malaga - Temperatura Máxima',
            data: graphAll.map((x) => [x[1], x[2]])
        },{
            name: 'Malaga - Temperatura Mínima',
            data: graphAll.map((x) => [x[1], x[3]])
        },{
            name: 'Malaga - Temperatura Media',
            data: graphAll.map((x) => [x[1], x[4]])
        },{
            name: 'Cordoba - Temperatura Máxima',
            data: graphAll.map((x) => [x[1], x[2]])
        },{
            name: 'Cordoba - Temperatura Mínima',
            data: graphAll.map((x) => [x[1], x[3]])
        },{
            name: 'Cordoba - Temperatura Media',
            data: graphAll.map((x) => [x[1], x[4]])
        }*/],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'left',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

        });

        Highcharts.chart('container2', {

            title: {
                text: 'Estadísticas Agroclimáticas',
                align: 'center',
                
            },

            subtitle: {
                align: 'left'
            },

            xAxis: {
                title: {
                    text: 'Año'
                }
                
            },

            yAxis: {
                title:{
                    text: 'Temperaturas'
                },
            },

            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2016,
                }
            },

            series: [{
                name: 'Huelva - Temperatura Máxima',
                data: graphAll.map((x) => [x[1], x[2]])
            },{
                name: 'Huelva - Temperatura Mínima',
                data: graphAll.map((x) => [x[1], x[3]])
            },{
                name: 'Huelva - Temperatura Media',
                data: graphAll.map((x) => [x[1], x[4]])
            }/*,{
                name: 'Huelva - Temperatura Máxima',
                data: graphAll.map((x) => [x[1], x[2]])
            },{
                name: 'Huelva - Temperatura Mínima',
                data: graphAll.map((x) => [x[1], x[3]])
            },{
                name: 'Huelva - Temperatura Media',
                data: graphAll.map((x) => [x[1], x[4]])
            },{
                name: 'Malaga - Temperatura Máxima',
                data: graphAll.map((x) => [x[1], x[2]])
            },{
                name: 'Malaga - Temperatura Mínima',
                data: graphAll.map((x) => [x[1], x[3]])
            },{
                name: 'Malaga - Temperatura Media',
                data: graphAll.map((x) => [x[1], x[4]])
            },{
                name: 'Cordoba - Temperatura Máxima',
                data: graphAll.map((x) => [x[1], x[2]])
            },{
                name: 'Cordoba - Temperatura Mínima',
                data: graphAll.map((x) => [x[1], x[3]])
            },{
                name: 'Cordoba - Temperatura Media',
                data: graphAll.map((x) => [x[1], x[4]])
            }*/],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'left',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }

            });
    }
    
</script>

 
<main>
    <figure class="highcharts-figure" style="margin-left: 200px; margin-right:200px;">
        <div id="container"></div>
        <p class="highcharts-description">
            Representación de los datos:
        </p>
    </figure>

    <figure class="highcharts-figure" style="margin-left: 200px; margin-right:200px;">
        <div id="container2"></div>
        <p class="highcharts-description">
            Representación de los datos2:
        </p>
    </figure>

    {#if resultStatus != ""}
    <p>
        Result:
        Numero: {graph.length}
    </p>
    <pre>
    {resultStatus}
    {result}
    </pre>
    {/if}
</main>