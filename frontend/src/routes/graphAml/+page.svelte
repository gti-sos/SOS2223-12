<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<script>
    // @ts-nocheck
    import {onMount} from "svelte";
    import { dev } from "$app/environment"; 


    let API = "/api/v2/graphAml";
    let graph = [];

    let result = "";
    let resultStatus = "";

    const delay = ms => new Promise(res => setTimeout(res, ms));

    if(dev)
        API = "http://localhost:12345"+API

    onMount(async () =>{
        getGraph()
    });

    async function getGraph(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "GET"
            });
            try{
                const valores = await res.json();
                result = JSON.stringify(valores, null, 2);
                graph = valores;
                loadChart(graph); //,3
            }catch(error){
                console.log(`Error devolviendo la gráfica: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
    }


    async function loadChart(graphAll){  //,dataIndex
        await delay(1000);
        const uniqueYears = [...new Set(graphAll.map((x) => x[1]))]; // Obtener los años sin repetir
        const seriesData = [];
        //const dosdos = [];
        //const trestres = [];
        const uniqueProvinces = [...new Set(graphAll.map((r) => r[0]))]; // Obtener provincias sin repetir

        uniqueProvinces.forEach(city => {
            const cityData = [];
            //const dos = [];
            //const tres =[];
            uniqueYears.forEach(year => {
                const filteredData = graphAll.filter((x) => x[1] === year && x[0] === city);
                if (filteredData.length > 0) {
                    cityData.push(filteredData[0][2]); //, filteredData[0][dataIndex], filteredData[0][dataIndex + 1]); // Añadir la temperatura
                    //dos.push(filteredData[0][3]);
                    //tres.push(filteredData[0][4]);
                } else {
                    cityData.push([null]); //, null, null]); // Si no hay datos, añadir un valor nulo
                }
            });

            seriesData.push({
                name: city,
                data: cityData
            });
            /*dosdos.push({
                name: city,
                data: dos
            });
            trestres.push({
                name: city,
                data: tres
            });*/
        });
        Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Estadísticas Agroclimáticas'
            },
            xAxis: {
                categories: uniqueYears, 
                crosshair: true
            },
            yAxis: {
                min: 0,
                max: 50,
                title: {
                    text: 'Temperaturas Máximas'
                },
                labels: {
                    format: '{value:.2f}' // Dos decimales
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.2f} grados</b></td></tr>' /*+
                    '<td style="padding:0"><b>{point.x[1]}</b></td>' +
                    '<td style="padding:0"><b>{point.x[2]}</b></td></tr>'*/,
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderColor: '#2f7ed8',
                    borderWidth: 2,
                }
            },
            series: seriesData
        });

        const uniqueYears2 = [...new Set(graphAll.map((x) => x[1]))]; // Obtener los años sin repetir
        const seriesData2 = [];
        //const dosdos = [];
        //const trestres = [];
        const uniqueProvinces2 = [...new Set(graphAll.map((r) => r[0]))]; // Obtener provincias sin repetir

        uniqueProvinces2.forEach(city2 => {
            const cityData2 = [];
            //const dos = [];
            //const tres =[];
            uniqueYears2.forEach(year2 => {
                const filteredData = graphAll.filter((x) => x[1] === year2 && x[0] === city2);
                if (filteredData.length > 0) {
                    cityData2.push(filteredData[0][3]); //, filteredData[0][dataIndex], filteredData[0][dataIndex + 1]); // Añadir la temperatura
                    //dos.push(filteredData[0][3]);
                    //tres.push(filteredData[0][4]);
                } else {
                    cityData2.push([null]); //, null, null]); // Si no hay datos, añadir un valor nulo
                }
            });

            seriesData2.push({
                name: city2,
                data: cityData2
            });
            /*dosdos.push({
                name: city,
                data: dos
            });
            trestres.push({
                name: city,
                data: tres
            });*/
        });
        Highcharts.chart('container2', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Estadísticas Agroclimáticas'
            },
            xAxis: {
                categories: uniqueYears2, 
                crosshair: true
            },
            yAxis: {
                min: 0,
                max: 50,
                title: {
                    text: 'Temperaturas Mínimas'
                },
                labels: {
                    format: '{value:.2f}' // Dos decimales
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.2f} grados</b></td></tr>' /*+
                    '<td style="padding:0"><b>{point.x[1]}</b></td>' +
                    '<td style="padding:0"><b>{point.x[2]}</b></td></tr>'*/,
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderColor: '#2f7ed8',
                    borderWidth: 2,
                }
            },
            series: seriesData2
        });

        const uniqueYears3 = [...new Set(graphAll.map((x) => x[1]))]; // Obtener los años sin repetir
        const seriesData3 = [];
        //const dosdos = [];
        //const trestres = [];
        const uniqueProvinces3 = [...new Set(graphAll.map((r) => r[0]))]; // Obtener provincias sin repetir

        uniqueProvinces3.forEach(city3 => {
            const cityData3 = [];
            //const dos = [];
            //const tres =[];
            uniqueYears3.forEach(year3 => {
                const filteredData = graphAll.filter((x) => x[1] === year3 && x[0] === city3);
                if (filteredData.length > 0) {
                    cityData3.push(filteredData[0][4]); //, filteredData[0][dataIndex], filteredData[0][dataIndex + 1]); // Añadir la temperatura
                    //dos.push(filteredData[0][3]);
                    //tres.push(filteredData[0][4]);
                } else {
                    cityData3.push([null]); //, null, null]); // Si no hay datos, añadir un valor nulo
                }
            });

            seriesData3.push({
                name: city3,
                data: cityData3
            });
            /*dosdos.push({
                name: city,
                data: dos
            });
            trestres.push({
                name: city,
                data: tres
            });*/
        });
        Highcharts.chart('container3', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Estadísticas Agroclimáticas'
            },
            xAxis: {
                categories: uniqueYears3, 
                crosshair: true
            },
            yAxis: {
                min: 0,
                max: 50,
                title: {
                    text: 'Temperaturas Medias'
                },
                labels: {
                    format: '{value:.2f}' // Dos decimales
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.2f} grados</b></td></tr>' /*+
                    '<td style="padding:0"><b>{point.x[1]}</b></td>' +
                    '<td style="padding:0"><b>{point.x[2]}</b></td></tr>'*/,
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderColor: '#2f7ed8',
                    borderWidth: 2,
                }
            },
            series: seriesData3
        });
        /*const uniqueYears = [...new Set(graphAll.map((x) => x[1]))]; // Obtener los años sin repetir
        const seriesDataMax = [];
        const seriesDataMin = [];
        const seriesDataMed = [];
        const uniqueProvinces = [...new Set(graphAll.map((r) => r[0]))]; // Obtener provincias sin repetir

        uniqueProvinces.forEach(city => {
            const cityDataMax = [];
            const cityDataMin = [];
            const cityDataMed = [];
            uniqueYears.forEach(year => {
            const filteredData = graphAll.filter((x) => x[1] === year && x[0] === city);
            if (filteredData.length > 0) {
                cityDataMax.push(filteredData[0][2]); // Añadir la max
                cityDataMin.push(filteredData[0][3]); // Añadir la min
                cityDataMed.push(filteredData[0][4]); // Añadir la med
            } else {
                cityDataMax.push(null); // Si no hay datos, añadir un valor nulo
                cityDataMin.push(null);
                cityDataMed.push(null);
            }
            });
            console.log(`Data for ${city} processed`);
            seriesDataMax.push({
            name: city,
            data: cityDataMax
            });

            seriesDataMin.push({
            name: city,
            data: cityDataMin
            });

            seriesDataMed.push({
            name: city,
            data: cityDataMed
            });
        });

        Highcharts.chart('container', {
            chart: {
            type: 'column'
            },
            title: {
            text: 'Estadísticas Agroclimáticas'
            },
            xAxis: {
            categories: uniqueYears,
            crosshair: true
            },
            yAxis: [{
            min: 0,
            max: 50,
            title: {
                text: 'Maxima'
            },
            labels: {
                format: '{value:.2f}' // Dos decimales
            }
            },{
            min: 0,
            max: 30,
            title: {
                text: 'Minima'
            },
            opposite: true,
            labels: {
                format: '{value:.2f}' // Dos decimales
            }
            },{
            min: 0,
            max: 40,
            title: {
                text: 'Media'
            },
            opposite: true,
            labels: {
                format: '{value:.2f}' // Dos decimales
            }
            }],
            tooltip: {
            shared: true
            },
            plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 2,
            }
            },
            series: [{
            name: 'Maxima',
            data: seriesDataMax
            },{
            name: 'Minima',
            data: seriesDataMin,
            yAxis: 1
            },{
            name: 'Media',
            data: seriesDataMed,
            yAxis: 2}]
            });*/
    }
    
</script>

 
<main>
    <figure class="highcharts-figure" style="margin-left: 100px; margin-right:100px;">
        <div id="container"></div>
        <p style="text-align: center;" class="highcharts-description">
            Gráfico de Columnas sobre las Estadísticas Agroclimáticas de diferentes provincias de Andalucía.
        </p>
        <div id="container2"></div>
        <p style="text-align: center;" class="highcharts-description">
            Gráfico de Columnas sobre las Estadísticas Agroclimáticas de diferentes provincias de Andalucía.
        </p>
        <div id="container3"></div>
        <p style="text-align: center;" class="highcharts-description">
            Gráfico de Columnas sobre las Estadísticas Agroclimáticas de diferentes provincias de Andalucía.
        </p>
    </figure>

    <!--<figure class="highcharts-figure" style="margin-left: 200px; margin-right:200px;">
        <div id="container"></div>
        <p class="highcharts-description">
            Representación de los datos:
        </p>
    </figure>

    <figure class="highcharts-figure" style="margin-left: 200px; margin-right:200px;">
        <div id="container2"></div>
        <p class="highcharts-description">
            Representación de los datos2:
        </p>
    </figure>-->

    {#if resultStatus != ""}
    <p>
        Result:
        Numero: {graph.length}
    </p>
    <pre>
    {resultStatus}
    {result}
    </pre>
    {/if}
</main>