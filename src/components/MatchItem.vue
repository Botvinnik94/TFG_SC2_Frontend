<template>
    <v-list-item v-bind:class="{ ownMatch: (authService.currentUser && 
                                           (authService.currentUser.id === match.players[0].uid ||
                                            authService.currentUser.id === match.players[1].uid))}"
                @click="$emit('click')">
        <v-icon v-if="showStatus && match.status === 'pending'">
            mdi-clock
        </v-icon>
         <v-icon v-if="showStatus && match.status === 'ongoing'">
            mdi-sword-cross
        </v-icon>
        <RaceImage v-bind:race="match.players[0].race"></RaceImage> 
        <v-list-item-title v-bind:class="{ ownBot: authService.currentUser && authService.currentUser.id === match.players[0].uid}">
            {{ match.players[0].name }}
        </v-list-item-title>
        <v-list-item-title>
            {{ match.result[0]}}-{{ match.result[1]}}
        </v-list-item-title>
        <RaceImage v-bind:race="match.players[1].race"></RaceImage> 
        <v-list-item-title v-bind:class="{ ownBot: authService.currentUser && authService.currentUser.id === match.players[1].uid}">
            {{ match.players[1].name }}
        </v-list-item-title>
    </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import RaceImage from '@/components/RaceImage';

export default Vue.extend({
    name: "MatchItem",
    props: ['match', 'showStatus'],

    components: {
        RaceImage
    },

    computed: mapGetters(['authService'])
})
</script>

<style scoped>

    .ownMatch {
        background-color: darkseagreen;
    }

    .ownBot {
        font-weight: bolder;
        font-size: larger;
        color: darkred;
    }


</style>