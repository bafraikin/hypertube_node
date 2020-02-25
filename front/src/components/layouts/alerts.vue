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
          case "NOT_ALLOWED":
            return "you're not allowed to perform this";
          case "BAD_INPUT":
            return "bad input"
          case "CREATED":
            return "action granteed";
          case "NO_TOUCHING":
            return "No touching the code 🤬";
          case "YOU_HAVE_TO_YES":
            return "You have to click yes 🤣";
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
