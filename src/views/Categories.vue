<template>
  <!-- <hello-world /> -->
  <div class="categories">
    <v-data-iterator
      :items="categories"
      item-key="name"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc">

      <template v-slot:header>
        <v-toolbar
          dark
          color="green darken-3"
          class="mb-1"
        >
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="sortKeys"
              prepend-inner-icon="mdi-magnify"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle
              v-model="sortDesc"
              mandatory
            >
              <v-btn
                large
                depressed
                color="green"
                :value="false"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                large
                depressed
                color="green"
                :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="{ items }">
        <v-row>
          <v-col
            v-for="item in items"
            :key="item.name"
            cols="12" sm="6" md="4" lg="3">
            <v-card :to="`/categories/${item.id}`">
              <v-card-title>
                <h4>{{ item.name }}</h4>
              </v-card-title>
              <v-list dense>
                <v-list-item>
                  <v-list-item-content>Recipes:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ item.numRecipes }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </div>
</template>

<script>

export default {
  name: 'Categories',

  components: {
  },
  data: () => ({
    itemsPerPage: 10,
    page: 1,
    search: '',
    sortBy: 'name',
    sortKeys: [
      { text: 'Name', value: 'name' },
      { text: 'Number of Recipes', value: 'numRecipes' },
    ],
    sortDesc: '',
  }),
  computed: {
    categories() {
      return this.$store.getters.categories;
    },
  },
};
</script>
