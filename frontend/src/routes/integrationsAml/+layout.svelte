<script>
    import Externa1Aml from "./externa1Aml.svelte";
    import Externa2Aml from "./externa2Aml.svelte";
    import Externa3Aml from "./externa3Aml.svelte";
    import Externa4Aml from "./externa4Aml.svelte";
    import Externa5Aml from "./externa5Aml.svelte";
    import IntegracionEvolutionAml from "./integracionEvolutionAml.svelte";
    import UsoJobsAml from "./usoJobsAml.svelte";
</script>


<main>
    <Externa1Aml></Externa1Aml>
    <hr style="margin-left: 100px; margin-right: 100px">
    <Externa2Aml></Externa2Aml>
    <hr style="margin-left: 100px; margin-right: 100px">
    <IntegracionEvolutionAml></IntegracionEvolutionAml>
    <hr style="margin-left: 100px; margin-right: 100px">
    <!--Titulo Usos-->
    <slot></slot>
    <hr style="margin-left: 100px; margin-right: 100px">
    <Externa3Aml></Externa3Aml>
    <hr style="margin-left: 100px; margin-right: 100px">
    <Externa4Aml></Externa4Aml>
    <hr style="margin-left: 100px; margin-right: 100px">
    <Externa5Aml></Externa5Aml>
    <hr style="margin-left: 100px; margin-right: 100px">
    <UsoJobsAml></UsoJobsAml>
</main>