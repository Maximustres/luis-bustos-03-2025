<template>
  <div class="relative flex items-center justify-center w-50 h-50">
    <img
      src="../assets/pokeball_search.png"
      alt="Pokeball"
      class="absolute w-full h-full object-contain"
    />
    <input
      v-model="search"
      @input="handleInput"
      type="text"
      placeholder="Buscar..."
      class="absolute w-40 px-2 py-1 text-center border-2 border-black rounded-full bg-white focus:outline-none"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const search = ref("");
const emit = defineEmits(["search"]);

const handleInput = () => {
  emit("search", search.value);
};
</script>

<style scoped>
input {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
