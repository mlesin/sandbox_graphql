<template>
  <v-container>
    <v-row>
      <v-btn @click="refetch">Refetch</v-btn>
    </v-row>
    <div v-if="loading">Loading...</div>
    <v-row v-else>
      <v-col v-for="task in result.allTasks" :key="task.id">
        <v-card>
          <v-card-title>{{ task.task }}</v-card-title>
          <v-card-text>{{ task.description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { useGetAllTasksQuery } from '../generated/graphql';

export default defineComponent({
  setup() {
    const { result, loading, refetch } = useGetAllTasksQuery();
    return { result, loading, refetch };
  },
});
</script>
