<script>
import CategoryForm from '../components/GenreForm.vue';
import BookForm from '../components/BookForm.vue';
import CategoryList from '../components/GenreList.vue';
import BookTable from '../components/BookTable.vue';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      user : {},
      genres: [],
      books: []
    }
  },
  components: {
    CategoryForm,
    BookForm,
    CategoryList,
    BookTable
  },
  async mounted() {
    this.user = await this.fetchUser(this.$route.params.userId)
    this.genres = await this.$store.dispatch('getGenres', this.$route.params.userId);
    this.books = await this.$store.dispatch('getBooks', this.$route.params.userId);

 
},
  methods: {
    ...mapActions(['fetchUser', 'getGenres', 'getBooks']),
    async updateGenres(){
        this.genres = await this.$store.dispatch('getGenres', this.$route.params.userId);
    },
    async updateBooks(){
        this.books = await this.$store.dispatch('getBooks', this.$route.params.userId);
    },

  }
}
</script>


<template lang="pug">
h1 {{ user.name }}
.container(style="display: flex; flex-wrap: wrap;")
    .col-6.px-3(style="flex: 1;")
        CategoryForm(@add-category="updateGenres")

    .col-6.px-3(style="flex: 2;")
        CategoryList(:genres="genres")
        
      
.container(style="display: flex; flex-wrap: wrap;")
    .row(style="flex: 1; display: flex;")
        .col.px-1(style="flex: 1;")
          BookForm(@add-book="updateBooks" :genres="genres")
        .col.px-1(style="flex: 2;")
          BookTable(:books="books")
</template>
  
  <style>
  .container {
    display: flex;
    flex-wrap: wrap;

  }
  
  .row {
    display: flex;
    width: 100%;
    margin-top: 0;
  }
  
  .col, .books {
    flex: 1;
    padding: 0 15px;
  }
  

  </style>
  