<template>
  <div class="show">
    <router-link :to="`/shows/${show!.id}`">
      <img
        v-lazy="{
          src: show?.image?.original,
          loading: show?.image?.medium,
        }"
      />
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { TvShow } from "@/store/types";

export default defineComponent({
  props: {
    show: Object as () => TvShow,
  },
});
</script>

<style scoped>
@media screen and (max-width: 1080px) {
  .show {
    flex: 0 0 40%;
    padding: 0.25rem;
    width: 40%;
    aspect-ratio: 2 / 3;
    max-height: 500px;
  }
}

@media screen and (min-width: 1080px) {
  .show {
    flex: 0 0 20%;
    padding: 0.25rem;
    width: 20%;
    aspect-ratio: 2 / 3;
    max-height: 500px;
  }
}

img {
  object-position: 100% 0%;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
