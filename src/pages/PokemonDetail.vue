<template>
  <div class="container mx-auto">
    <div v-if="pokemon">
      <Pokedex :pokemon="pokemon" />
    </div>
    <div v-else>
      <p class="text-red-600">No se encontró el Pokémon</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { usePokemonStore } from "../store/pokemon";
import Pokedex from "../components/Pokedex.vue";
import type { Pokemon } from "../store/pokemon";

const route = useRoute();
const store = usePokemonStore();
const pokemon = ref<Pokemon | null>(null);

onMounted(() => {
  store.loadTeamFromStorage();
  const foundPokemon = store.team.find((p) => p.id === Number(route.params.id));
  if (foundPokemon) {
    pokemon.value = foundPokemon;
  }
});
</script>
