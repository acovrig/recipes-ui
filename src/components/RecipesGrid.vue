<template>
  <v-data-iterator
    :items="recipes"
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
        class="mb-1">
        <v-text-field
          v-model="search"
          clearable
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Search"
        />
        <template v-if="$vuetify.breakpoint.mdAndUp">
          <v-spacer></v-spacer>
          <v-select
            v-model="sortBy"
            flat
            solo-inverted
            hide-details
            :items="sortKeys"
            prepend-inner-icon="mdi-sort"
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
          <v-card :to="`/recipes/${item.id}`">
            <v-card-title>
              <h4>
                {{ item.name }}
                <v-icon v-if="item.privacy === 'public'">mdi-shield-remove</v-icon>
                <v-icon v-if="item.privacy === 'unlisted'">mdi-shield-search</v-icon>
                <v-icon v-if="item.privacy === 'internal'">mdi-shield-account-variant</v-icon>
                <v-icon v-if="item.privacy === 'private'">mdi-shield-lock</v-icon>
              </h4>
            </v-card-title>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>Servings:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{ item.servings }}
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>Serving Suggestions:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{ item.serving_suggestion }}
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="item.rating !== null">
                <v-list-item-content>Rating:</v-list-item-content>
                <v-list-item-content class="align-end">
                  <v-rating
                    empty-icon="mdi-star-outline"
                    full-icon="mdi-star"
                    readonly
                    length="5"
                    size="20"
                    :value="item.rating || 0"></v-rating>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>Author:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{ (item.author || {}).name }}
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-data-iterator>
</template>

<script>
export default {
  name: 'RecipesGrid',
  props: {
    recipes: Array,
  },
  data: () => ({
    itemsPerPage: 10,
    page: 1,
    search: '',
    sortBy: 'name',
    sortKeys: [
      { text: 'Name', value: 'name' },
      { text: 'Created At', value: 'created_at' },
      { text: 'Rating', value: 'rating' },
      { text: 'Serving Suggestion', value: 'serving_suggestion' },
      { text: 'Servings', value: 'servings' },
    ],
    sortDesc: '',
  }),
};
</script>
<style lang="scss" scoped>
.v-card__title > h4 {
  word-break: break-word;
}
</style>
