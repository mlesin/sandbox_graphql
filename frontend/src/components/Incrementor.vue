<template>
  <div>
    <v-btn @click="inc.actions.increment">Increment</v-btn>
    <v-btn @click="inc.actions.decrement">Decrement</v-btn>
    <div>Count is: {{ inc.state.count }}, double is: {{ inc.state.double }}</div>
    <div>Mouse coords are ({{ mp.x }},{{ mp.y }})</div>
    <div v-for="(item, i) in fl.list" :key="i" :ref="fl.fillRef">-={{ item }}=-</div>
    <v-btn @click="fl.check">Check</v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, onUnmounted, reactive, onBeforeUpdate, getCurrentInstance } from "@vue/composition-api";

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
    state: { count, double },
    actions: { increment, decrement }
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

  return { x, y };
}

function forLogic() {
  const list = reactive([1, 2, 3]);
  const divs = ref([] as HTMLElement[]);

  onBeforeUpdate(() => {
    divs.value = [];
  });

  function fillRef(i: number) {
    return (el: HTMLElement) => {
      console.log("fillRef called");
      divs.value[i] = el;
    };
  }

  function check() {
    console.log("amount of refs:", divs.value.length);
    list.forEach((div, i) => {
      console.log(divs.value[i]);
    });
  }

  return { list, divs, fillRef, check };
}

export default defineComponent({
  name: "Incrementor",
  setup() {
    const inc = incLogic();
    const mp = useMousePosition();
    const fl = forLogic();
    const vm = getCurrentInstance();
    console.log(vm);

    return {
      inc,
      mp,
      fl
    };
  }
});
</script>
