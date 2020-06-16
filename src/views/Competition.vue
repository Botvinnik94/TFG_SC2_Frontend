<template>
    <div>
    <img src="https://static.starcraft2.com/dist/images/home-keyart-2400.be718a1b9fac3cf5eb7cb4878a499b45.jpg" class="back">
    <v-card width="1300px" class="pa-md-4 mx-lg-auto" style="margin-top: 30px" color="rgba(255, 255, 255, 0.5)">
            <v-card-title>
                <v-row>
                    <v-col v-if="tournament.status === 'open'">
                    {{ tournament.name }}
                    </v-col>
                    <v-col class="col-2" v-if="tournament.status === 'open'">
                        Insciptions open
                    </v-col>
                    <v-col class="col-4" style="margin-top:-5px" v-if="authService.currentUser && tournament.status==='open'">
                        <v-select
                            v-model="botsSelected"
                            :items="comboBoxElements"
                            chips
                            label="Register your bots"
                            multiple
                            solo
                        ></v-select>
                    </v-col>
                    <v-col class="col-1" v-if="authService.currentUser && tournament.status==='open'">
                        <v-btn 
                            dark
                            @click="registerBots"
                        >
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-col>
                    <div v-if="tournament.status !== 'open'">
                    {{ tournament.name }}
                    </div>
                    <v-spacer></v-spacer>
                    <div v-if="tournament.status === 'pending'">
                        Insciptions closed
                    </div>
                    <div v-if="tournament.status === 'ongoing'">
                        Tournament ongoing
                    </div>
                    <div v-if="tournament.status === 'finished'">
                        Tournament finished
                    </div>
                </v-row>
            </v-card-title>
            <v-card-subtitle>
                {{ tournament.formattedType }} tournament
            </v-card-subtitle>
            <v-row>
                <v-card v-if="tournament.status==='open'" class="col-12">
                    <v-toolbar
                        color="primary"
                        dark
                    >   
                        <v-icon>mdi-robot</v-icon>
                        <v-toolbar-title>Participants ({{tournament.participants.length}})</v-toolbar-title>
                    </v-toolbar>
                    <v-list>
                        <BotItem v-for="(bot, i) in tournament.participants"
                                v-bind:bot="bot"
                                :key="i"
                                @click="goToBotView(bot)">
                        </BotItem>
                    </v-list>
                </v-card>
                <v-card v-if="tournament.status!=='open' && tournament.type==='round-robin'" class="col-12" flat>
                    <v-toolbar
                        color="primary"
                        dark
                    >
                        <v-icon>mdi-tournament</v-icon>
                        <v-toolbar-title>Rounds</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-col class="col-3">
                            <v-select
                                style="margin-top: 25px"
                                v-model="roundSelected"
                                :items="roundsSelection"
                                dense
                                label="Select round"
                                solo
                                @change="getRoundMatches()"
                            ></v-select>
                        </v-col>
                    </v-toolbar>
                    <v-list>
                        <MatchItem v-for="(match, i) in roundMatches"
                            :key="i" 
                            v-bind:match="match"
                            v-bind:showStatus="true"
                            @click="goToMatchView(match)">
                        </MatchItem>
                    </v-list>
                </v-card>
            </v-row>
            <v-row v-if="tournament.status!=='open'">
                <v-card class="col-6" flat>
                    <v-toolbar
                        color="primary"
                        dark
                    >   
                        <v-icon>mdi-trophy-variant</v-icon>
                        <v-toolbar-title>Rankings</v-toolbar-title>
                    </v-toolbar>
                    <v-data-table
                        :headers="rankingHeaders"
                        :items="tournament.rankings"
                        :items-per-page="5"
                        class="elevation-1"
                    ></v-data-table>
                </v-card>
                <v-card class="col-6" flat>
                    <v-toolbar
                        color="primary"
                        dark
                    >
                    <v-icon>mdi-sword</v-icon>
                        <v-toolbar-title>Matches</v-toolbar-title>
                    </v-toolbar>
                    <v-list>
                        <v-list-group prepend-icon="mdi-clock" color="primary" no-action>
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title>Pending matches ({{pendingMatches.length}})</v-list-item-title>
                                </v-list-item-content>
                            </template>
                            <v-list>
                                <MatchItem v-for="(match, i) in pendingMatches"
                                    :key="i" 
                                    v-bind:match="match"
                                    @click="goToMatchView(match)">
                                </MatchItem>
                            </v-list>
                        </v-list-group>
                        <v-list-group prepend-icon="mdi-sword-cross" color="primary" no-action>
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title>Ongoing matches ({{ongoingMatches.length}})</v-list-item-title>
                                </v-list-item-content>
                            </template>
                            <v-list>
                                <MatchItem v-for="(match, i) in ongoingMatches"
                                    :key="i" 
                                    v-bind:match="match"
                                    @click="goToMatchView(match)">
                                </MatchItem>
                            </v-list>
                        </v-list-group>
                        <v-list-group prepend-icon="mdi-check-circle" color="primary" no-action>
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title>Finished matches ({{finishedMatches.length}})</v-list-item-title>
                                </v-list-item-content>
                            </template>
                            <v-list>
                                <MatchItem v-for="(match, i) in finishedMatches"
                                    :key="i" 
                                    v-bind:match="match"
                                    @click="goToMatchView(match)">
                                </MatchItem>
                            </v-list>
                        </v-list-group>
                    </v-list>
                </v-card>
            </v-row>
    </v-card>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Tournament } from '../model/Tournament'
