<template>
  <div class="category">
    <h1>{{ (category || {}).name }} Recipes</h1>
    <RecipesGrid :recipes="recipes" />
  </div>
</template>

<script>
import RecipesGrid from '@/components/RecipesGrid.vue';
import config from '@/config';

export default {
  name: 'Category',

  components: {
    RecipesGrid,
  },
  computed: {
    category() {
      return this.$store.getters.category(this.$route.params.id);
    },
    recipes() {
      return this.$store.getters.recipes({ category: this.$route.params.id });
    },
  },
  created() {
    this.$http.get(`${config.hostname}/recipes.json`).then((res) => {
      this.$store.commit('SET_RECIPES', res.data);
    }).catch((err) => {
      console.error('axios err', err);
    });
  },
};
</script>
