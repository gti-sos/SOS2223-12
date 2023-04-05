<script>
    // @ts-nocheck

        import { onMount } from "svelte";
        import { dev } from "$app/environment";
        import { Button, Table } from 'sveltestrap';

        onMount(async () =>{
            getAgroclimatic();
        });

        let API = "/api/v1/agroclimatic";
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

        async function createAgroclimatic(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    province: newAgroclimaticProvince,
                    year: newAgroclimaticYear,
                    maximun_temperature: newAgroclimaticMaximunTemperature,
                    minimun_temperature: newAgroclimaticMinimunTemperature,
                    medium_temperature: newAgroclimaticMediumTemperature
                })
            });
            const status = await res.status;
            resultStatus = status;
            if(status==201){
                getAgroclimatic();
                mensajeUsuario = "Se ha creado el nuevo dato introducido";
            }else if(status==409){
                mensajeUsuario = "El dato introducido ya existe";
                getAgroclimatic();
                // Poner aqui el 400
            }else if(newAgroclimaticProvince == "" || newAgroclimaticYear == "" || newAgroclimaticMaximunTemperature == "" || 
                newAgroclimaticMinimunTemperature == "" || newAgroclimaticMediumTemperature == ""){
                mensajeUsuario = "Faltan propiedades por poner al nuevo dato";
                //getAgroclimatic();
            }else{
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

    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 60px;">Datos Agroclimatic</h1>
    <p></p>
    {#if mensajeUsuario !=""}
    <h2 style="color: red; text-align: center; font-family:Arial, Helvetica, sans-serif">{mensajeUsuario}</h2>
    {/if}

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
                <td><Button id="createAgroclimatic" color="success" on:click={createAgroclimatic}>Crear</Button></td>
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
    </div>
    
    {#if resultStatus != ""}
        <p>
            <strong>Número de datos: {agroclimatics.length}</strong>
        </p>
        <strong>Result:</strong>
        <pre>
    {"Código de estado: "+resultStatus}
{result}
        </pre>
    {/if}