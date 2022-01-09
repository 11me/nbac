<template>
  <button class="nbac-button">
    <a :href="linkTo"><slot></slot></a>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NbacButton',
  props: {
    linkTo: {
      required: false,
      type: String
    }
  },
});
</script>

<style>
.nbac-button {
  display: block;
  margin: 50px auto;
  background-color: #fff;
  width: 185px;
  height: 48px;
  border: thin solid #000;
  border-radius: 30px;
  outline: none;
  transition: all 0.1s;
}
.nbac-button:hover {
  outline: none;
}
.nbac-button:active {
  outline: none;
  background: rgba(0, 0, 0, 0.1);
}
.nbac-button a {
  display: block;
  width: 100%;
  height: 100%;
  margin: 12px auto;
  text-decoration: none;
  font-size: 16px;
  color: #000;
}
</style>
