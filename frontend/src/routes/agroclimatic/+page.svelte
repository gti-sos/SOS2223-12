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
        let newAgroclimaticProvince = "province";
        let newAgroclimaticYear = "year";
        let newAgroclimaticMaximunTemperature = "maximun_temperature";
        let newAgroclimaticMinimunTemperature = "minimun_temperature";
        let newAgroclimaticMediumTemperature = "medium_temperature";

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

    </script>

    <h1>Agroclimatic</h1>
      
    <Table>
        <thead>
          <tr>
            <th>Provincia:</th>
            <th>Año:</th>
            <th>Máxima Temperatura:</th>
            <th>Mínima Temperatura:</th>
            <th>Media Temperatura:</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td><input bind:value={newAgroclimaticProvince}></td>
                <td><input bind:value={newAgroclimaticYear}></td>
                <td><input bind:value={newAgroclimaticMaximunTemperature}></td>
                <td><input bind:value={newAgroclimaticMinimunTemperature}></td>
                <td><input bind:value={newAgroclimaticMediumTemperature}></td>
                <td><Button on:click={createAgroclimatic}>Crear</Button></td>
            </tr>

        {#each agroclimatics as agroclimatic }
          <tr>
            <td>{agroclimatic.province}</td>
            <td>{agroclimatic.year}</td>
            <td>{agroclimatic.maximun_temperature}</td>
            <td>{agroclimatic.minimun_temperature}</td>
            <td>{agroclimatic.medium_temperature}</td>
            <td><Button on:click={deleteAgroclimatic(agroclimatic.province)}>Borrar</Button></td>
          </tr>
        {/each}
        </tbody>
    </Table>
    
    {#if mensajeUsuario !=""}
        <h2 style="color: red">{mensajeUsuario}</h2>
    {/if}

    {#if resultStatus != ""}
        <p>
            Número de datos: {agroclimatics.length}
        </p>
        <p>
            Result:
        </p>
        <pre>
    {"Código de estado: "+resultStatus}
    
{result}
        </pre>
    {/if}