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
	  window.location="http://localhost:8080";
        })
        .catch(err => {
          console.log(err.response);
	   bus.$emit('alert', {type: 'error', msg: "No touching the code 🤬"});
	    setTimeout(function(){ window.location="http://localhost:8080";}, 700);
        });
	}	
	else {
	  bus.$emit('alert', {type: 'error', msg: "You have to click yes 🤣"});
	    setTimeout(function(){ window.location="http://localhost:8080";}, 700);
	}
  },
  methods: {
        }
};
</script>
