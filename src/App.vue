<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-btn @click="goToHome" height="50" text>
        <v-img
          class="shrink mr-2"
          contain
          src="@/assets/logo.svg"
          transition="scale-transition"
          width="40"
        ></v-img>
      </v-btn>

      <v-btn @click="goToCompetitions" height="50" text>
        Competitions
      </v-btn>

      <v-btn height="50" text>
        Leaderboards
      </v-btn>

      <v-spacer></v-spacer>
      <v-menu
        offset-y 
        close-on-click 
        close-on-content-click 
        transition="slide-y-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn v-if="user" text v-on="on" height="50">
            <v-avatar left>
                <img
                :src=user.avatar
                >
            </v-avatar>
            {{ user.name }}
          </v-btn>
          <v-btn v-else @click="goToSignIn">
            Sign In
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, i) in profileMenuItems"
            :key="i"
            @click="item.action"
          >
            <v-icon>{{ item.icon }}</v-icon>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
    profileMenuItems: 
    [
      {
        name: 'Profile',
        icon: 'mdi-account',
        action: undefined
      },
      {
        name: 'Sign out',
        icon: 'mdi-logout',
        action: undefined
      }
    ]
  }),

  computed: mapGetters(['authService']),

  mounted() {
    this.authService.onAuthStateChanged.subscribe( (user: User | undefined | null) => {
        this.user = user;
    })

    this.profileMenuItems[0].action = this.goToProfile;
    this.profileMenuItems[1].action = this.signOut
  },

  methods: {
      goToProfile() {
          this.$router.push(`/user/${this.user?.id}`);
      },

      goToSignIn() {
          this.$router.push('/login');
      },

      goToHome(){
          this.$router.push('/');
      },

      goToCompetitions(){
          this.$router.push('/competition');
      },

      async signOut() {
        await this.authService.signOut();
      },
  }

});
</script>
