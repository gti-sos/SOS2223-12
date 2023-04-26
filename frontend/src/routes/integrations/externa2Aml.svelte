<h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 45px; text-decoration:underline;">Datos: Búsqueda avanzada de películas</h1>
<br>
<div style="text-align:center;">
    <strong >Número de datos: {datosOtro.length}</strong>
</div>
<br>
<script>
    // @ts-nocheck
    
    import { Table } from "sveltestrap";
    import { onMount } from "svelte";
    const delay = ms => new Promise(res => setTimeout(res, ms));
    let datosOtro = [];
    let result;
    let resultStatus;

    let categoria = [];
    let id_pelis = [];

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
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                datosOtro = data.genres;
                datosOtro.forEach(x =>{
                    categoria.push(x['name']);
                    id_pelis.push(x['id']);
                });
                await delay(500);
                    loadChart(); 
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
    }

    async function loadChart(){  
        
        Highcharts.chart('container3', {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Búsqueda Avanzada de Películas',
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
                text: "Categorías",
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
                text: 'ID',
                style: {
                    fontWeight: 'bold'
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y: 2f}ºC</b></td></tr>',
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
            name: 'Valor',
            data: id_pelis 

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

<figure class="highcharts-figure" style="margin-left: 25px; margin-right:25px">
    <div id="container3"></div>
    <p class="highcharts-description" style="text-align:center">
        Películas junto con su ID.
    </p>
</figure>
<br>