<template>
    <v-card>
        <v-toolbar
            color="primary"
            dark
        >
            <v-icon>{{ icon }}</v-icon>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-data-table
            @click:row="openCompetition"
            :headers="headers"
            :items="tournaments"
            :items-per-page="5"
            class="elevation-1"
            no-data-text="No tournaments"
        ></v-data-table>
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Tournament } from '@/model/Tournament'

export default Vue.extend({
    name: "CompetitionTable",
    data: () => {
        return {
            headers: [
                {text: 'Name', value: 'name'},
                {text: 'Tournament Type', value: 'formattedType'},
                {text: 'Participants', value: 'participants.length'},
                {text: 'Starting Date', value: 'formattedStartingDate'}
            ],
        }
    },

    props:['tournaments', 'title', 'icon'],

    methods: {
        openCompetition(tournament: Tournament) {
            this.$router.push(`/competition/${tournament.id}`)
        },
    }
})
</script>