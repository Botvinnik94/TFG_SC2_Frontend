<template>
    <div>
        <!--v-card>
            <v-toolbar
                color="indigo"
                dark
            >
                <v-toolbar-title>Open competitions</v-toolbar-title>

                <v-spacer></v-spacer>
            </v-toolbar>
            <v-list>
                <v-list-item
                    v-for="(competition, i) in competitions"
                    :key="i"
                    @click="openCompetition(competition)"
                >
                    <v-list-item-title>{{ competition.name }}</v-list-item-title>
                    <v-list-item-subtitle>Participantes: {{competition.participants.length}}</v-list-item-subtitle>
                </v-list-item>       
            </v-list>
        </v-card-->
        <v-toolbar
            color="indigo"
            dark
        >
            <v-toolbar-title>Open competitions</v-toolbar-title>

            <v-spacer></v-spacer>
        </v-toolbar>
        <v-data-table
            @click:row="openCompetition"
            :headers="headers"
            :items="tournaments"
            :items-per-page="5"
            class="elevation-1"
        ></v-data-table>

        <v-btn @click="goToCreateCompetition" v-if="this.authService.currentUser && this.authService.currentUser.admin">
            Create new competition
        </v-btn>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Tournament } from '@/model/Tournament'
import { Container } from '../dao/Container'
import { PersistenceType } from '../dao/PersistenceType'

export default Vue.extend({
    
    computed: mapGetters(['authService']),

    data: () => {
        return {
            headers: [
                {text: 'Nombre', value: 'name'},
                {text: 'Tipo de torneo', value: 'formattedType'},
                {text: 'Participantes', value: 'participants.length'},
                {text: 'Fecha de inicio', value: 'formattedStartingDate'}
            ],
            tournaments: [] as Tournament[]
        }
    },

    async created() {
        this.tournaments = await Container.getDAOFactory(PersistenceType.Http).getCompetitionDAO().find();
    },

    methods: {
        openCompetition(tournament: Tournament) {
            this.$router.push(`/competition/${tournament.id}`)
        },

        goToCreateCompetition(){
            this.$router.push('/competition-creation')
        }
    }
})
</script>