<h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size:50px; font-weight:bold">Usos de Agroclimáticas</h1>
<div style="text-align: center; font-family:'Times New Roman', Times, serif; font-weight: bold; font-size:20px; color:blue">
    Uso 1: Datos Alpha Vantage.
    <br>
    Uso 2: Datos Búsqueda avanzada de películas.
</div>
<hr style="text-align: right; margin-left: 100px; margin-right: 100px;">
<script>
    //@ts-nocheck
    import { Table } from "sveltestrap";
    import { onMount } from "svelte";

    let datos = [];
    let result = "";
    let resultStatus= "";

    onMount(async () => {
        getDatos();
    });

    const url = 'https://alpha-vantage.p.rapidapi.com/query?keywords=microsoft&function=SYMBOL_SEARCH&datatype=json';
    const options = {
	method: 'GET',
	headers: {
		'content-type': 'application/octet-stream',
		'X-RapidAPI-Key': '7223db1b48msha3db69e3246b3bdp105d91jsn649e6b1c08cc',
		'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
	    }
    };
   
    async function getDatos(){
            resultStatus = result = "";
            const res = await fetch(url, options)//rest.then(res =>fetch(res.url, options));//fetch(rest,{
            //method: "GET"
            //});
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                datos = data.bestMatches;
                
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
    }
    
</script>

<main>
    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 45px; text-decoration:underline;">Datos: Alpha Vantaje</h1>
    <br>
    <div style="text-align:center;">
        <strong >Número de datos: {datos.length}</strong>
    </div>
    <br>
    <Table striped style="text-align: center;">
        <thead>
          <tr style="font-weight: bold; text-decoration:underline">
            <th>Símbolo</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Región</th>
            <th>Apertura</th>
            <th>Cierre</th>
            <th>Zona Horaria</th>
            <th>Moneda</th>
            <th>Resultado</th>
          </tr>
        </thead>
        <tbody>
           

        {#each datos as dato}
          <tr>
            <td>{dato["1. symbol"]}</td>
            <td>{dato["2. name"]}</td>
            <td>{dato["3. type"]}</td>
            <td>{dato["4. region"]}</td>
            <td>{dato["5. marketOpen"]}</td>
            <td>{dato["6. marketClose"]}</td>
            <td>{dato["7. timezone"]}</td>
            <td>{dato["8. currency"]}</td>
            <td>{dato["9. matchScore"]}</td>
           
          </tr>
        {/each}
          
        </tbody>
    </Table>

    <p style="text-align:center">
        Datos del mercado financiero sobre acciones, divisas (FX) y criptomonedas/monedas digitales.
    </p>
</main>