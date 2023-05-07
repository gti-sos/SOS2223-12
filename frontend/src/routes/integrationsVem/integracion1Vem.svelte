<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>
<script>
    // @ts-nocheck
    import {onMount} from "svelte";
    import { Button } from "sveltestrap";
    const delay = ms => new Promise(res => setTimeout(res, ms));
    //import { dev } from "$app/environment"; 


    let API = "https://sos2223-12.ew.r.appspot.com/api/v2/library";
    let API2 = "https://sos2223-15.appspot.com/api/v2/salary-stats";

    let grafica = [];
    let grafica2 = [];
   
    let identificador = [];
    let id_localidad = [];
    let codigo_postal = [];

    let provincia_año2 = [];

    let salario_medio = [];
    let desv_tipica = [];
    let genero = [];

    let result = "";
    let resultStatus = "";
    let result2 = "";
    let resultStatus2 = "";

    onMount(async () =>{
        getGraph()
    });

    async function getGraph(){
        resultStatus2 = result2 = "";
            const res2 = await fetch(API2, {
            method: "GET"
                
            });
            
            if(res2.ok){
                try{
                    const valores2 = await res2.json();
                    result2 = JSON.stringify(valores2, null, 2);
                    grafica2 = valores2;
                    grafica2.sort((a, b) => (a.province > b.province) ? 1 : ((b.province > a.province) ? -1 : 0));
                    grafica2.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
                    grafica2.forEach(grafica2 =>{
                        console.log(grafica2);
                        provincia_año2.push(grafica2.province+"-"+grafica2.year);
                        salario_medio.push(grafica2["average_salary"]);
                        desv_tipica.push(grafica2["standard_deviation"]); 
                        genero.push(grafica2["gender"]);
                        
                        identificador.push(0);
                        id_localidad.push(0);
                        codigo_postal.push(0);
                                       
                    });
                    
                }catch(error){
                    console.log(`Error devolviendo la gráfica: ${error}`);
                }
                const status2 = await res2.status;
                resultStatus2 = status2;
            }else{
                console.log("Error al cargar la gráfica"); 
            }
        
        resultStatus = result = "";
            const res = await fetch(API, {
                method: "GET"
            });
            
            if(res.ok){
                try{
                    const valores = await res.json();
                    result = JSON.stringify(valores, null, 2);
                    
                    grafica = valores;
                    grafica.sort((a, b) => (a.province_name > b.province_name) ? 1 : ((b.province_name > a.province_name) ? -1 : 0));
                    grafica.sort((a, b) => (a.modified > b.modified) ? 1 : ((b.modified > a.modified) ? -1 : 0));
                    grafica.forEach(grafica =>{
                        console.log(grafica);
                        
                        identificador.push(grafica["identifier"]);
                        id_localidad.push(grafica["locality_id"]);
                        codigo_postal.push(grafica["postcode"]);
                        provincia_año2.push(grafica.province_name+"-"+grafica.modified);
                        salario_medio.push(0);
                        desv_tipica.push(0); 
                        genero.push(0); 
                        
                    });
                    
                }catch(error){
                    console.log(`Error devolviendo la gráfica: ${error}`);
                }
                const status = await res.status;
                resultStatus = status;
                
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
            text: 'Estadísticas Bibliotecas y Asalariados',
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
            categories: provincia_año2,
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
            name: 'Identificador',
            data: identificador 

        }, {
            name: 'Id de la localidad',
            data: id_localidad 

        }, {
            name: 'Codigo postal',
            data: codigo_postal

        }, {
            name: 'Salario medio',
            data: salario_medio

        }, {
            name: 'Desviacion tipica',
            data: desv_tipica

        }, {
            name: 'Género',
            data: genero

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
    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 45px; text-decoration:underline">Datos: Asalariados</h1>
    <figure class="highcharts-figure" style="margin-left: 25px; margin-right:25px">
        <div id="container"></div>
        <p class="highcharts-description" style="text-align:center">
            Gráfico de Columnas sobre las Bibliotecas y los asalariados.
        </p>
    </figure>
<br>

</main>