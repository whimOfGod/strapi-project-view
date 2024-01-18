<template>
  <div id="app">
    <main class="container">
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    <div v-else class="d-flex p-4 justify-content-start ">
      <button @click="clearCategoryFilter" class="btn btn-secondary mb-2 rounded-pill show-all-button me-2">
        Show All
      </button>
      <button v-for="category in categories" :key="category.id" @click="filterByCategory(category.id)" class="btn btn-primary me-2 mb-2 rounded-pill">
        {{ category.attributes.name }}
        {{console.log(categories)}}
      </button>
      <button @click="prepareMultipleApiCalls(10)" class="btn btn-success mb-2 rounded-pill">
        Perform 10 API Calls
      </button>
    </div>

      <!-- Articles -->
      <div class="d-flex mb-2">
          <div class="col-md-12 d-flex justify-content-between">
            <div v-for="article in filteredArticles" :key="article.id" class="d-flex g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative justify-content-around">
              <div class="col p-4 d-flex flex-column position-static">
                <h3 class="mb-0 text-primary">{{ article.attributes.Title }}</h3>
                <div class="mb-1 text-muted">Nov 12</div>
                <p class="card-text mb-auto " >{{ article.attributes.Body }}</p>
                <a href="#" class="stretched-link">Continue reading</a>
              </div>
              <div class="col-auto d-none d-lg-block">
                <img src="" alt="">
              </div>
            </div>
          </div>
      </div>

    </main>
  </div>

</template>

<script>

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
        this.$api.get('/api/articles?populate=*'),
        this.$api.get('/api/categories')
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
    },
    async prepareMultipleApiCalls(count) {
      try {

        console.log("valeur avant");
        console.log("valeur " + this.$api);
        const responseArray = [];
        for (let i = 0; i < count; i++) {
          const response = await this.$api.get('/api/articles');
          responseArray.push(response);
        }

        responseArray.forEach(e => {
          console.log(e);
        });
        
      return Promise.all(responseArray);

      } catch (error) {
        console.error(error);
      }
    },



  },
};
</script>

<style>
  .h-20 {
    height: 20vh;
  }
  .truncate-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 500px;  
  }

  .error-message {
    color: red;
  }

  .vh-20 {
    height: 60vh;
  }

  p {
    height: 100%;
  }

</style>