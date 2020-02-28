<template>
</template>



<script>
  import bus from '@/config/bus_event'
  export default {
    methods: {
      findMessage(code) {
        switch(code){
          case "UNSIGNED":
            return this.$t('needsignin');
          case "NOT_ALLOWED":
            return this.$t('notallowed');
          case "BAD_INPUT":
            return this.$t('badinput');
          case "CREATED":
            return this.$t('granteed');
          case "NO_TOUCHING":
            return this.$t('notouch');
          case "YOU_HAVE_TO_YES":
            return this.$t('clicky');
          case "WELL_DONE":
            return this.$t('welldone');
          case "OLD_TOKEN":
            return this.$t('oldtoken');
          default:
            return this.$t('error');
        }
      },
      displayAlert(args) {
        if (args.code !== undefined)
          this.$toast[`${args.type}`](this.findMessage(args.code))
        else
          this.$toast[`${args.type}`](args.msg)
      }
    },
    created() {
      bus.$on('alert', this.displayAlert);
    }
  }
</script>
