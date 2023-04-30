<h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 45px; text-decoration:underline;">Datos: Búsqueda avanzada de películas</h1>
<br>
<div style="text-align:center;">
    <strong >Número de datos: {datosOtro.length+datosOtro2.length}</strong>
</div>
<br>
<script>
    // @ts-nocheck
    
    import { Table } from "sveltestrap";
    import { onMount } from "svelte";
    const delay = ms => new Promise(res => setTimeout(res, ms));
    let datosOtro = [];
    let result = "";
    let resultStatus= "";

    let categoria = [];
    let id_pelis = [];

    let API = "https://sos2223-12.ew.r.appspot.com/api/v2/agroclimatic";
    let temp_max = [];
    let temp_min = [];
    let temp_med = [];

    let datosOtro2 = [];

    let result2 = "";
    let resultStatus2 = "";


    onMount(async () => {
        getDatosOtro();
    });
    
    const url = 'https://advanced-movie-search.p.rapidapi.com/genre/movie/list';
    const options = {
	method: 'GET',
	headers: {
		'content-type': 'application/octet-stream',
		'X-RapidAPI-Key': '7223db1b48msha3db69e3246b3bdp105d91jsn649e6b1c08cc',
		'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
	}
    };

    async function getDatosOtro(){
            resultStatus = result = "";
            const res = await fetch(url, options);//rest.then(res =>fetch(res.url, options));//fetch(rest,{
            //method: "GET"
            //});
            if(res.ok){
                try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                datosOtro = data.genres;
                datosOtro.forEach(x =>{
                    categoria.push(x['name']);
                    id_pelis.push(x['id']);

                    temp_max.push(0);
                    temp_min.push(0);
                    temp_med.push(0);

                }); 
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
            }else{
                console.log("Error al cargar la gráfica"); 
            }
            resultStatus2 = result2 = "";
            const res2 = await fetch(API, {
                method: "GET"
            });
            if(res2.ok){
                try{
                    const valores2 = await res2.json();
                    result2 = JSON.stringify(valores2, null, 2);
                    
                    datosOtro2 = valores2;
                    datosOtro2.sort((a, b) => (a.province > b.province) ? 1 : ((b.province > a.province) ? -1 : 0));
                    datosOtro2.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
                    datosOtro2.forEach(datosOtro2 =>{
                        console.log(datosOtro2);
                        categoria.push(datosOtro2.province+"-"+datosOtro2.year);

                        temp_max.push(datosOtro2["maximun_temperature"]);
                        temp_min.push(datosOtro2["minimun_temperature"]);
                        temp_med.push(datosOtro2["medium_temperature"]);
                        
                        
                        id_pelis.push(0);
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
            loadChart();
            
    }

    async function loadChart(){  
        
        Highcharts.chart('container3', {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Búsqueda Avanzada de Películas y Estadísticas Agroclimáticas',
            style: {
                fontWeight: 'bold',
                fontFamily: 'Times New Roman',
                fontSize: 40,
            },
        },
        
        subtitle: {
            text: 'Gráfica con HighCharts',
            style:{
                fontFamily: 'Times New Roman',
                fontWeight: 'bold',
                fontSize: 12,
                color: 'black'
            },
        },
        xAxis: {
            title:{
                text: "Categorías | Provincia-Año",
                style: {
                    fontWeight: 'bold'
                }
            },
            categories: categoria,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Valor',
                style: {
                    fontWeight: 'bold'
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y: 2f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
            pointPadding: 0.2,
            borderWidth: 2,
            borderColor: "#000"
            }
        },
        series: [{
            name: 'ID',
            data: id_pelis 
        },{
            name: 'Temperatura Máxima',
            data: temp_max 

        }, {
            name: 'Temperatura Mínima',
            data: temp_min 

        }, {
            name: 'Temperatura Media',
            data: temp_med 

        }],
        responsive: {
                rules: [{
                    condition: {
                        maxWidth: 1000
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        });
    }
</script>

<main>
<figure class="highcharts-figure" style="margin-left: 25px; margin-right:25px">
    <div id="container3"></div>
    <p class="highcharts-description" style="text-align:center">
        Películas junto con su ID y Estadísticas Agroclimáticas.
    </p>
</figure>
<br>
</main>
