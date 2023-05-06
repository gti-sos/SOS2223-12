<svelte:head>
    <title>SOS2223-12-Agroclimáticas</title>
</svelte:head>
<script>
    // @ts-nocheck

        import { onMount } from "svelte";
        import { dev } from "$app/environment";
        import { Button, Table } from 'sveltestrap';
        import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';

        onMount(async () =>{
            getAgroclimatic();
        });

        let API = "/api/v2/agroclimatic";
        let mensajeUsuario = "";

        if(dev)
            API = "http://localhost:12345"+API

            
        let agroclimatics = [];
        let newAgroclimaticProvince = "";
        let newAgroclimaticYear = "";
        let newAgroclimaticMaximunTemperature = "";
        let newAgroclimaticMinimunTemperature = "";
        let newAgroclimaticMediumTemperature = "";

        let result = "";
        let resultStatus = "";

        let from = "";
        let to = "";
        let province = "";
        let year = "";
        let temp_max_under = "";
        let temp_max_over = "";
        let temp_min_under = "";
        let temp_min_over = "";
        let temp_med_under = "";
        let temp_med_over = "";
        //let showModal = false;

        async function loadData(){
            resultStatus = result = "";
            const res = await fetch(API+'/loadInitialData', {
                method: 'GET'
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                mensajeUsuario = "Se han insertado los datos de nuevo";
                getAgroclimatic();
                setTimeout(() => {mensajeUsuario = '';}, 3000);
            }else{
                mensajeUsuario = "No se han podido insertar los datos de nuevo";
                setTimeout(() => {mensajeUsuario = '';}, 3000);
            }
        }

        async function getAgroclimatic(){
            resultStatus = result = "";
            const res = await fetch(API+"?offset=-1&limit=10", {
                method: "GET"
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                agroclimatics = data;
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        }

        async function getAgroclimaticFiltrado(){
            const consulta = {}; // crea un objeto vacío para los otros campo
            if (province) { 
                consulta.province = province; 
            }
            if (year) { 
                consulta.year = year; 
            }
            if (from) { 
                consulta.from = from; 
            }
            if (to) { 
                consulta.to = to; 
            }
            if (temp_max_under) { 
                consulta.temp_max_under = temp_max_under; 
            }
            if (temp_max_over) { 
                consulta.temp_max_over = temp_max_over; 
            }
            if (temp_min_under) { 
                consulta.temp_min_under = temp_min_under; 
            }
            if (temp_min_over) { 
                consulta.temp_min_over = temp_min_over; 
            }
            if (temp_med_under) { 
                consulta.temp_med_under = temp_med_under; 
            }
            if (temp_med_over) { 
                consulta.temp_med_over = temp_med_over; 
            }
            console.log(new URLSearchParams(consulta).toString());
            const res = await fetch(API+`?${new URLSearchParams(consulta).toString()}`, {
                method: "GET"
            });
            
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                agroclimatics = data;
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                mensajeUsuario = "Datos correspondientes al filtro";
                setTimeout(() => {mensajeUsuario = '';}, 3000);
            }else{
                mensajeUsuario = "No se han podido encontrar los datos";
                setTimeout(() => {mensajeUsuario = '';}, 3000);
            }
        }

        async function getPaginacion(offsetFiltro, limitFiltro){
            resultStatus = result = "";
            const res = await fetch(API+"?offset="+offsetFiltro+"&limit="+limitFiltro, {
                method: "GET"
            });
            console.log(API+"?offset="+offsetFiltro+"&limit="+limitFiltro);
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                agroclimatics = data;
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        }

        let insertedData = [];
        async function createAgroclimatic(){
            resultStatus = result = "";
            const newAgroclimatic = {
                province: newAgroclimaticProvince,
                year: parseInt(newAgroclimaticYear),
                maximun_temperature: parseFloat(newAgroclimaticMaximunTemperature),
                minimun_temperature: parseFloat(newAgroclimaticMinimunTemperature),
                medium_temperature: parseFloat(newAgroclimaticMediumTemperature)
            };
    
            const existingData = insertedData.find(data => 
                data.province === newAgroclimaticProvince && data.year === newAgroclimaticYear && data.maximun_temperature === newAgroclimaticMaximunTemperature
                    && data.minimun_temperature === newAgroclimaticMinimunTemperature && data.medium_temperature === newAgroclimaticMediumTemperature
            );
            if (existingData) {
                mensajeUsuario = "Ya existe ese dato";
                setTimeout(() => {mensajeUsuario = '';}, 3000);
                return;
            }
    
            const res = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newAgroclimatic)
            });
    
            const status = await res.status;
            resultStatus = status;
            if (status == 201) {
                getAgroclimatic();
                mensajeUsuario = "Se ha creado el nuevo dato introducido";
                insertedData.push(newAgroclimatic);
                setTimeout(() => {mensajeUsuario = '';}, 3000);
            } else if (status == 409) {
                mensajeUsuario = "El dato introducido ya existe";
                setTimeout(() => {mensajeUsuario = '';}, 3000);
            } else if (status == 400) {
                mensajeUsuario = "Las propiedades introducidas no tienen un formato correcto";
                setTimeout(() => {mensajeUsuario = '';}, 3000);
            } else {
                mensajeUsuario = "No se ha podido crear el dato introducido";
                setTimeout(() => {mensajeUsuario = '';}, 3000);
            }     
        }

        async function deleteAgroclimatic(agroclimaticProvince){
            resultStatus = result = "";
            const res = await fetch(API+"/"+agroclimaticProvince, {
                method: "DELETE"
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                getAgroclimatic();
                mensajeUsuario = "Se ha borrado correctamente el dato seleccionado";
                setTimeout(() => {mensajeUsuario = '';}, 3000);
            }else{
                mensajeUsuario = "No se ha podido borrar el dato";
                setTimeout(() => {mensajeUsuario = '';}, 3000);
            }
        }

        async function deleteAgroclimaticAll(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "DELETE"
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200 || status == 204){
                await getAgroclimatic();
                mensajeUsuario = "Se han borrado correctamente los datos";
                setTimeout(() => {mensajeUsuario = '';}, 3000);
            }else{
                mensajeUsuario = "No se han podido borrar los datos";
                setTimeout(() => {mensajeUsuario = '';}, 3000);
            }
        }

        async function getLimpiarFiltros(){
        resultStatus = result = "";
        if(from != "" || to != "" || province != "" || year != "" || temp_max_under != "" || temp_max_over != "" 
            || temp_min_under != "" || temp_min_over != "" || temp_med_under != "" || temp_med_over != ""){
            from = "";
            to = "";
            province = "";
            year = "";
            temp_max_under = "";
            temp_max_over = "";
            temp_min_under = "";
            temp_min_over = "";
            temp_med_under = "";
            temp_med_over = "";
        }
        getAgroclimatic();
        return;
        }

    </script>

    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 60px; font-weight:bold">Datos Agroclimáticas</h1>
    <p></p>
    {#if mensajeUsuario !=""}
    <h2 style="color: red; text-align: center; font-family:Arial, Helvetica, sans-serif">{mensajeUsuario}</h2>
    {/if}

    <div class="camposFiltros">
        <label class="columna">
            Desde el año:
            <input bind:value={from} type="text"/>
        </label>
        <label class="columna">
            Hasta el año:
            <input bind:value={to} type="text"/>
        </label>
        <label class="columna">
            Provincia:
            <input bind:value={province} type="text"/>
        </label>
        <label class="columna">
            Año:
            <input bind:value={year} type="text"/>
        </label>
    </div>

    <div class="camposFiltros">
        <label class="columna">
            Temperatura Máxima mayor o igual:
            <input bind:value={temp_max_over} type="text"/>
        </label>
        <label class="columna">
            Temperatura Máxima menor o igual:
            <input bind:value={temp_max_under} type="text"/>
        </label>
    </div>
    
    <div class="camposFiltros">
        <label class="columna">
            Temperatura Mínima mayor o igual:
            <input bind:value={temp_min_over} type="text"/>
        </label>
        <label class="columna">
            Temperatura Mínima menor o igual:
            <input bind:value={temp_min_under} type="text"/>
        </label>
    </div>
    <div class="camposFiltros">
        <label class="columna">
            Temperatura Media mayor o igual:
            <input bind:value={temp_med_over} type="text"/>
        </label>
        <label class="columna">
            Temperatura Media menor o igual:
            <input bind:value={temp_med_under} type="text"/>
        </label>
    </div>
    <p></p>
    <div style="text-align: center; word-spacing: 15px;">
        <Button color = "primary" on:click={getAgroclimaticFiltrado}>Filtrar</Button>

        <Button color="secondary" on:click={getLimpiarFiltros}>Limpiar Filtros</Button>
    </div>

    <hr style="text-align: right; margin-left: 100px; margin-right: 100px;">

    <strong style="margin-left: 10px;">Número de datos: {agroclimatics.length}</strong>

    <Table striped>
        <thead>
          <tr>
            <th style="text-decoration: underline;">Provincia:</th>
            <th style="text-decoration: underline;">Año:</th>
            <th style="text-decoration: underline;">Máxima Temperatura:</th>
            <th style="text-decoration: underline;">Mínima Temperatura:</th>
            <th style="text-decoration: underline;">Media Temperatura:</th>
            <th style="text-decoration: underline;">Acción:</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td><input placeholder="Provincia" bind:value={newAgroclimaticProvince}></td>
                <td><input placeholder="Año" bind:value={newAgroclimaticYear}></td>
                <td><input placeholder="Máxima Temperatura" bind:value={newAgroclimaticMaximunTemperature}></td>
                <td><input placeholder="Mínima Temperatura" bind:value={newAgroclimaticMinimunTemperature}></td>
                <td><input placeholder="Media Temperatura" bind:value={newAgroclimaticMediumTemperature}></td>
                <td><Button color="success" on:click={createAgroclimatic}>Crear</Button></td>
            </tr>
        
        {#each agroclimatics as agroclimatic }
          <tr>
            <td><a href="/agroclimatic/{agroclimatic.province}/{agroclimatic.year}">{agroclimatic.province}</a></td>
            <td>{agroclimatic.year}</td>
            <td>{agroclimatic.maximun_temperature}</td>
            <td>{agroclimatic.minimun_temperature}</td>
            <td>{agroclimatic.medium_temperature}</td>
            <td><Button color="danger"on:click={deleteAgroclimatic(agroclimatic.province)}>Borrar</Button></td>
          </tr>
        {/each}
        </tbody>
    </Table>
    
    <Pagination style="text-align: center; display: flex; justify-content: center; flex-direction: row; gap: 15px;" ariaLabel="Page navigation example">
        <PaginationItem>
            <PaginationLink on:click={() => getPaginacion(-1,10)} first/>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink on:click={() => getPaginacion(-1,10)}>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink on:click={() => getPaginacion(9,10)}>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink on:click={() => getPaginacion(19,10)}>3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink on:click={() => getPaginacion(19,10)} last/>
        </PaginationItem>
    </Pagination>
    
    <div style="text-align: center; word-spacing: 20px;">
        <Button color="danger" on:click={deleteAgroclimaticAll}>Borrar Datos</Button>
        <Button color="success" on:click={loadData}>Cargar Datos</Button>
    </div>
    <br>
    <div style="text-align:center">
        <Button color="primary" href="/">Volver a Inicio</Button>
    </div>

    <style>
        label{
            font-family: 'Times New Roman', Times, serif;
            font-weight: bold;
            font-size: 17px;
            margin-left: 10px;
        }
        .camposFiltros{
            display: flex;
            justify-content: center;
        }
        .columna{
            padding: 15px;
            margin: 5px;
        }
    </style>