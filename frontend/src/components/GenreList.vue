<script>
export default {
  props: {
    genres: Array
 },
  data() {
  
  }

}
</script>
<template lang="pug">
h2 Genres
.category(v-for='(genre, index) in genres', :key='index')
  span.badge {{ genre.name }}
</template>
  

  
  <style scoped>
 .category {
    display: flex;
    display: inline;
  }
  .badge {
    display: inline;
    margin-right: 5px;
    margin-bottom: 5px;
    padding: 5px 10px;
    background-color: #007bff;
    color: #fff;
    border-radius: 15px;
  }
  </style>
  