import { IMatch } from '@/model/IMatch'
import { Bot } from '@/model/Bot'
import { Container } from '../dao/Container';
import { PersistenceType } from '../dao/PersistenceType';
// @ts-ignore
import BotItem from '@/components/BotItem';
// @ts-ignore
import MatchItem from '@/components/MatchItem';

export default Vue.extend({
    data: () => {
        return {
            id: '',
            tournament: undefined as Tournament | undefined,
            botsSelected: [],
            comboBoxElements: [],
            pendingMatches: [] as IMatch[],
            ongoingMatches: [] as IMatch[],
            finishedMatches: [] as IMatch[],
            roundMatches: [] as IMatch[],
            roundsSelection: [] as any[] | undefined,
            roundSelected: 0 as number,
            rankingHeaders: [
                { text: 'Bot', value: 'player.name'},
                { text: 'Matches won', value: 'wins'},
                { text: 'Matches lost', value: 'loses'},
                { text: 'Games won', value: 'for'},
                { text: 'Games lost', value: 'against'}
            ]
        }
    },

    components: {
        BotItem,
        MatchItem
    },

    computed: mapGetters(['authService']),

    async mounted() {

        this.id = this.$route.params.id;
        await this.getCompetition();
        this.getComboBoxElements();

        this.roundsSelection = this.tournament?.rounds.map( (round, index) => {
            return { text: `Round ${index+1}`, value: index}
        })

        this.getRoundMatches();

        this.pendingMatches = this.tournament?.findMatches("pending") ?? [];
        this.ongoingMatches = this.tournament?.findMatches("ongoing") ?? [];
        this.finishedMatches = this.tournament?.findMatches("finished") ?? [];
    },

    async beforeRouteUpdate (to, from, next) {
        await this.getCompetition();
        this.getComboBoxElements();
        return next();
    },

    methods: {
        async getCompetition() {
            this.tournament = await Container.getDAOFactory(PersistenceType.Http).getCompetitionDAO().findOne(this.id);
        },

        async registerBots() {
            if(this.tournament?.id){
                for(let i = 0; i < this.botsSelected.length; i++) {
                    await Container.getDAOFactory(PersistenceType.Http).getCompetitionDAO(this.authService).join(this.tournament.id, this.botsSelected[i]);
                }
                await this.getCompetition();
            }
        },

        getComboBoxElements(){
            this.comboBoxElements = this.authService.currentUser?.bots.map( (bot: any) => {
                return { text: bot.name, value: bot}
            })
        },

        goToBotView(bot: Bot) {
            this.$router.push(`/bot/${bot.id}`)
        },

        goToUserView(bot: Bot) {
            this.$router.push(`/user/${bot.uid}`)
        },

        goToMatchView(match: IMatch) {
            this.$router.push(`/match/${match.id}`)
        },

        getRoundMatches(){
            this.roundMatches = this.tournament?.findMatches(undefined, undefined, this.roundSelected) ?? [];
        }
    }
})
</script>

<style scoped>
 .back {
    position:fixed;
    right: -15%;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
 }
</style>