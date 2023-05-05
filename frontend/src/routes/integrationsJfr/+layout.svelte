<script>
    import Externa1Jfr from "./externa1Jfr.svelte";
    import External2Jfr from "./external2Jfr.svelte";
    import Proxy from "./proxy.svelte";
</script>


<main>
    <Externa1Jfr></Externa1Jfr>
    <hr style="margin-left: 100px; margin-right: 100px">
    <External2Jfr></External2Jfr>
    <hr style="margin-left: 100px; margin-right: 100px">
    <slot></slot>
    <Proxy></Proxy>
    <hr style="margin-left: 100px; margin-right: 100px">
</main>