<template>
    <v-list-item v-bind:class="{ ownBot: (authService.currentUser && authService.currentUser.id === bot.uid)}"
                @click="$emit('click')">
        <RaceImage v-bind:race="bot.race"></RaceImage>
        <v-list-item-title v-bind:class="{ ownBotName: (authService.currentUser && authService.currentUser.id === bot.uid)}">
            {{ bot.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
            Tournament wins: {{ bot.tournamentWins.length}}
        </v-list-item-subtitle>
        <v-btn 
            text
            small
            @click="goToUserView"
        >
            <v-avatar size="24">
                <img
                    :src=bot.useravatar
                >
            </v-avatar>
            {{ bot.username }}
        </v-btn>
    </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
// @ts-ignore
import RaceImage from '@/components/RaceImage';

export default Vue.extend({
    name: "BotItem",
    props: ['bot'],

    components: {
        RaceImage
    },

    computed: mapGetters(['authService']),

    methods: {
        goToUserView() {
            this.$router.push(`/user/${this.bot.uid}`)
        }
    }
})
</script>

<style scoped>

    .ownBot {
        background-color: #a67c00;
    }

    .ownBotName {
        font-weight: bolder;
        font-size: larger;
        color: #000048;
    }

</style>