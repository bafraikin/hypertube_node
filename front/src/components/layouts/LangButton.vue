<template>
  <div class="locale-changer">
    <select @change="changeState" v-model="$i18n.locale">
      <option
        v-for="(lang, i) in langs"
        :key="`Lang${i}`"
        :value="lang"
        >{{ lang }}</option
      >
    </select>
  </div>
</template>

<script>
export default {
  name: 'LangButton',
  data() {
    return { langs: ['en', 'fr'] };
  },
  methods: {
    changeState(event){
      this.$store.commit("changeLangState", this.$i18n.locale);
    }
  },
  mounted(){
    this.$i18n.locale = this.$store.state.lang;
  }
};
</script>