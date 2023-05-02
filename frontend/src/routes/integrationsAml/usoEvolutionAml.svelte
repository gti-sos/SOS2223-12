<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>
<script>
    // @ts-nocheck
    import {onMount} from "svelte";
    import { Button, Table } from "sveltestrap";
    const delay = ms => new Promise(res => setTimeout(res, ms));
    //import { dev } from "$app/environment"; 


    let API = "https://sos2223-12.ew.r.appspot.com/api/v2/agroclimatic";
    let API2 = "https://sos2223-13.ew.r.appspot.com/api/v2/evolution";

    let grafica = [];
    let grafica2 = [];
   
    let temp_max = [];
    let temp_min = [];
    let temp_med = [];

    let provincia_año2 = [];

    let total_popu = [];
    let hombres = [];
    let mujeres = [];
    let debajo16 = [];
    let entre16y64 = [];
    let mayor65 = [];

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
                    grafica2.sort((a, b) => (a.territory > b.territory) ? 1 : ((b.territory > a.territory) ? -1 : 0));
                    grafica2.sort((a, b) => (a.period > b.period) ? 1 : ((b.period > a.period) ? -1 : 0));
                    grafica2.forEach(grafica2 =>{
                        console.log(grafica2);
                        provincia_año2.push(grafica2.territory+"-"+grafica2.period);
                        total_popu.push(grafica2["total_population"]);
                        hombres.push(grafica2["man"]); 
                        mujeres.push(grafica2["woman"]); 
                        debajo16.push(grafica2["under_sixteen_years"]); 
                        entre16y64.push(grafica2["from_sixteen_to_sixty_four_years"]); 
                        mayor65.push(grafica2["sixty_five_and_over"]); 
                        
                        temp_max.push(0);
                        temp_min.push(0);
                        temp_med.push(0);
                                       
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
                    grafica.sort((a, b) => (a.province > b.province) ? 1 : ((b.province > a.province) ? -1 : 0));
                    grafica.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
                    grafica.forEach(grafica =>{
                        console.log(grafica);
                        
                        temp_max.push(grafica["maximun_temperature"]);
                        temp_min.push(grafica["minimun_temperature"]);
                        temp_med.push(grafica["medium_temperature"]);
                        provincia_año2.push(grafica.province+"-"+grafica.year);
                        total_popu.push(0);
                        hombres.push(0); 
                        mujeres.push(0); 
                        debajo16.push(0); 
                        entre16y64.push(0); 
                        mayor65.push(0);
                        
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
            //loadChart();
            
    }

    /*async function loadChart(){  
        
        Highcharts.chart('container', {
        chart: {
            type: 'area'
        },
        title: {
            text: 'Estadísticas Agroclimáticas y Evolución',
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
            name: 'Temperatura Máxima',
            data: temp_max 

        }, {
            name: 'Temperatura Mínima',
            data: temp_min 

        }, {
            name: 'Temperatura Media',
            data: temp_med 

        }, {
            name: 'Población Total',
            data: total_popu

        }, {
            name: 'Hombres',
            data: hombres

        }, {
            name: 'Mujeres',
            data: mujeres

        }, {
            name: 'Debajo de 16 años',
            data: debajo16

        }, {
            name: 'Entre 16 y 64 años',
            data: entre16y64

        }, {
            name: 'Mas de 65 años',
            data: mayor65
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
    }*/

</script>

<main>
    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 45px; text-decoration:underline">Datos: Evolución</h1>
    <!--<br><div style="text-align:center;">
        <strong >Número de datos: {grafica.length+grafica2.length}</strong>
    </div>
    <br>
    <figure class="highcharts-figure" style="margin-left: 25px; margin-right:25px">
        <div id="container"></div>
        <p class="highcharts-description" style="text-align:center">
            Gráfico de Columnas sobre las Estadísticas Agroclimáticas y Evolución.
        </p>
    </figure>
    <br>-->
    <br><div style="text-align:center;">
        <strong >Número de datos: {grafica2.length}</strong>
    </div>
    <br>
    <Table striped hover style="text-align: center;">
        <thead>
          <tr style="font-weight: bold; text-decoration:underline">
            <th>Provincia</th>
            <th>Año</th>
            <th>Población Total</th>
            <th>Hombres</th>
            <th>Mujeres</th>
            <th>Por debajo de 16</th>
            <th>Entre 15 y 64</th>
            <th>Mayores de 65</th>
          </tr>
        </thead>
        <tbody>
           

        {#each grafica2 as d}
          <tr>
            <td>{d["territory"]}</td>
            <td>{d["period"]}</td>
            <td>{d["total_population"]}</td>
            <td>{d["man"]}</td>
            <td>{d["woman"]}</td>
            <td>{d["under_sixteen_years"]}</td>
            <td>{d["from_sixteen_to_sixty_four_years"]}</td>
            <td>{d["sixty_five_and_over"]}</td>
          </tr>
        {/each}
          
        </tbody>
    </Table>
    <p style="text-align:center">
        Datos sobre la población en diversos años.
    </p>
<br>

</main>