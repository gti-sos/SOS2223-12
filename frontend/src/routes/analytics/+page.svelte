<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <title>SOS2223-12-Análisis</title>
</svelte:head>

<script>
    // @ts-nocheck
    import {onMount} from "svelte";
    import { Button } from "sveltestrap";
    const delay = ms => new Promise(res => setTimeout(res, ms));
    //import { dev } from "$app/environment"; 


    let API = "https://sos2223-12.ew.r.appspot.com/api/v2/agroclimatic";
    let API2 = "https://sos2223-12.ew.r.appspot.com/api/v2/pollutions";
    let API3 = "https://sos2223-12.ew.r.appspot.com/api/v2/library";
    
    let graph = [];
    let graph2 = [];
    let graph3 = [];

    let provincia_año = [];
    let temp_max = [];
    let temp_min = [];
    let temp_med = [];

    let No2 = [];
    let So2 = [];
    let o3 = [];

    let codigo_post = [];
    let indenti = [];
    let locali = [];

    let result = "";
    let resultStatus = "";
    let result2 = "";
    let resultStatus2 = "";
    let result3 = "";
    let resultStatus3 = "";

    onMount(async () =>{
        getGraph()
    });

    /*if(dev)
        API = "http://localhost:12345"+API
    */

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
                    graph.sort((a, b) => (a.province > b.province) ? 1 : ((b.province > a.province) ? -1 : 0));
                    graph.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
                    graph.forEach(graph =>{
                        console.log(graph);
                        provincia_año.push(graph.province+"-"+graph.year);
                        temp_max.push(parseFloat(graph["maximun_temperature"]));
                        temp_min.push(parseFloat(graph["minimun_temperature"]));
                        temp_med.push(parseFloat(graph["medium_temperature"]));
                        
                    });
                    
                }catch(error){
                    console.log(`Error devolviendo la gráfica: ${error}`);
                }
                const status = await res.status;
                resultStatus = status;
                
            }else{
                console.log("Error al cargar la gráfica");
            }
        resultStatus2 = result2 = "";
            const res2 = await fetch(API2, {
            method: "GET"
                
            });
            
            if(res2.ok){
                try{
                    const valores2 = await res2.json();
                    result2 = JSON.stringify(valores2, null, 2);
                    graph2 = valores2;
                    graph2.sort((a, b) => (a.province > b.province) ? 1 : ((b.province > a.province) ? -1 : 0));
                    graph2.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
                    graph2.forEach(graph2 =>{
                        console.log(graph2);
                        provincia_año.push(graph.province+"-"+graph.year);
                        
                        No2.push(graph2["NO2"]);
                        o3.push(graph2["O3"]);
                        So2.push(graph2["SO2"]);
                    });
                    
                }catch(error){
                    console.log(`Error devolviendo la gráfica: ${error}`);
                }
                const status2 = await res2.status;
                resultStatus2 = status2;
            }else{
                console.log("Error al cargar la gráfica"); 
            }
        resultStatus3 = result3 = "";
            const res3 = await fetch(API3, {
                method: "GET"
            });
            if(res3.ok){
                try{
                    const valores3 = await res3.json();
                    result3 = JSON.stringify(valores3, null, 2);
                    graph3 = valores3;
                    graph3.sort((a, b) => (a.province_name > b.province_name) ? 1 : ((b.province_name > a.province_name) ? -1 : 0));
                    graph3.sort((a, b) => (a.modified > b.modified) ? 1 : ((b.modified > a.modified) ? -1 : 0));
                    graph3.forEach(graph3 =>{
                        console.log(graph3);
                        indenti.push(graph3["identifier"]);
                        locali.push(graph3["locality_id"]);
                        codigo_post.push(graph3["postcode"]);
                    });
                    
                }catch(error){
                    console.log(`Error devolviendo la gráfica: ${error}`);
                }
                const status3 = await res3.status;
                resultStatus3 = status3;
            }else{
                console.log("Error al cargar la gráfica");
            }
            await delay(500);
            loadChart();
        }


    async function loadChart(){  
        
        Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Estadísticas Agroclimáticas, Contaminaciones y Bibliotecas',
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
            name: 'Temperatura Máxima',
            data: temp_max 

        }, {
            name: 'Temperatura Mínima',
            data: temp_min 

        }, {
            name: 'Temperatura Media',
            data: temp_med 

        }, {
            name: 'NO2',
            data: No2

        }, {
            name: 'O3',
            data: o3

        }, {
            name: 'SO2',
            data: So2

        }, {
            name: 'Identificador',
            data: indenti

        }, {
            name: 'Localidad_ID',
            data: locali

        }, {
            name: 'Código Postal',
            data: codigo_post
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
            Gráfico de Columnas sobre las Estadísticas Agroclimáticas, Contaminaciones y Bibliotecas de diferentes provincias de Andalucía en diversos años.
        </p>
    </figure>

    <br>
    <div style="text-align:center">
        <Button color="primary" href="/">Volver a Inicio</Button>
    </div>
</main>
