<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Button, Table } from "sveltestrap";
    import { get } from "svelte/store";

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

    let añoInicio = "";
    let añoFinal = "";
    let provinciaFiltrada = "";

    async function loadData() {
        resultStatus = result = "";
        const res = await fetch(API + "/loadInitialData", {
            method: "GET",
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
            mensajeUsuario = "Se han insertado los datos de nuevo";
        } else {
            mensajeUsuario = "No se han podido insertar los datos de nuevo";
        }
        getlibrary();
    }

    

    async function getlibrary() {
        resultStatus = result = "";
        const res = await fetch(API, {
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

    async function getFiltroAño() {
        resultStatus = result = "";
        if(añoFinal < añoInicio){
            mensajeUsuario = "El año final no puede ser menor que el año de inicio"
            return;
        }else if(añoInicio=="" || añoFinal == ""){
            mensajeUsuario = "Debe introducir un año de inicio y un año final"
            return;
        }else if(librarys.length==0){
            mensajeUsuario = "No hay ningún dato comprendido entre esas fechas"
            return;
        }else {
            mensajeUsuario = "Se están mostrando los datos correspondientes al filtro"
        }
        


        const res = await fetch(
            API + "?from=" + añoInicio + "&to=" + añoFinal,
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
    }

    async function getFiltroProvincia(){
        resultStatus = result = "";
        if(provinciaFiltrada == ""){
            mensajeUsuario = "Debe introducir una provincia"
            return;
        }else if(librarys.length==0){
            mensajeUsuario = "No hay datos para esta provincia"
            return;
        }else{
            mensajeUsuario = "Se están mostrando los datos correspondientes al filtro"
        }

        const res = await fetch(
            API + "?province_name=" + provinciaFiltrada,
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
    }

    async function getLimpiarFiltros(){
        resultStatus = result = "";
        if(provinciaFiltrada != "" || añoInicio != "" || añoFinal != ""){
            provinciaFiltrada = "";
            añoInicio = "";
            añoFinal = "";
        }
        getlibrary();
        mensajeUsuario = "";
        return;
    }

    async function getPaginacion() {

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
        } else if (status == 409) {
            mensajeUsuario = "El dato introducido ya existe";
            getlibrary();
        } else if (status == 400) {
            mensajeUsuario =
                "Las propiedades introducidas no tienen un formato correcto";
            getlibrary();
        } else {
            mensajeUsuario = "No se ha podido crear el dato introducido";
            getlibrary();
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
        } else {
            mensajeUsuario = "No se ha podido borrar el dato";
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
        } else {
            mensajeUsuario = "No se han podido borrar los datos";
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

<div class = "filtros">

    <div class = "filtroAño">
        <input placeholder="Año de inicio" bind:value={añoInicio}>
        <input placeholder="Año Final" bind:value={añoFinal}>
        <Button color="primary" on:click={getFiltroAño}> Filtrar </Button>
    </div>

    <div class = "filtroProvincia">
        <input placeholder="Provincia" bind:value={provinciaFiltrada}>
        <Button color = "primary" on:click={getFiltroProvincia}> Filtrar </Button>
    </div>

    <div class ="limpiarFiltros">
        <Button color="secondary" on:click={getLimpiarFiltros}> Limpiar Filtros </Button>
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
            <th style="text-decoration: underline;"></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><input placeholder = "Provincia" bind:value={newlibraryProvince_name} ></td>
            <td><input placeholder = "Año" bind:value={newlibraryModified} ></td>
            <td><input placeholder = "Identificación" bind:value={newlibraryIdentifier} ></td>
            <td><input placeholder = "Localidad" bind:value={newlibraryLocality_id} ></td>
            <td><input placeholder = "Código postal" bind:value={newlibraryPostcode} ></td>
            <td><Button color="success" on:click={createlibrary}>Crear</Button></td>
            <td></td>
        </tr>

        {#each librarys as library}
            <tr>
                <td>{library.province_name}</td>
                <td>{library.modified}</td>
                <td>{library.identifier}</td>
                <td>{library.locality_id}</td>
                <td>{library.postcode}</td>
                <td><Button color= "secondary" href= "/library/{library.province_name}/{library.modified}">Editar</Button></td>
                <td><Button color="danger" on:click={deletelibrary(library.province_name)} >Borrar</Button></td>
            </tr>
        {/each}
    </tbody>
</Table>




<div style="text-align: center;">
    <Button color="danger" on:click={deletelibraryAll}>Borrar Datos</Button>
    <Button color="primary" on:click={loadData}>Cargar Datos</Button>
</div>

<style>

    .filtros{
        display: flex;
        justify-content: center;
    }

    .filtroAño{
        margin: 30px;
        display: flex;
        gap: 15px;
        }

    .limpiarFiltros{
        margin: 30px;
        display: flex;
        gap: 15px;
    }
    
    .filtroProvincia{
        margin: 30px;
        display: flex;
        gap: 15px;
    }
    

    
</style>
