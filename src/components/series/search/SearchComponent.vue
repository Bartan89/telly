<template>
  <div class="searchTotal">
    <input
      placeholder="Search series..."
      tabindex="0"
      @input="updateSearchQuery($event)"
      @focusin="focus(true)"
      type="text"
    />
    <SearchResults v-if="userStartedSearch" />
  </div>
</template>

<script lang="ts">
import { useObservable } from "@vueuse/rxjs";
import { defineComponent } from "vue";
import { SearchState } from "./search-state";
import SearchAnimation from "./searchResults/SearchAnimation.vue";
import SearchResults from "./searchResults/SearchResults.component.vue";
import CloseSearch from "./CloseSearchComponent.vue";

export default defineComponent({
  data: () => ({
    userStartedSearch: useObservable(SearchState.userSearching$),
  }),
  methods: {
    focus(focus: boolean) {
      SearchState.userSearching$.next(focus);
    },
    updateSearchQuery(input: Event) {
      SearchState.userInputed$.next((input.target as HTMLInputElement).value);
    },
  },
  components: {
    SearchResults,
  },
});
</script>

<style scoped>
.searchTotal {
  position: relative;
  display: flex;
  flex-direction: column;
}
input {
  position: relative;
  width: 70%;
  max-width: 800px;
  height: 3em;
  margin: 2em auto;
  font-size: 30px;
  height: 60px;
  border-radius: 0;
}

input:focus {
  outline: 0;
}
</style>
