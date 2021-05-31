<template>
  <v-app>
    <v-app-bar app color="green">
      <span class="d-flex d-sm-none">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </span>
      <div class="align-center d-flex">
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
      </div>
      <div class="align-center d-none d-sm-flex">
        <v-menu
          transition="slide-y-transition"
          open-on-hover
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
                  exact
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
                  :to="`/categories/${cat.id}`"
                  exact
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

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary>
      <v-list nav dense>
        <v-list-item link :to="`/`" exact>
          <v-list-item-avatar>
            <v-img
              alt="Recipes Logo"
              src="https://recipes.thecovrigs.net/assets/logo_header-062f1ce00398b32f3f1729036fc18c0c1d1938210c766c91b108fae3385823bb.png"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          active-class="deep-green--text text--accent-4"
          no-action>

          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Categories</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            link
            :to="`/categories`"
            exact>
            <v-list-item-content>
              <v-list-item-title>
                View All
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider />

          <v-list-item
            v-for="cat in categories"
            :key="cat.id"
            link
            :to="`/categories/${cat.id}`"
            exact>
            <v-list-item-content>
              <v-list-item-title>
                {{ cat.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item link to="/recipes">
          <v-list-item-title>Recipes</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/auto">
          <v-list-item-title>What can I Make?</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/login">
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    drawer: false,
  }),
  computed: {
    loggedIn() {
      return (this.$store.getters.auth || {}).client !== undefined;
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
};
</script>
