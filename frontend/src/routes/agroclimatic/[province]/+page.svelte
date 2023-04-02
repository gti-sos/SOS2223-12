<script>
    // @ts-nocheck

        import { onMount } from "svelte";
        import { dev } from "$app/environment";
        import { Button, Table } from 'sveltestrap';
        import { page } from "$app/stores";

        onMount(async () =>{
            getAgroclimatic_dato();
        });

        
        // linea 450 del index-aml (backend) poner entre los parentesis azul y morado -> [0]
        let mensajeUsuario = "";
        let province = $page.params.province;
        let API = "/api/v1/agroclimatic/"+province;

        if(dev)
            API = "http://localhost:12345"+API

    
        let updateAgroclimaticProvince = province;
        let updateAgroclimaticYear = "";
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
        }

        async function updateAgroclimatic1(){
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
            }else{
                mensajeUsuario = "No se ha podido actualizar el dato";
            }       
        }

    </script>

    <h1>Agroclimatic Details</h1>
      
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
                <td>{province}</td>
                <td><input bind:value={updateAgroclimaticYear}></td>
                <td><input bind:value={updateAgroclimaticMaximunTemperature}></td>
                <td><input bind:value={updateAgroclimaticMinimunTemperature}></td>
                <td><input bind:value={updateAgroclimaticMediumTemperature}></td>
                <td><Button on:click={updateAgroclimatic1}>Actualizar</Button></td>
            </tr>
        </tbody>
    </Table>

    {#if mensajeUsuario !=""}
        <h2 style="color: red">{mensajeUsuario}</h2>
    {/if}
    
    {#if resultStatus != ""}
        <p>
            Result:
        </p>
        <pre>
    {"Código de estado: "+resultStatus}
    
{result}
        </pre>
    {/if}