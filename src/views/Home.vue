<template>
  <div>
    <v-card width="1200px" class="pa-md-4 mx-lg-auto" flat style="margin-top: 30px" color="rgba(255,255, 255, 0.85)">
    <p>Welcome to the SC2 Arena! In this website you could compete with other users for the to see who has the best Starcraft 2 bot-creation skills. By uploading your SC2 Python bots and enrolling them in tournaments between bots from other users. Maybe your bot will never win Serral or Innovation, but machines should compete with machines. Hone your skills and upload a bot!</p>
    <v-list>
        <v-toolbar
            color="primary"
            dark
        >
        <v-icon>mdi-clock</v-icon>
            <v-toolbar-title>Recently finished matches</v-toolbar-title>
        </v-toolbar>
        <MatchItem v-for="(match, i) in recentMatches"
            :key="i" 
            v-bind:match="match"
            @click="goToMatchView(match)">
        </MatchItem>
    </v-list>
    <CompetitionTable :tournaments="openTournaments" title="Tournaments open for registration" icon="mdi-tournament"></CompetitionTable>
  </v-card></div>
</template>

<script lang="ts">
import Vue from 'vue';
// @ts-ignore
import CompetitionTable from '@/components/CompetitionTable'
// @ts-ignore
import MatchItem from '@/components/MatchItem'
import { mapActions, mapGetters } from 'vuex'
import { IMatch } from '../model/IMatch';
import { Container } from '../dao/Container';
import { PersistenceType } from '../dao/PersistenceType';
import { Tournament } from '../model/Tournament';
// @ is an alias to /src

export default Vue.extend({
    name: 'Home',

    components: {
        MatchItem,
        CompetitionTable
    },

    data: () => ({
        recentMatches: [] as IMatch[],
        openTournaments: [] as Tournament[]
    }),

    computed: mapGetters(['authService']),

    mounted() {
        Container.getDAOFactory(PersistenceType.Http).getMatchDAO().find({ status: 'finished' }, 5).then( matches => {
            this.recentMatches = matches
        })
        Container.getDAOFactory(PersistenceType.Http).getCompetitionDAO().find({ status: 'open' }).then( tournaments => {
            this.openTournaments = tournaments
        })
    },

    methods: {
        goToMatchView(match: IMatch) {
            this.$router.push(`/match/${match.id}`)
        }
    }
})
</script>