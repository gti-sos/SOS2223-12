<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.6.2"></script>
</svelte:head>

<script>

    // @ts-nocheck
    import {onMount} from "svelte";
    const delay = ms => new Promise(res => setTimeout(res, ms));
    import { dev } from "$app/environment"; 

    let API = "/api/v2/graphAml";
    let graph = [];

    let año = [];
    let temp_max = [];
    let temp_min = [];
    let temp_med = [];

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
                    const fil = valores.filter((x) => x.province == "Sevilla")
                    result = JSON.stringify(fil, null, 2);
                    graph = fil;
                    graph.forEach(graph =>{
                        console.log(graph);
                        año.push(graph["year"]);
                        temp_max.push(graph["maximun_temperature"]);
                        temp_min.push(graph["minimun_temperature"]);
                        temp_med.push(graph["medium_temperature"]);
                        console.log(myChart.data);
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

    async function loadChart() {
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: año,
                datasets: [{
                    label: 'Temperatura Máxima',
                    data: temp_max,
                    borderColor: '#000',
                    backgroundColor: ['red'],
                    borderWidth: 3,
                     
                    
                }, {
                    label: 'Temperatura Mínima',
                    data: temp_min,
                    borderColor: '#000',
                    backgroundColor: ['blue'],
                    borderWidth: 3,
                    
                    
                }, {
                    label: 'Temperatura Media', 
                    data: temp_med,
                    borderColor: '#000',
                    backgroundColor: ['green'],
                    borderWidth: 3,
                    
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
                        text: "Estadísticas Agroclimáticas de Sevilla",
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
                                return context.dataset.label + ': ' + context.parsed.y.toFixed(2) + 'ºC';
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
                                text: "Temperatura",
                                weight: 'bold'
                                
                            },
                            max: 50
                        },
                        x: {   
                            display: true,
                            title:{
                                display: true,
                                text: "Años" ,
                                weight: 'bold'
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
    <canvas id="myChart" style="width: 20vw; height: 20vh;"></canvas>

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
