<template>
    <div>
        <v-card>
            <v-card-title>
                {{ tournament.name }}
                <v-spacer></v-spacer>
                <v-col class="col-2" v-if="tournament.status === 'open'">
                    Insciptions open
                </v-col>
                <v-col v-if="authService.currentUser && tournament.status==='open'">
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
                </v-col>
                <v-col class="col-2" v-if="tournament.status === 'pending'">
                    Insciptions closed
                </v-col>
                <v-col class="col-2" v-if="tournament.status === 'ongoing'">
                    Tournament ongoing
                </v-col>
                <v-col class="col-2" v-if="tournament.status === 'finished'">
                    Tournament finished
                </v-col>
            </v-card-title>
            <v-card-subtitle>
                {{ tournament.formattedType }} tournament
            </v-card-subtitle>
            <v-row>
                <v-card v-if="tournament.status==='open'" class="col-12">
                    <v-toolbar
                        color="indigo"
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
                <v-card v-if="tournament.status!=='open' && tournament.type==='round-robin'" class="col-12">
                    <v-toolbar
                        color="indigo"
                        dark
                    >
                        <v-icon>mdi-tournament</v-icon>
                        <v-toolbar-title>Rounds</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-col class="col-3">
                            <v-select
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
                <v-card class="col-6">
                    <v-toolbar
                        color="indigo"
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
                <v-card class="col-6">
                    <v-toolbar
                        color="indigo"
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
import BotItem from '@/components/BotItem';
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
            roundsSelection: [] as number[] | undefined,
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

    async created() {

        this.id = this.$route.params.id;
        await this.getCompetition();
        this.authService.onAuthStateChanged.subscribe(() => {
            this.getComboBoxElements();
        });

        this.roundsSelection = this.tournament?.rounds.map( (round, index) => {
            return index;
        })

        this.getRoundMatches();

        this.pendingMatches = this.tournament?.findMatches("pending") ?? [];
        this.ongoingMatches = this.tournament?.findMatches("ongoing") ?? [];
        this.finishedMatches = this.tournament?.findMatches("finished") ?? [];
        console.log(this.tournament);

    },

    async beforeRouteUpdate (to, from, next) {
        await this.getCompetition();
        this.getComboBoxElements();
        return next();
    },

    methods: {
        async getCompetition() {
            try {
                this.tournament = await Container.getDAOFactory(PersistenceType.Http).getCompetitionDAO().findOne(this.id);
            }
            catch(error) {
                // TODO: go to 404
                console.log(error)
            }
        },

        async registerBots() {
            console.log(this.botsSelected);
            if(this.tournament?.id){
                await Container.getDAOFactory(PersistenceType.Http).getCompetitionDAO(this.authService).join(this.tournament.id, this.botsSelected[0]);
            }
        },

        getComboBoxElements(){
            this.comboBoxElements = this.authService.currentUser.bots.map( (bot: any) => {
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