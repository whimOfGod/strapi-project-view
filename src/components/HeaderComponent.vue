<template>
    <header>
        <!-- Contenu du header -->
        <h3>{{ msg }}</h3>
    </header>
</template>

<script>
export default {
    // Composant du header
    name: 'HeaderComponent',
    // Propriétés du composant
    props: {
        // Propriété de type String
        msg: String
    }
}
</script>

<style scoped>
/* Styles spécifiques au header */
header {
    background-color: #1d1d21;
    padding: 20px;
    font-size: 35px;
    color: whitesmoke;
    height: 15vh;
    display: flex;
    align-items: center;
    width: auto;
    margin: 0;
    -webkit-box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.09);
    -moz-box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.09);
    box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.09);
}
</style>
