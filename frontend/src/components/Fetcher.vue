<template>
  <div>
    Here is the result: "{{ result }}""
    <!-- <div v-for="task in result.allTasks" :key="task.id">
      {{ task.task }}
    </div> -->
  </div>
</template>

<script lang="ts">
// import { defineComponent } from "@vue/composition-api";
import Vue from "vue";
// import { GetAllTasksDocument } from "../generated/graphql";

export default Vue.extend({
  // apollo: {
  //   result: GetAllTasksDocument
  // },
  data() {
    return {
      result: ""
    };
  },
  setup() {
    // const { result, loading } = GetAllTasksQuery();
    // return { result, loading };
  }
});
</script>
