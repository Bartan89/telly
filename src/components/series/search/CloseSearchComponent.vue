<template>
  <button @click="focus(false)"></button>
</template>

<script lang="ts">
import { useObservable } from "@vueuse/rxjs";
import { defineComponent } from "vue";
import { SearchState } from "./search-state";

export default defineComponent({
  data: function () {
    return {
      stateOfInput: useObservable(SearchState.stateOfSearch$),
    };
  },
  methods: {
    focus(focus: boolean) {
      SearchState.userSearching$.next(focus);
    },
  },
});
</script>

<style scoped>
button {
  animation: moveIn 0.8s ease-in-out forwards;
  border-radius: 50%;
  padding: 0.5em;
  width: 30px;
  height: 30px;
  border: 2px solid black;
  color: black;
  position: sticky;
  top: 90vh;
  left: calc(50vw - 30px);
  transform: scale(2);
  z-index: 9999999;
  opacity: 0.7;
}

@keyframes moveIn {
  0% {
    top: 110vh;
  }
  70% {
    top: 88vh;
  }

  100% {
    top: 90vh;
  }
}

button:hover {
  border: 2px solid black;
  background-color: rgb(47, 47, 47);
  color: #ffffff;
}

button::before {
  content: " ";
  position: absolute;
  display: block;
  background-color: black;
  width: 2px;
  left: 12px;
  top: 5px;
  bottom: 5px;
  transform: rotate(45deg);
}
button::after {
  content: " ";
  position: absolute;
  display: block;
  background-color: black;
  height: 2px;
  top: 12px;
  left: 5px;
  right: 5px;
  transform: rotate(45deg);
}
</style>
