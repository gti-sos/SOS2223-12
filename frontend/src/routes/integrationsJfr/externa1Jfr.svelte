<h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size:50px; font-weight:bold">Integraciones</h1>
<div style="text-align: center; font-family:'Times New Roman', Times, serif; font-weight: bold; font-size:20px; color:blue">
    Integración 1: Datos Air Quality Seattle.
    <br>
</div>
<hr style="text-align: right; margin-left: 100px; margin-right: 100px;">
<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.css"/>
    <script src="https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"> </script>
  <script
    src="https://cdn.jsdelivr.net/npm/chartist-plugin-legend@0.6.2/chartist-plugin-legend.min.js"
  ></script>
  <script
    src="https://cdn.jsdelivr.net/npm/chartist-plugin-axistitle@0.0.7/dist/chartist-plugin-axistitle.min.js"
  ></script>
  <script src="https://cdn.jsdelivr.net/npm/@kblo55/chartist-plugin-tooltips@0.0.18/dist/chartist-plugin-tooltip.min.js"></script>
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

    let API = "https://sos2223-12.ew.r.appspot.com/api/v2/pollutions";

    let datos2 = [];
    let result2 = "";
    let resultStatus2 = "";

    let elemNO2 = [];
    let elemO3 = [];
    let elemSO2 = [];

    let idd = [];
    let tipo = [];

    let ejex = [];

    /*

    onMount(async () => {
        getDatos();
    });

    const url = 'https://pokemon-unite-pokemons.p.rapidapi.com/pokemon?page=1&pageSize=10';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'db767001fdmsh475597aac3a7a43p1f542fjsn42167b2b2b53',
            'X-RapidAPI-Host': 'pokemon-unite-pokemons.p.rapidapi.com'
        }
    };
   
    async function getDatos(){
            resultStatus = result = "";
            const res = await fetch(url, options)

        if(res.ok){   
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                datos = data.items;
                console.log(datos)
                datos.forEach(element => {

                    ejex.push(element["name"]+"-"+element["damageType"])
                    idd.push(element["id"]);
                    
                    elemNO2.push(0);
                    elemO3.push(0);
                    elemSO2.push(0);
                    
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
                        
                        elemNO2.push(datos2["NO2"]);
                        elemO3.push(datos2["O3"]);
                        elemSO2.push(datos2["SO2"]);
                        ejex.push(datos2.province+"-"+datos2.year);
                        idd.push(0);
                        
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
    type: 'line',
    data: {
      labels: ejex,
      datasets: [{
        label: 'NO2',
        data: elemNO2,
        borderColor: 'red',
        backgroundColor: 'transparent',
      }, {
        label: 'O3',
        data: elemO3,
        borderColor: 'blue',
        backgroundColor: 'transparent',
      }, {
        label: 'SO2',
        data: elemSO2,
        borderColor: 'green',
        backgroundColor: 'transparent',
      }, {
        label: 'ID',
        data: idd,
        borderColor: 'yellow',
        backgroundColor: 'transparent',
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: {
              weight: 'bold'
            }
          }
        },
        title: {
          text: 'Gráfica de Contaminación y Pokemon',
          display: true,
          color: 'black',
          font: {
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
          text: 'Gráfica con Charts.js',
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
          title: {
            display: true,
            text: 'Valor',
            font: {
              weight: 'bold',
            },
          },
        },
        x: {
          display: true,
          title: {
            display: true,
            text: 'Pokemon-Tipo | Provincia-Año',
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
*/
    
</script>

<main>
    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 45px; text-decoration:underline;">Datos: aaaaaa</h1>
    <br>
    <div style="text-align:center;">
        <strong >Número de datos: {datos.length+datos2.length}</strong>
    </div>
    
    <canvas id="myChart3" style="width: 20vw; height: 20vh;"></canvas>
    <p style="text-align:center">
        
    </p>
    <br>
</main>