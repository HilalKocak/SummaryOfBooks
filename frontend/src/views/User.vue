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
.container
    .col-6.px-3
    <CategoryForm @add-category="updateGenres" />

    .col-6.px-3
    <BookForm @add-book="updateBooks" :genres="genres" />
    
.container
    .row
        .col.px-1
            <CategoryList :genres="genres" />
        .col.books.px-1
            <BookTable :books="books" />
        
</template>
  
  <style>

  </style>
  