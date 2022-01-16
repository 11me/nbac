<template>
  <h4>{{ alert.alert }}</h4>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAlert } from '@/services/alert.service';


export default defineComponent({
  name: 'AlertComponent',
  setup() {
    const alert = useAlert();
    // const message = alert.value
    return { alert }
  }
});
</script>
