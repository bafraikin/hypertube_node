<template>
</template>



<script>
  import bus from '@/config/bus_event'


  export default {
    methods: {
      findMessage(code) {
        switch(code){
          case "UNSIGNED": 
            return "you need to sign in to perform this action";
          default:
            return "error"
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
