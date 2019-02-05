<template src="./template.html">
</template>

<style lang="less" src="./styles.less"></style>

<script>
import calendly from '../../calendlyWidget';

export default {
  name: 'vue-calendly',
  props: {
    url: {
      type: String,
      required: true
    },
    height: {
      type: Number,
      default: 600
    }
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {
    const vm = this;

    calendly.widget(this.$el, {
      onLoad(e) {
        vm.$emit('load', e);
      }
    });
  }
};
</script>
