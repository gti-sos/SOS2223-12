<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  import { dev } from "$app/environment";
  import { Button, Label } from "sveltestrap";
  import { AutoScaleAxis } from "chartist";
  import { text } from "svelte/internal";

  let API = "/api/v2/graphJfr";
  let graph = [];

  let año = [];
  let NO2 = [];
  let O3 = [];
  let SO2 = [];

  let result = "";
  let resultStatus = "";

  onMount(async () => {
    getGraph();
  });

  if (dev) API = "http://localhost:12345" + API;

  async function getGraph() {
    resultStatus = result = "";
    const res = await fetch(API, {
      method: "GET",
    });
    if (res.ok) {
      try {
        const valores = await res.json();
        const fil = valores.filter((x) => x.province == "sevilla");
        result = JSON.stringify(fil, null, 2);
        graph = fil;
        graph.forEach((graph) => {
          console.log(graph);
          año.push(graph["year"]);
          NO2.push(graph["NO2"]);
          O3.push(graph["O3"]);
          SO2.push(graph["SO2"]);
          //console.log(myChart.data);
        });
        await delay(500);
        loadChart();
      } catch (error) {
        console.log(`Error devolviendo la gráfica: ${error}`);
      }
      const status = await res.status;
      resultStatus = status;
    } else {
      console.log("Error al cargar la gráfica");
    }
  }

  async function loadChart() {
  var chart = new Chartist.Line(
    "#ct-chart",
    {
      labels: año,
      series: [
        {
          name: "NO2",
          data: NO2,
        },
        {
          name: "O3",
          data: O3,
        },
        {
          name: "SO2",
          data: SO2,
        },
      ],
    },
    {
      axisY: {
        onlyInteger: true,
        labelInterpolationFnc: function (value) {
          return value;
        },
        axisTitle: "Contaminación", // Título del eje Y
      },
      axisX: {
        onlyInteger: true,
        labelInterpolationFnc: function (value) {
          return "Año " + value;
        },
        axisTitle: "Año", // Título del eje X
      },
      chartPadding: {
        top: 40,
        right: 20,
        bottom: 30,
        left: 50,
      },
      height: "400px",
      width: "800px",
      plugins: [
        Chartist.plugins.legend({
          legendNames: ["NO2", "O3", "SO2"],
        }),
        Chartist.plugins.ctAxisTitle({
          axisX: {
            axisTitle: "Año",
            axisClass: "ct-axis-title2",
            offset: {
              x: 0,
              y: 50
            },
            textAnchor: "middle",
          },
          axisY: {
            axisTitle: "Contaminacion",
            axisClass: "ct-axis-title",
            offset: {
              x: 0,
              y: 0
            },
            textAnchor: "start",
          },
        }),
      ],
    }
  );
}

</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.css"
  />
  <script
    src="https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"
  ></script>

  <script
    src="https://cdn.jsdelivr.net/npm/chartist-plugin-legend@0.6.2/chartist-plugin-legend.min.js"
  ></script>
  <script
    src="https://cdn.jsdelivr.net/npm/chartist-plugin-axistitle@0.0.7/dist/chartist-plugin-axistitle.min.js"
  ></script>
  <script src="https://cdn.jsdelivr.net/npm/@kblo55/chartist-plugin-tooltips@0.0.18/dist/chartist-plugin-tooltip.min.js"></script>
</svelte:head>

<main>
  <h2 style="text-align: center;">Contaminación anual en Sevilla</h2>
  <style>
    h2 {
      fontWeight: 'bold',
      fontFamily: 'Times New Roman',
      fontSize: 40,     
    }
  </style>
  <div id="ct-chart" style="text-align: center;">

    

    
    
    <style>

      .ct-legend {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      ul {
        list-style: none; /* para quitar los puntos de la lista */
        padding: 0;
        margin: 50px;
      }

      ul li{
        margin: 10px;
      }

      .ct-series-0{
        color:  #dc3545;
      }

      .ct-series-1{
        color: #0d6efd;
      }


      .ct-series-2{
        color: #ffc107;
      }

      .ct-series-b .ct-line {
        stroke: #0d6efd;
      }

      .ct-series-b .ct-point{
        stroke: #0d6efd;
      }





      
      .ct-legend {
        position: center;
        z-index: 10;
        
      }

      .ct-legend li {
        margin: 5px,
        position: center,
        
      }

      .ct-legend li:before {
        width: 12px;
        height: 12px;
        position: absolute;
        
        
        border: 3px solid transparent;
        border-radius: 2px;
      }

      .ct-legend li.inactive:before {
        background: transparent;
      }

      .ct-legend.ct-legend-inside {
        position: center;
        top: 0;
        right: 0;
      }

      @for $i from 0 to length($ct-series-colors) {
        .ct-series-#{$i}:before {
          background-color: nth($ct-series-colors, $i + 1);
          border-color: nth($ct-series-colors, $i + 1);
        }
      }
    </style>
  </div>

  <p class="highcharts-description" style="text-align:center">
    Gráfico de linea sobre las Estadísticas de Contaminación en Sevilla en los
    últimos años.
  </p>

  <div style="text-align:center">
    <Button color="primary" href="/">Volver a Inicio</Button>
  </div>
</main>
