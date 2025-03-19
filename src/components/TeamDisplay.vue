<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-2 bg-gray-300 p-2 rounded-t-lg shadow-md w-full min-h-25"
  >
    <div
      v-for="poke in team"
      :key="poke.id"
      class="relative flex flex-col items-center border-gray-600 border-2 rounded-xl p-2 shadow-lg"
      :style="{
        backgroundColor: getBackgroundColor(poke),
        opacity: 0.9,
      }"
    >
      <img
        :src="poke.image"
        :alt="poke.name"
        :title="poke.name"
        class="w-14 h-14 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full border-2 border-white shadow-md transition-transform duration-500 hover:scale-105"
      />

      <button
        @click="togglePokemon(poke)"
        class="cursor-pointer absolute top-0 right-0 z-10"
        title="Liberar"
      >
        <img :src="pokeball_close" class="w-8 h-8 sm:w-6 sm:h-6" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { usePokemonStore } from "../store/pokemon";
import typeColors from "../utils/typePokemonColors";
import pokeball_close from "../assets/pokeball_close.png";
import type { Pokemon } from "../store/pokemon";

const store = usePokemonStore();
const team = computed(() => store.team);

const togglePokemon = (pokemon: Pokemon) => {
  store.togglePokemon(pokemon);
};

const getBackgroundColor = (pokemon: any) => {
  const firstType = pokemon.types?.[0] || "unknown";
  return typeColors[firstType] || "#777777";
};
</script>
