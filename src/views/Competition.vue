<template>
    <div>
        <v-card>
            <v-card-title>
                {{ competition.name }} - {{ competition.formattedType }}
                <v-spacer></v-spacer>
                <v-select
                    v-model="botsSelected"
                    :items="botsName"
                    chips
                    label="Register your bots"
                    multiple
                    solo
                ></v-select>
                <v-btn 
                    icon
                    @click="registerBots"
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-card-title>
            <v-toolbar
                color="indigo"
                dark
            >
                <v-toolbar-title>Participants</v-toolbar-title>
            </v-toolbar>
            <v-list>
                <v-list-item
                v-for="(bot, i) in competition.participants"
                :key="i"
                @click="goToBotView(bot)"
                >
                    <v-list-item-title>
                    <RaceImage v-bind:race="bot.race"></RaceImage>
                    </v-list-item-title>
                    <v-list-item-title>{{ bot.name }}</v-list-item-title>
                    <v-btn 
                        text
                        small
                        @click="goToUserView(bot)"
                    >
                        <v-avatar size="36">
                            <img
                                :src=bot.useravatar
                            >
                        </v-avatar>
                        {{ bot.username }}
                    </v-btn>
                </v-list-item>       
            </v-list>
        </v-card>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Competition } from '../model/Competition'
import { Bot } from '@/model/Bot'
import { Container } from '../dao/Container';
import { PersistenceType } from '../dao/PersistenceType';

export default Vue.extend({
    data: () => {
        return {
            id: '',
            competition: undefined as Competition | undefined,
            botsSelected: [],
            botsName: []
        }
    },

    computed: mapGetters(['authService']),

    async created() {
        this.id = this.$route.params.id;
        await this.getCompetition();
        this.fillBotsName()
        console.log(this.competition)
    },

    async beforeRouteUpdate (to, from, next) {
        await this.getCompetition();
        this.fillBotsName()
        return next();
    },

    methods: {
        async getCompetition() {
            try {
                this.competition = await Container.getDAOFactory(PersistenceType.Firebase).getCompetitionDAO().findOne(this.id);
            }
            catch(error) {
                // TODO: go to 404
                console.log(error)
            }
        },

        fillBotsName() {
            this.botsName = this.authService.currentUser.bots.map( bot =>{
                return bot.name;
            })
        },

        registerBots() {
            console.log(this.botsSelected);
        },

        goToBotView(bot: Bot) {
            this.$router.push(`/bot/${bot.id}`)
        },

        goToUserView(bot: Bot) {
            this.$router.push(`/user/${bot.uid}`)
        }
    }
})
</script>