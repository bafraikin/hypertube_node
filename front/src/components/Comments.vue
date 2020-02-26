<template>
  <v-card black id="comment" class="">
    <v-list two-line>
      <template v-for="(comment, index) in comments">
        <v-subheader v-if="index == 0"> Comments </v-subheader>
        <v-divider v-if="index != 0" :inset="true"></v-divider>
        <v-list-item :key="comment.content" @click="displayUserProfile(comment.user.id)" shaped>
          <v-list-item-content>
            <v-list-item-title> {{comment.user.login}} </v-list-item-title>
            <v-list-item-subtitle class="subtitle_wrap"> {{comment.content }} </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <v-form>
      <v-textarea
        v-model="textarea"
        label="Please enter your comment"
      ></v-textarea>
      <v-btn @click="submit">submit</v-btn>
    </v-form>
  </v-card>
</template>

<script>
  import axios from  '@/config/axios_default';

  export default {
    props: {
      imdbCode: { type: String },
    },
    data() {
      return {
        comments: null,
        content: null,
        textarea: null,
      }
    },
    methods: {
      displayUserProfile(userId){
        this.$router.push({ name: "userProfile", params:{userId: userId}});
      },
      getComments(){
        axios.get('😂/comment', { params: { imdbCode: this.imdbCode }
        }) .then(response => { this.comments = response.data; })
      },
      submit(event){
        event.preventDefault();
        this.postComment();
      },
      postComment(){
        axios.post('😂/comment', { imdbCode: this.imdbCode, content: this.textarea,
        }) .then(response => { this.getComments(); })
        this.textarea = null;
      },
    },
    mounted(){
      this.getComments()
    }
  }

</script>

<style type="scss" media="screen">
  #comment {
    text-align: initial;
  }
  .subtitle_wrap {
    white-space: unset;
  }
  
</style>
