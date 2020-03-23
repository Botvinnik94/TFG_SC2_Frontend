<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-card>
        <v-text-field
            v-model="name"
            label="Outlined"
            outlined
        ></v-text-field>
        <v-btn @click="find">buscar</v-btn>
        <v-btn @click="add">add</v-btn>
      </v-card>
      <p>{{ result }}</p>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { AbstractUserDAO } from './dao/AbstractUserDAO';
import { Container } from './dao/Container';
import { PersistenceType } from './dao/PersistenceType';
import { User } from './model/User';

export default Vue.extend({
  name: 'App',

  data: () => ({
    name : '',
    result: [],
    dao: Container.getDAOFactory(PersistenceType.Mock).getUserDAO()
  }),

  methods: {
    async find() {
      this.result = await this.dao.find(this.name);
    },

    add() {
      this.dao.create(User.build(this.name));
    }
  }
});
</script>
