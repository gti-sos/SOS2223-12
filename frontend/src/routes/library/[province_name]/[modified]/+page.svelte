<script>
    // @ts-nocheck

        import { onMount } from "svelte";
        import { dev } from "$app/environment";
        import { Button, Table } from 'sveltestrap';
        import { page } from "$app/stores";

        onMount(async () =>{
            getlibrary_dato();
        });

        let mensajeUsuario = "";
        let province_name = $page.params.province_name;
        let modified = $page.params.modified;
        let API = "/api/v2/library/"+province_name+ "/" + modified;

        if(dev)
            API = "http://localhost:12345"+API

    
        let updatelibraryProvince_name = province_name;
        let updatelibraryModified = modified; 
        let updatelibraryIdentifier = "Identificación";
        let updatelibraryLocality_id = "Localidad";
        let updatelibraryPostcode = "Código postal";

        let result = "";
        let resultStatus = "";

        async function getlibrary_dato(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "GET"
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                updatelibraryProvince_name = data.province_name;
                updatelibraryModified = data.modified;
                updatelibraryIdentifier = data.identifier;
                updatelibraryLocality_id = data.locality_id;
                updatelibraryPostcode= data.postcode;
                
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            
            const status = await res.status;
            resultStatus = status;
            if(status==404){
                mensajeUsuario = `La ruta solicitada "${province_name}/${modified}" no existe`;
            }
        }

        async function updatelibrary(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "PUT",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    province_name: updatelibraryProvince_name,
                    modified: updatelibraryModified,
                    identifier: updatelibraryIdentifier,
                    locality_id: updatelibraryLocality_id,
                    postcode: updatelibraryPostcode
                })
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                getlibrary_dato();
                mensajeUsuario = "Se ha actualizado el dato";
            }else if(status==400){ 
                mensajeUsuario = "Los datos introducidos no son válidos";
            }else{
                mensajeUsuario = "No se ha podido actualizar el dato";
            }       
        }

    </script>

    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 60px;">library Cambios</h1>
      
    {#if mensajeUsuario !=""}
        <h2 style="color: red; text-align: center; font-family:Arial, Helvetica, sans-serif">{mensajeUsuario}</h2>
    {/if}

    <Table striped>
        <thead>
          <tr>
            <th style="text-decoration: underline;">Provincia:</th>
            <th style="text-decoration: underline;">Año:</th>
            <th style="text-decoration: underline;">Identificación:</th>
            <th style="text-decoration: underline;">Localidad:</th>
            <th style="text-decoration: underline;">Código postal:</th>
            <th style="text-decoration: underline;">Acción:</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td>{updatelibraryProvince_name}</td>
                <td>{updatelibraryModified}</td>
                <td><input bind:value={updatelibraryIdentifier}></td>
                <td><input bind:value={updatelibraryLocality_id}></td>
                <td><input bind:value={updatelibraryPostcode}></td>
                <td><Button color="primary" on:click={updatelibrary}>Actualizar</Button></td>
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