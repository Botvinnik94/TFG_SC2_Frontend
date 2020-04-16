<template>
    <v-card loading="match.status === 'pending' || match.status === 'ongoing'">
        <v-card-title>
            <RaceImage v-bind:race="match.players[0].race"></RaceImage>
            {{match.players[0].name}}
            {{match.result[0]}} - {{match.result[1]}}
            <RaceImage v-bind:race="match.players[1].race"></RaceImage>
            {{match.players[1].name}}
        </v-card-title>
        <v-select
            v-model="gameSelected"
            :items="gamesInMatch"
            label="Select game"
            solo
        ></v-select>
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { IMatch } from '../model/IMatch'
import { IGame } from '../model/IGame'
import { Container } from '../dao/Container'
import { PersistenceType } from '../dao/PersistenceType'

export default Vue.extend({
    name: "Match",

    data: () => {
        return {
            id: '',
            match: undefined as IMatch | undefined,
            gameSelected: undefined as IGame | undefined,
            gamesInMatch: [] as IGame[]
        }
    },

    async created() {
        this.id = this.$route.params.id;
        await this.getMatch();
        console.log(this.match)
    },

    methods: {

        async getMatch() {
            try {
                this.match = await Container.getDAOFactory(PersistenceType.Http).getMatchDAO().findOne(this.id);
            }
            catch(error) {
                // TODO: go to 404
                console.log(error)
            }
        }

    }
})
</script>