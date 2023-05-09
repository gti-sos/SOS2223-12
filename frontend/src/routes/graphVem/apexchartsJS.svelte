<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    import { dev } from "$app/environment";
    import { Button } from "sveltestrap";

    let API = "/api/v2/graphVem";
    let graph = [];

    let año = [];
    let identificador = [];
    let id_localidad = [];
    let codigo_postal = [];

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
                const fil = valores.filter((x) => x.province_name == "Sevilla");
                result = JSON.stringify(fil, null, 2);
                graph = fil;
                graph.forEach((graph) => {
                    console.log(graph);
                    año.push(graph["modified"]);
                    identificador.push(graph["identifier"]);
                    id_localidad.push(graph["locality_id"]);
                    codigo_postal.push(graph["postcode"]);
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

    function loadChart() {
        var options = {
            series: [
                {
                    name: "Identificador",
                    data: identificador,
                },
                {
                    name: "Id de la localidad",
                    data: id_localidad,
                },
                {
                    name: "codigo postal",
                    data: codigo_postal,
                },
            ],
            chart: {
                type: "area",
                height: 350,
                zoom: {
                    enabled: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "straight",
            },

            title: {
                text: "Estadísticas de las bibliotecas de Sevilla",
                style: {
                    fontWeight: "bold",
                    fontFamily: "Times New Roman",
                    fontSize: 30,
                },
            },
            subtitle: {
                text: "Gráfica con Apexcharts",
                style: {
                    fontFamily: "Times New Roman",
                    fontWeight: "bold",
                    fontSize: 12,
                    color: "black",
                },
            },

            xaxis: {
                categories: año,
                title: {
                    text: "Año",
                    style: {
                        fontWeight: "bold",
                    },
                },
            },
            yaxis: {
                title: {
                    text: "Localización de las bibliotecas",
                    style: {
                        fontWeight: "bold",
                    },
                },
            },
            legend: {
                horizontalAlign: "left",
            },
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
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

<main>
    <figure
        class="highcharts-figure"
        style="margin-left: 25px; margin-right:25px"
    >
        <div id="chart" />
        <p class="highcharts-description" style="text-align:center">
            Gráfico de area sobre las Estadísticas de las disferentes
            bibliotecas de Andalucía en los últimos años.
        </p>
    </figure>
</main>
<div id="chartContainer" style="height: 370px; width: 100%;" />
