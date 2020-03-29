<template>
  <div class="home">
    <v-card :loading="loading">
        <img alt="Vue logo" src="../assets/logo.png">
        <v-btn @click="$router.push('/about')">Go to about</v-btn>
        <v-btn @click="getuser">See current user</v-btn>
        <v-btn @click="signout">Sign out</v-btn>
        <p>{{ user }}</p>
        <v-file-input @change="changeSelectedFile" small-chips label="File input"></v-file-input>
        <v-btn @click="upload">Upload</v-btn>
        <v-btn @click="download">Download</v-btn>
        <v-btn @click="deleteFile">Delete</v-btn>
    </v-card>
    <img id=myimg>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex'
import { User } from '@/model/User'
import { FirebaseStorageService } from '../storage/FirebaseStorageService';
// @ is an alias to /src

export default Vue.extend({
  name: 'Home',

  data: () => ({
    file: {} as File,
    user: null as User | null,
    loading: false
  }),

  computed: mapGetters(['authService', 'storageService']),

  methods: {

    async getuser() {
      this.user = this.authService.currentUser;
    },

    async signout() {
      await this.authService.signOut();
      this.$router.push('/login')
    },

    changeSelectedFile(file: File) {
        this.file = file;
        console.log(this.file)
    },

    async upload(){
        this.loading = true;
        try{
            console.log(await this.storageService.put(this.file, this.file.name));
        }
        catch(error) {
            console.error(error);
        }
        finally {
            this.loading = false;
        }
    },

    async download() {
        this.loading = true;
        try{
            window.location.href = await this.storageService.get('https://firebasestorage.googleapis.com/v0/b/sc2-arena.appspot.com/o/Wappen_L%C3%BCbeck.svg?alt=media&token=3a441c2f-ef5c-424f-8add-4efbb6a06116');
            //saveAs(blob, 'test.svg');
        }
        catch(error) {
            console.error(error);
        }
        finally {
            this.loading = false;
        }
    },

    async deleteFile() {
        try{
           await this.storageService.delete('https://firebasestorage.googleapis.com/v0/b/sc2-arena.appspot.com/o/Wappen_Lübeck.svg');
           alert("Deleted")
            //saveAs(blob, 'test.svg');
        }
        catch(error) {
            console.error(error);
        }
        finally {
            this.loading = false;
        }
    }
  }
})
</script>
