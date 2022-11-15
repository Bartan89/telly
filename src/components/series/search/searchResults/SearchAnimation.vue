<template>
  <div class="animation">
    <div v-if="stateOfInput === 'started typing'" class="scaleDown">
      <div class="bouncingBall"></div>
    </div>
    <div v-if="stateOfInput === 'request send'" class="scaleDown">
      <div class="staticBall"></div>
    </div>
    <div v-if="stateOfInput === 'something came back'" class="scaleDown">
      <div class="greenBall"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { useObservable } from "@vueuse/rxjs";
import { defineComponent } from "vue";
import { SearchState } from "../search-state";

export default defineComponent({
  data: function () {
    return {
      stateOfInput: useObservable(SearchState.stateOfSearch$),
    };
  },
});
</script>

<style scoped>
.scaleDown {
  position: absolute;
  left: calc(50vw - 28px);
  top: 113px;
  transform: scale(0.1);
}

.bouncingBall {
  width: 140px;
  height: 140px;
  border-radius: 100%;
  background: #ccc;
  animation: bounce 0.5s;
  transform: translateY(0px);
  animation-iteration-count: infinite;
  position: absolute;
  margin: 50px;
}

.greenBall {
  width: 140px;
  height: 140px;
  border-radius: 100%;
  background: rgb(85, 145, 67);
  transform: translateY(0px);
  transform: translateY(0px);
  position: absolute;
  animation-iteration-count: 1;
  animation: 2s fadeOut 2s ease-in forwards;
  margin: 50px;
}

.staticBall {
  width: 140px;
  height: 140px;
  border-radius: 100%;
  background: #ccc;
  animation: bounce 0.5s forwards;
  transform: translateY(0px);
  animation-iteration-count: 1;
  transform: translateY(0px);
  position: absolute;
  margin: 50px;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

@keyframes bounce {
  0% {
    top: 0;
    -webkit-animation-timing-function: ease-in;
  }
  40% {
  }
  50% {
    top: 140px;
    height: 140px;
    -webkit-animation-timing-function: ease-out;
  }
  55% {
    top: 160px;
    height: 120px;
    -webkit-animation-timing-function: ease-in;
  }
  65% {
    top: 120px;
    height: 140px;
    -webkit-animation-timing-function: ease-out;
  }
  95% {
    top: 0;
    -webkit-animation-timing-function: ease-in;
  }
  100% {
    top: 0;
    -webkit-animation-timing-function: ease-in;
  }
}

@keyframes bounceStop {
  0% {
    top: 0;
    background: #ccc;
    -webkit-animation-timing-function: ease-in;
  }
  40% {
    background: #ccc;
  }
  50% {
    background: #ccc;
    top: 140px;
    height: 140px;
    -webkit-animation-timing-function: ease-out;
  }
  55% {
    background: #ccc;
    top: 160px;
    height: 120px;
    -webkit-animation-timing-function: ease-in;
  }
  65% {
    background: rgb(233, 96, 22);
    top: 120px;
    height: 140px;
    -webkit-animation-timing-function: ease-out;
  }
  95% {
    background: rgb(233, 96, 22);
    top: 120px;
    height: 140px;
    -webkit-animation-timing-function: ease-out;
  }
  100% {
    background: rgb(233, 96, 22);
    top: 120px;
    height: 140px;
    -webkit-animation-timing-function: ease-out;
  }
}
</style>
