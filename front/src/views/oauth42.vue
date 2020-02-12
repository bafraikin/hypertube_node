<template>
  <div>
    
  </div>
</template>

<script>
import axios from "@/config/axios_default";

export default {
  name: "oauth42",
  mounted:function(){
  	if (this.$route.query.code){
	axios
        .post("😱/oauth42/callback?code=" +  this.$route.query.code)
        .then(response => {
          console.log(response);
          this.$emit("connected");
          this.$store.commit("connectUser", response);
        })
        .catch(err => {
          console.log(err.response);
        });
	}	
	else {
	  window.location="http://localhost:8080";
	  //alert ici
	}
  },
  methods: {
        }
};
</script>
