<template>
  <!-- <hello-world /> -->
  <div class="home">
    <h1>Recipes Home</h1>
    <p>This is a recipe system built by Aaron and Austin Covrig.</p>

    <p>Feel free to <router-link :to="{ name: 'Login' }">Login</router-link>.
      You can <router-link :to="{ name: 'Recipes' }">browse public recipes</router-link>
      if you do not want to login,
      however, you will need an account to save recipes.</p>
  </div>
</template>

<script>

export default {
  name: 'Home',

  components: {
  },
  computed: {
  },
};
</script>
