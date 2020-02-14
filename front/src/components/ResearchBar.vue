<template>
<v-container>
<v-card flat color="transparent">

    <v-subheader>Range year movie</v-subheader>

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
                @change="$set(range, 0, $event)"
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
  </v-card>





</v-container>
</template>

<style>
.ici{
color:white;
}
.other{
	background-color:white;
}
</style>

<script>
import Comment from '@/components/Comments.vue'

export default {
data () {
      return {
        min: 1980,
        max: 2020,
        range: [2005, 2018],
      }
	} ,
	props: {
	},
	components: {
	},
	methods:{
	},
	mounted(){
	}
}
</script>

