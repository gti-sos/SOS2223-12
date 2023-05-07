<script>
    import Externa1Vem from "./externa1Vem.svelte";
    import Externa2Vem from "./externa2Vem.svelte";
    import Integracion1Vem from "./integracion1Vem.svelte";
</script>


<main>
    
    <Externa2Vem></Externa2Vem>
    <hr style="margin-left: 100px; margin-right: 100px">
    <Integracion1Vem></Integracion1Vem>
    <hr style="margin-left: 100px; margin-right: 100px">
    <slot></slot>
</main>