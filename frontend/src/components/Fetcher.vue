<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-for="task in result.allTasks" :key="task.id">
        {{ task.task }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "@vue/composition-api";
import {useGetAllTasksQuery} from "../generated/graphql";

export default defineComponent({
  setup() {
    const {result, loading} = useGetAllTasksQuery();
    return {result, loading};
  },
});
</script>
