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


<template>
     <h1>{{ user.name }}</h1>
    <div class="container">
        <div class="col-6 px-3">
        <CategoryForm @add-category="updateGenres" />
      </div>
      <div class="col-6 px-3">
        <BookForm @add-book="updateBooks" :genres="genres" />
      </div>
     
    </div>
  
    <div class="container">
      <div class="row">
        <div class="col px-1">
          <CategoryList :genres="genres" />

        </div>
        <div class="col books px-1">
          <BookTable :books="books" />
        </div>
      </div>
    </div>
      
</template>
  

  <style>

  </style>
  