<template>
   <div id="app">
        <video autoplay muted loop id="myVideo">
            <source src="https://bnetcmsus-a.akamaihd.net/cms/page_media/35/35K4GSF88PGP1524699104024.webm" type="video/webm">
        </video>
        <div class="content">
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
        <v-img src="/img/logo.png" height="250" contain></v-img>
        <v-container>
            <center>
                <v-card width="800px" class="pa-md-4 mx-lg-auto" flat color="rgba(0, 0, 0, 0)">
                    <v-form>
                        <v-text-field solo name="Email" label="Email" v-model="email"></v-text-field>
                        <v-text-field solo name="Password" label="Password" type="password" v-model="password"></v-text-field>
                        <v-card-actions>
                        <v-btn primary large block @click="signInWithEmail" color="secondary">Login</v-btn>
                        </v-card-actions>
                    </v-form>
                    <v-card-text>
                    <v-btn text large @click="signInWithGoogle">
                        <v-img src='../assets/google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png'></v-img>
                    </v-btn>
                    <v-btn text large @click="signInWithTwitter">
                        <v-img  src='../assets/sign-in-with-twitter.png'></v-img>
                    </v-btn>
                    </v-card-text>
                </v-card>
            </center>
        </v-container>
        </div>
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
            await this.authService.signIn();
            this.$router.push('/');
        },

        async signInWithTwitter() {
            this.createAuthService(ProviderType.FirebaseWithTwitter);
            await this.authService.signIn();
            this.$router.push('/');
        },

        async signInWithEmail() {
            this.createAuthService(ProviderType.Firebase);
            await this.authService.signIn({ email: this.email, password: this.password });
            this.$router.push('/');
        }
    }
})
</script>

<style scoped>
#myVideo {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
}

.content {
  position: fixed;
  color: #f1f1f1;
  width: 100%;
  padding: 20px;
}

.v-container {
    width: 800px
}
</style>