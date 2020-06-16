<template>
    <div>
    <img src="https://bnetcmsus-a.akamaihd.net/cms/page_media/MM3GXUMP70FC1510790248850.jpg" class="back">
    <v-card width="1300px" class="pa-md-4 mx-lg-auto" flat color="rgba(0, 0, 0, 0)">
        <v-row>
            <v-col>
                <CompetitionTable :tournaments="openTournaments" title="Open tournaments" icon="mdi-door-open"></CompetitionTable>
            </v-col>
            <v-col>
                <CompetitionTable :tournaments="pendingTournaments" title="Tournaments about to start" icon="mdi-clock"></CompetitionTable>
            </v-col>
        </v-row>
        <v-col>
            <CompetitionTable :tournaments="ongoingTournaments" title="Ongoing tournaments" icon="mdi-sword-cross"></CompetitionTable>
        </v-col>


        <v-card color="rgba(255, 255, 255, 0.75)">
            <v-card-title>Finished tournaments filter</v-card-title>
            <v-card-text>
                <v-row>
                    <v-col class="px-4">
                    <v-menu
                        v-model="fromDatepickerActivator"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="200px"
                    >
                        <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model="fromDate"
                            label="From date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-on="on"
                        ></v-text-field>
                        </template>

                        <v-date-picker 
                            v-model="fromDate"
                            @input="fromDatepickerActivator = false">
                        </v-date-picker>
                    </v-menu>
                    </v-col>
                    <v-col class="px-4">
                    <v-menu
                        v-model="toDatepickerActivator"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="200px"
                    >
                        <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model="toDate"
                            label="To date"
                            prepend-icon="mdi-calendar-multiple"
                            readonly
                            v-on="on"
                        ></v-text-field>
                        </template>

                        <v-date-picker 
                            v-model="toDate"
                            @input="toDatepickerActivator = false">
                        </v-date-picker>
                    </v-menu>
                    </v-col>
                </v-row>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="searchFinishedTournaments" dark>
                    Search
                    </v-btn>
                </v-card-actions>
            </v-card-text>
            <v-col>
                <CompetitionTable :tournaments="finishedTournaments" :title="finishedTournamentsTitle" icon="mdi-check"></CompetitionTable>
            </v-col>
        </v-card>
        <v-card-actions>
            <v-btn @click="goToCreateCompetition" v-if="this.authService.currentUser && this.authService.currentUser.isAdmin" dark>
                Create new competition
            </v-btn>
        </v-card-actions>
    </v-card>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Tournament } from '@/model/Tournament'
import { Container } from '../dao/Container'
import { PersistenceType } from '../dao/PersistenceType'
// @ts-ignore
import CompetitionTable from '@/components/CompetitionTable'
import moment from 'moment'
import { ITournamentFilter } from '../model/ITournamentFilter'

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
            openTournaments: [] as Tournament[],
            ongoingTournaments: [] as Tournament[],
            finishedTournaments: [] as Tournament[],
            pendingTournaments: [] as Tournament[],
            fromDatepickerActivator: false,
            toDatepickerActivator: false,
            fromDate: moment().subtract(7, 'days').format("YYYY-MM-DD"),
            toDate: moment().format("YYYY-MM-DD"),
            finishedTournamentsTitle: 'Finished tournaments'
        }
    },

    components: {
        CompetitionTable
    },

    async mounted() {
        const competitionDAO = Container.getDAOFactory(PersistenceType.Http).getCompetitionDAO()

        competitionDAO.find({ status: "open" }).then( openTournaments => {
            this.openTournaments = openTournaments
        });
        competitionDAO.find({ status: "ongoing" }).then( ongoingTournaments => {
            this.ongoingTournaments = ongoingTournaments
        });
        competitionDAO.find({ status: "pending" }).then( pendingTournaments => {
            this.pendingTournaments = pendingTournaments
        });
        this.searchFinishedTournaments()
    },

    methods: {
        goToCreateCompetition(){
            this.$router.push('/competition-creation')
        },

        async searchFinishedTournaments() {

            const filter: ITournamentFilter = {
                fromDate: moment(this.fromDate).valueOf(),
                toDate: moment(this.toDate).add(23, 'h').add(59, 'm').add(59, 's').valueOf()
            }
            this.finishedTournaments = await Container.getDAOFactory(PersistenceType.Http).getCompetitionDAO().find(filter)
            this.updateFinishedTournamentsTitle()
        },

        updateFinishedTournamentsTitle() {
            this.finishedTournamentsTitle = "Finished tournaments from " + this.fromDate + " to " + this.toDate
        }

    }
})
</script>

<style scoped>
 .back {
    position: fixed;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
 }
</style>