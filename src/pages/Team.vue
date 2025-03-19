<template>
  <div class="container mx-auto pb-20 px-4">
    <h1 class="text-2xl font-bold text-center mb-6">Tu Equipo Pokémon</h1>

    <div
      v-if="team.length === 0"
      class="flex flex-col items-center justify-center text-center bg-gray-800 text-yellow-300 border-4 border-yellow-400 p-6 rounded-lg shadow-lg max-w-md mx-auto"
    >
      <img
        src="../assets/pokeball.png"
        alt="Pokeball"
        class="w-16 h-16 mb-4 animate-bounce"
      />
      <p class="text-lg font-semibold">¡Tu equipo está vacío!</p>
      <p class="text-sm text-gray-300">
        Selecciona Pokémon para formar tu equipo y estar listo para la batalla.
      </p>
    </div>

    <div
      v-else
      data-aos="fade-left"
      class="grid gap-4 auto-rows-fr sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      <PokemonCard
        v-for="poke in team"
        :key="poke.id"
        :pokemon="poke"
        :selected="team.some((p) => p.id === poke.id)"
        :clickable="true"
        @toggle="togglePokemon(poke)"
        class="transition-transform transform hover:scale-105 hover:shadow-lg"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { usePokemonStore } from "../store/pokemon";
import PokemonCard from "../components/PokemonCard.vue";
import type { Pokemon } from "../store/pokemon";

const store = usePokemonStore();
const team = computed(() => store.team);

onMounted(() => {
  store.loadTeamFromStorage();
});

const togglePokemon = (pokemon: Pokemon) => {
  store.togglePokemon(pokemon);
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.grid > * {
  animation: fadeIn 0.5s ease-in-out;
}
</style>
