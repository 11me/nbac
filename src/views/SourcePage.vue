<template>
  <div class="source_page-container">
    <h1>Sources</h1>
    <div class="source_page-input">
      <input type="text" v-model="url">
      <button @click="addSource(url)">
        <font-awesome-icon icon="arrow-down" size="xs" />
      </button>
    </div>

    <div class="source_page-sources">

      <div v-for="source in sources" :key="source.id" class="source_page-source-item">
        <span class="source_page-source-item-text">{{ source.name }}</span>
        <div class="source_page-toggle-wrapper">

          <label class="source_page-toggle" for="myToggle">
              <input class="source_page-toggle_input"
                     type="checkbox"
                     id="myToggle"
                     :checked="source.notify"
                     @change="toggleSourceNotification(source)">
              <div class="source_page-toggle_fill"></div>
          </label>

          <button @click="removeSource(source)" class="source_page-button-remove">
            <font-awesome-icon icon="times" size="lg" />
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { useSources } from '@/services/sources.service';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {
  },

  setup() {

    const {
      url,
      sources,
      setSources,
      addSource,
      toggleSourceNotification,
      removeSource } = useSources();

    //TODO: delete me
    function dummyPlug(msg: any) {
      console.log(msg);
    }

    // call set sources to update them when created
    setSources();

    return {
      url,
      sources,
      setSources,
      addSource,
      toggleSourceNotification,
      removeSource,
      dummyPlug,
    }
  },
});

</script>

<style>
.source_page-container {
  padding: 80px 30px 10px 30px;
  width: 100%;
}
.source_page-container h1 {
  font-size: 42px;
  font-weight: 700;
}
.source_page-input {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.source_page-input input, input:focus, input:active {
  display: block;
  width: 100%;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: thin solid var(--nbac-color-grey);
  outline: none;
  color: var(--nbac-color-grey);
  font-size: 18px;
  line-height: 27px;
}
.source_page-input button {
  border-radius: 50%;
  width: 25px;
  height: 25px;
  background-color: #fff;
  border: thin solid var(--nbac-color-grey);
  color: var(--nbac-color-grey);
  transition: all 0.3s ease-in-out;
}
.source_page-input button:focus {
  outline: none;
}
.source_page-input button:active {
  outline: none;
  background-color: var(--nbac-color-grey);
}
.source_page-source-item {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  align-items: center;
}
.source_page-source-item-text {
  font-size: 18px;
  font-weight: 300;
}
.source_page-button-remove {
	width: 20px;
	height: 20px;
  padding: 0;
  margin-left: 30px;
  background: none;
}
.source_page-toggle-wrapper {
  display: flex;
  align-items: center;
}

/** toggle element style */

.source_page-toggle {
  --width: 40px;
  --height: calc(var(--width) / 2);
  --border-radius: calc(var(--height) / 2);

  display: inline-block;
  cursor: pointer;
}

.source_page-toggle_input {
  display: none;
}

.source_page-toggle_fill {
  position: relative;
  width: var(--width);
  height: var(--height);
  border-radius: var(--border-radius);
  background: #dddddd;
  transition: background 0.2s;
}

.source_page-toggle_input:checked ~ .source_page-toggle_fill {
  background: #9EB7C2;
}

.source_page-toggle_fill::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: var(--height);
  width: var(--height);
  background: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  border-radius: var(--border-radius);
  transition: transform 0.2s;
}

.source_page-toggle_input:checked ~ .source_page-toggle_fill::after {
  transform: translateX(var(--height));
}
.source_page-toggle_input:checked {
  display: none;
}

</style>
