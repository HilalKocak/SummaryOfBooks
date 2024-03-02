
<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      newGenre: ''
    };
  },

  methods: {
    ...mapActions(['addGenre']), // post genre to api
    async submitNewGenre() {
    if (this.newGenre.trim()) {
      await this.addGenre({ userId: this.$route.params.userId, newGenre: this.newGenre });
      this.newGenre = ''; 
      }
      this.$emit('add-category');
    }
    
  
  }
}
</script>

<template lang="pug">
.column
  h2 Add Genre
  input(type='text' v-model='newGenre' placeholder='New genre name')
  button(@click='submitNewGenre') Add
</template>
  
  
  <style scoped>
  .column {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    color: #34495e;
    font-size: 22px;
    text-align: center;
    margin-bottom: 20px;
  }
  
  input[type="text"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #bdc3c7;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #27ae60;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #229954;
  }
  </style>
  