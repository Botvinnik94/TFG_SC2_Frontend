import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#000030',
            secondary: '#a67c00',
            accent: '#8c9eff',
            error: '#b71c1c',
          },
        },
      },
});
