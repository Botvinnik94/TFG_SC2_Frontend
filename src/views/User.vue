<template>
    <div>
    <img src="https://static.starcraft2.com/dist/images/bg-game-modes-2400.3476f918e683b216da8d53fe83c1c7a4.jpg" class="back">
    <v-card width="1200px" class="pa-md-4 mx-lg-auto" flat v-if="this.user" style="margin-top: 30px" color="rgba(255, 255, 255, 0.5)">
            <v-card-title>
                <v-avatar size="64" style="margin-right: 15px">
                    <img
                        :src=user.avatar
                    >
                </v-avatar>
                {{user.name}}
            </v-card-title>
            <v-card-title>
                <v-card-subtitle v-if="user.twitter">
                    Twitter: 
                    <a :href=twitterLink>@{{ user.twitter }}</a>
                </v-card-subtitle>
            </v-card-title>
            <v-toolbar
                color="primary"
                dark
            >
                <v-toolbar-title>Bots</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn 
                    icon 
                    v-if="this.authService.currentUser && this.authService.currentUser.id === user.id"
                    @click="goToBotCreation"
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-toolbar>
            <v-list>
                <BotItem v-for="(bot, i) in user.bots"
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
import { mapActions, mapGetters } from 'vuex'
import router from '../router'
import { Container } from '../dao/Container'
import { PersistenceType } from '../dao/PersistenceType'
import { User } from '@/model/User'
import { Bot } from '@/model/Bot'
/* eslint-disable */
// @ts-ignore
import BotItem from '@/components/BotItem'

export default Vue.extend({
    name: "User",

    components: {
        BotItem
    },

    data: () => {
        return {
            id: '',
            user: undefined as User | undefined,
            twitterLink : ''
        }
    },

    computed: mapGetters(['authService']),

    async created() {
        this.id = this.$route.params.id;
        await this.getUser();
        this.twitterLink = "https://twitter.com/" + this.user?.twitter
    },

    // When the user navigates from /user/foo to /user/bar, the same component instance will be reused
    // Lifecycle hooks will not be called
    // We must update the user from the parameter here
    async beforeRouteUpdate (to, from, next) {
        await this.getUser();
        return next();
    },

    methods: {

        async getUser(){
            this.user = await Container.getDAOFactory(PersistenceType.Firebase).getUserDAO().findOne(this.id);
        },

        goToBotCreation() {
            this.$router.push('/bot-creation');
        },

        goToBotView(bot: Bot) {
            this.$router.push(`/bot/${bot.id}`)
        },
    }

})
</script>

<style scoped>
 .back {
    position:fixed;
    top: 0;
    right: -14%;
    min-width: 100%;
    min-height: 100%;
 }
</style>