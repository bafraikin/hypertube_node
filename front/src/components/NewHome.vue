<template>
<div>  
  <v-container v-if="isConnected">
    <h1>{{ $t('researchpage') }}</h1>
    <ResearchBar v-if="showResearchBar" v-on:moviesResearch="researchMovieFun($event)" ></ResearchBar>
    <MovieVignette :movies="moviesToDisplay" v-if="showMovieVignette" v-on:selectMovie="showMovieDetailsFun($event)" ></MovieVignette>
    <pagination v-if="loaderShouldBeDisplayed" v-on:displayNewResults="popStackMovie()"/> 
  </v-container >
  <v-card v-else>
    <h3 class="font-weight-black text-center" style="position: relative; top: 18vw ;font-size:3vw">
      Hypertubulaire</h3>
    <p class="font-weight-black text-center" style="position: relative; top: 18vw ;font-size:3vw">
      {{ $t("headline")}}
    </p>
    <img src="img/F&T.gif" width="100%"/>
  </v-card>
</div>
</template>


<script>
  import axios from  '@/config/axios_default';
  import ResearchBar from '@/components/ResearchBar.vue'
  import MovieVignette from '@/components/MovieVignette.vue'
  import pagination from '@/components/utils/pagination.vue'

  export default {
    name: 'home',
    components: {
      "ResearchBar": ResearchBar,
      "MovieVignette": MovieVignette,
      pagination,
    },
    data() {
      return {
        showMovieVignette: false,
        showResearchBar: true,
        moviesToDisplay: [],
        moviesStack: [],
        page: 1,
        lastResearch: {},
        OMDBid: null,
        maxResultNumber: 20,
        lastResultGivedMaxNumberResult: false,
      }
    },
    methods:{
      showMovieDetailsFun(movie){
		this.$router.push({ name: "movie", params:{OMDBid: movie.id}});
      },
      researchMovieFun(research) {
        this.lastResearch = research;
        axios.get('/😂/research', { params: {
          lang: this.$i18n.locale,
          firstYear: research.firstYear,
          lastYear: research.lastYear,
          minMark: research.firstNote,
          maxMark: research.lastNote,
          queryString: research.queryString,
          gender: research.gender,
          page: this.chooseResearchPage(research.page)
        }
        }).then(response => {
          if (this.page != 1) {
            this.moviesToDisplay.push(...response.data.slice(0, 10));
            this.moviesStack.push(...response.data.slice(10));
          }
          else {
            this.moviesToDisplay = response.data.slice(0, 10);
            this.moviesStack =  response.data.slice(10);
          }
          this.lastResultGivedMaxNumberResult = (response.data.length === this.maxResultNumber);
          this.showMovieVignette = true;
        })
        this.lastResearch.page = null;
      },
      chooseResearchPage(pageNumber) {
        if (pageNumber == null && this.page++)
          return (this.page);
        this.page = 1;
        return pageNumber;
      },
      popStackMovie() {
        if (this.moviesStack.length >= 10)
          this.moviesToDisplay.push(...this.moviesStack.splice(0,10));
        else if (this.moviesStack.length > 0 && !this.lastResultGivedMaxNumberResult)
          this.moviesToDisplay.push(...this.moviesStack.splice(0,10));
        else
          this.researchMovieFun(this.lastResearch);
      }
    },
    computed: {
      loaderShouldBeDisplayed() {
        return this.lastResultGivedMaxNumberResult || this.moviesStack.length > 0
      },
    isConnected() {
      return this.$store.getters.connected;
    }
    }
  }

</script>

