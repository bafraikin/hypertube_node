<template>
  <v-container >
    <h1>New Home</h1>
    <ResearchBar v-if="showResearchBar" v-on:moviesResearch="researchMovieFun($event)" ></ResearchBar>
    <MovieVignette :movies="moviesToDisplay" v-if="showMovieVignette" v-on:selectMovie="showMovieDetailsFun($event)" ></MovieVignette>
    <MovieDetails  v-if="showMovieDetails" :OMDBid="OMDBid"></MovieDetails>
    <pagination v-if="loaderShouldBeDisplayed" v-on:displayNewResults="popStackMovie()"/> 
  </v-container >
</template>


<script>
  import axios from  '@/config/axios_default';
  import ResearchBar from '@/components/ResearchBar.vue'
  import MovieVignette from '@/components/MovieVignette.vue'
  import MovieDetails from '@/components/MovieDetails.vue'
  import pagination from '@/components/utils/pagination.vue'

  export default {
    name: 'home',
    components: {
      "ResearchBar": ResearchBar,
      "MovieDetails": MovieDetails,
      "MovieVignette": MovieVignette,
      pagination,
    },
    data() {
      return {
        showMovieVignette: false,
        showMovieDetails: false,
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
      showMovieDetailsFun(movie) {
        this.OMDBid = movie.id;
        this.showMovieVignette = false;
        this.showResearchBar = false;
        this.showMovieDetails = true;
      },
      researchMovieFun(research) {
        this.lastResearch = research;
        axios.get('/research', { params: {
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
      }
    }
  }

</script>

