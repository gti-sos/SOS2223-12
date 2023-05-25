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

  let calorias = [];

  let ejex = [];

  onMount(async () => {
    getDatos();
  });

  const url =
    "https://calories-burned-by-api-ninjas.p.rapidapi.com/v1/caloriesburned?activity=skiing";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "db767001fdmsh475597aac3a7a43p1f542fjsn42167b2b2b53",
      "X-RapidAPI-Host": "calories-burned-by-api-ninjas.p.rapidapi.com",
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
          ejex.push(element["name"]);
          calorias.push(element["total_calories"]);

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
          calorias.push(0);
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
    loadChartMAS3();
  }

  async function loadChartMAS3() {
    Highcharts.chart("container7", {
      chart: {
        type: "line",
      },
      title: {
        text: "Contaminacion y Calorias por ejercicio",
        style: {
          fontWeight: "bold",
          fontFamily: "Times New Roman",
          fontSize: 40,
        },
      },

      xAxis: {
        title: {
          text: "Nombre del ejercicio | Provincia-Año",
          style: {
            fontWeight: "bold",
          },
        },
        categories: ejex,
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: "Valor",
          style: {
            fontWeight: "bold",
          },
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y: 2f}</b></td></tr>',
        footerFormat: "</table>",
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 2,
          borderColor: "#000",
        },
      },
      series: [
        {
          name: "Total calorias",
          data: calorias,
        },
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
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 1000,
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
              },
            },
          },
        ],
      },
    });
  }
</script>

<h1
  style="text-align: center; font-family:'Times New Roman', Times, serif; font-size:50px; font-weight:bold"
>
  Integraciones
</h1>
<div
  style="text-align: center; font-family:'Times New Roman', Times, serif; font-weight: bold; font-size:20px; color:blue"
>
  Integración 3: Datos de calorias quemadas por ejercicio.
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
    Gráfica con HighCharts
  </h4>

  <figure
    class="highcharts-figure"
    style="margin-left: 25px; margin-right:25px"
  >
    <div id="container7" />
    <p class="highcharts-description" style="text-align:center">
      Gráfica de contaminación en Andalucía y calorias quemadas por ejercicio.
    </p>
  </figure>
  <br />
</main>
