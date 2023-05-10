<script>
    import Externa1Vem from "./externa1Vem.svelte";
    import Integracion from "./integracion.svelte";
    import UsoTurismo from "./usoTurismo.svelte";
    import UsoSSproxy from "./usoSSproxy.svelte";
    import UsoExterna from "./usoExterna.svelte";
</script>


<main>
    <Integracion></Integracion>
    <hr style="margin-left: 100px; margin-right: 100px">
    <slot></slot>
    <UsoExterna></UsoExterna>
    <hr style="margin-left: 100px; margin-right: 100px">
    <UsoTurismo></UsoTurismo>
    <hr style="margin-left: 100px; margin-right: 100px">
    <UsoSSproxy></UsoSSproxy>
    <hr style="margin-left: 100px; margin-right: 100px">

</main>