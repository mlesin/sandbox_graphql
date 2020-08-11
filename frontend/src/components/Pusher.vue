<template>
  <v-container>
    <v-form>
      <v-text-field v-model="formData.task" name="task" placeholder="Task" required />
      <v-text-field v-model="formData.description" name="description" placeholder="Description" required />
      <div v-if="error" class="error">
        {{ error.message }}
      </div>
      <v-btn :disabled="loading" @click="mutate()">Add task</v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import {defineComponent, reactive} from "@vue/composition-api";
import {useCreateTaskMutation} from "../generated/graphql";
import {useApolloClient} from "@vue/apollo-composable";

export default defineComponent({
  setup() {
    const formData = reactive({
      task: "",
      description: "",
    });

    const {resolveClient} = useApolloClient();

    const {mutate, loading, error, onDone} = useCreateTaskMutation(() => ({
      variables: {
        task: formData.task,
        description: formData.description,
      },
    }));
    // const {mutate, loading, error, onDone} = useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, () => ({
    //   variables: {
    //     task: formData.task,
    //     description: formData.description,
    //   },
    // }));

    onDone(async result => {
      if (!result?.data?.createTask) return;
      formData.task = "";
      formData.description = "";
      const apolloClient = resolveClient();
      const {id, task, description} = result.data.createTask;
      // Update cache
      // apolloClient.writeQuery({
      //   query: USER_CURRENT,
      //   data: {
      //     userCurrent: result.data.userLogin.user,
      //   },
      // });
    });

    return {formData, mutate, loading, error};
  },
});
</script>

<style></style>
