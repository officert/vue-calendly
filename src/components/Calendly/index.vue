<template src="./template.html">
</template>

<style lang="less" src="./styles.less"></style>

<script>
import calendly from '../../calendlyWidget';

export default {
  name: 'calendly',
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {
    calendly.widget(this.$refs.calendarWrapper);
  }
};
</script>
