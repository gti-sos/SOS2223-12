<h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 45px; text-decoration:underline;">Datos USO 2</h1>

<script>
    // @ts-nocheck
    
    import { onMount } from "svelte";
        import { dev } from "$app/environment";
        import { Button, Table, ButtonToolbar } from "sveltestrap";
        import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';
        onMount(async () => {
            getApartamentos();
        });
        
        let API = 'https://sos2223-14.appspot.com/api/v2/apartment-occupancy-surveys';
        //let mensajeUsuario = "";
        
        /*if(dev)
            API = 'http://localhost:12345'+API
         */   
        let apartamentos = [];
        let result;
        let resultStatus;

        async function getApartamentos(){
            resultStatus = result = "";
            const res = await fetch(API,{//+"?offset=-1&limit=10", {
            method: "GET"
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                apartamentos = data;
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        }

</script>

<br>
<div style="text-align:center;">
    <strong >Número de datos: {apartamentos.length}</strong>
</div>
<br>
<Table dark striped style="text-align: center;">
    <thead>
      <tr style="font-weight: bold; text-decoration:underline">
        <th>Provincia</th>
        <th>Año</th>
        <th>Turistas</th>
        <th>Pernoctación</th>
        <th>Estancia Media</th>
        <!--<th>Acción</th>-->
      </tr>
    </thead>
    <tbody>
        <!--<td><input placeholder="Periodo"bind:value={newEvolutionPeriod}></td>
        <td><input placeholder="Territorio"bind:value={newEvolutionTerritory}></td>
        <td><input placeholder="Población Total"bind:value={newEvolutionTotalPopulation}></td>
        <td><input placeholder="Hombres"bind:value={newEvolutionMan}></td>
        <td><input placeholder="Mujeres"bind:value={newEvolutionWoman}></td>
        <td><input placeholder="Menor que 16 años"bind:value={newEvolutionUndersixteenyears}></td>
        <td><input placeholder="Desde 16 a 64 años"bind:value={newEvolutionSixteensixtyfouryears}></td>
        <td><input placeholder="A partir de 65 años"bind:value={newEvolutionSixtyfiveoveryears}></td>
        <td><Button color="success" on:click={createEvolution}>Crear</Button></td>-->
       

    {#each apartamentos as aparta}
      <tr>
        <td>{aparta.province}</td>
        <td>{aparta.year}</td>
        <td>{aparta.traveler}</td>
        <td>{aparta.overnight_stay}</td>
        <td>{aparta.average_stay}</td>
        <!--<td><Button><a href='/evolution/{evolution.territory}/{evolution.period}'>Editar</a></Button></td>
        <td><Button color="danger"on:click={deleteEvolution(evolution.territory,evolution.period)}>Borrar</Button></td>-->
       
      </tr>
    {/each}
      
    </tbody>
</Table>
<br>