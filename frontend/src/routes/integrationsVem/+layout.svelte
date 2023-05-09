<script>
    import Externa1Vem from "./externa1Vem.svelte";
    import Integracion1Vem from "./integracion1Vem.svelte";
    import UsoExterna2Vem from "./usoExterna2Vem.svelte";
</script>


<main>
    
    <Integracion1Vem></Integracion1Vem>
    <hr style="margin-left: 100px; margin-right: 100px">
    <UsoExterna2Vem></UsoExterna2Vem>
    <hr style="margin-left: 100px; margin-right: 100px">
    <slot></slot>
</main>