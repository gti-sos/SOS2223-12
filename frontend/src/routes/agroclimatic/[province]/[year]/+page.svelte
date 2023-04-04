<script>
    // @ts-nocheck

        import { onMount } from "svelte";
        import { dev } from "$app/environment";
        import { Button, Table } from 'sveltestrap';
        import { page } from "$app/stores";

        onMount(async () =>{
            getAgroclimatic_dato();
        });

        let mensajeUsuario = "";
        let province = $page.params.province;
        let year = $page.params.year;
        let API = "/api/v1/agroclimatic/"+province+ "/" +year;

        if(dev)
            API = "http://localhost:12345"+API

    
        let updateAgroclimaticProvince = province;
        let updateAgroclimaticYear = year;
        let updateAgroclimaticMaximunTemperature = "";
        let updateAgroclimaticMinimunTemperature = "";
        let updateAgroclimaticMediumTemperature = "";

        let result = "";
        let resultStatus = "";

        async function getAgroclimatic_dato(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "GET"
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                updateAgroclimaticProvince = data.province;
                updateAgroclimaticYear = data.year;
                updateAgroclimaticMaximunTemperature = data.maximun_temperature;
                updateAgroclimaticMinimunTemperature = data.minimun_temperature;
                updateAgroclimaticMediumTemperature = data.medium_temperature;
                
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            
            const status = await res.status;
            resultStatus = status;
            if(status==404){
                mensajeUsuario = `La ruta solicitada "${province}/${year}" no existe`;
            }
        }

        async function updateAgroclimatic(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "PUT",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    province: updateAgroclimaticProvince,
                    year: updateAgroclimaticYear,
                    maximun_temperature: updateAgroclimaticMaximunTemperature,
                    minimun_temperature: updateAgroclimaticMinimunTemperature,
                    medium_temperature: updateAgroclimaticMediumTemperature
                })
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                getAgroclimatic_dato();
                mensajeUsuario = "Se ha actualizado el dato";
            }else if(status==400){ // Verificar el 400
                mensajeUsuario = "Los datos introducidos no son válidos";
            }else{
                mensajeUsuario = "No se ha podido actualizar el dato";
            }       
        }

    </script>

    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 60px;">Agroclimatic Cambios</h1>
      
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
                <td>{updateAgroclimaticProvince}</td>
                <td>{updateAgroclimaticYear}</td>
                <td><input bind:value={updateAgroclimaticMaximunTemperature}></td>
                <td><input bind:value={updateAgroclimaticMinimunTemperature}></td>
                <td><input bind:value={updateAgroclimaticMediumTemperature}></td>
                <td><Button color="primary" on:click={updateAgroclimatic}>Actualizar</Button></td>
            </tr>
        </tbody>
    </Table>
    
    {#if resultStatus != ""}
            <strong>Result:</strong>
        <pre>
    {"Código de estado: "+resultStatus}    
{result}
        </pre>
    {/if}