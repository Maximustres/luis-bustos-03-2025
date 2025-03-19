<template>
  <div class="flex flex-col items-center p-4">
    <div class="relative">
      <div
        class="fixed top-20 left-0 z-50 transform transition-transform duration-500 ease-in-out flex items-center"
        :class="teamVisible ? 'translate-x-0' : '-translate-x-full'"
      >
        <TeamDisplay />
        <button
          @click="toggleTeam"
          class="absolute top-15 w-12 h-10 left-full transform -translate-y-1/2 bg-gray-300 text-white p-2 rounded-r-md shadow-md transition-transform duration-500 ease-in-out"
        >
          <img
            src="../assets/pokeball.png"
            alt="Pokeball"
            class="absolute bottom-1 w-8 h-8"
          />
        </button>
      </div>
    </div>

    <div
      data-aos="fade-up"
      class="flex items-center justify-center w-full max-w-md"
    >
      <Pokeball @search="handleSearch" />
    </div>

    <div
      data-aos="fade-left"
      ref="scrollContainer"
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8 px-2 w-full"
    >
      <PokemonCard
        v-for="poke in displayedPokemon"
        :key="poke.id"
        :pokemon="poke"
        :selected="team.some((p) => p.id === poke.id)"
        @toggle="togglePokemon(poke)"
      />
      <div ref="sentinel"></div>
    </div>

    <Transition name="fade">
      <div v-if="loading" class="text-center mt-4 text-gray-500 text-sm">
        Cargando más Pokémon...
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import Pokeball from "./Pokeball.vue";
import PokemonCard from "./PokemonCard.vue";
import { usePokemonStore } from "../store/pokemon";
import type { Pokemon } from "../store/pokemon";
import TeamDisplay from "./TeamDisplay.vue";

const store = usePokemonStore();
const searchQuery = ref("");
const displayedPokemon = ref<Pokemon[]>([]);
const batchSize = 25;
const loading = ref(false);
const observer = ref<IntersectionObserver | null>(null);
const sentinel = ref<HTMLElement | null>(null);
const teamVisible = ref(false);

const loadMorePokemon = () => {
  if (
    loading.value ||
    searchQuery.value.length >= 2 ||
    displayedPokemon.value.length >= 150
  )
    return;

  loading.value = true;
  setTimeout(() => {
    const nextBatch = store.pokemonList.slice(
      displayedPokemon.value.length,
      displayedPokemon.value.length + batchSize
    );
    if (nextBatch.length > 0) {
      displayedPokemon.value.push(...nextBatch);
    }
    loading.value = false;
  }, 1000);
};

const handleSearch = (query: string) => {
  searchQuery.value = query;

  if (searchQuery.value.length >= 2) {
    displayedPokemon.value = filteredPokemon.value.slice(0, batchSize);
  } else {
    displayedPokemon.value = store.pokemonList.slice(0, batchSize);
    observer.value?.observe(sentinel.value!);
  }

  if (displayedPokemon.value.length === 0) {
    observer.value?.disconnect();
  }
};

const filteredPokemon = computed<Pokemon[]>(() => {
  if (searchQuery.value.length >= 2) {
    return store.pokemonList.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  return store.pokemonList;
});

watch(searchQuery, (newQuery) => {
  if (newQuery === "") {
    displayedPokemon.value = store.pokemonList.slice(0, batchSize);
    observer.value?.observe(sentinel.value!);
  }
});

onMounted(() => {
  store.fetchPokemon().then(() => {
    displayedPokemon.value = store.pokemonList.slice(0, batchSize);
  });
  observer.value = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadMorePokemon();
      }
    },
    { threshold: 0.5 }
  );
  if (sentinel.value) {
    observer.value.observe(sentinel.value);
  }
});

onUnmounted(() => {
  observer.value?.disconnect();
});

const team = computed(() => store.team);

const togglePokemon = (pokemon: Pokemon) => {
  store.togglePokemon(pokemon);
  if (team.value.length <= 0) {
    teamVisible.value = false;
    return;
  }
  teamVisible.value = true;
};

const toggleTeam = () => {
  teamVisible.value = !teamVisible.value;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
