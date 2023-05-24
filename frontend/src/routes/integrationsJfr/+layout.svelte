<script>
    import Externa1Jfr from "./externa1Jfr.svelte";
    import External2Jfr from "./external2Jfr.svelte";
    import UsoProxy from "./UsoProxy.svelte";
    import UsoOcupacionJfr from "./usoOcupacionJfr.svelte";
    import UsoF1Jfr from "./usoF1Jfr.svelte";
    import External3Jfr from "./external3Jfr.svelte";
    import External4Jfr from "./external4Jfr.svelte";
</script>


<main>
    <Externa1Jfr></Externa1Jfr>
    <hr style="margin-left: 100px; margin-right: 100px">
    <External2Jfr></External2Jfr>
    <hr style="margin-left: 100px; margin-right: 100px">
    <External3Jfr></External3Jfr>
    <hr style="margin-left: 100px; margin-right: 100px">
    <External4Jfr></External4Jfr>
    <hr style="margin-left: 100px; margin-right: 100px">
    <slot></slot>
    <UsoProxy></UsoProxy>
    <hr style="margin-left: 100px; margin-right: 100px">
    <UsoOcupacionJfr></UsoOcupacionJfr>
    <hr style="margin-left: 100px; margin-right: 100px">
    <UsoF1Jfr></UsoF1Jfr>
    <hr style="margin-left: 100px; margin-right: 100px">
</main>