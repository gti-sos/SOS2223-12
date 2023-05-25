<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { Button, Table } from "sveltestrap";
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    //import { dev } from "$app/environment";

    //let API = "https://sos2223-12.ew.r.appspot.com/api/v2/agroclimatic";
    let API2 = "https://sos2223-12.ew.r.appspot.com/localen"; //"https://sos2223-12.ew.r.appspot.com/localen";//"http://localhost:12345/evol";// Llama a /evol que esté en el backend y accede a la API de luismi

    let grafica = [];
    let grafica2 = [];

    let identificador = [];
    let id_localidad = [];
    let codigo_postal = [];

    let provincia_año2 = [];

    let linea = [];
    let nombre = [];
    let apellido = [];
    let extension = [];
    let poblacion = [];
    let coste = [];
    let viniendo = [];

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
                    a.president_appointment_date > b.president_appointment_date
                        ? 1
                        : b.president_appointment_date >
                          a.president_appointment_date
                        ? -1
                        : 0
                );
                grafica2.forEach((grafica2) => {
                    console.log(grafica2);
                    provincia_año2.push(
                        grafica2.territory + "-" + grafica2.period
                    );
                    linea.push(grafica2["landline"]);
                    nombre.push(grafica2["first_name"]);
                    apellido.push(grafica2["second_name"]);
                    extension.push(grafica2["surface_extension"]);
                    poblacion.push(grafica2["population"]);
                    coste.push(grafica2["expense"]);
                    viniendo.push(grafica2["income"]);

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
    }
</script>

<main>
    <h1
        style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 45px; text-decoration:underline"
    >
        Datos: Entidades Locales
    </h1>

    <br />
    <div style="text-align:center;">
        <strong>Número de datos: {grafica2.length}</strong>
    </div>
    <br />
    <Table striped hover style="text-align: center;">
        <thead>
            <tr style="font-weight: bold; text-decoration:underline">
                <th>Provincia</th>
                <th>Año</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Teléfono</th>
                <th>Extensión</th>
                <th>Población</th>
                <th>Gastos</th>
                <th>Ingresos</th>
            </tr>
        </thead>
        <tbody>
            {#each grafica2 as d}
                <tr>
                    <td>{d["province"]}</td>
                    <td>{d["president_appointment_date"]}</td>
                    <td>{d["first_name"]}</td>
                    <td>{d["second_name"]}</td>
                    <td>{d["landline"]}</td>
                    <td>{d["surface_extension"]}</td>
                    <td>{d["population"]}</td>
                    <td>{d["expense"]}</td>
                    <td>{d["income"]}</td>
                </tr>
            {/each}
        </tbody>
    </Table>
    <p style="text-align:center">Datos sobre entidades locales.</p>
    <br />
    <hr style="text-align: right; margin-left: 100px; margin-right: 100px;" />
    <div style="text-align:center">
        <Button color="primary" href="/">Volver a Inicio</Button>
    </div>
</main>
