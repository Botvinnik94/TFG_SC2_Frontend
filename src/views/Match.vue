<template>
    <div>
    <img src="https://static.starcraft2.com/dist/images/bg-f2p-2400.659a967688f561e82d36b6bd4624c781.jpg" class="back">
    <v-card width="1000px" class="pa-md-4 mx-lg-auto" flat style="margin-top: 20px" color="rgba(255, 255, 255, 0.75)">
        <v-card-title>
            <span>
                Bo{{match.bestOf}} match
            </span>
            <v-spacer></v-spacer>
            <div v-if="match.status === 'pending'">
                <v-icon>mdi-clock</v-icon>
                Pending to play
            </div>
            <div v-if="match.status === 'ongoing'">
                <v-icon>mdi-sword-cross</v-icon>
                Playing right now
            </div>
            <div v-if="match.status === 'finished'">
                <v-icon>mdi-check-circle</v-icon>
                Finished
            </div>
        </v-card-title>
        <v-card-title>
            <RaceImage v-bind:race="match.players[0].race"></RaceImage>
            {{match.players[0].name}}
            <v-spacer></v-spacer>
            {{match.result[0]}} - {{match.result[1]}}
            <v-spacer></v-spacer>
            <RaceImage v-bind:race="match.players[1].race"></RaceImage>
            {{match.players[1].name}}
        </v-card-title>
        <v-card-text>
            <v-row v-if="match.startedAt!=undefined">
                Started at: {{startedAt}}
            </v-row>
            <v-row v-if="match.finishedAt!=undefined">
                Finished at: {{finishedAt}}
            </v-row>
        </v-card-text>
        <v-btn @click="goToTournament" dark color="darkgrey">
            Go to the tournament
        </v-btn>
        <v-card-title>
            Games:
            <v-col>
                <v-select
                    style="margin-top: 30px"
                    @change="getMapPicture"
                    v-model="gameSelected"
                    :items="gamesInMatch"
                    label="Select game"
                    solo
                ></v-select>
            </v-col>
            <v-col></v-col>
        </v-card-title>
        <v-divider style="margin-top: -30px"></v-divider>
    <div v-if="gameSelected" width="1000px" class="pa-md-4 mx-lg-auto">
        <v-card>
            <v-img
              :src="mapPictureURL"
              alt="Map picture not available"
              height="300"
              class="grey darken-4 white--text "
            >
            <v-card-title>{{ gameSelected.map }}</v-card-title>
            </v-img>
            <v-card-text v-if="gameSelected.winner=='draw'">The match was a draw</v-card-text>
            <v-card-title>
                <v-icon v-if="gameSelected.winner==1">mdi-skull</v-icon>
                <v-icon v-if="gameSelected.winner==0">mdi-trophy</v-icon>
                <RaceImage v-bind:race="gameSelected.participant1.race"></RaceImage>
                {{gameSelected.participant1.name}}
                <v-spacer></v-spacer>
                vs
                <v-spacer></v-spacer>
                <v-icon v-if="gameSelected.winner==0">mdi-skull</v-icon>
                <v-icon v-if="gameSelected.winner==1">mdi-trophy</v-icon>
                <RaceImage v-bind:race="gameSelected.participant2.race"></RaceImage>
                {{gameSelected.participant2.name}}
            </v-card-title>
            <v-card-actions>
                <v-btn @click="downloadReplay" dark color="darkgrey"><v-icon left>mdi-dice-6-outline</v-icon>Replay</v-btn>
            </v-card-actions>
          </v-card>
    </div>
    </v-card>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { IMatch } from '../model/IMatch'
import { IGame } from '../model/IGame'
import { Container } from '../dao/Container'
import { PersistenceType } from '../dao/PersistenceType'
import { StorageServiceFactory } from '../storage/StorageServiceFactory';
import { StorageType } from '../storage/StorageType';
// @ts-ignore
import RaceImage from '@/components/RaceImage'
import moment from 'moment'

export default Vue.extend({
    name: "Match",

    components : {
        RaceImage
    },

    data: () => {
        return {
            id: '',
            gamesInMatch: [] as any[],
            match: undefined as IMatch | undefined,
            gameSelected: undefined as IGame | undefined,
            mapPictureURL: undefined as string | undefined,
            startedAt: '' as string,
            finishedAt: '' as string
        }
    },

    computed: mapGetters(['authService']),

    async created() {
        this.id = this.$route.params.id;
        await this.getMatch();
        if(this.match) {
            this.gamesInMatch = this.match.games.map((game: IGame, index: number) => {
                return { text: `${index+1}: ${game.map}`, value: game };
            });

            this.startedAt = moment(this.match.startedAt).format("dddd, MMMM Do YYYY, h:mm:ss a")
            this.finishedAt = moment(this.match.finishedAt).format("dddd, MMMM Do YYYY, h:mm:ss a")
        }
    },

    methods: {

        async getMatch() {
            this.match = await Container.getDAOFactory(PersistenceType.Http).getMatchDAO().findOne(this.id);
        },

        async downloadReplay() {
            if(this.gameSelected) {
                // console.log(this.gameSelected)
                // window.location.href = await StorageServiceFactory.getStorageService(StorageType.Firebase)
                //                                                   .get(this.gameSelected.replayURL)
                window.location.href = this.gameSelected.replayURL
            }
        },

        async getMapPicture() {
            if(this.gameSelected) {
                this.mapPictureURL = await StorageServiceFactory.getStorageService(StorageType.Firebase)
                                                                .get(`gs://sc2-arena.appspot.com/maps/${this.gameSelected.map}.jpg`)
            }
        },

        goToTournament() {
            this.$router.push(`/competition/${this.match?.tournamentId}`)
        }

    }
})
</script>

<style scoped>
 .back {
    position: fixed;
    top: 0;
    min-width: 100%;
    min-height: 100%;
 }
</style>