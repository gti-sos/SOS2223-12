<h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size:50px; font-weight:bold">Usos</h1>
<div style="text-align: center; font-family:'Times New Roman', Times, serif; font-weight: bold; font-size:20px; color:blue">
    Uso 3: F1.
    <br>
</div>
<hr style="text-align: right; margin-left: 100px; margin-right: 100px;">

<script>
  //@ts-nocheck
  import { Table } from "sveltestrap";
  import { Button} from "sveltestrap";
  import { onMount } from "svelte";
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  let result = "";
  let resultStatus = "";

  let datos = [];

  let nombre = [];

  let posicion = [];
  let paradas = [];

  /*

  onMount(async () => {
    getDatos3();
  });

  const url = "https://f1-live-motorsport-data.p.rapidapi.com/session/2757";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "db767001fdmsh475597aac3a7a43p1f542fjsn42167b2b2b53",
      "X-RapidAPI-Host": "f1-live-motorsport-data.p.rapidapi.com",
    },
  };

  async function getDatos3() {
    resultStatus = result = "";
    const res = await fetch(url, options); //rest.then(res =>fetch(res.url, options));//fetch(rest,{
    //method: "GET"
    //});
    if (res.ok) {
      try {
        const data = await res.json();
        result = JSON.stringify(data, null, 2);
        datos = data.results.drivers;
        datos.forEach((element) => {
          nombre.push(element["name"]);
          posicion.push(element["position"]);
          paradas.push(element["stops"]);
        });
      } catch (error) {
        console.log(`Error parseando el resultado: ${error}`);
      }
      const status = await res.status;
      resultStatus = status;
    } else {
      console.log("Error al devolver la gráfica");
    }
    await delay(500);
    loadChart3();
  }

  async function loadChart3() {
    var dataPlot = [
      {
        x: nombre,
        y: posicion,
        type: "box",
        name: "Posicion",
      },
      {
        x: nombre,
        y: paradas,
        type: "box",
        name: "Paradas",
      },
    ];

    var layout = {
      font: { size: 8 },
    };

    var config = {
      responsive: true,
    };

    Plotly.newPlot("myDiv", dataPlot, layout, config);
  }
  */
</script>
<br />
<svelte:head>
  <script src="https://cdn.plot.ly/plotly-2.20.0.min.js"></script>
</svelte:head>



<main>
  <h2
    style="font-size:40px; font-family: 'Times New Roman', Times, serif; text-align:center; font-weight: bold;"
  >
    Gráfica de datos Fórmula 1
  </h2>
  <div style="text-align:center;">
    <strong>Número de datos: {datos.length}</strong>
  </div>
  <h4
    style="font-size:12px; font-family: 'Times New Roman', Times, serif; text-align:center; font-weight: bold;"
  >
    Gráfica con Plotly
  </h4>
  <br />
  <p style="text-align: center;">
    
  </p>
  <div id="myDiv" />

  <p style="text-align: center;">
    Datos sobre las posiciones y paradas de los pilotos de F1
  </p>
  <br />
  <hr style="text-align: right; margin-left: 100px; margin-right: 100px;">
    <div style="text-align:center">
        <Button color="primary" href="/">Volver a Inicio</Button>
    </div>
</main>

