<h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size:50px; font-weight:bold">Usos</h1>
<div style="text-align: center; font-family:'Times New Roman', Times, serif; font-weight: bold; font-size:20px; color:blue">
    Uso 2: Datos de Ocupación.
    <br>
</div>
<hr style="text-align: right; margin-left: 100px; margin-right: 100px;">
<svelte:head>
    
</svelte:head>
<script>
    // @ts-nocheck
    import {onMount} from "svelte";
    import { Button, Table } from "sveltestrap";
    const delay = ms => new Promise(res => setTimeout(res, ms));


    //let API = "https://sos2223-12.ew.r.appspot.com/api/v2/pollutions";
    let API2 = "http://sos2223-14.appspot.com/api/v2/apartment-occupancy-surveys";

    //let grafica = [];
    let grafica2 = [];

    let elemNO2 = [];
    let elemO3 = [];
    let elemSO2 = [];

    let provincia_año = [];

    let viajero = [];
    let noche = [];
    let ocupacion = [];

    let result = "";
    let resultStatus = "";
    let result2 = "";
    let resultStatus2 = "";

    onMount(async () =>{
        getGraphOtro()
    });

    async function getGraphOtro(){
        resultStatus2 = result2 = "";
            const res2 = await fetch(API2, {
            method: "GET"
                
            });
            
            if(res2.ok){
                try{
                    const valores2 = await res2.json();
                    result2 = JSON.stringify(valores2, null, 2);
                    grafica2 = valores2;
                    grafica2.sort((a, b) => (a.province > b.province) ? 1 : ((b.province > a.province) ? -1 : 0));
                    grafica2.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
                    grafica2.forEach(grafica2 =>{
                        console.log(grafica2);
                        provincia_año2.push(grafica2.province+"-"+grafica2.year);
                        viajero.push(grafica2["traveler"]);
                        noche.push(grafica2["overnight_stay"]); 
                        ocupacion.push(grafica2["average_stay"]); 
 
                        
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
    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 45px; text-decoration:underline">Datos: Ocupación.</h1>

    <br><div style="text-align:center;">
        <strong >Número de datos: {grafica2.length}</strong>
    </div>
    <br>
    <Table striped hover style="text-align: center;">
        <thead>
          <tr style="font-weight: bold; text-decoration:underline">
            <th>Provincia</th>
            <th>Año</th>
            <th>Viajero</th>
            <th>Noches de estancia</th>
            <th>Exceso</th>
          </tr>
        </thead>
        <tbody>
           

        {#each grafica2 as d}
          <tr>
            <td>{d["province"]}</td>
            <td>{d["year"]}</td>
            <td>{d["traveler"]}</td>
            <td>{d["overnight_stay"]}</td>
            <td>{d["average_stay"]}</td>

          </tr>
        {/each}
          
        </tbody>
    </Table>

    <p style="text-align:center">
        Estadísticas sobre ocupación.
    </p>

    <br>
    <hr style="text-align: right; margin-left: 100px; margin-right: 100px;">
    <div style="text-align:center">
        <Button color="primary" href="/">Volver a Inicio</Button>
    </div>
</main>

