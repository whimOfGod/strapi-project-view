<template>
  <div id="app">
    <HeaderComponent msg="Strapi view"/>
    <ArticleList/>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import ArticleList from './components/Article.vue'; // Correction de l'importation


export default {
  name: 'App',
  components: {
    HeaderComponent,
    ArticleList
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin: 0;
}
</style>
