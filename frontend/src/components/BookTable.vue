
<script>
export default {
  props: {
  books: Array
},
  data() {
    return {
      selectedBook: null 
    };
  },
  mounted() {
  console.log(this.books);
},

  methods: {
    toggleQuote(index) {
      
    }
  }
}
</script>

<template lang="pug">
.column
  h2 Books ({{books.length }})
  table
    thead
      tr
        th Author
        th Book Name
        th Genre
    tbody
      tr(v-for='(book, index) in books', :key='index')
        td {{ book.author }}
        td 
          a(:href="`/users/${book.user._id}/book/${book._id}/posts`") {{ book.name }}
        td {{ book.genre.name }}
</template>
  
  
  <style scoped>
   table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
  tr:hover {
    background-color: #f2f2f2;
    cursor: pointer;
  }
  a{
    text-decoration: none;
  }
  </style>
  