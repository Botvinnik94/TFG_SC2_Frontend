<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >

      <v-spacer></v-spacer>
      <v-avatar>
        <img v-if="authService"
          :src=authService.currentUser.avatar
        >
      </v-avatar>
      <span v-if="authService">{{authService.currentUser.name}}</span>
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
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'App',

  data: () => ({
    name : '',
    email: '',
    password: '',
    result: [],
  }),

  computed: mapGetters(['authService']),

});
</script>
