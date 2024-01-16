<template>
  <div id="app">
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    <div v-else>
      <button @click="clearCategoryFilter" class="btn btn-secondary mb-2 rounded-pill show-all-button">
        Show All
      </button>
      <button v-for="category in categories" :key="category.id" @click="filterByCategory(category.id)" class="btn btn-primary me-2 mb-2 rounded-pill">
        {{ category.attributes.Name }}
        {{console.log(categories)}}
      </button>
    </div>
    <ul class="article-list">
      <li v-for="article in filteredArticles" :key="article.id" class="article-item">
        <h2>{{ article.attributes.Title }}</h2>
        <h2>{{ article.attributes.Body }}</h2>

      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      articles: [],
      categories: [],
      selectedCategoryId: null,
      error: null
    };
  },
  async mounted() {
    try {
      const [articlesResponse, categoriesResponse] = await Promise.all([
        axios.get('http://localhost:1337/api/articles?populate=*'),
        axios.get('http://localhost:1337/api/categories')
      ]);

      this.articles = articlesResponse.data.data;
      this.categories = categoriesResponse.data.data;
    } catch (error) {
      this.error = error;
    }
  },
  computed: {
    filteredArticles() {
      if (!this.selectedCategoryId) {
        return this.articles;
      }

      return this.articles.filter(article => {
        const categoryId = article.attributes.categories.data[0]?.id;
        return categoryId === this.selectedCategoryId;
      });
    }
  },
  methods: {
    formatPublishedDate(dateString) {
      const dateObject = new Date(dateString);
      
      if (isNaN(dateObject.getTime())) {
        return 'Date non valide';
      }

      const formattedDate = new Intl.DateTimeFormat('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
      }).format(dateObject);

      return formattedDate;
    },
    filterByCategory(categoryId) {
      this.selectedCategoryId = categoryId;
    },
    clearCategoryFilter() {
      this.selectedCategoryId = null;
    }
  },
};
</script>
<style>

</style>