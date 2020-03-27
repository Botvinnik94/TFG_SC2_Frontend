<template>
   <div id="app">
       <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
        <v-container>
            <center>
                <v-flex xs4 class="grey lighten-4">
                    <v-container style="position: relative;top: 13%;" class="text-xs-center">
                    <v-card flat>
                        <v-card-title primary-title>
                        <v-img src="/img/logo.png"></v-img>
                        <h4>Login</h4>
                        </v-card-title>
                        <v-form>
                        <v-text-field prepend-icon="mdi-account" name="Email" label="Email" v-model="email"></v-text-field>
                        <v-text-field prepend-icon="mdi-lock" name="Password" label="Password" type="password" v-model="password"></v-text-field>
                        <v-card-actions>
                        <v-btn primary large block @click="signInWithEmail">Login</v-btn>
                        </v-card-actions>
                        </v-form>
                        <v-btn icon large @click="signInWithGoogle">
                            <v-img src='../assets/google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png'></v-img>
                        </v-btn>
                    </v-card>
                    </v-container>
                </v-flex>
            </center>
        </v-container>
    </div> 
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { ProviderType } from '../auth/ProviderType'

export default Vue.extend({
    name: "Login",

    data: () => {
        return {
            email: '',
            password: ''
        }
    },

    computed: mapGetters(['authService']),

    methods: {
        ...mapActions(['createAuthService']),

        async signInWithGoogle() {
            this.createAuthService(ProviderType.FirebaseWithGoogle);
            try {
                await this.authService.signIn();
                this.$router.push('/');
            }
            catch(error) {
                console.error(error)
            }
        },

        async signInWithEmail() {
            this.createAuthService(ProviderType.Firebase);
            try {
                await this.authService.signIn({ email: this.email, password: this.password });
                this.$router.push('/');
            }
            catch(error) {
                console.error(error)
            }
        }
    }
})
</script>

<style scoped>
</style>