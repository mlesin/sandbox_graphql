<template>
  <v-container>
    <pusher />
    <fetcher />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import Fetcher from '@/components/Fetcher.vue';
import Pusher from '@/components/Pusher.vue';

export default defineComponent({
  name: 'Interactor',

  components: {
    Fetcher,
    Pusher,
  },

  data: () => ({
    //
  }),
});
</script>

<style></style>
