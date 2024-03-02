<script>
  export default {
    props: {
    genres: Array 
  },
    data() {
      return {
        newBook: { author: '', title: '', category: '' },
      };
    },
    methods: {
        addBook() {
    if (this.newBook.author !== '' && this.newBook.title !== '' && this.newBook.category !== '') {
      this.$emit('add-book', this.newBook);
      this.newBook = { author: '', title: '', category: '' }; // Clear form
    }
  }
}

  }
  </script>
<template>
    <div class="column">
      <h2>Add book</h2>
      <input type="text" v-model="newBook.author" placeholder="Author">
      <input type="text" v-model="newBook.title" placeholder="Book">
      <select v-model="newBook.category">
        <option disabled value="">Please select a category</option>
        <option v-for="(genre, index) in genres" :key="index" :value="genre">{{ genre.name }}</option>
      </select>
      <button @click="addBook">Add</button>
    </div>
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
  