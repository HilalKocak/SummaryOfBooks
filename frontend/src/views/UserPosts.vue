<script>
import { mapActions } from 'vuex';

export default {
  name: 'UserPosts',
  data() {
    return {
      user : {},
      posts:[], 
      newPostContent: '',
      book : {}

 
    }
  },
  
  async mounted() {
    try {
    await this.updatePosts()
    this.user = await this.$store.dispatch('fetchUser', this.$route.params.userId);
    this.book = await this.getBook(this.$route.params.bookId)
 
  } catch (error) {
    console.error("Error!!", error);
  }
},
  methods: {
    ...mapActions(['fetchUser', 'getQuotes', 'addPost', 'getBook']),
    async submitNewPost() {
    if (this.newPostContent.trim()) {
      await this.addPost({userId: this.$route.params.userId, bookId:this.$route.params.bookId, quote: this.newPostContent});
      this.newPostContent = ''; 
      }
      this.updatePosts()
    },
    async updatePosts(){
        this.posts = await this.$store.dispatch('getQuotes', { userId: this.$route.params.userId, bookId: this.$route.params.bookId });
    },

    
  }
}
</script>


<template lang="pug">
h1 {{ user.name }}'s Quotes of Book: {{ book.name }}
div
p There are {{ posts.length }} posts
div
    input(type="text" v-model="newPostContent" placeholder="Write a new quote..." class="new-post-input")
    button(@click="submitNewPost") Send
ul
li(v-for="post in posts" :key="post._id")
   | {{ post.quote }}


</template>

<style>
.new-post-input {
  width: 100%;
  max-width: 700px;
}
</style>