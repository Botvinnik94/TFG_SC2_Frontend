<template>
    <v-col class="race">
        <v-img
            v-if="race == 'Terran'"
            class="shrink mr-2"
            contain
            src="@/assets/terran.png"
            transition="scale-transition"
            width="40"
        ></v-img>

        <v-img
            v-if="race == 'Zerg'"
            class="shrink mr-2"
            contain
            src="@/assets/zerg.png"
            transition="scale-transition"
            width="40"
        ></v-img>

        <v-img
            v-if="race == 'Protoss'"
            class="shrink mr-2"
            contain
            src="@/assets/protoss.png"
            transition="scale-transition"
            width="40"
        ></v-img>
    </v-col>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({

    name: "RaceImage",
    props: ['race']
})
</script>