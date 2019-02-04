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

// const firstScript = document.getElementsByTagName('script')[0];
// const script = document.createElement('script');
// script.src = 'https://assets.calendly.com/assets/external/widget.js';
//
// firstScript.parentNode.insertBefore(script, firstScript);

export default {
  install: function(NewVue) {
    NewVue.component('calendly', VueCalendly);
  },
  VueCalendly
};
