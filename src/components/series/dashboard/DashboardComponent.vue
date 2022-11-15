<template>
  <div v-bind:class="userStartedSearch ? 'dashBoard' : 'dashBoardFull'">
    <Shows
      v-if="adventureShows && adventureShows.length > 10"
      :kind="'Adventure'"
      :shows="adventureShows"
    />
    <Shows
      v-if="comedyShows && comedyShows.length > 10"
      :kind="'Comedy'"
      :shows="comedyShows"
    />
    <Shows
      v-if="actionShows && actionShows.length > 10"
      :kind="'Action'"
      :shows="actionShows"
    />
    <Shows
      v-if="romanceShows && romanceShows.length > 10"
      :kind="'Romance'"
      :shows="romanceShows"
    />
    <Shows v-if="highRatedShows" :kind="'High-rated'" :shows="highRatedShows" />
  </div>
</template>

<script lang="ts">
import { GlobalState } from "../../../store/global-state";
import { useObservable } from "@vueuse/rxjs";
import { delay } from "rxjs";
import { defineComponent } from "vue";
import { SearchState } from "../search/search-state";
import Shows from "./shows/ShowsComponent.vue";
// demonstration purpose (read below):
import { api_meta_data$ } from "../../../../type-generation/genres-types";

export default defineComponent({
  data: () => ({
    adventureShows: useObservable(
      GlobalState.getShowByGenre("Adventure").pipe(delay(0))
    ),
    comedyShows: useObservable(
      GlobalState.getShowByGenre("Comedy").pipe(delay(500))
    ),
    actionShows: useObservable(
      GlobalState.getShowByGenre("Action").pipe(delay(1000))
    ),
    romanceShows: useObservable(
      GlobalState.getShowByGenre("Romance").pipe(delay(1500))
    ),
    highRatedShows: useObservable(
      GlobalState.getShowsBasedOnRating(8).pipe(delay(2000))
    ),
    userStartedSearch: useObservable(SearchState.userSearching$),
    // for demonstration purposes I left this helper in the codebase
    // uncomment_and_check_console: useObservable(api_meta_data$),
  }),
  methods: {
    focus(focus: boolean) {
      SearchState.userSearching$.next(focus);
    },
  },
  components: {
    Shows,
  },
});
</script>

<style scoped>
.dashBoard {
  transition: all 0.2s ease-out;
  opacity: 0.3;
  margin-top: 20px;
  pointer-events: none;
}

.dashBoardFull {
  transition: all 0.2s ease-in-out;
  margin-top: 0px;
}
</style>
