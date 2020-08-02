<template>
  <v-container>
    <div v-if="loading">Loading...</div>
    <v-row v-else>
      <v-col v-for="task in result.allTasks" :key="task.id">
        <v-card>{{ task.task }}</v-card>
      </v-col>
    </v-row>
  </v-container>
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
