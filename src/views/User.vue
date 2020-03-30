<template>
    <div class="user">
        <v-card>
            <v-card-title>
                <v-avatar size="128">
                    <img
                        :src=user.avatar
                    >
                </v-avatar>
                {{user.name}}
            </v-card-title>
        </v-card>
    </div>  
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import router from '../router'
import { Container } from '../dao/Container'
import { PersistenceType } from '../dao/PersistenceType'
export default Vue.extend({
    name: "User",

    data: () => {
        return {
            id: '',
            user: {}
        }
    },

    async created() {
        this.id = this.$route.params.id;
        await this.getUser();
    },

    methods: {

        async getUser(){
            this.user = await Container.getDAOFactory(PersistenceType.Firebase).getUserDAO().findOne(this.id);
        }

    }

})
</script>