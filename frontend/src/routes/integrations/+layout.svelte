<script>
    import Library from "./library.svelte";
    import Pollution from "./pollution.svelte";
    import Integracion1Aml from "./integracion1Aml.svelte";
    import Integracion2Aml from "./integracion2Aml.svelte";
    import Uso2Aml from "./uso2Aml.svelte";
    import Externa1Aml from "./externa1Aml.svelte";
</script>


<main>`
    <Externa1Aml></Externa1Aml>
    <hr style="margin-left: 100px; margin-right: 100px">
    <Uso2Aml></Uso2Aml>
    <hr style="margin-left: 100px; margin-right: 100px">
    <!--Agroclimatic (el otro uso)-->
    <slot></slot>
    <br><hr style="margin-left: 100px; margin-right: 100px">
    <Integracion1Aml></Integracion1Aml>
    <!--<hr style="margin-left: 100px; margin-right: 100px">-->
    <Integracion2Aml></Integracion2Aml>
    <hr style="margin-left: 100px; margin-right: 100px">
    <Library></Library>
    <hr style="margin-left: 100px; margin-right: 100px">
    <Pollution></Pollution>
</main>