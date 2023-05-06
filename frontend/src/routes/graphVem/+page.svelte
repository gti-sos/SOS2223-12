<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <title>SOS2223-12-Gráficas Bibliotecas</title>
</svelte:head>

<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    import { dev } from "$app/environment";

    let API = "/api/v2/graphVem";
    let graph = [];

    let provincia_año = [];
    let identifier = [];
    let locality_id = [];
    let postcode = [];

    let result = "";
    let resultStatus = "";

    onMount(async () => {
        getGraph();
    });

    if (dev) API = "http://localhost:12345" + API

    async function getGraph() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "GET",
        });
        if (res.ok) {
            try {
                const valores = await res.json();
                result = JSON.stringify(valores, null, 2);
                graph = valores;
                graph.forEach((graph) => {
                    console.log(graph);
                    provincia_año.push(graph.province_name + "-" + graph.modified);
                    identifier.push(graph["identifier"]);
                    locality_id.push(graph["locality_id"]);
                    postcode.push(graph["postcode"]);
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

        Highcharts.chart('container', {
    chart: {
        type: 'area'
    },
    title: {
        text: 'Estadísticas Bibliotecas',
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
            categories: provincia_año,
            crosshair: true
    },
    yAxis: {
        min: 0,
        max: 10000,
        title: {
            text: 'Localización de las bibliotecas',
            style: {
                fontWeight: 'bold'
            }
        }
    },
    credits: {
        enabled: false
    },
    tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y: 2f}ºC</b></td></tr>',
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
        name: 'Identificador',
        data: identifier
    }, {
        name: 'Id de la localidad',
        data: locality_id
    }, {
        name: 'Código postal',
        data: postcode
    }]
});

    }
</script>

<main>
    <figure class="highcharts-figure" style="margin-left: 25px; margin-right:25px">
        <div id="container"></div>
        <p class="highcharts-description" style="text-align:center">
            Gráfico de area sobre las Estadísticas de las disferentes bibliotecas de Andalucía en los últimos años.
        </p>
    </figure>
</main>
