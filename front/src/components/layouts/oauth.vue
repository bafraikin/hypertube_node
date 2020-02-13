<template>
  <div>
    <v-btn @click="connectFortytwo" color="success" class="mr-4" >42connect</v-btn>
    <v-btn color="success" class="mr-4" @click="connectGoogle">GoogleConnect</v-btn>
  </div>
</template>

<script>
import axios, {baseURL} from "@/config/axios_default";

export default {
  name: "oauth",
  methods: {
    connectFortytwo() {
    window.location= baseURL + "/😱/oauth42"
    },
    connectGoogle() {
      axios
        .post("😱/test")
        .then(response => {
          console.log(response);
          this.$emit("connected");
          this.$store.commit("connectUser", response);
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  }
};
</script>
