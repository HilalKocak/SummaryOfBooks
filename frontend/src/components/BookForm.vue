<script>
import { mapActions } from 'vuex';
  export default {
    props: {
    genres: Array 
  },
    data() {
      return {
        newBook: { author: '', title: '', genre: '' },
      };
    },
    methods: {
    ...mapActions(['addBook']),
    async addNewBook() {
      if (this.newBook.author.trim() && this.newBook.title.trim() && this.newBook.genre) {
      await this.addBook({ userId: this.$route.params.userId, title: this.newBook.title, author: this.newBook.author, genreId: this.newBook.genre._id });
      this.newBook.author = ''; 
      this.newBook.title = ''; 
      this.newBook.genre = '';
      }
      this.$emit('add-book');
  }
   
}

  }
  </script>
<template lang="pug">
.column
  h2 Add Book
  input(type='text', v-model='newBook.author', placeholder='Author')
  input(type='text', v-model='newBook.title', placeholder='Book')
  select(v-model='newBook.genre')
    option(disabled='', value='') Please select a genre
    option(v-for='genre in genres', :key='genre._id', :value='genre') {{ genre.name }}

  button(@click='addNewBook') Add

</template>
  
  
  
<style scoped>
.column {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}

input[type="text"], select {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

select {
  cursor: pointer;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

 
  </style>
  