<script>

import { mapActions } from 'vuex'
export default {
  name: 'UsersView',
  data() {
    return {
      users: [],
      isLoading: false,
      errMessage: '' 
    }
  },
  async mounted() {
    try{
      this.users = await this.fetchUsers()
    }catch(e){
      this.errMessage = e.message
    }finally{
      this.isLoading = false
    }
    
  },
  methods: {
    ...mapActions(['fetchUsers'])
  }
}
</script>

<template lang="pug">
.home 
  h1 Users 
  p(v-if="errMessage") {{ errMessage }}
  p(v-else-if="isLoading") Please Wait 
  div(v-else) 
    p There are {{ users.length }} users 
    ol
        li(v-for="user in users")
          a(:href="`/users/${user._id}`") {{ user.name }}
    
</template>


