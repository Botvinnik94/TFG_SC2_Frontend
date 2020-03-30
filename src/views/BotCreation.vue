<template>
    <v-card :loading="loading">
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
import { mapGetters } from 'vuex'
import { LocalBotUploader } from '@/features/BotUploader/LocalBotUploader'
import { BotValidatorFactory } from '@/features/BotValidator/BotValidatorFactory'
import { BotValidatorServiceType } from '../features/BotValidator/BotValidatorServiceType'
import { StorageServiceFactory } from '../storage/StorageServiceFactory'
import { StorageType } from '../storage/StorageType'
import { Container } from '../dao/Container'
import { PersistenceType } from '../dao/PersistenceType'

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
      loading: false
    }),

    computed: mapGetters(['authService']),

    methods: {
      async submit () {
        if(this.$refs.form.validate()) {
            this.loading = true;
            const botUploader = new LocalBotUploader(BotValidatorFactory.getBotValidator(BotValidatorServiceType.Mock),
                                                     StorageServiceFactory.getStorageService(StorageType.Firebase),
                                                     Container.getDAOFactory(PersistenceType.Firebase).getBotDAO());
            
            const bot = await botUploader.uploadBot(this.name, this.race, this.file, this.authService.currentUser);
            console.log(bot);
            this.loading = false;
        }
      },

      changeSelectedFile (file: File) {
          this.file = file;
      },
    },
})
</script>