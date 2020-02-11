<template>
  <div></div>
</template>
<script>
  import bus from '@/config/bus_event'

	export default {
    methods: {
      displayAlert(args) {
        this.$toast[`${args.type}`](args.msg)
      }
    },
    created() {
      bus.$on('alert', this.displayAlert);
    }
	}
</script>
