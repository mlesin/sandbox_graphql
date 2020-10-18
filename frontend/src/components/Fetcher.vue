<template>
  <v-container>
    <v-row>
      <v-btn @click="refetch">Refetch</v-btn>
    </v-row>
    <div v-if="loading">Loading...</div>
    <v-row v-else>
      <v-col v-for="task in result.allTasks" :key="task.id">
        <v-card>
          <v-card-title>{{ task && task.task }}</v-card-title>
          <v-card-text>{{ task && task.description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { useGetAllTasksQuery, TaskAddedDocument, GetAllTasksQuery, TaskAddedSubscription } from '../generated/graphql';
import { OperationVariables } from '@apollo/client/core';

export default defineComponent({
  setup() {
    const { result, loading, refetch, subscribeToMore } = useGetAllTasksQuery({
      pollInterval: 0,
      // notifyOnNetworkStatusChange: true,
    });
    subscribeToMore<OperationVariables, TaskAddedSubscription>(() => ({
      document: TaskAddedDocument,
      variables: {},
      updateQuery: (prev, { subscriptionData }): GetAllTasksQuery => {
        if (!subscriptionData.data) return prev;
        const newItem = subscriptionData.data.taskAdded;
        // Quick safety check - if the new task is already
        // present in the cache, we don't need to add it again.
        if (prev.allTasks.some((ref) => ref.id === newItem?.id)) return prev;
        return Object.assign({}, prev, {
          allTasks: [...prev.allTasks, newItem],
        });
      },
    }));
    return { result, loading, refetch };
  },
});
</script>
