<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <v-btn @click="$router.push('/about')">Go to about</v-btn>
    <v-btn @click="getuser">See current user</v-btn>
    <v-btn @click="signout">Sign out</v-btn>
    <p>{{ user }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// @ is an alias to /src

export default {
  name: 'Home',

  data: () => {
    return {
      user : {}
    }
  },

  computed: mapGetters(['authService']),

  methods: {

    async getuser() {
      this.user = this.authService.currentUser;
    },

    async signout() {
      await this.authService.signOut();
      this.$router.push('/login')
    }
  }
}
</script>
