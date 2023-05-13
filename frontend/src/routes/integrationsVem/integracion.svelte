<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { Button } from "sveltestrap";
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    //import { dev } from "$app/environment";

    let API = "https://sos2223-12.ew.r.appspot.com/api/v2/library";
    let API2 = "https://sos2223-10.ew.r.appspot.com/api/v2/economy-stats";

    let grafica = [];
    let grafica2 = [];

    let identificador = [];
    let id_localidad = [];
    let codigo_postal = [];

    let provincia_año2 = [];

    let casa = [];
    let precio_medio = [];
    let turista = [];

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
                    a.territory > b.territory
                        ? 1
                        : b.territory > a.territory
                        ? -1
                        : 0
                );
                grafica2.sort((a, b) =>
                    a.period > b.period ? 1 : b.period > a.period ? -1 : 0
                );
                grafica2.forEach((grafica2) => {
                    console.log(grafica2);
                    provincia_año2.push(
                        grafica2.territory + "-" + grafica2.period
                    );
                    casa.push(grafica2["finished_house"]);
                    precio_medio.push(grafica2["half_price_m_two"]);
                    turista.push(grafica2["tourist"]);

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

        resultStatus = result = "";
        const res = await fetch(API, {
            method: "GET",
        });

        if (res.ok) {
            try {
                const valores = await res.json();
                result = JSON.stringify(valores, null, 2);

                grafica = valores;
                grafica.sort((a, b) =>
                    a.province_name > b.province_name
                        ? 1
                        : b.province_name > a.province_name
                        ? -1
                        : 0
                );
                grafica.sort((a, b) =>
                    a.modified > b.modified
                        ? 1
                        : b.modified > a.modified
                        ? -1
                        : 0
                );
                grafica.forEach((grafica) => {
                    console.log(grafica);

                    identificador.push(grafica["identifier"]);
                    id_localidad.push(grafica["locality_id"]);
                    codigo_postal.push(grafica["postcode"]);
                    provincia_año2.push(
                        grafica.province_name + "-" + grafica.modified
                    );
                    casa.push(0);
                    precio_medio.push(0);
                    turista.push(0);
                });
            } catch (error) {
                console.log(`Error devolviendo la gráfica: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
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
                    name: "Identificador",
                    data: identificador,
                },
                {
                    name: "Id de la localidad",
                    data: id_localidad,
                },
                {
                    name: "Codigo postal",
                    data: codigo_postal,
                },
                {
                    name: "Casas finalizadas",
                    data: casa,
                },
                {
                    name: "Precio medio m^2",
                    data: precio_medio,
                },
                {
                    name: "Turistas",
                    data: turista
                }
            ],
            chart: {
                type: "bar",
                height: 350,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "55%",
                    endingShape: "rounded",
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ["transparent"],
            },
            xaxis: {
                categories: provincia_año2,
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
    <h1
        style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 45px; text-decoration:underline"
    >
        Datos: Economía 
    </h1>

    <figure
        class="asalariados-figure"
        style="margin-left: 25px; margin-right:25px"
    >
        <div id="chart" />
        <p class="asalaraidos-description" style="text-align:center">
            Gráfico de Columnas sobre las Bibliotecas y los datos de economía.
        </p>
    </figure>
    <br />
</main>
