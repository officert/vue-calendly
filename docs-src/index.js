import Vue from 'vue';
import VueCalendly from '../src/index';

import App from './components/App';
import router from './router';

Vue.use(VueCalendly);

new Vue({
    template: '<App></App>',
    router,
    components: {
      App
    }
  })
  .$mount('#app');
