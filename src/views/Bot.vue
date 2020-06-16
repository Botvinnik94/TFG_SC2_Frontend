<template>
    <div class="bot">
        <img src="https://static.starcraft2.com/dist/images/bg-news-archive-2400--Blue-80-10.8e01428e4dec1f8ac3d562740234af07.jpg" class="back">
        <v-card v-if="this.bot" width="1000px" class="pa-md-4 mx-lg-auto" flat style="margin-top: 20px" color="rgba(255, 255, 255, 0.75)">
            <v-card-title>
                <RaceImage v-bind:race="bot.race"></RaceImage>
                Bot {{ bot.name }}
                <v-spacer></v-spacer>
                <v-btn 
                    text
                    large
                    @click="goToUser"
                >
                    <v-avatar size="42" style="margin-right: 10px">
                        <img
                            :src=bot.useravatar
                        >
                    </v-avatar>
                    {{ bot.username }}
                </v-btn>
            </v-card-title>
            <v-toolbar color="primary" dark>
                <v-icon>mdi-clock</v-icon>
                <v-toolbar-title>Recent matches</v-toolbar-title>
            </v-toolbar>
            <v-list>
                <MatchItem v-for="(match, i) in recentMatches"
                    :key="i" 
                    v-bind:match="match"
                    @click="goToMatchView(match)">
                </MatchItem>
                <v-card v-if="recentMatches.length === 0">
                    <v-card-subtitle>
                        <span><center>Your bot has not played any matches yet.</center></span>
                        <span><center><v-btn text @click="goToCompetitions">
                            Enroll it in a tournament!
                        </v-btn></center></span>
                    </v-card-subtitle>
                </v-card>
            </v-list>
            <v-card-actions>
                <v-btn v-if="this.authService.currentUser && this.authService.currentUser.id === bot.uid" dark
                        @click="downloadScript">
                    <v-icon left>mdi-cloud-download</v-icon>
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
import { IMatch } from '@/model/IMatch'
import { User } from '@/model/User';
import { Container } from '../dao/Container';
import { PersistenceType } from '../dao/PersistenceType';
import { StorageServiceFactory } from '../storage/StorageServiceFactory';
import { StorageType } from '../storage/StorageType';
// @ts-ignore
import RaceImage from '@/components/RaceImage';
// @ts-ignore
import MatchItem from '@/components/MatchItem';

export default Vue.extend({
    name: "Bot",

    components: {
        RaceImage,
        MatchItem
    },

    data: () => {
        return {
            id: '',
            bot: undefined as Bot | undefined,
            recentMatches: [] as IMatch[]
        }
    },

    computed: mapGetters(['authService']),

    async created() {
        this.id = this.$route.params.id;
        await this.getBot();
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
            this.bot = await Container.getDAOFactory(PersistenceType.Firebase).getBotDAO().findOne(this.id);
            this.recentMatches = await Container.getDAOFactory(PersistenceType.Http).getMatchDAO().find({ status: 'finished', player1: this.id }, 5)
        },

        async downloadScript() {
            if(this.bot) {
                window.location.href = await StorageServiceFactory.getStorageService(StorageType.Firebase)
                                                                  .get(this.bot.script)
            }
        },

        goToUser() {
            this.$router.push(`/user/${this.bot?.uid}`)
        },

        goToMatchView(match: IMatch) {
            this.$router.push(`/match/${match.id}`)
        },

        goToCompetitions() {
            this.$router.push(`/competition`)
        },
    }
})
</script>
<style scoped>
 .back {
    position:fixed;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
 }
</style>