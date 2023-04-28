<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
    <script src="https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>
</svelte:head>

<script>
// @ts-nocheck
import {onMount} from "svelte";
const delay = ms => new Promise(res => setTimeout(res, ms));
import { dev } from "$app/environment"; 
import { Button } from "sveltestrap";

let API = "/api/v2/graphJfr";
let graph = [];

let año = [];
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
            const fil = valores.filter((x) => x.province == "sevilla")
            result = JSON.stringify(fil, null, 2);
            graph = fil;
            graph.forEach(graph =>{
                console.log(graph);
                año.push(graph["year"]);
                NO2.push(graph["NO2"]);
                O3.push(graph["O3"]);
                SO2.push(graph["SO2"]);
                //console.log(myChart.data);
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
  var chart = new Chartist.Line('#ct-chart', {
    labels: año,
    series: [
      {
        name: 'NO2',
        data: NO2
      },
      {
        name: 'O3',
        data: O3
      },
      {
        name: 'SO2', 
        data: SO2
      }
    ]
  }, {
    axisY: {
      title: "Contaminación",
      onlyInteger: true,
      labelInterpolationFnc: function(value) {
        return value;
      }
    },
    axisX: {
      labelInterpolationFnc: function(value) {
        return value;
      }
    },
    chartPadding: {
      top: 50, 
      left: 200,
      right: 200,
    },
    height: "500px",
    width: "1000px",
    chartPadding: {
      top: 40,
      right: 20,
      bottom: 30,
      left: 50
    }
  });

  chart.on('draw', function(data) {
    if(data.type === 'line' || data.type === 'area') {
      data.element.animate({
        d: {
          begin: 2000 * data.index,
          dur: 2000,
          from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
          to: data.path.clone().stringify(),
          easing: Chartist.Svg.Easing.easeOutQuint
        }
      });
    }
  });
}




</script>

<main>
    <h2 style="text-align: center;">Contaminación anual en Sevilla</h2>
    <style>
        h2 {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
        }
    </style>
    <div id="ct-chart" style="text-align: center;"></div>
    

    <br>
    <div style="text-align:center">
        <Button color="primary" href="/">Volver a Inicio</Button>
    </div>
</main>