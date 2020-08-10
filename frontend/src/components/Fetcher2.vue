<template>
  <v-container>
    <apollo-query :query="GetAllTasksDocument">
      <template slot-scope="{result: {data, loading}}">
        <div v-if="!data && loading" class="loading">
          Loading...
        </div>
        <v-row v-else-if="data">
          <v-col v-for="task in result.allTasks" :key="task.id">
            <v-card>
              <v-card-title>{{ task.task }}</v-card-title>
              <v-card-text>{{ task.description }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </apollo-query>
  </v-container>
</template>

<script lang="ts">
import {defineComponent} from "@vue/composition-api";
import {useGetAllTasksQuery, GetAllTasksDocument} from "../generated/graphql";

export default defineComponent({
  setup() {
    const {result, loading} = useGetAllTasksQuery();
    return {result, loading};
  },
});
</script>
