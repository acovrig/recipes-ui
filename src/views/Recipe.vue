<template>
  <div class="recipe">
    <h1>
      {{ recipe.name }}
      <v-icon v-if="recipe.privacy === 'public'">mdi-shield-remove</v-icon>
      <v-icon v-if="recipe.privacy === 'unlisted'">mdi-shield-search</v-icon>
      <v-icon v-if="recipe.privacy === 'internal'">mdi-shield-account-variant</v-icon>
      <v-icon v-if="recipe.privacy === 'private'">mdi-shield-lock</v-icon>
    </h1>
    <template v-if="recipe.author && recipe.author.name">
      by {{ (recipe.author || {}).name }}
    </template>
    <v-card elevation="2" outlined v-if="(recipe.ingredients || []).length > 0">
      <v-card-title>Ingredients</v-card-title>
      <ul>
        <li v-for="item in recipe.ingredients" :key="item.item">
          {{ item.qty }} {{ item.unit }} {{ item.item }}
        </li>
      </ul>
      <!-- <v-list-item dense v-for="item in recipe.ingredients" :key="item.item">
        <v-list-item-content>
          <v-list-item-title>
            {{ item.qty }} {{ item.unit }} {{ item.item }}
          </v-list-item-title>
          <v-list-item-subtitle v-if="item.notes">
            {{ item.notes }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item> -->
    </v-card>
    <v-card elevation="2" outlined v-if="(recipe.utensils || []).length > 0">
      <v-card-title>Utensils</v-card-title>
      <ul>
        <li v-for="item in recipe.utensils" :key="item.name">
          {{ item.qty }} {{ item.name }}
        </li>
      </ul>
      <!-- <v-list-item dense v-for="item in recipe.utensils" :key="item.name">
        <v-list-item-content>
          <v-list-item-title>
            {{ item.qty }} {{ item.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->
    </v-card>
    <v-card elevation="2" outlined>
      <v-card-title>Directions</v-card-title>
      <ol>
        <li v-for="item in recipe.directions" :key="`${item.step}${item.action}`">
          {{ item.action }}
        </li>
      </ol>
      <!-- <v-list-item dense v-for="item in recipe.directions" :key="item.action">
        <v-list-item-content>
          <v-list-item-title>
            {{ item.action }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->
    </v-card>
    <v-card elevation="2" outlined v-if="(recipe.pictures || []).length > 0">
      <v-card-title>Pictures</v-card-title>
      <v-list-item dense v-for="item in recipe.pictures" :key="item">
        <v-list-item-content>
            {{ item }}
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import config from '@/config';

export default {
  name: 'Recipe',

  components: {
  },
  data: () => ({
  }),
  computed: {
    recipe() {
      return this.$store.getters.recipe(this.$route.params.id) || {};
    },
  },
  created() {
    this.$http.get(`${config.baseURI}/recipes/${this.$route.params.id}.json`).then((res) => {
      this.$store.commit('updateRecipe', res.data);
    }).catch((err) => {
      console.error(err.response.data);
      this.$router.push({
        name: 'Recipes',
        query: { msg: ((err.response.data || {}).errors || []).join(' ') },
      });
    });
  },
};
</script>
