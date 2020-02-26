<template>
  <v-container light>
    <v-card>
      <v-card flat color="transparent">


        <v-card-text>
          <v-text-field
            v-model="queryString"
            :label="$t('research')"
            required
          ></v-text-field>
        </v-card-text>

        <v-subheader>{{ $t('rangeyear') }}</v-subheader>
        <v-card-text>
          <v-row>
            <v-col class="px-4">
              <v-range-slider
                v-model="range"
                :max="max"
                :min="min"
                hide-details
                class="align-center"
              >
                <template v-slot:prepend>
                  <v-text-field
                    :value="range[0]"
                    class="mt-0 pt-0"
                    hide-details
                    single-line
                    type="number"
                    style="width: 60px"
                    v-on:change="$set(range, 0, $event)"
                  ></v-text-field>
                </template>
                <template v-slot:append>
                  <v-text-field
                    :value="range[1]"
                    class="mt-0 pt-0"
                    hide-details
                    single-line
                    type="number"
                    style="width: 60px"
                    @change="$set(range, 1, $event)"
                  ></v-text-field>
                </template>
              </v-range-slider>
            </v-col>
          </v-row>
        </v-card-text>


        <v-subheader>{{ $t('note') }}</v-subheader>
        <v-card-text>
          <v-row>
            <v-col class="px-4">
              <v-range-slider
                v-model="note"
                :max=10
                :min=0
                hide-details
                class="align-center"
              >
                <template v-slot:prepend>
                  <v-text-field
                    :value="note[0]"
                    class="mt-0 pt-0"
                    hide-details
                    single-line
                    type="number"
                    style="width: 60px"
                    @change="$set(note, 0, $event)"
                  ></v-text-field>
                </template>
                <template v-slot:append>
                  <v-text-field
                    :value="note[1]"
                    class="mt-0 pt-0"
                    hide-details
                    single-line
                    type="number"
                    style="width: 60px"
                    @change="$set(note, 1, $event)"
                  ></v-text-field>
                </template>
              </v-range-slider>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-container dark fluid>
        <v-row dark >
          <v-col cols="2">
            <v-checkbox  v-model="gender" label="Action" value="28"></v-checkbox>
          </v-col>
          <v-col cols="2">
            <v-checkbox v-model="gender" :label="$t('adventure')" value="12"></v-checkbox>
          </v-col>
          <v-col cols="2">
            <v-checkbox v-model="gender" label="Animation" value="16"></v-checkbox>
          </v-col>
          <v-col cols="2">
            <v-checkbox v-model="gender" :label="$t('comedy')" value="35"></v-checkbox>
          </v-col>
          <v-col cols="2">
            <v-checkbox v-model="gender" label="Crime" value="80"></v-checkbox>
          </v-col>
          <v-col cols="2">
            <v-checkbox v-model="gender" :label="$t('documentary')" value="99"></v-checkbox>
          </v-col>
          <v-col cols="2">
            <v-checkbox v-model="gender" :label="$t('drama')" value="18"></v-checkbox>
          </v-col>
          <v-col cols="2">
            <v-checkbox v-model="gender" :label="$t('family')" value="10751"></v-checkbox>
          </v-col>
          <v-col cols="2">
            <v-checkbox v-model="gender" :label="$t('fantasy')" value="14"></v-checkbox>
          </v-col>
          <v-col cols="2">
            <v-checkbox v-model="gender" :label="$t('history')" value="36"></v-checkbox>
          </v-col>
          <v-col cols="2">
            <v-checkbox v-model="gender" :label="$t('horror')" value="27"></v-checkbox>
          </v-col>
          <v-col cols="2">
            <v-checkbox v-model="gender" :label="$t('music')" value="10402"></v-checkbox>
          </v-col>
          <v-col cols="2">
            <v-checkbox v-model="gender" :label="$t('mystery')" value="9648"></v-checkbox>
          </v-col>
          <v-col cols="2">
            <v-checkbox v-model="gender" label="Romance" value="10749"></v-checkbox>
          </v-col>
          <v-col cols="2">
            <v-checkbox v-model="gender" label="Science Fiction" value="878"></v-checkbox>
          </v-col>
          <v-col cols="2">
            <v-checkbox v-model="gender" :label="$t('tvmovie')" value="10770"></v-checkbox>
          </v-col>
          <v-col cols="2">
            <v-checkbox v-model="gender" label="Thriller" value="53"></v-checkbox>
          </v-col>
          <v-col cols="2">
            <v-checkbox v-model="gender" :label="$t('war')" value="10752"></v-checkbox>
          </v-col>
          <v-col cols="2">
            <v-checkbox v-model="gender" label="Western" value="37"></v-checkbox>
          </v-col>
        </v-row>
      </v-container>



      <v-btn
        dark
        color="success"
        class="mr-4"
        @click="validate"
      >
        {{ $t('validate') }}
      </v-btn>


    </v-card>
  </v-container>
</template>


<script>
  import axios from  '@/config/axios_default';

  export default {
    data () {
      return {
        min: 1980,
        max: 2020,
        range: [2005, 2018],
        note: [6, 10],
        movies: null,
        queryString: null,
        gender: [],
      }
    } ,
    methods:{
      validate(){
        let research = {};
        research.queryString = this.queryString;
        research.firstYear = this.range[0];
        research.lastYear = this.range[1];
        research.firstNote = this.note[0];
        research.lastNote = this.note[1];
        research.gender = this.gender;
        research.page = 1;
        this.$emit('moviesResearch', research);
      }
    },
    mounted(){
      this.validate();
    }
  }
</script>
