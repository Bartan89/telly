<template>
  <div class="container">
    <h1 class="typeOfShows">{{ kind }}</h1>
    <div class="slider">
      <Show v-for="show in shows" :key="show?.id" :show="show" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { TvShow } from "../../../../store/types";
import Show from "./show/ShowComponent.vue";

export default defineComponent({
  name: "HomeView",
  props: {
    shows: Object as () => TvShow[] | null,
    kind: String,
  },
  components: {
    Show,
  },
});
</script>

<style scoped>
.container {
  box-sizing: border-box;
  display: flex;
  overflow-y: hidden;
  overflow-x: auto;
  width: 100%;
  margin-bottom: 2em;
}

.container::-webkit-scrollbar {
  width: 20px;
}

.container::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(128, 128, 128, 0);
  opacity: 0;
  height: 10px;
  border-radius: 10px;
}

.container::-webkit-scrollbar-thumb {
  background: rgb(200, 40, 40);
  width: 140px;
  border-radius: 0.1em;
}

.container::-webkit-scrollbar-thumb:hover {
  background: #b30000;
}

@media screen and (max-width: 960px) {
  .container::-webkit-scrollbar {
    display: none;
  }
}

.typeOfShows {
  left: 0px;
  padding: 0.2em;
  background-color: rgb(0, 0, 0);
  position: absolute;
  color: white;
  font-size: 1.5rem;
}

.slider {
  box-sizing: border-box;
  display: flex;
  width: 100%;
}
</style>
