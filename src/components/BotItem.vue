<template>
    <v-list-item v-bind:class="{ ownBot: (authService.currentUser && authService.currentUser.id === bot.uid)}"
                @click="$emit('click')">
        <RaceImage v-bind:race="bot.race"></RaceImage>
        <v-list-item-title v-bind:class="{ ownBotName: (authService.currentUser && authService.currentUser.id === bot.uid)}">
            {{ bot.name }}
        </v-list-item-title>
        <v-btn 
            text
            small
            @click="goToUserView(bot)"
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
import RaceImage from '@/components/RaceImage';

export default Vue.extend({
    name: "BotItem",
    props: ['bot'],

    components: {
        RaceImage
    },

    computed: mapGetters(['authService'])
})
</script>

<style scoped>

    .ownBot {
        background-color: darkseagreen;
    }

    .ownBotName {
        font-weight: bolder;
        font-size: larger;
        color: darkred;
    }

</style>