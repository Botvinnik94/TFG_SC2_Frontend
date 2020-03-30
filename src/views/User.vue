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

                <v-btn icon v-if="this.authService.currentUser && this.authService.currentUser.id === user.id">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-toolbar>
            <v-list>
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
                console.log()
            }
        }

    }

})
</script>