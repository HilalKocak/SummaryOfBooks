
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
      // When clicked the book
      this.selectedBook = index === this.selectedBook ? null : index;
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
      tr(v-for='(book, index) in books', :key='index', @click='toggleQuote(index)')
        td {{ book.author }}
        td {{ book.name }}
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
  </style>
  