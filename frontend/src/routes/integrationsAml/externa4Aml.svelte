<script>
    //@ts-nocheck
    import { Table } from "sveltestrap";
    import { onMount } from "svelte";
    const delay = ms => new Promise(res => setTimeout(res, ms));


    let datos4 = [];

    let nombre = [];
    let localID = [];
    let tipo = [];
    let suggesLocalID = [];
    let subTipo = [];

    let result = "";
    let resultStatus = "";

    onMount(async () => {
        getDatos4();
    });

    const url = 'https://idealista2.p.rapidapi.com/auto-complete?prefix=rome&country=it';
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '7223db1b48msha3db69e3246b3bdp105d91jsn649e6b1c08cc',
		'X-RapidAPI-Host': 'idealista2.p.rapidapi.com'
	}
    };

    async function getDatos4(){
        resultStatus = result = "";
            const res = await fetch(url, options)//rest.then(res =>fetch(res.url, options));//fetch(rest,{
            //method: "GET"
            //});
        if(res.ok){   
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                datos4 = data.locations;
                datos4.forEach(element => {
                    nombre.push(element['name']);
                    localID.push(element['locationId']);
                    tipo.push(element['type']);
                    suggesLocalID.push(element['suggestedLocationId']);
                    subTipo.push(element['subTypeText']);
                });
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        }else{
            console.log("Error al devolver la gráfica");
        } 
        await delay(500);
    }

</script>


<main>
    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 45px; text-decoration:underline;">Datos: Idealista</h1>
    <br>
    <div style="text-align:center;">
        <strong >Número de datos: {datos4.length}</strong>
    </div>
    <br>
    <Table striped style="text-align: center;">
        <thead>
          <tr style="font-weight: bold; text-decoration:underline">
            <th>Nombre</th>
            <th>ID Localización</th>
            <th>Tipo</th>
            <th>ID Ubicación sugerida</th>
            <th>Tipo Texto</th>
          </tr>
        </thead>
        <tbody>
           

        {#each datos4 as d}
          <tr>
            <td>{d["name"]}</td>
            <td>{d["locationId"]}</td>
            <td>{d["type"]}</td>
            <td>{d["suggestedLocationId"]}</td>
            <td>{d["subTypeText"]}</td>
           
          </tr>
        {/each}
          
        </tbody>
    </Table>

    <p style="text-align:center">
        Consulta de propiedades en alquiler y venta en España, Italia, Portugal.
    </p>
    <br>
</main>