<template>
  <div class="shortSummary">
    <img
      v-lazy="{
        src: show?.image?.medium,
        loading: require('../../../../../assets/loading.gif'),
      }"
    />
    <div class="sideInfo">
      <h3>{{ show?.name }}</h3>
      <p>{{ show?.premiered }}</p>
      <router-link
        style="text-decoration: none; color: inherit"
        :to="`/shows/${show!.id}`"
      >
        <button>Go to result</button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { TvShow } from "../../../../../store/types";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    show: Object as () => TvShow,
  },
});
</script>

<style scoped>
.sideInfo {
  margin-left: 1em;
}
.shortSummary {
  background-color: rgb(72, 72, 72);
  border: 1px solid rgb(46, 46, 46);
  display: flex;
  width: 100%;
  max-width: 600px;
  margin: 0px auto;
  padding: 10px;
}

img {
  margin-left: 2em;
  max-width: 80px;
  width: 30%;
}

h3 {
  margin: 1em 0px;
  color: rgb(255, 255, 255);
}

p {
  margin: 0px;
}
button {
  padding: 0.5em;
  font-size: 1em;
  margin-top: 1em;
  text-align: center;
  text-justify: center;
  display: flex;
  text-decoration: none;
}

h3 {
  margin: 0px;
}

p {
  color: aliceblue;
  display: flex;
}
</style>
