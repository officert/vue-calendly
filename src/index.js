import VueCalendly from './components/Calendly';

// expose component and service to global scope
if (typeof window !== 'undefined' && window.Vue) {
  if (window.vue2PanelDebug) {
    console.log('installing Vue js plugin - browser'); //eslint-disable-line
  }

  window.Vue.use({
    install(NewVue) {
      NewVue.component('calendly', VueCalendly);
    }
  });
}

export default {
  install: function(NewVue) {
    NewVue.component('calendly', VueCalendly);
  },
  VueCalendly
};
