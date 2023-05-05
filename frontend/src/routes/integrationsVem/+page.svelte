<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>
<script>
    // @ts-nocheck
    import {onMount} from "svelte";
    import { Button, Table } from "sveltestrap";
    const delay = ms => new Promise(res => setTimeout(res, ms));
    //import { dev } from "$app/environment"; 


    //let API = "https://sos2223-12.ew.r.appspot.com/api/v2/agroclimatic";
    let API2 = "http://localhost:12345/evolut";//"https://sos2223-12.ew.r.appspot.com/evolu";//"http://localhost:12345/evol";// Llama a /evol que esté en el backend y accede a la API de luismi

    let grafica = [];
    let grafica2 = [];
   
    let temp_max = [];
    let temp_min = [];
    let temp_med = [];

    let provincia_año2 = [];

    let total_popu = [];
    let hombres = [];
    let mujeres = [];
    let debajo16 = [];
    let entre16y64 = [];
    let mayor65 = [];

    let result = "";
    let resultStatus = "";
    let result2 = "";
    let resultStatus2 = "";

    onMount(async () =>{
        getGraph()
    });

    async function getGraph(){
        resultStatus2 = result2 = "";
            const res2 = await fetch(API2, {
            method: "GET"
                
            });
            
            if(res2.ok){
                try{
                    const valores2 = await res2.json();
                    result2 = JSON.stringify(valores2, null, 2);
                    grafica2 = valores2;
                    grafica2.sort((a, b) => (a.territory > b.territory) ? 1 : ((b.territory > a.territory) ? -1 : 0));
                    grafica2.sort((a, b) => (a.period > b.period) ? 1 : ((b.period > a.period) ? -1 : 0));
                    grafica2.forEach(grafica2 =>{
                        console.log(grafica2);
                        provincia_año2.push(grafica2.territory+"-"+grafica2.period);
                        total_popu.push(grafica2["total_population"]);
                        hombres.push(grafica2["man"]); 
                        mujeres.push(grafica2["woman"]); 
                        debajo16.push(grafica2["under_sixteen_years"]); 
                        entre16y64.push(grafica2["from_sixteen_to_sixty_four_years"]); 
                        mayor65.push(grafica2["sixty_five_and_over"]); 
                        
                        temp_max.push(0);
                        temp_min.push(0);
                        temp_med.push(0);
                                       
                    });
                    
                }catch(error){
                    console.log(`Error devolviendo la gráfica: ${error}`);
                }
                const status2 = await res2.status;
                resultStatus2 = status2;
            }else{
                console.log("Error al cargar la gráfica"); 
            }
        
            await delay(500);
            
    }

</script>


<main>
    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 45px; text-decoration:underline">Datos: Evolución</h1>

    <br><div style="text-align:center;">
        <strong >Número de datos: {grafica2.length}</strong>
    </div>
    <br>
    <Table striped hover style="text-align: center;">
        <thead>
          <tr style="font-weight: bold; text-decoration:underline">
            <th>Provincia</th>
            <th>Año</th>
            <th>Población Total</th>
            <th>Hombres</th>
            <th>Mujeres</th>
            <th>Por debajo de 16</th>
            <th>Entre 15 y 64</th>
            <th>Mayores de 65</th>
          </tr>
        </thead>
        <tbody>
           

        {#each grafica2 as d}
          <tr>
            <td>{d["territory"]}</td>
            <td>{d["period"]}</td>
            <td>{d["total_population"]}</td>
            <td>{d["man"]}</td>
            <td>{d["woman"]}</td>
            <td>{d["under_sixteen_years"]}</td>
            <td>{d["from_sixteen_to_sixty_four_years"]}</td>
            <td>{d["sixty_five_and_over"]}</td>
          </tr>
        {/each}
          
        </tbody>
    </Table>
    <p style="text-align:center">
        Datos sobre la población en diversos años.
    </p>
<br>

</main>