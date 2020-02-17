<template>
  <div>
    <h1>Please wait</h1> 
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
            window.location="http://127.0.0.1:8080";
          })
          .catch(err => {
            console.log("no touching ",err.response);
            bus.$emit('alert', {type: 'error', msg: "No touching the code 🤬"});
           / setTimeout(function(){ window.location="http://localhost:8080";}, 700);
          });
      }	
      else {
        console.log("the other one", err.response);
        bus.$emit('alert', {type: 'error', msg: "You have to click yes 🤣"});
      //  setTimeout(function(){ window.location="http://localhost:8080";}, 700);
      }
    },
    methods: {
    }
  };
</script>
