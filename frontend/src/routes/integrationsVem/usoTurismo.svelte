<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { Button } from "sveltestrap";
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    //import { dev } from "$app/environment";

    let API2 = "https://sos2223-14.appspot.com/api/v2/andalusia-tourism-situation-surveys";

    let grafica = [];
    let grafica2 = [];

    let identificador = [];
    let id_localidad = [];
    let codigo_postal = [];

    let provincia_año2 = [];

    let provincia = [];
    let año = [];
    let turistas = [];
    let media_diaria = [];
    let media_estancia = [];

    let result = "";
    let resultStatus = "";
    let result2 = "";
    let resultStatus2 = "";

    onMount(async () => {
        getGraph();
    });

    async function getGraph() {
        resultStatus2 = result2 = "";
        const res2 = await fetch(API2, {
            method: "GET",
        });

        if (res2.ok) {
            try {
                const valores2 = await res2.json();
                result2 = JSON.stringify(valores2, null, 2);
                grafica2 = valores2;
                grafica2.sort((a, b) =>
                    a.province > b.province
                        ? 1
                        : b.province > a.province
                        ? -1
                        : 0
                );
                grafica2.sort((a, b) =>
                    a.year > b.year ? 1 : b.year > a.year ? -1 : 0
                );
                grafica2.forEach((grafica2) => {
                    console.log(grafica2);
                    provincia_año2.push(
                        grafica2.province + "-" + grafica2.year
                    );
                    turistas.push(grafica2["tourist"]);
                    media_diaria.push(grafica2["average_daily_expenditure"]);
                    media_estancia.push(grafica2["average_stay"]);

                    identificador.push(0);
                    id_localidad.push(0);
                    codigo_postal.push(0);
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
        loadChart();
    }

    async function loadChart() {
        var options = {
            series: [
                {
                    name: "Turistas",
                    data: turistas,
                },
                {
                    name: "Gasto medio diario",
                    data: media_diaria,
                },
                {
                    name: "Estancia media",
                    data: media_estancia,
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
                text: "Estadísticas de la coyuntura turística de Andalucía",
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
                categories: provincia_año2,
                title: {
                    text: "Provincia-año",
                    style: {
                        fontWeight: "bold",
                    },
                },
            },
            yaxis: {
                title: {
                    text: "Valor",
                    style: {
                        fontWeight: "bold",
                    },
                },
            },
            legend: {
                horizontalAlign: "left",
            },
        };

        var chart2 = new ApexCharts(document.querySelector("#chart2"), options);
        chart2.render();
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
    <h1
        style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 45px; text-decoration:underline"
    >
        Datos: coyuntura turística
    </h1>

    <figure
        class="figure-coyuntura"
        style="margin-left: 25px; margin-right:25px"
    >
        <div id="chart2" />
        <p class="coyuntura-description" style="text-align:center">
            Gráfico de area de la coyuntura turística de Andalucía
        </p>
    </figure>
    <br />
</main>
