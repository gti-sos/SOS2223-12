<h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size:50px; font-weight:bold">Usos de Agroclimáticas</h1>
<div style="text-align: center; font-family:'Times New Roman', Times, serif; font-weight: bold;">
    <a style="text-decoration:none" href="https://sos2223-13.appspot.com/evolution">Uso 1: Datos Evolución</a><br>
    <a style="text-decoration:none;" href="https://sos2223-12.appspot.com/agroclimatic">Uso 2: Datos Mia</a>
</div>
<hr style="text-align: right; margin-left: 100px; margin-right: 100px;">
<script>
    // @ts-nocheck
    
        import { onMount } from "svelte";
        import { dev } from "$app/environment";
        import { Button, Table, ButtonToolbar } from "sveltestrap";
        import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';
        onMount(async () => {
            getEvolution();
        });
        
        let API = 'https://sos2223-13.appspot.com/api/v2/evolution';
        let mensajeUsuario = "";
        
        /*if(dev)
            API = 'http://localhost:12345'+API
         */   
        let evolutions = [];
        let newEvolutionPeriod = '';
        let newEvolutionTerritory = '';
        let newEvolutionTotalPopulation = '';
        let newEvolutionMan = '';
        let newEvolutionWoman = '';
        let newEvolutionUndersixteenyears = '';
        let newEvolutionSixteensixtyfouryears = '';
        let newEvolutionSixtyfiveoveryears = '';
    
        let result;
        let resultStatus;
        let filtro = "";
        let from = "";
        let to = "";
        let territory = "";
        let period = "";
        let total_population_under = "";
        let total_population_over = "";
        let man_under = "";
        let man_over = "";
        let woman_under = "";
        let woman_over = "";
        let under_sixteen_years_under = "";
        let under_sixteen_years_over = "";
        let from_sixteen_to_sixty_four_years_under = "";
        let from_sixteen_to_sixty_four_years_over = "";
        let sixty_five_and_over_under = "";
        let sixty_five_and_over_over = "";
        let showModal = false;
        async function loadData() {
            resultStatus = result = "";
            const res = await fetch(API+'/loadInitialData', {
                method: 'GET'
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                mensajeUsuario = "Se han insertado los datos de nuevo";
                setTimeout(() => {mensajeUsuario = '';}, 3000);
                getEvolution();
            }else{
                mensajeUsuario = "No se han podido insertar los datos de nuevo";
                setTimeout(() => {mensajeUsuario = '';}, 3000);
            }
        }
    
        async function getEvolution(){
            resultStatus = result = "";
            const res = await fetch(API+"?offset=-1&limit=10", {
            method: "GET"
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                evolutions = data;
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        }
        async function getPaginacion(offsetFiltro,limitFiltro){ //
            resultStatus = result = "";
            const res = await fetch(API+"?offset="+offsetFiltro+"&limit="+limitFiltro, {
                method: "GET"
            });
            console.log(API+"?offset="+offsetFiltro+"&limit="+limitFiltro);
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                evolutions = data;
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        }
        let insertedData = [];
        async function createEvolution (){
            resultStatus = result = "";
            const newEvolution = {
                period: parseInt(newEvolutionPeriod),
                territory: newEvolutionTerritory,
                total_population: parseInt(newEvolutionTotalPopulation),
                man: parseInt(newEvolutionMan),
                woman: parseInt(newEvolutionWoman),
                under_sixteen_years: parseInt(newEvolutionUndersixteenyears),
                from_sixteen_to_sixty_four_years: parseInt(newEvolutionSixteensixtyfouryears),
                sixty_five_and_over: parseInt(newEvolutionSixtyfiveoveryears)
            };
            // Comprobar si el nuevo dato ya ha sido insertado previamente
            const existingData = insertedData.find(data => 
                data.period === newEvolutionPeriod && data.territory === newEvolutionTerritory && data.total_population === newEvolutionTotalPopulation
                    && data.man === newEvolutionMan && data.woman === newEvolutionWoman && data.under_sixteen_years === newEvolutionUndersixteenyears && 
                    data.from_sixteen_to_sixty_four_years === newEvolutionSixteensixtyfouryears && data.sixty_five_and_over === newEvolutionSixtyfiveoveryears
            );
            if (existingData) {
                mensajeUsuario = "Ya existe ese dato";
                setTimeout(() => {mensajeUsuario = '';}, 3000);
                return;
            }
            const res = await fetch(API, {
                method: 'POST',
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(
                    newEvolution
                )     
            });
            const status = await res.status;
            resultStatus = status;
            if (status == 201) {
                getEvolution();
                mensajeUsuario = "Se ha creado el nuevo dato introducido";
                setTimeout(() => {mensajeUsuario = '';}, 3000);
                insertedData.push(newEvolution);
            } else if (status == 409) {
                mensajeUsuario = "El dato introducido ya existe";
                setTimeout(() => {mensajeUsuario = '';}, 3000);
            } else if (status == 400) {
                mensajeUsuario = "Las propiedades introducidas no tienen un formato correcto";
                setTimeout(() => {mensajeUsuario = '';}, 3000);
            } else {
                mensajeUsuario = "No se ha podido crear el dato introducido";
                setTimeout(() => {mensajeUsuario = '';}, 3000);
            }
        }   
        async function deleteEvolution(evolutionTerritory,evolutionPeriod){
            resultStatus = result = "";
            const res = await fetch(API+"/"+evolutionTerritory+"/"+evolutionPeriod, {
                method: "DELETE"
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                getEvolution();
                mensajeUsuario = "Recurso borrado";
                setTimeout(() => {mensajeUsuario = '';}, 3000);
            }else if(status==500){
                mensajeUsuario = "Error cliente";
                setTimeout(() => {mensajeUsuario = '';}, 3000);
            }else if(status==404){
                mensajeUsuario = "No se ha encontrado ese recurso";
                setTimeout(() => {mensajeUsuario = '';}, 3000);
            }
        }
        async function deleteEvolutionAll(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "DELETE"
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200 || status == 204){
                await getEvolution();
                mensajeUsuario = "Se han borrado correctamente los datos";
                setTimeout(() => {mensajeUsuario = '';}, 3000);
            }else{
                mensajeUsuario = "No se han podido borrar los datos";
                setTimeout(() => {mensajeUsuario = '';}, 3000);
            }
        }
        async function getEvolutionFiltrado(){
            const consulta = {}; // crea un objeto vacío para los otros campo
            if (territory) { // comprueba si Territorio tiene un valor
                consulta.territory = territory; // agrega la propiedad territory al objeto consulta
            }
            if (period) { // comprueba si Territorio tiene un valor
                consulta.period = period; // agrega la propiedad territory al objeto consulta
            }
            if (from) { // comprueba si Territorio tiene un valor
                consulta.from = from; // agrega la propiedad territory al objeto consulta
            }
            if (to) { // comprueba si Territorio tiene un valor
                consulta.to = to; // agrega la propiedad territory al objeto consulta
            }
            if (total_population_over) { // comprueba si Territorio tiene un valor
                consulta.total_population_over = total_population_over; // agrega la propiedad territory al objeto consulta
            }
            if (total_population_under) { // comprueba si Territorio tiene un valor
                consulta.total_population_under = total_population_under; // agrega la propiedad territory al objeto consulta
            }
            if (man_over) { // comprueba si Territorio tiene un valor
                consulta.man_over = man_over; // agrega la propiedad territory al objeto consulta
            }
            if (man_under) { // comprueba si Territorio tiene un valor
                consulta.man_under = man_under; // agrega la propiedad territory al objeto consulta
            }
            if (woman_over) { // comprueba si Territorio tiene un valor
                consulta.woman_over = woman_over; // agrega la propiedad territory al objeto consulta
            }
            if (woman_under) { // comprueba si Territorio tiene un valor
                consulta.woman_under = woman_under; // agrega la propiedad territory al objeto consulta
            }
            if (under_sixteen_years_under) { // comprueba si Territorio tiene un valor
                consulta.under_sixteen_years_under = under_sixteen_years_under; // agrega la propiedad territory al objeto consulta
            }
            if (under_sixteen_years_over) { // comprueba si Territorio tiene un valor
                consulta.under_sixteen_years_over = under_sixteen_years_over; // agrega la propiedad territory al objeto consulta
            }
            if (from_sixteen_to_sixty_four_years_under) { // comprueba si Territorio tiene un valor
                consulta.from_sixteen_to_sixty_four_years_under = from_sixteen_to_sixty_four_years_under; // agrega la propiedad territory al objeto consulta
            }
            if (from_sixteen_to_sixty_four_years_over) { // comprueba si Territorio tiene un valor
                consulta.from_sixteen_to_sixty_four_years_over = from_sixteen_to_sixty_four_years_over; // agrega la propiedad territory al objeto consulta
            }
            if (sixty_five_and_over_under) { // comprueba si Territorio tiene un valor
                consulta.sixty_five_and_over_under = sixty_five_and_over_under; // agrega la propiedad territory al objeto consulta
            }
            if (sixty_five_and_over_over) { // comprueba si Territorio tiene un valor
                consulta.sixty_five_and_over_over = sixty_five_and_over_over; // agrega la propiedad territory al objeto consulta
            }
            //Realiza la solicitud GET al endpoint /api/v2/evolution con la consulta creada
            
            const res = await fetch(API+`?${new URLSearchParams(consulta).toString()}`, {
                method: "GET"
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                evolutions = data;
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                mensajeUsuario = "Ahí llevas los datos";
                setTimeout(() => {mensajeUsuario = '';}, 3000);
            }else{
                mensajeUsuario = "No se han podido encontrar los datos: ";
                setTimeout(() => {mensajeUsuario = '';}, 3000);
            }
        }
    
</script>
    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 45px;">Datos Evolución</h1>
    <h1 class="botones">
        <div style="text-align: center; word-spacing: 15px;">
            <Button color="success" on:click={loadData}>Cargar Datos Iniciales</Button>
            <Button color="danger" on:click={deleteEvolutionAll}>Borrar Datos</Button>
        </div>
    </h1>
    {#if mensajeUsuario != ""}
  <h2 style="color: red; text-align: center; font-family: Arial, Helvetica, sans-serif">{mensajeUsuario} </h2>
{/if}
    <br>
    <div style="text-align: center;">
    <label>
        Desde:
        <input bind:value={from} type="text" />
      </label>
      
      <label>
        Hasta:
        <input bind:value={to} type="text" />
    </label>
    <label>
        Territorio:
        <input bind:value={territory} type="text" />
      </label>
      
      <label>
        Periodo:
        <input bind:value={period} type="text" />
    </label>
    <label>
        Población Total menor o igual que:
        <input bind:value={total_population_under} type="text" />
      </label>
      
      <label>
        Población Total mayor o igual que:
        <input bind:value={total_population_over} type="text" />
    </label>
    <label>
        Hombres menor o igual que:
        <input bind:value={man_under} type="text" />
      </label>
      
      <label>
        Hombres mayor o igual que:
        <input bind:value={man_over} type="text" />
    </label>
    <label>
        Mujeres menores o iguales que:
        <input bind:value={woman_under} type="text" />
      </label>
      
      <label>
        Mujeres mayores o iguales que:
        <input bind:value={woman_over} type="text" />
    </label>
    <label>
        Menor o igual para 16 años:
        <input bind:value={under_sixteen_years_under} type="text" />
      </label>
      
      <label>
        Mayor o igual para 16 años:
        <input bind:value={under_sixteen_years_over} type="text" />
    </label>
    <label>
        Menor o igual para entre 16 años y 64 años:
        <input bind:value={from_sixteen_to_sixty_four_years_under} type="text" />
      </label>
      
      <label>
        Mayor o igual para entre 16 años y 64 años:
        <input bind:value={from_sixteen_to_sixty_four_years_over} type="text" />
    </label>
    <label>
        Menor o igual para a partir de 65 años:
        <input bind:value={sixty_five_and_over_under} type="text" />
      </label>
      
      <label>
        Mayor o igual para a partir de 65 años:
        <input bind:value={sixty_five_and_over_over} type="text" />
    </label>
    <Button color = "primary" on:click={getEvolutionFiltrado}>Filtrar</Button>
    
    <br><strong style="margin: 10px;">Número de datos: {evolutions.length}</strong>
    </div>
    <p></p>
    <br>
    <Table striped>
        <thead>
          <tr>
            <th>Periodo</th>
            <th>Territorio</th>
            <th>Total Población</th>
            <th>Hombres</th>
            <th>Mujeres</th>
            <th>Menores 16 años</th>
            <th>De 16 a 64 años</th>
            <th>A partir de 65 años</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
            <td><input placeholder="Periodo"bind:value={newEvolutionPeriod}></td>
            <td><input placeholder="Territorio"bind:value={newEvolutionTerritory}></td>
            <td><input placeholder="Población Total"bind:value={newEvolutionTotalPopulation}></td>
            <td><input placeholder="Hombres"bind:value={newEvolutionMan}></td>
            <td><input placeholder="Mujeres"bind:value={newEvolutionWoman}></td>
            <td><input placeholder="Menor que 16 años"bind:value={newEvolutionUndersixteenyears}></td>
            <td><input placeholder="Desde 16 a 64 años"bind:value={newEvolutionSixteensixtyfouryears}></td>
            <td><input placeholder="A partir de 65 años"bind:value={newEvolutionSixtyfiveoveryears}></td>
            <td><Button color="success" on:click={createEvolution}>Crear</Button></td>
           

        {#each evolutions as evolution}
          <tr>
            <td>{evolution.period}</td>
            <td>{evolution.territory}</td>
            <td>{evolution.total_population}</td>
            <td>{evolution.man}</td>
            <td>{evolution.woman}</td>
            <td>{evolution.under_sixteen_years}</td>
            <td>{evolution.from_sixteen_to_sixty_four_years}</td>
            <td>{evolution.sixty_five_and_over}</td>
            <td><Button><a href='/evolution/{evolution.territory}/{evolution.period}'>Editar</a></Button></td>
            <td><Button color="danger"on:click={deleteEvolution(evolution.territory,evolution.period)}>Borrar</Button></td>
           
          </tr>
        {/each}
          
        </tbody>
    </Table>

    <Pagination style="text-align: center; display: flex; justify-content: center; flex-direction: row;" ariaLabel="Page navigation example">
        <PaginationItem>
          <PaginationLink on:click={() => getPaginacion(-1,10)} first/>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink on:click={() => getPaginacion(-1,10)}>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink on:click={() => getPaginacion(9,10)}>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink on:click={() => getPaginacion(19,10)}>3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink on:click={() => getPaginacion(19,10)} last/>
        </PaginationItem>
      </Pagination>

<style>
  label {
    font-weight: bold;
  }
  input {
    width: 150px;
    padding: 0.1rem;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
    font-size: 1rem;
    margin-top: 0.5rem;
  }
</style>
