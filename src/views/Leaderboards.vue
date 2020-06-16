<template>
    <div>
        <img src="https://static.starcraft2.com/dist/images/bg-media-videos-2400--Blue-60-10.5ceb6228f5f98cf7854ebd8a94969dfe.jpg" class="back">
        <v-toolbar
            width="1000px" 
            class="mx-lg-auto"
            style="margin-top: 30px"
            color="primary"
            dark
        >   
            <v-icon>mdi-trophy</v-icon>
            <v-toolbar-title>Top 10 best bots</v-toolbar-title>
        </v-toolbar>
        <v-card width="1000px" class="pa-md-4 mx-lg-auto">
            <v-list>
                <BotItem v-for="(bot, i) in bestBots"
                        v-bind:bot="bot"
                        :key="i"
                        @click="goToBotView(bot)">
                </BotItem>
            </v-list>
        </v-card>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
// @ts-ignore
import BotItem from '@/components/BotItem'
import { Bot } from '@/model/Bot'
import { Container } from '../dao/Container';
import { PersistenceType } from '../dao/PersistenceType';

export default Vue.extend({
    name: 'Leaderboards',

    components: {
        BotItem,
    },

    data: () => ({
        bestBots: [] as Bot[]
    }),

    mounted() {
        Container.getDAOFactory(PersistenceType.Firebase).getBotDAO().find({}, 10).then( bots => {
            this.bestBots = bots
        })
    },

    methods: {
        goToBotView(bot: Bot) {
            this.$router.push(`/bot/${bot.id}`)
        }
    }

})
</script>
<style scoped>
 .back {
    position:fixed;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
 }
</style>