<script>
    // @ts-nocheck

        import { onMount } from "svelte";
        import { dev } from "$app/environment";
        import { Button, Table } from 'sveltestrap';

        onMount(async () =>{
            getAgroclimatic();
        });

        let API = "/api/v2/agroclimatic";
        let mensajeUsuario = "";

        if(dev)
            API = "http://localhost:12345"+API

            
        let agroclimatics = [];
        let newAgroclimaticProvince = "Provincia";
        let newAgroclimaticYear = "Año";
        let newAgroclimaticMaximunTemperature = "Temperatura máxima";
        let newAgroclimaticMinimunTemperature = "Temperatura mínima";
        let newAgroclimaticMediumTemperature = "Temperatura media";

        let result = "";
        let resultStatus = "";

        async function loadData(){
            resultStatus = result = "";
            const res = await fetch(API+'/loadInitialData', {
                method: 'GET'
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                mensajeUsuario = "Se han insertado los datos de nuevo";
            }else{
                mensajeUsuario = "No se han podido insertar los datos de nuevo";
            }
            getAgroclimatic();
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
    
            // Comprobar si el nuevo dato ya ha sido insertado previamente
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
                getAgroclimatic();
            } else if (status == 400) {
                mensajeUsuario = "Las propiedades introducidas no tienen un formato correcto";
                getAgroclimatic();
            } else {
                mensajeUsuario = "No se ha podido crear el dato introducido";
                getAgroclimatic();
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
                <td><input bind:value={newAgroclimaticProvince}></td>
                <td><input bind:value={newAgroclimaticYear}></td>
                <td><input bind:value={newAgroclimaticMaximunTemperature}></td>
                <td><input bind:value={newAgroclimaticMinimunTemperature}></td>
                <td><input bind:value={newAgroclimaticMediumTemperature}></td>
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
    
    <div style="text-align: center;">
        <Button color="danger" on:click={deleteAgroclimaticAll}>Borrar Datos</Button>
        <Button color="primary" on:click={loadData}>Cargar Datos</Button>
    </div>
    
    