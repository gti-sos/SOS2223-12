<h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size:50px; font-weight:bold">Usos de Agroclimáticas</h1>
<div style="text-align: center; font-family:'Times New Roman', Times, serif; font-weight: bold; font-size:20px; color:blue">
    Uso 1: Datos Alpha Vantage.
    <br>
    Uso 2: Datos Búsqueda avanzada de películas.
</div>
<hr style="text-align: right; margin-left: 100px; margin-right: 100px;">
<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.6.2"></script>
</svelte:head>

<script>
    //@ts-nocheck
    import { Table } from "sveltestrap";
    import { onMount } from "svelte";
    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    let datos = [];
    let result = "";
    let resultStatus= "";

    let simb_reg_mon_prov_año = [];
    let resu = [];

    let API = "https://sos2223-12.ew.r.appspot.com/api/v2/agroclimatic";

    let datos2 = [];
    let result2 = "";
    let resultStatus2 = "";

    let temp_max = [];
    let temp_min = [];
    let temp_med = [];

    onMount(async () => {
        getDatos();
    });

    const url = 'https://alpha-vantage.p.rapidapi.com/query?keywords=microsoft&function=SYMBOL_SEARCH&datatype=json';
    const options = {
	method: 'GET',
	headers: {
		'content-type': 'application/octet-stream',
		'X-RapidAPI-Key': '7223db1b48msha3db69e3246b3bdp105d91jsn649e6b1c08cc',
		'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
	    }
    };
   
    async function getDatos(){
            resultStatus = result = "";
            const res = await fetch(url, options)//rest.then(res =>fetch(res.url, options));//fetch(rest,{
            //method: "GET"
            //});
        if(res.ok){   
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                datos = data.bestMatches;
                datos.forEach(element => {
                    simb_reg_mon_prov_año.push(element['1. symbol']+'-'+element['4. region']+'-'+element['8. currency']);
                    resu.push(element["9. matchScore"]);

                    temp_max.push(0);
                    temp_min.push(0);
                    temp_med.push(0);
                });
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        }else{
            console.log("Error al devolver la gráfica");
        } 
        resultStatus2 = result2 = "";
            const res2 = await fetch(API, {
                method: "GET"
            });
            
            if(res2.ok){
                try{
                    const valores2 = await res2.json();
                    result2 = JSON.stringify(valores2, null, 2);
                    
                    datos2 = valores2;
                    datos2.sort((a, b) => (a.province > b.province) ? 1 : ((b.province > a.province) ? -1 : 0));
                    datos2.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
                    datos2.forEach(datos2 =>{
                        console.log(datos2);
                        
                        temp_max.push(datos2["maximun_temperature"]);
                        temp_min.push(datos2["minimun_temperature"]);
                        temp_med.push(datos2["medium_temperature"]);
                        simb_reg_mon_prov_año.push(datos2.province+"-"+datos2.year);
                        
                        resu.push(0);
                    });
                    
                }catch(error){
                    console.log(`Error devolviendo la gráfica: ${error}`);
                }
                const status2 = await res2.status;
                resultStatus2 = status2;
                
            }else{
                console.log("Error al cargar la gráfica");
            }
            
            await delay(500);
            loadChartMAS();
    }

    async function loadChartMAS() {
        const ctx = document.getElementById('myChart3').getContext('2d');
        const myChart3 = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: simb_reg_mon_prov_año,
                datasets: [{
                    label: 'Temperatura Máxima',
                    data: temp_max,
                    borderColor: '#000',
                    backgroundColor: ['red'],
                    //borderWidth: 3,
                     
                    
                }, {
                    label: 'Temperatura Mínima',
                    data: temp_min,
                    borderColor: '#000',
                    backgroundColor: ['blue'],
                    //borderWidth: 3,
                    
                    
                }, {
                    label: 'Temperatura Media', 
                    data: temp_med,
                    borderColor: '#000',
                    backgroundColor: ['green'],
                    //borderWidth: 3,
                    
                }, {
                    label: 'Resultado', 
                    data: resu,
                    borderColor: '#000',
                    backgroundColor: ['yellow'],
                    //borderWidth: 3,
                    
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend:{
                        position: 'top',
                        labels: {
                            font: {
                                weight: 'bold'
                            }
                        }
                    },
                    title:{
                        text: "Estadísticas Agroclimáticas y Alpha Vantage",
                        display: true,
                        color: 'black',
                        font:{
                            family: 'Times New Roman',
                            size: 40,
                            weight: 'bold',
                        },
                        padding: {
                            bottom: 10
                        }
                    },
                    subtitle: {
                        display: true,
                        text: 'Gráfica con Chart.js',
                        color: 'black',
                        font: {
                            size: 15,
                            family: 'Times New Roman',
                            weight: 'bold',
                        },
                        padding: {
                            bottom: 20
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y.toFixed(2);
                            }
                        }
                    }
                },
                scales: {
                        y: {
                            beginAtZero: true,
                            display: true,
                            title:{
                                display: true,
                                text: "Valor",
                                font: {
                                    weight: 'bold',
                                }, 
                            },
                        },
                        x: {   
                            display: true,
                            title:{
                                display: true,
                                text: "Símbolo-Región-Moneda | Provincia-Año" ,
                                font: {
                                    weight: 'bold',
                                },
                            }
                        }
                },
                layout: {
                    padding: {
                        top: 50, 
                        left: 200,
                        right: 200,
                        
                    }
                },
            }
        });
    }
    
</script>

<main>
    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 45px; text-decoration:underline;">Datos: Alpha Vantage</h1>
    <br>
    <div style="text-align:center;">
        <strong >Número de datos: {datos.length+datos2.length}</strong>
    </div>
    <br>
    <canvas id="myChart3" style="width: 20vw; height: 20vh;"></canvas>
    <p style="text-align:center">
        Gráfico de Columnas sobre las Estadísticas Agroclimáticas y Alpha Vantage.
    </p>
    <Table striped style="text-align: center;">
        <thead>
          <tr style="font-weight: bold; text-decoration:underline">
            <th>Símbolo</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Región</th>
            <th>Apertura</th>
            <th>Cierre</th>
            <th>Zona Horaria</th>
            <th>Moneda</th>
            <th>Resultado</th>
          </tr>
        </thead>
        <tbody>
           

        {#each datos as dato}
          <tr>
            <td>{dato["1. symbol"]}</td>
            <td>{dato["2. name"]}</td>
            <td>{dato["3. type"]}</td>
            <td>{dato["4. region"]}</td>
            <td>{dato["5. marketOpen"]}</td>
            <td>{dato["6. marketClose"]}</td>
            <td>{dato["7. timezone"]}</td>
            <td>{dato["8. currency"]}</td>
            <td>{dato["9. matchScore"]}</td>
           
          </tr>
        {/each}
          
        </tbody>
    </Table>

    <p style="text-align:center">
        Datos del mercado financiero sobre acciones, divisas (FX) y criptomonedas/monedas digitales.
    </p>
</main>