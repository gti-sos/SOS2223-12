<script>
    // @ts-nocheck

        import { onMount } from "svelte";
        import { dev } from "$app/environment";
        import { Button, Table } from 'sveltestrap';
        import { page } from "$app/stores";

        onMount(async () =>{
            getPollution_dato();
        });

        let mensajeUsuario = "";
        let province = $page.params.province;
        let year = $page.params.year;
        let API = "/api/v2/pollutions/"+province+ "/" +year;

        if(dev)
            API = "http://localhost:12345"+API

    
        let updatePollutionProvince = province;
        let updatePollutionYear = year; 
        let updatePollutionNO2 = "NO2";
        let updatePollutionO3 = "O3";
        let updatePollutionSO2 = "SO2";

        let result = "";
        let resultStatus = "";

        async function getPollution_dato(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "GET"
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                updatePollutionProvince = data.province;
                updatePollutionYear = data.year;
                updatePollutionNO2 = data.NO2;
                updatePollutionO3 = data.O3;
                updatePollutionSO2 = data.SO2;
                
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            
            const status = await res.status;
            resultStatus = status;
            if(status==404){
                mensajeUsuario = `La ruta solicitada "${province}/${year}" no existe`;
            }
        }

        async function updatePollution(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "PUT",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    province: updatePollutionProvince,
                    year: updatePollutionYear,
                    NO2: updatePollutionNO2,
                    O3: updatePollutionO3,
                    SO2: updatePollutionSO2
                })
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                getPollution_dato();
                mensajeUsuario = "Se ha actualizado el dato";
            }else if(status==400){ 
                mensajeUsuario = "Los datos introducidos no son válidos";
            }else{
                mensajeUsuario = "No se ha podido actualizar el dato";
            }       
        }

    </script>

    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 60px;">Contaminaciones Cambios</h1>
      
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
                <td>{updatePollutionProvince}</td>
                <td>{updatePollutionYear}</td>
                <td><input bind:value={updatePollutionNO2}></td>
                <td><input bind:value={updatePollutionO3}></td>
                <td><input bind:value={updatePollutionSO2}></td>
                <td><Button color="primary" on:click={updatePollution}>Actualizar</Button></td>
            </tr>
        </tbody>
    </Table>
    
    