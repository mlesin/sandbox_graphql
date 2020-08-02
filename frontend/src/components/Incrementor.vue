<template>
  <div>
    <v-btn @click="inc.actions.increment">Increment</v-btn>
    <v-btn @click="inc.actions.decrement">Decrement</v-btn>
    <div>Count is: {{ inc.state.count }}, double is: {{ inc.state.double }}</div>
    <div>Mouse coords are ({{ mp.x }},{{ mp.y }})</div>
    <div v-for="item in list" :key="item" ref="divs">-={{ item }}=-</div>
    <v-btn @click="check">Check</v-btn>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed, ref, onMounted, onUnmounted, reactive, onBeforeUpdate} from "@vue/composition-api";

function incLogic() {
  onMounted(() => {
    console.log("onMounted was called for incrementor logic");
  });

  const count = ref(0);
  const double = computed(() => count.value * 2);

  function increment() {
    count.value++;
  }

  function decrement() {
    count.value--;
  }

  return {
    state: {count, double},
    actions: {increment, decrement},
  };
}

function useMousePosition() {
  const x = ref(0);
  const y = ref(0);

  function update(e: MouseEvent) {
    x.value = e.pageX;
    y.value = e.pageY;
  }

  onMounted(() => {
    console.log("onMounted was called for useMousePosition logic");
    window.addEventListener("mousemove", update);
  });

  onUnmounted(() => {
    window.removeEventListener("mousemove", update);
  });

  return {x, y};
}

function forLogic() {
  const list = reactive([1, 2, 3]);
  const divs = ref([] as HTMLElement[]);

  onBeforeUpdate(() => {
    divs.value = [];
  });

  function check() {
    divs.value.forEach((div, i) => {
      div.textContent = String(i);
    });
  }

  return {list, divs, check};
}

export default defineComponent({
  name: "Incrementor",
  setup() {
    const inc = incLogic();
    const mp = useMousePosition();
    const {list, divs, check} = forLogic();

    return {
      inc,
      mp,
      list,
      divs,
      check,
    };
  },
});
</script>
