<template>
    <div>
        <v-card :loading="loading">
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
                    Create
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Container } from '../dao/Container'
import { PersistenceType } from '../dao/PersistenceType'
import { Competition } from '../model/Competition'
export default Vue.extend({
    data: () => ({
      name: '',
      type: '',
      date: '',
      dateTemp: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters',
      ], 
      types: [
          "Round-Robin",
          "Single Elimination",
          "Double Elimination"
      ],
      menu: false,
      loading: false
    }),

    methods: {
        async create() {
            if(this.$refs.form.validate()) {
                try {
                    const competition = new Competition([], this.name, Competition.getType(this.type), [], [], "open", Date.parse(this.date), null, null);
                    await Container.getDAOFactory(PersistenceType.Firebase).getCompetitionDAO().create(competition);
                }
                catch(error) {

                    // TODO: dialog that states error on creation

                    console.error(error);
                }
            }
        },
    }
})
</script>