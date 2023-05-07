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

  let duracion = [];

  let ejex = [];

  /*

  onMount(async () => {
    getDatos();
  });

  const url =
    "https://twitch-channel-clips.p.rapidapi.com/public/clips/jakubloveshorror";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "db767001fdmsh475597aac3a7a43p1f542fjsn42167b2b2b53",
      "X-RapidAPI-Host": "twitch-channel-clips.p.rapidapi.com",
    },
  };

  async function getDatos() {
    resultStatus = result = "";
    const res = await fetch(url, options);

    if (res.ok) {
      try {
        const data = await res.json();
        result = JSON.stringify(data, null, 2);
        datos = data.clips;
        console.log(datos);
        datos.forEach((element) => {
          ejex.push(element["creatorDisplayName"]);
          duracion.push(element["duration"]);

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
          console.log(datos2);

          elemNO2.push(datos2["NO2"]);
          elemO3.push(datos2["O3"]);
          elemSO2.push(datos2["SO2"]);
          ejex.push(datos2.province + "-" + datos2.year);
          duracion.push(0);
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
    loadChartMAS2();
  }

  async function loadChartMAS2(){  
        
        Highcharts.chart('container6', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Contaminacion y Clips de directo',
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
                text: "Nombre de usuario | Provincia-Año",
                style: {
                    fontWeight: 'bold'
                }
            },
            categories: ejex,
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
            name: 'Duracion',
            data: duracion
        },{
            name: 'NO2',
            data: elemNO2

        }, {
            name: 'O3',
            data: elemO3 

        }, {
            name: 'SO2',
            data: elemSO2 

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

  */
</script>

<h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size:50px; font-weight:bold">Integraciones</h1>
<div style="text-align: center; font-family:'Times New Roman', Times, serif; font-weight: bold; font-size:20px; color:blue">
    Integración 2: Datos Clips de Directo.
    <br>
</div>
<hr style="text-align: right; margin-left: 100px; margin-right: 100px;">

<main>
<figure class="highcharts-figure" style="margin-left: 25px; margin-right:25px">
    <div id="container6"></div>
    <p class="highcharts-description" style="text-align:center">
        Gráfica de contaminación en Andalucía y duración de clips de directo.
    </p>
</figure>
<br>
</main>

