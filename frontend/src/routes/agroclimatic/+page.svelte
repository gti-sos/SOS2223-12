<script>
    // @ts-nocheck

        import { onMount } from "svelte";
        import { dev } from "$app/environment";

        let API = "/api/v1/agroclimatic";


        if(dev)
            API = "http://localhost:12345"+API

            
        let agroclimatics = [];
        let result = "";
        let resultStatus = "";

        async function getAgroclimatic(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "GET"
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                agroclimatics = data;
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        }


        onMount(async () =>{
            getAgroclimatic();
        });
    </script>

    <h1>Agroclimatic</h1>

    <ul>
        {#each agroclimatics as agroclimatic }
            <li>{agroclimatic.province}</li>
        {/each}
    </ul>

    {#if resultStatus != ""}
        <p>
            Result:
        </p>
        <pre>
    {resultStatus}
    {result}
        </pre>
    {/if}