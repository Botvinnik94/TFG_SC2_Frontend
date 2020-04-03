<template>
    <div>
        <v-card>
            <v-card-title>
                {{ competition.name }} - {{ competition.formattedType }}
                <v-spacer></v-spacer>
                <v-select
                    v-model="botsSelected"
                    :items="comboBoxElements"
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
                <v-toolbar-title>Participants: {{ competition.participants.length }}</v-toolbar-title>
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
                        <v-avatar size="24">
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
import RaceImage from '@/components/RaceImage'

export default Vue.extend({
    data: () => {
        return {
            id: '',
            competition: undefined as Competition | undefined,
            botsSelected: [],
            comboBoxElements: []
        }
    },

    components: {
        RaceImage
    },

    computed: mapGetters(['authService']),

    async created() {
        this.id = this.$route.params.id;
        await this.getCompetition();
        this.getComboBoxElements();
        console.log(this.competition)
    },

    async beforeRouteUpdate (to, from, next) {
        await this.getCompetition();
        this.getComboBoxElements();
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

        async registerBots() {
            console.log(this.botsSelected);
            if(this.competition?.id){
                await Container.getDAOFactory(PersistenceType.Firebase).getCompetitionDAO().join(this.competition.id, this.botsSelected[0])
                console.log("joined")
            }
        },

        getComboBoxElements(){
            this.comboBoxElements = this.authService.currentUser.bots.map( bot => {
                return { text: bot.name, value: bot}
            })
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