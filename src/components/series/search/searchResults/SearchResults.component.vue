<template>
  <SearchAnimation />
  <div class="overview">
    <div v-for="show in searchResults" :key="show.id">
      <SearchCard :show="show" />
    </div>
  </div>
</template>

<script lang="ts">
import { useObservable } from "@vueuse/rxjs";
import { defineComponent } from "vue";
import { SearchState } from "../search-state";
import SearchAnimation from "./SearchAnimation.vue";
import SearchCard from "./searchCard/SearchCard.vue";

export default defineComponent({
  data: () => ({
    searchResults: useObservable(SearchState.searchCameBack$),
  }),
  components: {
    SearchCard,
    SearchAnimation,
  },
});
</script>

<style scoped>
.overview {
  top: 150px;
  margin: auto;
  position: absolute;
  width: 70%;
  left: calc(50vw - 35%);
  z-index: 99999;

  text-align: center;
}
</style>
