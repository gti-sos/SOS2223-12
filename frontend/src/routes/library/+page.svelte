<svelte:head>
    <title>SOS2223-12-Bibliotecas</title>
</svelte:head>
<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Button, Table } from "sveltestrap";
    import { Pagination, PaginationItem, PaginationLink } from "sveltestrap";

    onMount(async () => {
        getlibrary();
    });

    let API = "/api/v2/library";
    let mensajeUsuario = "";

    if (dev) API = "http://localhost:12345" + API;

    let librarys = [];
    let newlibraryProvince_name = "";
    let newlibraryModified = "";
    let newlibraryIdentifier = "";
    let newlibraryLocality_id = "";
    let newlibraryPostcode = "";

    let result = "";
    let resultStatus = "";

    let from = "";
    let to = "";
    let province_name = "";
    let modified = "";
    let identifier_over = "";
    let identifier_under = "";
    let locality_id_over = "";
    let locality_id_under = "";
    let postcode_over = "";
    let postcode_under = "";

    async function loadData() {
        resultStatus = result = "";
        const res = await fetch(API + "/loadInitialData", {
            method: "GET",
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
            mensajeUsuario = "Se han insertado los datos de nuevo";
            getlibrary();
            setTimeout(() => {
                mensajeUsuario = "";
            }, 3000);
        } else {
            mensajeUsuario = "No se han podido insertar los datos de nuevo";
            setTimeout(() => {
                mensajeUsuario = "";
            }, 3000);
        }
    }

    async function getlibrary() {
        resultStatus = result = "";
        const res = await fetch(API + "?offset=-1&limit=10", {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            librarys = data;
        } catch (error) {
            console.log(`Error parseando el resultado: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }

    async function getlibraryFiltros() {
        const consulta = {};
        if (province_name) {
            consulta.province_name = province_name;
        }
        if (modified) {
            consulta.modified = modified;
        }
        if (from) {
            consulta.from = from;
        }
        if (to) {
            consulta.to = to;
        }
        if (identifier_over) {
            consulta.identifier_over = identifier_over;
        }
        if (identifier_under) {
            consulta.identifier_under = identifier_under;
        }
        if (locality_id_over) {
            consulta.locality_id_over = locality_id_over;
        }
        if (locality_id_under) {
            consulta.locality_id_under = locality_id_under;
        }
        if (postcode_over) {
            consulta.postcode_over = postcode_over;
        }
        if (postcode_under) {
            consulta.postcode_under = postcode_under;
        }

        console.log(new URLSearchParams(consulta).toString());

        const res = await fetch(
            API + `?${new URLSearchParams(consulta).toString()}`,
            {
                method: "GET",
            }
        );
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            librarys = data;
        } catch (error) {
            console.log(`Error parseando el resultado: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
            mensajeUsuario = "Datos correspondientes al filtro";
            setTimeout(() => {
                mensajeUsuario = "";
            }, 3000);
        } else {
            mensajeUsuario = "No se han podido encontrar los datos";
            setTimeout(() => {
                mensajeUsuario = "";
            }, 3000);
        }
    }

    async function getPaginacion(offsetFiltro, limitFiltro) {
        resultStatus = result = "";
        const res = await fetch(
            API + "?offset=" + offsetFiltro + "&limit=" + limitFiltro,
            {
                method: "GET",
            }
        );
        console.log(API + "?offset=" + offsetFiltro + "&limit=" + limitFiltro);
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            librarys = data;
        } catch (error) {
            console.log(`Error parseando el resultado: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }

    async function getLimpiarFiltros() {
        resultStatus = result = "";
        if (
            province_name != "" ||
            modified != "" ||
            identifier_over != "" ||
            identifier_under != "" ||
            locality_id_over != "" ||
            locality_id_under != "" ||
            postcode_over != "" ||
            postcode_under != "" ||
            from != "" ||
            to != ""
        ) {
            from = "";
            to = "";
            province_name = "";
            modified = "";
            identifier_over = "";
            identifier_under = "";
            locality_id_over = "";
            locality_id_under = "";
            postcode_over = "";
            postcode_under = "";
        }
        getlibrary();
        return;
    }

    let insertedData = [];
    async function createlibrary() {
        resultStatus = result = "";
        const newlibrary = {
            province_name: newlibraryProvince_name,
            modified: parseInt(newlibraryModified),
            identifier: parseFloat(newlibraryIdentifier),
            locality_id: parseFloat(newlibraryLocality_id),
            postcode: parseFloat(newlibraryPostcode),
        };

        const existingData = insertedData.find(
            (data) =>
                data.province_name === newlibraryProvince_name &&
                data.modified === newlibraryModified &&
                data.identifier === newlibraryIdentifier &&
                data.locality_id === newlibraryLocality_id &&
                data.postcode === newlibraryPostcode
        );
        if (existingData) {
            mensajeUsuario = "Ya existe ese dato";
            setTimeout(() => {
                mensajeUsuario = "";
            }, 3000);
            return;
        }

        const res = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newlibrary),
        });

        const status = await res.status;
        resultStatus = status;
        if (status == 201) {
            getlibrary();
            mensajeUsuario = "Se ha creado el nuevo dato introducido";
            insertedData.push(newlibrary);
            setTimeout(() => {
                mensajeUsuario = "";
            }, 3000);
        } else if (status == 409) {
            mensajeUsuario = "El dato introducido ya existe";
            setTimeout(() => {
                mensajeUsuario = "";
            }, 3000);
        } else if (status == 400) {
            mensajeUsuario =
                "Las propiedades introducidas no tienen un formato correcto";
            setTimeout(() => {
                mensajeUsuario = "";
            }, 3000);
        } else {
            mensajeUsuario = "No se ha podido crear el dato introducido";
            setTimeout(() => {
                mensajeUsuario = "";
            }, 3000);
        }
    }

    async function deletelibrary(libraryProvince) {
        resultStatus = result = "";
        const res = await fetch(API + "/" + libraryProvince, {
            method: "DELETE",
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
            getlibrary();
            mensajeUsuario = "Se ha borrado correctamente el dato seleccionado";
            setTimeout(() => {
                mensajeUsuario = "";
            }, 3000);
        } else {
            mensajeUsuario = "No se ha podido borrar el dato";
            setTimeout(() => {
                mensajeUsuario = "";
            }, 3000);
        }
    }

    async function deletelibraryAll() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "DELETE",
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 200 || status == 204) {
            await getlibrary();
            mensajeUsuario = "Se han borrado correctamente los datos";
            setTimeout(() => {
                mensajeUsuario = "";
            }, 3000);
        } else {
            mensajeUsuario = "No se han podido borrar los datos";
            setTimeout(() => {
                mensajeUsuario = "";
            }, 3000);
        }
    }
</script>

<h1
    style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 60px;"
>
    Datos Bibliotecas
</h1>
<p />
{#if mensajeUsuario != ""}
    <h2
        style="color: red; text-align: center; font-family:Arial, Helvetica, sans-serif"
    >
        {mensajeUsuario}
    </h2>
{/if}

<div class="filtros">
    <div class="filtro">
        <label>
            Desde el año:
            <input  bind:value={from} />
            Hasta el año:
            <input bind:value={to} />
        </label>
    </div>

    <div class="filtro">
        <label>
            Provincia:
            <input bind:value={province_name} />
        </label>
    </div>

    <div class="filtro">
        <label>
            Año:
            <input bind:value={modified} />
        </label>
    </div>
</div>

<div class="filtros">
    <div class="filtro">
        <label>
            Identificador mayor o igual:
            <input bind:value={identifier_over}/>
        </label>
    </div>
    <div class="filtro">
        <label>
            Identificador menor igual a:
            <input bind:value={identifier_under}/>
        </label>
    </div>
</div>

<div class="filtros">
    <div class="filtro">
        <label>
            Localidad mayor o igual a:
            <input bind:value={locality_id_over}/>
        </label>
    </div>
    <div class="filtro">
        <label>
            Localidad menor o igual a:
            <input bind:value={locality_id_under}/>
        </label>
    </div>
</div>

<div class="filtros">
    <div class="filtro">
        <label>
            Código postal mayor o igual a:
            <input bind:value={postcode_over}/>
        </label>
    </div>
    <div class="filtro">
        <label>
            Código postal menor o igual a:
            <input  bind:value={postcode_under}/>
        </label>
    </div>
</div>

<div class="botones">
    <div class="filtro">
        <Button color="primary" on:click={getlibraryFiltros}>Filtrar</Button>
    </div>

    <div class="filtro">
        <Button color="secondary" on:click={getLimpiarFiltros}>
            Limpiar Filtros
        </Button>
    </div>
</div>

<strong style="margin: 10px;">Número de datos: {librarys.length}</strong>

<Table striped>
    <thead>
        <tr>
            <th style="text-decoration: underline;">Provincia:</th>
            <th style="text-decoration: underline;">Año:</th>
            <th style="text-decoration: underline;">Identificación:</th>
            <th style="text-decoration: underline;">Localidad:</th>
            <th style="text-decoration: underline;">Código postal:</th>
            <th style="text-decoration: underline;">Acciones:</th>
            <th style="text-decoration: underline;" />
        </tr>
    </thead>
    <tbody>
        <tr>
            <td
                ><input
                    placeholder="Provincia"
                    bind:value={newlibraryProvince_name}
                /></td
            >
            <td><input placeholder="Año" bind:value={newlibraryModified} /></td>
            <td
                ><input
                    placeholder="Identificación"
                    bind:value={newlibraryIdentifier}
                /></td
            >
            <td
                ><input
                    placeholder="Localidad"
                    bind:value={newlibraryLocality_id}
                /></td
            >
            <td
                ><input
                    placeholder="Código postal"
                    bind:value={newlibraryPostcode}
                /></td
            >
            <td
                ><Button color="success" on:click={createlibrary}>Crear</Button
                ></td
            >
            <td />
        </tr>

        {#each librarys as library}
            <tr>
                <td>{library.province_name}</td>
                <td>{library.modified}</td>
                <td>{library.identifier}</td>
                <td>{library.locality_id}</td>
                <td>{library.postcode}</td>
                <td
                    ><Button
                        color="secondary"
                        href="/library/{library.province_name}/{library.modified}"
                        >Editar</Button
                    ></td
                >
                <td
                    ><Button
                        color="danger"
                        on:click={deletelibrary(library.province_name)}
                        >Borrar</Button
                    ></td
                >
            </tr>
        {/each}
    </tbody>
</Table>

<Pagination
    style="text-align: center; display: flex; justify-content: center; flex-direction: row; gap: 15px;"
    ariaLabel="Page navigation example"
>
    <PaginationItem>
        <PaginationLink on:click={() => getPaginacion(-1, 10)} first />
    </PaginationItem>
    <PaginationItem>
        <PaginationLink on:click={() => getPaginacion(-1, 10)}>1</PaginationLink
        >
    </PaginationItem>
    <PaginationItem>
        <PaginationLink on:click={() => getPaginacion(9, 10)}>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
        <PaginationLink on:click={() => getPaginacion(19, 10)}>3</PaginationLink
        >
    </PaginationItem>
    <PaginationItem>
        <PaginationLink on:click={() => getPaginacion(19, 10)} last />
    </PaginationItem>
</Pagination>

<div style="text-align: center;">
    <Button color="danger" on:click={deletelibraryAll}>Borrar Datos</Button>
    <Button color="primary" on:click={loadData}>Cargar Datos</Button>
</div>

<style>
    .filtros {
        display: flex;
        justify-content: center;
    }

    .filtro {
        margin: 15px;
        display: flex;
        gap: 15px;
        padding: 7px;
    }

    .botones {
        display: flex;
        justify-content: center;
        margin: 15px;
    }

    label {
        font-family: 'Times New Roman', Times, serif;
        font-weight: bold;
        font-size: 17px;
        margin-left: 10px;
    }
</style>
