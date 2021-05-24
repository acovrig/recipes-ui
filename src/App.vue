<template>
  <v-app>
    <v-app-bar
      app
      color="purple"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Recipes Logo"
          class="shrink mr-2"
          style="cursor: pointer;"
          contain
          src="https://recipes.thecovrigs.net/assets/logo_header-062f1ce00398b32f3f1729036fc18c0c1d1938210c766c91b108fae3385823bb.png"
          transition="scale-transition"
          width="40"
          @click="goHome()"
        />
        <span
          class="mr-2"
          style="cursor: pointer;"
          @click="goHome()">
          Recipes
        </span>

          <!-- open-on-hover -->
        <v-menu
          transition="slide-x-transition"
          offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              text>
              Categories
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <v-btn
                  to="/categories"
                  active-class="no-active"
                  text>
                  View All
                </v-btn>
              </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item
              v-for="cat in categories"
              :key="cat.id">
              <v-list-item-title>
                <v-btn
                  :to="`/category/${cat.id}`"
                  text>
                  {{ cat.name }}
                </v-btn>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          to="/recipes"
          text>
          Recipes
        </v-btn>
        <v-btn
          to="/auto"
          text>
          What can I make?
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        v-if="loggedIn"
        to="/account"
        text>
        <span class="mr-2">My Account</span>
      </v-btn>
      <v-btn
        v-else
        to="/login"
        text>
        <span class="mr-2">Login</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
  }),
  computed: {
    loggedIn() {
      return false;
    },
    categories() {
      return this.$store.getters.categories;
    },
  },
  methods: {
    goHome() {
      if (this.$route.name !== 'Home') {
        this.$router.push('/');
      }
    },
  },
  beforeCreate() {
    const session = this.$cookie.get('session');
    if (session && session.length) {
      const sesh = JSON.parse(session);
      this.$store.commit('user', sesh.user);
      this.$store.commit('auth', sesh.tokens);
    }
  },
};
</script>
