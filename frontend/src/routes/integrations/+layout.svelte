<script>
    import Library from "./library.svelte";
    import Pollution from "./pollution.svelte";
    import ApiEvolucion from "./apiEvolucion.svelte";
    import Integracion1Aml from "./integracion1Aml.svelte";
</script>


<main>
    <ApiEvolucion></ApiEvolucion>
    <hr style="margin-left: 100px; margin-right: 100px">
    <!--Agroclimatic (el otro uso)-->
    <slot></slot>
    <br><hr style="margin-left: 100px; margin-right: 100px">
    <Integracion1Aml></Integracion1Aml>
    <hr style="margin-left: 100px; margin-right: 100px">
    <Library></Library>
    <hr style="margin-left: 100px; margin-right: 100px">
    <Pollution></Pollution>
</main>