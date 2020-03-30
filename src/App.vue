<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >

      <v-spacer></v-spacer>
      <v-btn v-if="user" text @click="goToProfile">
        <v-avatar left>
            <img
            :src=user.avatar
            >
        </v-avatar>
        {{ user.name }}
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { AbstractUserDAO } from './dao/AbstractUserDAO';
import { Container } from './dao/Container';
import { PersistenceType } from './dao/PersistenceType';
import { User } from './model/User';
import { App } from './firebase/App';
import * as firebase from 'firebase';
import { FirebaseAuthService } from './auth/FirebaseAuthService';
import { FirebaseGoogleAuthService } from './auth/FirebaseGoogleAuthService'
import { AuthServiceFactory } from './auth/AuthServiceFactory';
import { ProviderType } from './auth/ProviderType';
import { mapGetters, mapActions } from 'vuex';

export default Vue.extend({
  name: 'App',

  data: () => ({
    name : '',
    email: '',
    password: '',
    user: null as User | undefined | null,
  }),

  computed: mapGetters(['authService']),

  mounted() {
    this.authService.onAuthStateChanged.subscribe( (user: User | undefined | null) => {
        this.user = user;
    })
  },

  methods: {
      goToProfile() {
          this.$router.push(`/user/${this.user?.id}`);
      }
  }

});
</script>
