<svelte:head>
    <title>SOS2223-12-Datos-Contaminaciones</title>
</svelte:head>
<script>
    // @ts-nocheck

        import { onMount } from "svelte";
        import { dev } from "$app/environment";
        import { Button, Table } from 'sveltestrap';
        import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';


        onMount(async () =>{
            getPollution();
        });

        let API = "/api/v2/pollutions";
        let mensajeUsuario = "";

        if(dev)
            API = "http://localhost:12345"+API

            
        let pollutions = [];
        let newPollutionProvince = "";
        let newPollutionYear = "";
        let newPollutionNO2 = "";
        let newPollutionO3 = "";
        let newPollutionSO2 = "";

        let result = "";
        let resultStatus = "";

        let from = "";
        let to = "";
        let province = "";
        let year = "";
        let NO2_under = "";
        let NO2_over = "";
        let O3_under = "";
        let O3_over = "";
        let SO2_under = "";
        let SO2_over = "";

        async function loadData(){
            resultStatus = result = "";
            const res = await fetch(API+'/loadInitialData', {
                method: 'GET'
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                mensajeUsuario = "Se han insertado los datos de nuevo";
                getPollution();
                setTimeout(() => {mensajeUsuario = '';}, 3000);
            }else{
                mensajeUsuario = "No se han podido insertar los datos de nuevo";
                setTimeout(() => {mensajeUsuario = '';}, 3000);
            }
            
        }

        async function getPollution(){
            resultStatus = result = "";
            const res = await fetch(API+"?offset=-1&limit=10", {
                method: "GET"
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                pollutions = data;
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        }

        async function getPollutionFiltrado(){
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
            if (NO2_under) { 
                consulta.NO2_under = NO2_under; 
            }
            if (NO2_over) { 
                consulta.NO2_over = NO2_over; 
            }
            if (O3_under) { 
                consulta.O3_under = O3_under; 
            }
            if (O3_over) { 
                consulta.O3_over = O3_over; 
            }
            if (SO2_under) { 
                consulta.SO2_under = SO2_under; 
            }
            if (SO2_over) { 
                consulta.SO2_over = SO2_over; 
            }
            console.log(new URLSearchParams(consulta).toString());
            const res = await fetch(API+`?${new URLSearchParams(consulta).toString()}`, {
                method: "GET"
            });
            
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                pollutions = data;
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
                pollutions = data;
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        }

        let insertedData = [];
        async function createPollution(){
            resultStatus = result = "";
            const newPollution = {
                province: newPollutionProvince,
                year: parseInt(newPollutionYear),
                NO2: parseFloat(newPollutionNO2),
                O3: parseFloat(newPollutionO3),
                SO2: parseFloat(newPollutionSO2)
            };
    
            const existingData = insertedData.find(data => 
                data.province === newPollutionProvince && data.year === newPollutionYear && data.NO2 === newPollutionNO2
                    && data.O3 === newPollutionO3 && data.SO2 === newPollutionSO2
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
            body: JSON.stringify(newPollution)
            });
    
            const status = await res.status;
            resultStatus = status;
            if (status == 201) {
                getPollution();
                mensajeUsuario = "Se ha creado el nuevo dato introducido";
                insertedData.push(newPollution);
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

        

        async function deletePollution(PollutionProvince){
            resultStatus = result = "";
            const res = await fetch(API+"/"+PollutionProvince, {
                method: "DELETE"
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                getPollution();
                mensajeUsuario = "Se ha borrado correctamente el dato seleccionado";
                setTimeout(() => {mensajeUsuario = '';}, 3000);
            }else{
                mensajeUsuario = "No se ha podido borrar el dato";
                setTimeout(() => {mensajeUsuario = '';}, 3000);
            }
        }

        async function deletePollutionAll(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "DELETE"
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200 || status == 204){
                await getPollution();
                mensajeUsuario = "Se han borrado correctamente los datos";
                setTimeout(() => {mensajeUsuario = '';}, 3000);
            }else{
                mensajeUsuario = "No se han podido borrar los datos";
                setTimeout(() => {mensajeUsuario = '';}, 3000);
            }
        }

        async function getLimpiarFiltros(){
        resultStatus = result = "";
        if(from != "" || to != "" || province != "" || year != "" || NO2_under != "" || NO2_over != "" 
            || O3_under != "" || O3_over != "" || SO2_under != "" || SO2_over != ""){
            from = "";
            to = "";
            province = "";
            year = "";
            NO2_under = "";
            NO2_over = "";
            O3_under = "";
            O3_over = "";
            SO2_under = "";
            SO2_over = "";
        }
        getPollution();
        return;
        }

</script>

    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 60px;">Datos Contaminaciones</h1>
    <p></p>
    {#if mensajeUsuario !=""}
    <h2 style="color: red; text-align: center; font-family:Arial, Helvetica, sans-serif">{mensajeUsuario}</h2>
    {/if}

    <div class="camposFiltros">
        <label class="columna">
            Desde:
            <input placeholder="Año inicial" bind:value={from} type="text"/>
        </label>
        <label class="columna">
            Hasta:
            <input placeholder="Año final" bind:value={to} type="text"/>
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
            NO2 mayor que:
            <input bind:value={NO2_over} type="text"/>
        </label>
        <label class="columna">
            NO2 menor que:
            <input bind:value={NO2_under} type="text"/>
        </label>
    </div>

    <div class="camposFiltros">
        <label class="columna">
            O3 mayor que:
            <input bind:value={O3_over} type="text"/>
        </label>
        <label class="columna">
            O3 menor que: 
            <input bind:value={O3_under} type="text"/>
        </label>
    </div>

    <div class="camposFiltros">
        <label class="columna">
            SO2 mayor que:
            <input bind:value={SO2_over} type="text"/>
        </label>
        <label class="columna">
            SO2 menor que:
            <input bind:value={SO2_under} type="text"/>
        </label>
    </div>

    <p></p>
    <div style="text-align: center; word-spacing: 15px;">
        <Button color = "primary" on:click={getPollutionFiltrado}>Filtrar</Button>

        <Button color="secondary" on:click={getLimpiarFiltros}>Limpiar Filtros</Button>
    </div>

    <hr style="text-align: right; margin-left: 100px; margin-right: 100px;">


    <strong style="margin: 10px;">Número de datos: {pollutions.length}</strong>

    <Table striped>
        <thead>
          <tr>
            <th style="text-decoration: underline;">Provincia:</th>
            <th style="text-decoration: underline;">Año:</th>
            <th style="text-decoration: underline;">NO2:</th>
            <th style="text-decoration: underline;">O3:</th>
            <th style="text-decoration: underline;">SO2:</th>
            <th style="text-decoration: underline;">Acción:</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td><input placeholder="Provincia" bind:value={newPollutionProvince}></td>
                <td><input placeholder="Año" bind:value={newPollutionYear}></td>
                <td><input placeholder="NO2" bind:value={newPollutionNO2}></td>
                <td><input placeholder="O3" bind:value={newPollutionO3}></td>
                <td><input placeholder="SO2" bind:value={newPollutionSO2}></td>
                <td><Button color="success" on:click={createPollution}>Crear</Button></td>
            </tr>
        
        {#each pollutions as pollution }
          <tr class="datosPol">
            <td><a href="/pollutions/{pollution.province}/{pollution.year}">{pollution.province}</a></td>
            <td>{pollution.year}</td>
            <td>{pollution.NO2}</td>
            <td>{pollution.O3}</td>
            <td>{pollution.SO2}</td>
            <td><Button color="danger"on:click={deletePollution(pollution.province)}>Borrar</Button></td>
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
    
    <div style="text-align: center;">
        <Button color="danger" on:click={deletePollutionAll}>Borrar Datos</Button>
        <Button color="primary" on:click={loadData}>Cargar Datos</Button>
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
