<script>
    // @ts-nocheck

        import { onMount } from "svelte";
        import { dev } from "$app/environment";
        import { Button, Table } from 'sveltestrap';

        onMount(async () =>{
            getlibrary();
        });

        let API = "/api/v2/library";
        let mensajeUsuario = "";

        if(dev)
            API = "http://localhost:12345"+API

            
        let librarys = [];
        let newlibraryProvince_name = "Provincia";
        let newlibraryModified = "Año";
        let newlibraryIdentifier = "Identificación";
        let newlibraryLocality_id = "Localidad";
        let newlibraryPostcode = "Código postal";

        let result = "";
        let resultStatus = "";

        async function getlibrary(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "GET"
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                librarys = data;
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        }

        let insertedData = [];
        async function createlibrary(){
            resultStatus = result = "";
            const newlibrary = {
                province_name: newlibraryProvince_name,
                modified: parseInt(newlibraryModified),
                identifier: parseFloat(newlibraryIdentifier),
                locality_id: parseFloat(newlibraryLocality_id),
                postcode: parseFloat(newlibraryPostcode)
            };
    
            // Comprobar si el nuevo dato ya ha sido insertado previamente
            const existingData = insertedData.find(data => 
                data.province_name === newlibraryProvince_name && data.modified === newlibraryModified && data.identifier === newlibraryIdentifier
                    && data.locality_id === newlibraryLocality_id && data.postcode === newlibraryPostcode
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
            body: JSON.stringify(newlibrary)
            });
    
            const status = await res.status;
            resultStatus = status;
            if (status == 201) {
                getlibrary();
                mensajeUsuario = "Se ha creado el nuevo dato introducido";
                insertedData.push(newlibrary);
            } else if (status == 409) {
                mensajeUsuario = "El dato introducido ya existe";
                getlibrary();
            } else if (status == 400) {
                mensajeUsuario = "Las propiedades introducidas no tienen un formato correcto";
                getlibrary();
            } else {
                mensajeUsuario = "No se ha podido crear el dato introducido";
                getlibrary();
            }
                 
        }

        

        async function deletelibrary(libraryProvince){
            resultStatus = result = "";
            const res = await fetch(API+"/"+libraryProvince, {
                method: "DELETE"
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                getlibrary();
                mensajeUsuario = "Se ha borrado correctamente el dato seleccionado";
            }else{
                mensajeUsuario = "No se ha podido borrar el dato";
            }
        }

        async function deletelibraryAll(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "DELETE"
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200 || status == 204){
                await getlibrary();
                mensajeUsuario = "Se han borrado correctamente los datos";
            }else{
                mensajeUsuario = "No se han podido borrar los datos";
            }
        }

    </script>

    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 60px;">Datos library</h1>
    <p></p>
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
                <td><input bind:value={newlibraryProvince_name}></td>
                <td><input bind:value={newlibraryModified}></td>
                <td><input bind:value={newlibraryIdentifier}></td>
                <td><input bind:value={newlibraryLocality_id}></td>
                <td><input bind:value={newlibraryPostcode}></td>
                <td><Button color="success" on:click={createlibrary}>Crear</Button></td>
            </tr>
        
        {#each librarys as library }
          <tr>
            <td><a href="/librarys/{library.province_name}/{library.modified}">{library.province_name}</a></td>
            <td>{library.modified}</td>
            <td>{library.identifier}</td>
            <td>{library.locality_id}</td>
            <td>{library.postcode}</td>
            <td><Button color="danger"on:click={deletelibrary(library.province_name)}>Borrar</Button></td>
          </tr>
        {/each}
        </tbody>
    </Table>
    
    <div style="text-align: center;">
        <Button color="danger" on:click={deletelibraryAll}>Borrar Datos</Button>
    </div>
    
    {#if resultStatus != ""}
        <p>
            <strong>Número de datos: {librarys.length}</strong>
        </p>
        <strong>Result:</strong>
        <pre>
    {"Código de estado: "+resultStatus}
{result}
        </pre>
    {/if}