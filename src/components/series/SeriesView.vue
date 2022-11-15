<template>
  <div class="home">
    <div class="header">
      <h1>Find your favourite series</h1>
    </div>
    <CloseSearch v-if="userStartedSearch" />
    <Search />
    <Dashboard />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Dashboard from "./dashboard/DashboardComponent.vue";
import Search from "./search/SearchComponent.vue";
import CloseSearch from "./search/CloseSearchComponent.vue";
import { useObservable } from "@vueuse/rxjs";
import { SearchState } from "./search/search-state";

export default defineComponent({
  data: () => ({
    userStartedSearch: useObservable(SearchState.userSearching$),
  }),
  components: {
    Dashboard,
    Search,
    CloseSearch,
  },
});
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
h1 {
  display: inline;
  font-size: 70px;
  font-weight: 600;
  font-family: "Roboto", sans-serif;
  color: #ffffff;
  text-transform: uppercase;
  text-shadow: 1px 1px 0px #8a3131, 1px 2px 0px #cc3f3f, 1px 3px 0px #c53a3a,
    1px 4px 0px #a94949, 1px 5px 0px #af4242, 1px 6px 0px #b44444,
    1px 10px 5px rgba(16, 16, 16, 0.5), 1px 15px 10px rgba(16, 16, 16, 0.4),
    1px 20px 30px rgba(16, 16, 16, 0.3), 1px 25px 50px rgba(16, 16, 16, 0.2);
}
</style>
