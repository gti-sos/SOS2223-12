<script>
    //@ts-nocheck
    import { Table } from "sveltestrap";
    import { onMount } from "svelte";
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    let datos = [];
    let result = "";
    let resultStatus = "";

    let ejeX = [];

    let API = "https://sos2223-12.ew.r.appspot.com/api/v2/library";

    let datos2 = [];
    let result2 = "";
    let resultStatus2 = "";

    let identificador = [];
    let id_localidad = [];
    let codigo_postal = [];

    let puzzle = [];
    let ratting = [];

    onMount(async () => {
        getDatos();
    });

    const url =
        "https://chess-puzzles.p.rapidapi.com/?themes=%5B%22middlegame%22%2C%22advantage%22%5D&rating=1500&themesType=ALL&playerMoves=4&count=25";
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key":
                "3a5ba83276msh70e73b2e1abd13ap194ca1jsn0827834bd966",
            "X-RapidAPI-Host": "chess-puzzles.p.rapidapi.com",
        },
    };

    async function getDatos() {
        resultStatus = result = "";
        const res = await fetch(url, options);

        if (res.ok) {
            try {
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                datos = data.puzzles;
                datos.forEach((element) => {
                    ejeX.push(element["puzzleid"]);
                    ratting.push(element["ratingdeviation"]);

                    identificador.push(0);
                    id_localidad.push(0);
                    codigo_postal.push(0);
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
                    a.province_name > b.province_name
                        ? 1
                        : b.province_name > a.province_name
                        ? -1
                        : 0
                );
                datos2.sort((a, b) =>
                    a.modified > b.modified ? 1 : b.modified > a.modified ? -1 : 0
                );
                datos2.forEach((datos2) => {
                    console.log(datos2);

                    identificador.push(datos2["identifier"]);
                    id_localidad.push(datos2["locality_id"]);
                    codigo_postal.push(datos2["postcode"]);
                    ejeX.push(
                        datos2.province_name + "-" + datos2.modified
                    );

                    ratting.push(0);
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
        loadChartMAS();
    }

    async function loadChartMAS() {
        const ctx = document.getElementById("myChart3").getContext("2d");
        const myChart3 = new Chart(ctx, {
            type: "bubble",
            data: {
                labels: ejeX,
                datasets: [
                    {
                        label: "Identificador",
                        data: identificador.map((value, index) => {
                            return {
                                x: index,
                                y: value,
                                r: 10
                            }
                        }),
                        borderColor: "#000",
                        backgroundColor: "red",
                    },
                    {
                        label: "Id de la localidad",
                        data: id_localidad.map((value, index) => {
                            return {
                                x: index,
                                y: value,
                                r: 10
                            }
                        }),
                        borderColor: "#000",
                        backgroundColor: "blue",
                    },
                    {
                        label: "Código postal",
                        data: codigo_postal.map((value, index) => {
                            return {
                                x: index,
                                y: value,
                                r: 10
                            }
                        }),
                        borderColor: "#000",
                        backgroundColor: "green",
                    },
                    {
                        label: "ratio",
                        data: ratting.map((value, index) => {
                            return {
                                x: index,
                                y: value,
                                r: 10
                            }
                        }),
                        borderColor: "#000",
                        backgroundColor: "yellow",
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "top",
                        labels: {
                            font: {
                                weight: "bold",
                            },
                        },
                    },
                    title: {
                        text: "Estadísticas bibliotecas y ajedrez",
                        display: true,
                        color: "black",
                        font: {
                            family: "Times New Roman",
                            size: 40,
                            weight: "bold",
                        },
                        padding: {
                            bottom: 10,
                        },
                    },
                    subtitle: {
                        display: true,
                        text: "Gráfica con Chart.js",
                        color: "black",
                        font: {
                            size: 15,
                            family: "Times New Roman",
                            weight: "bold",
                        },
                        padding: {
                            bottom: 20,
                        },
                    },
                    tooltip: {
                        mode: "index",
                        intersect: false,
                        callbacks: {
                            label: function (context) {
                                return (
                                    context.dataset.label +
                                    ": " +
                                    context.parsed.y.toFixed(2)
                                );
                            },
                        },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        display: true,
                        title: {
                            display: true,
                            text: "Valor",
                            font: {
                                weight: "bold",
                            },
                        },
                    },
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: "puzzleid | Provincia-Año",
                            font: {
                                weight: "bold",
                            },
                        },
                    },
                },
                layout: {
                    padding: {
                        top: 50,
                        left: 50,
                        right: 50,
                        bottom: 50,
                    },
                },
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
    Integración 1: Datos ajedrez.
    <br />
</div>
<hr style="text-align: right; margin-left: 100px; margin-right: 100px;" />
<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.6.2"></script>
</svelte:head>

<main>
    <h1
        style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 45px; text-decoration:underline;"
    >
        Datos: ajedrez
    </h1>
    <br />
    <div style="text-align:center;">
        <strong>Número de datos: {datos.length + datos2.length}</strong>
    </div>

    <canvas id="myChart3" style="width: 20vw; height: 20vh;" />
    <p style="text-align:center">
        Estadísticas biblootecas y ajedrez.
    </p>
    <br />
</main>
