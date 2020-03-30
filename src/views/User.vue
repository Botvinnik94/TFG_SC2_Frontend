<template>
    <div class="user">
        <v-card v-if="this.user">
            <v-card-title>
                <v-avatar size="128">
                    <img
                        :src=user.avatar
                    >
                </v-avatar>
                {{user.name}}
            </v-card-title>
            <v-toolbar
                color="indigo"
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
            <v-list three-line>
                <v-list-item
                v-for="(bot, i) in user.bots"
                :key="i"
                @click="goToBotView(bot)"
                >
                    <v-list-item-title>{{ bot.race }}</v-list-item-title>
                    <v-list-item-title>{{ bot.name }}</v-list-item-title>
                </v-list-item>       
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

export default Vue.extend({
    name: "User",

    data: () => {
        return {
            id: '',
            user: undefined as User | undefined
        }
    },

    computed: mapGetters(['authService']),

    async created() {
        this.id = this.$route.params.id;
        await this.getUser();
        console.log(this.user)
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
            try {
                this.user = await Container.getDAOFactory(PersistenceType.Firebase).getUserDAO().findOne(this.id);
            }
            catch(error) {
                // TODO: go to 404
                console.log()
            }
        },

        goToBotCreation() {
            this.$router.push('/bot-creation');
        },

        goToBotView(bot: Bot) {
            console.log('Go to bot view:', bot);
        }
    }

})
</script>