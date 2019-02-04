<template src="./template.html">
</template>

<style lang="less" src="./styles.less"></style>

<script>
import calendly from '../../calendlyWidget';

export default {
  name: 'calendly',
  props: {
    url: {
      type: String,
      required: true
    },
    height: {
      type: Number,
      default: 1000
    }
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {
    calendly.widget(this.$el);
  }
};
</script>
