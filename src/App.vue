<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
    >
      <v-btn @click="goToHome" width="50" height="50" text dark>
        <v-img
          class="shrink mr-2"
          contain
          src="@/assets/img-sc2-nav-icon.png"
          transition="scale-transition"
          width="40"
        ></v-img>
      </v-btn>

      <v-btn @click="goToCompetitions" height="50" text dark>
        Competitions
      </v-btn>

      <v-btn @click="goToLeaderboards" height="50" text dark>
        Leaderboard
      </v-btn>

      <v-btn @click="goToAbout" height="50" text dark>
        About
      </v-btn>

      <v-spacer></v-spacer>
      <v-menu
        offset-y 
        close-on-click 
        close-on-content-click 
        transition="slide-y-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn dark v-if="user" text v-on="on" height="50">
            <v-avatar left style="margin-right: 10px">
                <img
                :src=user.avatar
                >
            </v-avatar>
            {{ user.name }}
          </v-btn>
          <v-btn v-else @click="goToSignIn" color="secondary">
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

    <v-content class="background">
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
        action: undefined as unknown
      },
      {
        name: 'Sign out',
        icon: 'mdi-logout',
        action: undefined as unknown
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

      goToLeaderboards(){
          this.$router.push('/leaderboards');
      },

        goToAbout() {
            this.$router.push('/about')
        },

      async signOut() {
        await this.authService.signOut();
      },
  }

});
</script>

<style>
    .background {
        background-image: url("https://bnetcmsus-a.akamaihd.net/cms/page_media/JH0RQWQ9CMKM1510790242312.jpg");
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-position: 50%;
    }
</style>