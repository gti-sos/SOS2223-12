<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    import { dev } from "$app/environment";
    import { Button } from "sveltestrap";

    let API = "/api/v2/graphVem";
    let graph = [];

    let modified = [];
    let identifier = [];
    let locality_id = [];
    let postcode = [];

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
                    modified.push(graph["modified"]);
                    identifier.push(graph["identifier"]);
                    locality_id.push(graph["locality_id"]);
                    postcode.push(graph["postcode"]);
                });
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
        var dataPointsIdentifier = [];
        var dataPointsLocalityId = [];
        var dataPointsPostcode = [];

        for (var i = 0; i < graph.length; i++) {
            dataPointsIdentifier.push({
                x: modified[i],
                y: identifier[i],
            });
            dataPointsLocalityId.push({
                x:modified[i],
                y: locality_id[i],
            });
            dataPointsPostcode.push({
                x: modified[i],
                y: postcode[i],
            });
        }

        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            title: {
                text: "Localización de bibliotecas en Sevilla",
            },
            axisX: {
                valueFormatString: "####",
            },
            axisY: {
                includeZero: false,
            },
            toolTip: {
                shared: true,
            },
            legend: {
                fontSize: 13,
            },
            data: [
                {
                    type: "splineArea",
                    showInLegend: true,
                    name: "Identificador",
                    dataPoints: dataPointsIdentifier,
                },
                {
                    type: "splineArea",
                    showInLegend: true,
                    name: "Id de la localidad",
                    dataPoints: dataPointsLocalityId,
                },
                {
                    type: "splineArea",
                    showInLegend: true,
                    name: "Código postal",
                    dataPoints: dataPointsPostcode,
                },
            ],
        });

        chart.render();
    }
</script>

<svelte:head>
    <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
</svelte:head>

<div id="chartContainer" style="height: 370px; width: 100%;" />
