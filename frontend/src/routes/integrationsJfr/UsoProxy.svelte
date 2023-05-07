<h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size:50px; font-weight:bold">Usos</h1>
<div style="text-align: center; font-family:'Times New Roman', Times, serif; font-weight: bold; font-size:20px; color:blue">
    Uso 1: Datos de Desempleo.
    <br>
</div>
<hr style="text-align: right; margin-left: 100px; margin-right: 100px;">


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
    let API2 = "http://localhost:12345/employ";//"https://sos2223-12.ew.r.appspot.com/employ";//"http://localhost:12345/evol";// Llama a /evol que esté en el backend y accede a la API de luismi

    let grafica = [];
    let grafica2 = [];

    let elemNO2 = [];
    let elemO3 = [];
    let elemSO2 = [];
   
    let provincia_año2 = [];

    let periodo = [];
    let fecha = [];
    let empleadas_personas = [];
    let inactivas_personas = [];
    let desempleadas_personas = [];

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
                    grafica2.sort((a, b) => (a.region > b.region) ? 1 : ((b.region > a.region) ? -1 : 0));
                    grafica2.sort((a, b) => (a.period > b.period) ? 1 : ((b.period > a.period) ? -1 : 0));
                    grafica2.forEach(grafica2 =>{
                        console.log(grafica2);
                        provincia_año2.push(grafica2.region+"-"+grafica2.period);
                        periodo.push(grafica2["period"]);
                        fecha.push(grafica2["date"]); 
                        empleadas_personas.push(grafica2["employed_person"]); 
                        inactivas_personas.push(grafica2["inactive_person"]); 
                        desempleadas_personas.push(grafica2["unemployed_person"]); 
                        
                        elemNO2.push(0);
                        elemO3.push(0);
                        elemSO2.push(0);
                                       
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
    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 45px; text-decoration:underline">Datos: Desempleo</h1>

    <br><div style="text-align:center;">
        <strong >Número de datos: {grafica2.length}</strong>
    </div>
    <br>
    <Table striped hover style="text-align: center;">
        <thead>
          <tr style="font-weight: bold; text-decoration:underline">
            <th>Provincia</th>
            <th>Año</th>
            <th>Periodo</th>
            <th>Fecha</th>
            <th>Personas empleadas</th>
            <th>Personas inactivas</th>
            <th>Personas desempleadas</th>
          </tr>
        </thead>
        <tbody>
           

        {#each grafica2 as d}
          <tr>
            <td>{d["region"]}</td>
            <td>{d["year"]}</td>
            <td>{d["period"]}</td>
            <td>{d["date"]}</td>
            <td>{d["employed_person"]}</td>
            <td>{d["inactive_person"]}</td>
            <td>{d["unemployed_person"]}</td>
          </tr>
        {/each}
          
        </tbody>
    </Table>
    <p style="text-align:center">
        Datos sobre el empleo en diversos años.
    </p>
<br>

</main>