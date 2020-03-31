<template>
    <div class="bot">
        <v-card v-if="this.bot">
            <v-card-title>

                <RaceImage v-bind:race="bot.race"></RaceImage>
                Bot {{ bot.name }}
            </v-card-title>
            <v-card-text>
                <v-card-title>Creator:
                    <v-btn 
                        text
                        small
                        @click="goToUser"
                    >
                        <v-avatar size="36">
                            <img
                                :src=bot.useravatar
                            >
                        </v-avatar>
                        {{ bot.username }}
                    </v-btn>
                </v-card-title>
            </v-card-text>
            <v-card-actions>
                <v-btn v-if="this.authService.currentUser && this.authService.currentUser.id === bot.uid"
                        @click="downloadScript">
                    Download script
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Bot } from '../model/Bot';
import { User } from '@/model/User';
import { Container } from '../dao/Container';
import { PersistenceType } from '../dao/PersistenceType';
import { StorageServiceFactory } from '../storage/StorageServiceFactory';
import { StorageType } from '../storage/StorageType';
import RaceImage from '@/components/RaceImage';

export default Vue.extend({
    name: "Bot",

    components: {
        RaceImage
    },

    data: () => {
        return {
            id: '',
            bot: undefined as Bot | undefined
        }
    },

    computed: mapGetters(['authService']),

    async created() {
        this.id = this.$route.params.id;
        await this.getBot();
        console.log(this.bot)
    },
    
    // When the user navigates from /user/foo to /user/bar, the same component instance will be reused
    // Lifecycle hooks will not be called
    // We must update the bot from the parameter here
    async beforeRouteUpdate (to, from, next) {
        await this.getBot();
        return next();
    },

    methods: {

        async getBot(){
            try {
                this.bot = await Container.getDAOFactory(PersistenceType.Firebase).getBotDAO().findOne(this.id);
            }
            catch(error) {
                // TODO: go to 404
                console.log()
            }
        },

        async downloadScript() {
            if(this.bot) {
                window.location.href = await StorageServiceFactory.getStorageService(StorageType.Firebase)
                                                                  .get(this.bot.script)
            }
        },

        goToUser() {
            this.$router.push(`/user/${this.bot?.uid}`)
        }
    }
})
</script>