<script>
import { mapActions } from 'vuex';

export default {
  name: 'UserPosts',
  data() {
    return {
      user : {},
      posts:[]
 
    }
  },
  
  async mounted() {
    try {
    this.user = await this.$store.dispatch('fetchUser', this.$route.params.userId);
    this.posts = await this.$store.dispatch('getQuotes', { userId: this.$route.params.userId, bookId: this.$route.params.bookId });
  } catch (error) {
    console.error("Error!!", error);
  }
},
  methods: {
    ...mapActions(['fetchUser', 'getQuotes']),
  
  }
}
</script>


<template lang="pug">
h1 {{ user.name }} 
div
p There are {{ posts.length }} posts
ul
li(v-for="post in posts" :key="post._id")
   h1 Book: {{ post.book.name }}
   | {{ post.quote }}


</template>