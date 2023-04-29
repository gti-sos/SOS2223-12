<h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 45px; text-decoration:underline;">Datos: Ciudades GeoDB</h1>
<br>
<div style="text-align:center;">
    <strong >Número de datos: {datos.length}</strong>
</div>
<br>
<svelte:head>
    <script src='https://cdn.plot.ly/plotly-2.20.0.min.js'></script>
</svelte:head>
<script>
    //@ts-nocheck
    import { Table } from "sveltestrap";
    import { onMount } from "svelte";
    const delay = ms => new Promise(res => setTimeout(res, ms));

    let result = "";
    let resultStatus= "";

    let datos = [];
    let nom_pais_reg = [];
    let idd = [];
    let wiki = [];
    let paisCodigo = [];
    let regCodigo = [];
    let latitud = [];
    let longitud = [];
    let poblacion = [];

    onMount(async () => {
        getDatos3();
    });


    const url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions';
    const options = {
	method: 'GET',
	headers: {
		'content-type': 'application/octet-stream',
		'X-RapidAPI-Key': '7223db1b48msha3db69e3246b3bdp105d91jsn649e6b1c08cc',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	    }
    };  

    async function getDatos3(){
        resultStatus = result = "";
            const res = await fetch(url, options)//rest.then(res =>fetch(res.url, options));//fetch(rest,{
            //method: "GET"
            //});
        if(res.ok){   
            try{
                const da = await res.json();
                result = JSON.stringify(da, null, 2);
                datos = da.data;
                datos.forEach(element => {
                    nom_pais_reg.push(element['name']+'-'+element['country']+'-'+element['region']);
                    idd.push(element['id']);
                    wiki.push(element['wikiDataId']);
                    paisCodigo.push(element['countryCode']);
                    regCodigo.push(element['regionCode']);
                    latitud.push(element['latitude']);
                    longitud.push(element['longitude']);
                    poblacion.push(element['population']);

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
        loadChart3();

    }


    async function loadChart3(){
        var lat = {
            x: nom_pais_reg,
            y: latitud,
            type: 'bar',
            name: 'Latitud'
        };
        var lon = {
            x: nom_pais_reg,
            y: longitud,
            type: 'bar',
            name: 'Longitud'
        };
        var ident = {
            x: nom_pais_reg,
            y: idd,
            type: 'spline',
            name: 'ID'
        }
        var dataPlot = [lat, lon, ident];
        var layout = { 
        font: {size: 8}
        };
       var config = {responsive: true}
        Plotly.newPlot('myDiv', dataPlot, layout,config);
    }
    
</script>

<main>
    <h2 style="font-size:40px; font-family: 'Times New Roman', Times, serif; text-align:center; font-weight: bold;">Gráfica de Ciudades GeoDB</h2>
    <h4 style="font-size:12px; font-family: 'Times New Roman', Times, serif; text-align:center; font-weight: bold;">Gráfica con Plotly</h4>
    <br><p style="text-align: center;">
        El ID se muestra en formato línea, mientras que la latitud y longitud en formato barra,
        <br>para ver estos dos últimos, pincha sobre el ID para dejar de visualizarlo.
    </p>
    <div id='myDiv'></div>
    
    <p style="text-align: center;">
        Gráfica que obtiene datos globales de ciudades, regiones y países.
    </p>
    <br>
</main>