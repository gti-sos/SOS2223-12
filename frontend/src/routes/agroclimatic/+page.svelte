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
        let mensajePaginacion = "";

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

        let añoInicio = "";
        let añoFinal = "";
        let filtroProvincia = "";
        let offsetFiltro = "";
        let limitFiltro = "";

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
            }else{
                mensajeUsuario = "No se han podido insertar los datos de nuevo";
            }
        }

        async function getAgroclimatic(){
            resultStatus = result = "";
            const res = await fetch(API, {
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

        async function getAgroclimaticFiltroAño(){
            resultStatus = result = "";
            if(añoFinal < añoInicio){
                mensajeUsuario = "El año final no puede ser menor que el año de inicio";
                return;
            }else if(isNaN(añoInicio) || isNaN(añoFinal)){
                mensajeUsuario = "El año de inicio y el año final no pueden ser letras";
                return;
            }else if(añoInicio == "" || añoFinal == ""){
                mensajeUsuario = "El año de inicio y el año final no pueden estar vacios";
                return;
            }else if(agroclimatics.length == 0){
                mensajeUsuario = "No hay datos para mostrar";
                return;
            }else if(añoInicio <= añoFinal){
                mensajeUsuario = "Se muestran los datos correspondientes al filtro";
            }
            const res = await fetch(API+"?from="+añoInicio+"&to="+añoFinal, {
                method: "GET"
            });
            console.log(API+"?from="+añoInicio+"&to="+añoFinal);
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

        async function getAgroclimaticFiltroProvincia(){
            resultStatus = result = "";
            if(filtroProvincia == ""){
                mensajeUsuario = "La provincia no puede estar vacia";
                return;
            }else if(!isNaN(filtroProvincia)){
                mensajeUsuario = "La provincia no puede ser un número";
                return;
            }else if(agroclimatics.length == 0){
                mensajeUsuario = "No hay datos para mostrar";
                return;
            }else if(filtroProvincia){
                mensajeUsuario = "Se muestran los datos correspondientes al filtro";
            }
            const res = await fetch(API+"?province="+filtroProvincia, {
                method: "GET"
            });
            console.log(API+"?province="+filtroProvincia);
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

        async function getPaginacion(){
            resultStatus = result = "";
            if(offsetFiltro == "" || limitFiltro == ""){
                mensajePaginacion = "Los parámetros no pueden estar vacios";
                return;
            }else if(isNaN(offsetFiltro) || isNaN(limitFiltro)){
                mensajePaginacion = "Los parámetros no pueden ser letras";
                return;
            }else if(limitFiltro <= 0){
                mensajePaginacion = "El límite debe ser superior a 0";
                return;
            }else{
                mensajePaginacion = "Se muestran los datos correspondientes al filtro";
            }
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
            } else if (status == 409) {
                mensajeUsuario = "El dato introducido ya existe";
                
            } else if (status == 400) {
                mensajeUsuario = "Las propiedades introducidas no tienen un formato correcto";
                
            } else {
                mensajeUsuario = "No se ha podido crear el dato introducido";

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
            }else{
                mensajeUsuario = "No se ha podido borrar el dato";
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
            }else{
                mensajeUsuario = "No se han podido borrar los datos";
            }
        }

    </script>

    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 60px;">Datos Agroclimáticas</h1>
    <p></p>
    {#if mensajeUsuario !=""}
    <h2 style="color: red; text-align: center; font-family:Arial, Helvetica, sans-serif">{mensajeUsuario}</h2>
    {/if}

    <div style="text-align: center; display: flex; justify-content: center; flex-direction: row; gap: 15px;">
        <td><input placeholder="Año de Inicio" bind:value={añoInicio}></td>
        <td><input placeholder="Año Final" bind:value={añoFinal}></td>
        <td><Button color="primary" on:click={getAgroclimaticFiltroAño}>Filtra por Año</Button></td>
        <p></p>
        <p></p>
        <p></p>
        <td><input placeholder="Provincia" bind:value={filtroProvincia}></td>
        <td><Button color="primary" on:click={getAgroclimaticFiltroProvincia}>Filtra por Provincia</Button></td>
    </div>
    <strong style="margin: 10px;">Número de datos: {agroclimatics.length}</strong>

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
    
    <!--<Pagination style="text-align: center; display: flex; justify-content: center; flex-direction: row; gap: 15px;" ariaLabel="Page navigation example">
        <PaginationItem disabled>
          <PaginationLink previous href="#" />
        </PaginationItem>
        <PaginationItem active>
          <PaginationLink href={getPaginacion}>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">5</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink next href="#" />
        </PaginationItem>
    </Pagination>-->
    <hr style="text-align: right; margin-left: 100px; margin-right: 100px;">

    {#if mensajePaginacion !=""}
    <h2 style="color: red; text-align: center; font-family:Arial, Helvetica, sans-serif">{mensajePaginacion}</h2>
    {/if}
    <p></p>
    <div style="text-align: center; display: flex; justify-content: center; flex-direction: row; gap: 15px;">
        <td><input placeholder="A partir de: " bind:value={offsetFiltro}></td>
        <td><input placeholder="Límite" bind:value={limitFiltro}></td>
        <td><Button style="center" color="primary" on:click={getPaginacion}>Paginación</Button></td>
    </div>
    <p></p>
    <div style="text-align: center;">
        <Button color="danger" on:click={deleteAgroclimaticAll}>Borrar Datos</Button>
        <Button color="success" on:click={loadData}>Cargar Datos</Button>
    </div>
    
    