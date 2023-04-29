<script>
    import Integracion1Aml from "./integracion1Aml.svelte";
    import Integracion2Aml from "./integracion2Aml.svelte";
    import Externa1Aml from "./externa1Aml.svelte";
    import Externa2Aml from "./externa2Aml.svelte";
    import Externa3Aml from "./externa3Aml.svelte";
</script>


<main>
    <Externa1Aml></Externa1Aml>
    <hr style="margin-left: 100px; margin-right: 100px">
    <Externa2Aml></Externa2Aml>
    <hr style="margin-left: 100px; margin-right: 100px">
    <Externa3Aml></Externa3Aml>
    <hr style="margin-left: 100px; margin-right: 100px">
    <!--Agroclimatic (el otro uso)-->
    <slot></slot>
    <br><hr style="margin-left: 100px; margin-right: 100px">
    <Integracion1Aml></Integracion1Aml>
    <hr style="margin-left: 100px; margin-right: 100px">
    <Integracion2Aml></Integracion2Aml>
</main>