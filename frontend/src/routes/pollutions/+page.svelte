<script>
    // @ts-nocheck

        import { onMount } from "svelte";
        import { dev } from "$app/environment";
        import { Button, Table } from 'sveltestrap';

        onMount(async () =>{
            getPollution();
        });

        let API = "/api/v2/pollutions";
        let mensajeUsuario = "";

        if(dev)
            API = "http://localhost:12345"+API

            
        let pollutions = [];
        let newPollutionProvince = "Provincia";
        let newPollutionYear = "Año";
        let newPollutionNO2 = "NO2";
        let newPollutionO3 = "O3";
        let newPollutionSO2 = "SO2";

        let result = "";
        let resultStatus = "";

        async function getPollution(){
            resultStatus = result = "";
            const res = await fetch(API, {
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
    
            // Comprobar si el nuevo dato ya ha sido insertado previamente
            const existingData = insertedData.find(data => 
                data.province === newPollutionProvince && data.year === newPollutionYear && data.NO2 === newPollutionNO2
                    && data.O3 === newPollutionO3 && data.SO2 === newPollutionSO2
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
            body: JSON.stringify(newPollution)
            });
    
            const status = await res.status;
            resultStatus = status;
            if (status == 201) {
                getPollution();
                mensajeUsuario = "Se ha creado el nuevo dato introducido";
                insertedData.push(newPollution);
            } else if (status == 409) {
                mensajeUsuario = "El dato introducido ya existe";
                getPollution();
            } else if (status == 400) {
                mensajeUsuario = "Las propiedades introducidas no tienen un formato correcto";
                getPollution();
            } else {
                mensajeUsuario = "No se ha podido crear el dato introducido";
                getPollution();
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
            }else{
                mensajeUsuario = "No se ha podido borrar el dato";
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
            }else{
                mensajeUsuario = "No se han podido borrar los datos";
            }
        }

    </script>

    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 60px;">Datos Contaminaciones</h1>
    <p></p>
    {#if mensajeUsuario !=""}
    <h2 style="color: red; text-align: center; font-family:Arial, Helvetica, sans-serif">{mensajeUsuario}</h2>
    {/if}

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
                <td><input bind:value={newPollutionProvince}></td>
                <td><input bind:value={newPollutionYear}></td>
                <td><input bind:value={newPollutionNO2}></td>
                <td><input bind:value={newPollutionO3}></td>
                <td><input bind:value={newPollutionSO2}></td>
                <td><Button color="success" on:click={createPollution}>Crear</Button></td>
            </tr>
        
        {#each pollutions as pollution }
          <tr>
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
    
    <div style="text-align: center;">
        <Button color="danger" on:click={deletePollutionAll}>Borrar Datos</Button>
    </div>
    
    