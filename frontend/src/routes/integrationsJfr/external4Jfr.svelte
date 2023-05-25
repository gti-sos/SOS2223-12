<script>
  //@ts-nocheck
  import { Table } from "sveltestrap";
  import { onMount } from "svelte";
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  let datos = [];
  let result = "";
  let resultStatus = "";

  let API = "https://sos2223-12.ew.r.appspot.com/api/v2/pollutions";

  let datos2 = [];
  let result2 = "";
  let resultStatus2 = "";

  let elemNO2 = [];
  let elemO3 = [];
  let elemSO2 = [];

  let popularidad = [];

  let ejex = [];

  onMount(async () => {
    getDatos();
  });

  const url =
    "https://actor-movie-api1.p.rapidapi.com/getid/Tom%20Holland?apiKey=62ffac58c57333a136053150eaa1b587";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "db767001fdmsh475597aac3a7a43p1f542fjsn42167b2b2b53",
      "X-RapidAPI-Host": "actor-movie-api1.p.rapidapi.com",
    },
  };

  async function getDatos() {
    resultStatus = result = "";
    const res = await fetch(url, options);

    if (res.ok) {
      try {
        const data = await res.json();
        result = JSON.stringify(data, null, 2);
        datos = data;
        console.log(datos.length);
        datos.forEach((element) => {
          ejex.push(element["original_title"]);
          popularidad.push(element["popularity"]);

          elemNO2.push(0);
          elemO3.push(0);
          elemSO2.push(0);
        });
      } catch (error) {
        console.log(`Error parseando el resultado: ${error}`);
      }
      const status = await res.status;
      resultStatus = status;
    } else {
      console.log("Error al devolver la gráfica");
    }

    resultStatus2 = result2 = "";
    const res2 = await fetch(API, {
      method: "GET",
    });

    if (res2.ok) {
      try {
        const valores2 = await res2.json();
        result2 = JSON.stringify(valores2, null, 2);

        datos2 = valores2;
        datos2.sort((a, b) =>
          a.province > b.province ? 1 : b.province > a.province ? -1 : 0
        );
        datos2.sort((a, b) => (a.year > b.year ? 1 : b.year > a.year ? -1 : 0));
        datos2.forEach((datos2) => {
          console.log(datos2.length);

          elemNO2.push(parseFloat(datos2["NO2"]));
          elemO3.push(parseFloat(datos2["O3"]));
          elemSO2.push(parseFloat(datos2["SO2"]));
          ejex.push(datos2.province + "-" + datos2.year);
          popularidad.push(0);
        });
      } catch (error) {
        console.log(`Error devolviendo la gráfica: ${error}`);
      }
      const status2 = await res2.status;
      resultStatus2 = status2;
    } else {
      console.log("Error al cargar la gráfica");
    }

    await delay(500);
    loadChartA();
  }

  async function loadChartA() {
    var options = {
      series: [
        {
          name: "NO2",
          data: elemNO2,
        },
        {
          name: "O3",
          data: elemO3,
        },
        {
          name: "SO2",
          data: elemSO2,
        },
        {
          name: "Popularidad",
          data: popularidad,
        },
      ],
      chart: {
        type: "area",
        height: 350,
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ejex,
      },
      yaxis: {
        title: {
          text: "Valor",
        },
      },
      fill: {
        opacity: 1,
      },
    };

    var chart = new ApexCharts(document.querySelector("#chart7"), options);
    chart.render();
  }
</script>

<svelte:head>
  <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
  <script
    type="text/javascript"
    src="https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.js"
  ></script>
  <link rel="stylesheet" type="text/css" href="css/style.css" />
</svelte:head>

<h1
  style="text-align: center; font-family:'Times New Roman', Times, serif; font-size:50px; font-weight:bold"
>
  Integraciones
</h1>
<div
  style="text-align: center; font-family:'Times New Roman', Times, serif; font-weight: bold; font-size:20px; color:blue"
>
  Integración 4: Datos popularidad de peliculas.
  <br />
</div>
<hr style="text-align: right; margin-left: 100px; margin-right: 100px;" />

<main>
  <div style="text-align:center;">
    <strong>Número de datos: {datos.length + datos2.length}</strong>
  </div>
  <h4
    style="font-size:12px; font-family: 'Times New Roman', Times, serif; text-align:center; font-weight: bold;"
  >
    Gráfica con ApexChart
  </h4>

  <div style="max-width: 600px; margin: 0 auto;">
    <figure class="figure" style="margin-left: 25px; margin-right:25px">
      <div id="chart7" />
      <p class="description" style="text-align:center">
        Gráfica de contaminación en Andalucía y popularidad de películas.
      </p>
    </figure>
  </div>
  <br />
</main>
