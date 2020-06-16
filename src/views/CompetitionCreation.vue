<template>
    <v-card :loading="loading" width="1000px" class="pa-md-4 mx-lg-auto" style="margin-top: 30px">
        <v-card-title>
            Create new competition
        </v-card-title>
        <v-card-text>
            <v-form
            ref="form"
            lazy-validation
            >
                <v-text-field
                    v-model="name"
                    :counter="20"
                    :rules="nameRules"
                    label="Name"
                    prepend-icon="mdi-form-textbox"
                    required
                ></v-text-field>

                <v-select
                    v-model="type"
                    :items="types"
                    :rules="[v => !!v || 'Type of competition is required']"
                    label="Type"
                    prepend-icon="mdi-tournament"
                    required
                ></v-select>

                <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model="date"
                            label="Starting date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="dateTemp" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(dateTemp)">OK</v-btn>
                    </v-date-picker>
                </v-menu>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn
                color="success"
                class="mr-4"
                @click="create"
                >
                <v-icon left>mdi-calendar-plus</v-icon>
                Create
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Container } from '../dao/Container'
import { PersistenceType } from '../dao/PersistenceType'
import { Tournament } from '../model/Tournament'
export default Vue.extend({
    data: () => ({
      name: '',
      type: '',
      date: '',
      dateTemp: '',
      nameRules: [
        (v: any) => !!v || 'Name is required',
        (v: any) => (v && v.length <= 20) || 'Name must be less than 20 characters',
      ], 
      types: [
          "Round-Robin"
      ],
      menu: false,
      loading: false
    }),

    computed: mapGetters(['authService']),

    methods: {
        async create() {
            // @ts-ignore
            if(this.$refs.form.validate()) {
                this.loading = true
                const tournament = new Tournament([], this.name, Tournament.getType(this.type), [], [], "open", Date.parse(this.date), null, null);
                await Container.getDAOFactory(PersistenceType.Http).getCompetitionDAO(this.authService).create(tournament)
                this.loading = false
                this.$router.go(-1)
            }
        },
    }
})
</script>