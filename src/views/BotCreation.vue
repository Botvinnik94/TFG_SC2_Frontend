<template>

    <div>
    <img src="https://static.starcraft2.com/dist/images/bg-resources-2400.1ae98d94bfb267cf7e546743be8dea82.jpg" class="back">
    <v-card :loading="loading" width="1000px" class="pa-md-4 mx-lg-auto" style="margin-top: 30px">
        <v-card-title>
            Upload a bot
        </v-card-title>
        <v-card-subtitle>
            In order for a bot to work in the system, you must create it with the guidelines stated in the <a href="https://github.com/BurnySc2/python-sc2">BurnySC2 github repository</a>, as you must use that library.<strong> The main class of your python script MUST have the exact same name as the name of your bot</strong>, otherwise the system will not find it.
        </v-card-subtitle>
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
                <v-icon left dark>mdi-cloud-upload</v-icon>
                Submit
            </v-btn>
        </v-card-actions>
    </v-card>
    </div>
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
        (v: any) => !!v || 'Name is required',
        (v: any) => (v && v.length <= 20) || 'Name must be less than 20 characters',
      ], 
      races: [
          "Terran",
          "Zerg",
          "Protoss"
      ],
      loading: false
    }),

    computed: mapGetters(['authService']),

    methods: {
      async submit () {
        // @ts-ignore
        if(this.$refs.form.validate()) {
            this.loading = true;
            const botUploader = new LocalBotUploader(BotValidatorFactory.getBotValidator(BotValidatorServiceType.Mock),
                                                     StorageServiceFactory.getStorageService(StorageType.Firebase),
                                                     Container.getDAOFactory(PersistenceType.Firebase).getBotDAO());
            
            await botUploader.uploadBot(this.name, this.race, this.file, this.authService.currentUser);
            this.loading = false;
            this.$router.go(-1)
        }
      },

      changeSelectedFile (file: File) {
          this.file = file;
      },
    },
})
</script>

<style scoped>
 .back {
    position:fixed;
    top: 0;
    min-width: 100%;
    min-height: 100%;
 }
</style>