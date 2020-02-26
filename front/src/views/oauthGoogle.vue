<template>
  <div>
    <h1>{{ $t('wait') }}</h1> 
  </div>
</template>

<script>
  import axios from "@/config/axios_default";
  import bus from "@/config/bus_event";

  export default {
    name: "oauthGoogle",
    mounted:function(){
      if (this.$route.query.code){
        axios
          .post("😱/oauthGoogle/callback?code=" +  this.$route.query.code)
          .then(response => {
	    console.log(response);
            this.$emit("connected");
            this.$store.commit("connectUser", response);
            window.location= process.env.VUE_APP_frontURL ;
          })
          .catch(err => {
            console.log("no touching ",err.response);
            bus.$emit('alert', {type: 'error', msg: $t('notouch') });
            setTimeout(function(){ window.location= process.env.VUE_APP_frontURL ;}, 700);
          });
      }	
      else {
        console.log("the other one", err.response);
        bus.$emit('alert', {type: 'error', msg: $t('clicky') });
        setTimeout(function(){ window.location= process.env.VUE_APP_frontURL ;}, 700);
      }
    },
    methods: {
    }
  };
</script>
