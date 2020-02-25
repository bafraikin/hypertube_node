<template>
  <div>
    <h1>Please wait</h1> 
  </div>
</template>

<script>
  import axios from "@/config/axios_default";
  import bus from "@/config/bus_event";

  export default {
    name: "oauth42",
    mounted:function(){
      if (this.$route.query.code){
        axios
          .post("😱/oauth42/callback?code=" +  this.$route.query.code)
          .then(response => {
            this.$emit("connected");
            this.$store.commit("connectUser", response);
            window.location= process.env.VUE_APP_frontURL ;
          })
          .catch(err => {
            console.log(err.response);
            bus.$emit('alert', {type: 'error', code: "NO_TOUCHING"});
            setTimeout(function(){ window.location= process.env.VUE_APP_frontURL ;}, 700);
          });
      }	
      else {
        bus.$emit('alert', {type: 'error', code: "YOU_HAVE_TO_YES"});
        setTimeout(function(){ window.location= process.env.VUE_APP_frontURL ;}, 700);
      }
    },
    methods: {
    }
  };
</script>
