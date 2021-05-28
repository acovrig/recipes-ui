<template>
  <!-- <hello-world /> -->
  <div class="recipes">
    <v-alert
      v-if="msg"
      type="error">
      {{ msg }}
    </v-alert>
    <RecipesGrid :recipes="recipes" />
    <router-link to="/recipes/12345">404 test</router-link>
  </div>
</template>

<script>
import RecipesGrid from '@/components/RecipesGrid.vue';
import config from '@/config';

export default {
  name: 'Recipes',

  components: {
    RecipesGrid,
  },
  data() {
    return {
      msg: null,
    };
  },
  computed: {
    recipes() {
      return this.$store.getters.recipes();
    },
  },
  created() {
    this.$http.get(`${config.hostname}/recipes.json`).then((res) => {
      this.$store.commit('SET_RECIPES', res.data);
    }).catch((err) => {
      console.error('axios err', err);
    });

    if (this.$route.query.msg) {
      this.msg = this.$route.query.msg;
      this.$router.replace({}).finally(() => {
        this.respondToRouteChanges = true;
      });
      setTimeout(() => {
        this.msg = null;
      }, this.msg.length * 200);
    }
  },
};
</script>
