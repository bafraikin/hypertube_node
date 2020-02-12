<template>
  <div></div>
</template>
<script>
  import bus from '@/config/bus_event'

	export default {
    methods: {
      displayAlert(args) {
        console.log("11");
        this.$toast[`${args.type}`](args.msg, {color: args.type})
      }
    },
    created() {
      bus.$on('alert', this.displayAlert);
    }
	}
</script>
