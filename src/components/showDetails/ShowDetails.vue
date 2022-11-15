<template>
  <div v-if="show">
    <div class="informationOnShow">
      <div class="visual">
        <img
          v-lazy="{
            src: show?.image?.original,
            loading: show?.image?.medium,
          }"
        />
      </div>
      <div class="textual">
        <div>
          <h1>{{ show?.name }}</h1>
          <span>{{ show?.rating?.average }}</span>
        </div>
        <h1>The story:</h1>
        <p v-html="show?.summary"></p>
        <router-link :to="`/`">
          <span class="btn">Back...</span>
        </router-link>
      </div>
    </div>
  </div>
  <h3 v-if="!show">loading...</h3>
</template>

<script lang="ts">
import { GlobalState } from "@/store/global-state";
import { useObservable } from "@vueuse/rxjs";
import { defineComponent } from "vue";

export default defineComponent({
  data: ({ $route }) => ({
    show: useObservable(GlobalState.getSingleShow(Number($route.params.id))),
  }),
});
</script>

<style scoped>
@media screen and (max-width: 960px) {
  .visual {
    width: 100%;
  }

  .textual {
    width: 90%;
    margin: 10px;
  }
}

@media screen and (min-width: 960px) {
  .visual {
    width: 100%;
    max-width: 400px;
    margin: 1em;
  }

  .informationOnShow {
    margin-top: 7em;
    display: flex;
    justify-content: center;
  }

  .textual {
    width: 50%;
    margin: 10px;
  }
}

img {
  width: 100%;
}
h1 {
  display: inline;
  margin-right: 0.4em;
}

.btn {
  display: block;
  width: 200px;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  font-family: sans-serif;
  text-decoration: none;
  color: #333;
  border: 2px solid #333;
  letter-spacing: 2px;
  text-align: center;
  position: relative;
  transition: all 0.35s;
  position: relative;
  z-index: 2;
}

.btn:after {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: #8adf514e;
  transition: all 0.35s;
}

.btn:hover {
  color: rgb(0, 0, 0);
}

h3 {
  margin: 5em;
}

.btn:hover:after {
  width: 100%;
}
</style>
