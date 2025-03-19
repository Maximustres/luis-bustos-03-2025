<template>
  <div
    v-if="loading"
    class="fixed inset-0 flex items-center justify-center bg-white z-100"
  >
    <div class="relative flex items-center justify-center w-40 h-40">
      <div
        class="absolute top-0 w-40 h-20 bg-red-600 rounded-t-full border-4 border-black transition-transform duration-700"
        :class="{ '-translate-y-24': loaded }"
      ></div>

      <img
        src="../assets/pokeball_line.png"
        alt="Loading"
        class="w-20 h-20 animate-spin z-10"
        v-show="!loaded"
      />

      <div
        class="absolute bottom-0 w-40 h-20 bg-white rounded-b-full border-4 border-black transition-transform duration-700"
        :class="{ 'translate-y-24': loaded }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const loading = ref(true);
const loaded = ref(false);

onMounted(() => {
  setTimeout(() => {
    loaded.value = true;
    setTimeout(() => {
      loading.value = false;
    }, 700);
  }, 2000);
});
</script>
