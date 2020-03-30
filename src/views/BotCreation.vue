<template>
    <v-card>
        <v-card-title>
            Upload a bot
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
                    v-model="race"
                    :items="races"
                    :rules="[v => !!v || 'Race is required']"
                    label="Race"
                    required
                ></v-select>

                <v-file-input 
                @change="changeSelectedFile" 
                :rules="[v => !!v || 'Script is required']"
                small-chips 
                label="Python script"
                required
                >
                </v-file-input>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn
                color="success"
                class="mr-4"
                @click="submit"
                >
                Submit
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({

    name: "BotCreation",

    data: () => ({
      name: '',
      race: '',
      file: {} as File,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters',
      ], 
      races: [
          "Terran",
          "Zerg",
          "Protoss",
          "Random"
      ],
    }),

    methods: {
      submit () {
        if(this.$refs.form.validate()) {
            console.log("Submit");
        }
      },

      changeSelectedFile (file: File) {
          this.file = file;
      }
    },
})
</script>