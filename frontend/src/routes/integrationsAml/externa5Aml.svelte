<script>
    //@ts-nocheck
    import { Table } from "sveltestrap";
    import { onMount } from "svelte";
    const delay = ms => new Promise(res => setTimeout(res, ms));


    let datos5 = [];

    let hecho = [];
    let numeros = [];

    let result = "";
    let resultStatus = "";

    onMount(async () => {
        getDatos5();
    });

    const url = 'https://carbonsutra1.p.rapidapi.com/vehicle_makes';
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '7223db1b48msha3db69e3246b3bdp105d91jsn649e6b1c08cc',
		'X-RapidAPI-Host': 'carbonsutra1.p.rapidapi.com'
	}
    };

    async function getDatos5(){
        resultStatus = result = "";
            const res = await fetch(url, options)//rest.then(res =>fetch(res.url, options));//fetch(rest,{
            //method: "GET"
            //});
        if(res.ok){   
            try{
                const dat = await res.json();
                result = JSON.stringify(dat, null, 2);
                datos5 = dat.data;
                datos5.forEach(element => {
                    hecho.push(element['make']);
                    numeros.push(element['number_of_models']);
                    
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
    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 45px; text-decoration:underline;">Datos: CarbonoSutra</h1>
    <br>
    <div style="text-align:center;">
        <strong >Número de datos: {datos5.length}</strong>
    </div>
    <br>
    <Table striped hover style="text-align: center;">
        <thead>
          <tr style="font-weight: bold; text-decoration:underline">
            <th>Hecho por:</th>
            <th>Número de Modelos</th>
          </tr>
        </thead>
        <tbody>
           

        {#each datos5 as d}
          <tr>
            <td>{d["make"]}</td>
            <td>{d["number_of_models"]}</td>
          </tr>
        {/each}
          
        </tbody>
    </Table>

    <p style="text-align:center">
        Vechículos fabricados por empresas y número de ellos.
    </p>
    <br>
</main>