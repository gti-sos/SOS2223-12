<script>
    import Header from "./Header.svelte";
    import Footer from "./Footer.svelte";
</script>

<main>
    <Header></Header>

    <hr/>
    <slot></slot>
    <hr/>

    <Footer></Footer>
</main>