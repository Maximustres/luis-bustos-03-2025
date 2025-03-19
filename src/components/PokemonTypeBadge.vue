<template>
  <span
    class="flex capitalize items-center justify-center px-3 py-2 rounded-full text-white border-1 border-black font-semibold text-xs sm:text-sm shadow-md text-center transition-transform duration-500 hover:scale-105 cursor-pointer leading-none min-h-[24px] sm:min-h-[28px] whitespace-nowrap"
    :style="{ backgroundColor: typeColors[type.toLowerCase()] }"
  >
    {{ type }}
  </span>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import typeColors from "../utils/typePokemonColors";

defineProps<{ type: string }>();
</script>
