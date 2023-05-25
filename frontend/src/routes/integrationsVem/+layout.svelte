<script>
    import Externa1Vem from "./externa1Vem.svelte";
    import Integracion from "./integracion.svelte";
    import UsoTurismo from "./usoTurismo.svelte";
    import UsoSSproxy from "./usoSSproxy.svelte";
    import UsoExternaT from "./usoExternaT.svelte";
</script>


<main>
    <Externa1Vem></Externa1Vem>
    <hr style="margin-left: 100px; margin-right: 100px">
    <Integracion></Integracion>
    <hr style="margin-left: 100px; margin-right: 100px">
    <slot></slot>
    <UsoExternaT></UsoExternaT>
    <hr style="margin-left: 100px; margin-right: 100px">
    <UsoTurismo></UsoTurismo>
    <hr style="margin-left: 100px; margin-right: 100px">
    <UsoSSproxy></UsoSSproxy>
    <hr style="margin-left: 100px; margin-right: 100px">
</main>