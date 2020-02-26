<template>
</template>



<script>
  import bus from '@/config/bus_event'
  export default {
    methods: {
      findMessage(code) {
        let language = this.$i18n.locale;
        console.log(this.$i18n);
        switch(code){
          case "UNSIGNED":
            return this.whichMess(language, "needsignin");
          case "NOT_ALLOWED":
            return this.whichMess(language, "notallowed");
          case "BAD_INPUT":
            return this.whichMess(language, "badinput");
          case "CREATED":
            return this.whichMess(language, "granteed");
          default:
            return "error"
        }
      },
      whichMess(lang, mess){
        switch(mess){
          case "granteed":
            if (lang == "fr"){
              return this.$i18n.messages.fr.granteed;
            }
            else{
              return this.$i18n.messages.en.granteed;
            }
          case "badinput":
            if (lang == "fr"){
              return this.$i18n.messages.fr.badinput;
            }
            else{
              return this.$i18n.messages.en.badinput;
            }
          case "notallowed":
            if (lang == "fr"){
              return this.$i18n.messages.fr.notallowed;
            }
            else{
              return this.$i18n.messages.en.notallowed;
            }
          case "needsignin":
            if (lang == "fr"){
              return this.$i18n.messages.fr.needsignin;
            }
            else{
              return this.$i18n.messages.en.needsignin;
            }
          default:
            if (lang == "fr"){
              return "erreur";
            }
            else{
              return "error";
            }             
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
