<template>
  <div
    class="relative flex flex-col p-2 items-center rounded-lg shadow-lg transition-all duration-300"
  >
    <div
      class="absolute inset-0 rounded-lg"
      :style="{ backgroundColor: backgroundColor, opacity: 0.6 }"
    ></div>

    <img
      src="../assets/pokeball.png"
      alt="Pokeball"
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-60"
    />

    <img
      :src="pokemon.image"
      :alt="pokemon.name"
      class="relative w-30 h-30 z-10 transition-transform duration-500 hover:scale-125 cursor-pointer"
      :class="{ 'hover:brightness-110': clickable }"
      @click="navigateToDetail"
    />

    <h2 class="relative text-lg font-bold capitalize z-10">
      {{ pokemon.name }}
    </h2>

    <button
      @click="toggleSelect"
      class="cursor-pointer absolute top-0 right-0 z-10"
      :title="selected ? 'Liberar' : 'Atrapar'"
    >
      <img :src="selected ? pokeball_close : pokeball_open" class="w-8 h-8" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import { useRouter } from "vue-router";
import type { Pokemon } from "../store/pokemon";
import pokeball_open from "../assets/pokeball_open.png";
import pokeball_close from "../assets/pokeball_close.png";
import typeColors from "../utils/typePokemonColors";

const props = defineProps<{
  pokemon: Pokemon;
  selected: boolean;
  clickable?: boolean;
}>();

const emit = defineEmits(["toggle"]);
const router = useRouter();

const toggleSelect = () => emit("toggle");

const backgroundColor = computed(() => {
  const firstType = props.pokemon.types[0];
  return typeColors[firstType] || "#777777";
});

const navigateToDetail = () => {
  if (props.clickable) {
    router.push(`/team/${props.pokemon.id}`);
  }
};
</script>
