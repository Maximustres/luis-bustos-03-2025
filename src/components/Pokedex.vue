<template>
  <div
    data-aos="fade-up"
    class="relative flex flex-col md:flex-row items-center justify-center gap-8 p-4 sm:p-6 md:p-8 bg-[#d30a40] rounded-lg shadow-xl border-4 border-black w-full max-w-5xl mx-auto min-h-screen md:min-h-0"
  >
    <div class="absolute top-2 left-2 flex gap-2 z-20">
      <div
        class="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-blue-400 border-white rounded-full border-2"
      ></div>
      <div
        class="w-3 h-3 sm:w-4 sm:h-4 bg-red-400 border-black border-1 rounded-full"
      ></div>
      <div
        class="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400 border-black border-1 rounded-full"
      ></div>
      <div
        class="w-3 h-3 sm:w-4 sm:h-4 bg-green-400 border-black border-1 rounded-full"
      ></div>
    </div>

    <div
      class="relative flex flex-col items-center justify-center p-4 sm:p-6 bg-white border-4 sm:border-6 border-black rounded-lg shadow-lg mt-10 md:mt-0"
    >
      <div
        class="relative w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 p-2 sm:p-4 bg-blue-200 rounded-lg shadow-lg border-4 sm:border-6 border-black"
      >
        <img
          :src="backgroundByType(pokemon.types[0])"
          alt="background_pokedex"
          class="absolute opacity-80 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
        />
        <img
          :src="pokemon.image"
          :alt="pokemon.name"
          class="relative w-full h-full z-10 transition-transform duration-500 hover:scale-110"
        />
      </div>

      <button
        @click="playCry(pokemon.cry)"
        class="cursor-pointer mt-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition text-sm sm:text-base"
      >
        Escuchar sonido
      </button>
    </div>

    <div class="hidden md:block w-1 h-60 md:h-96 bg-black"></div>

    <div
      class="relative bg-[#d30a40] p-4 sm:p-6 md:p-8 rounded-lg shadow-xl text-white w-full max-w-md sm:max-w-lg md:max-w-2xl"
    >
      <h2
        class="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6 capitalize"
      >
        {{ pokemon.name }}
      </h2>

      <div class="grid grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-lg">
        <p><strong>Altura:</strong> {{ pokemon.height / 10 }}&nbsp;m</p>
        <p><strong>Peso:</strong> {{ pokemon.weight / 10 }}&nbsp;kg</p>
        <div class="col-span-2 flex flex-wrap gap-2">
          <PokemonTypeBadge
            v-for="type in pokemon.types"
            :key="type"
            :type="type"
          />
        </div>
      </div>

      <div class="mt-4 sm:mt-8 p-4 sm:p-6 bg-white rounded-lg shadow-lg w-full">
        <RadarChart :stats="pokemon.stats" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Pokemon } from "../store/pokemon";
import RadarChart from "./LineChart.vue";
import PokemonTypeBadge from "./PokemonTypeBadge.vue";
import backgroundDefault from "../assets/background_default.png";
import backgroundRock from "../assets/background_rock.jpg";
import backgroundFire from "../assets/background_fire.png";
import backgroundWater from "../assets/background_water.png";
import backgroundIce from "../assets/background_ice.jpg";
import backgroundGhost from "../assets/background_ghost.jpg";

defineProps<{ pokemon: Pokemon }>();

const backgroundByType = (type: string) => {
  switch (type) {
    case "fire":
    case "dragon":
      return backgroundFire;
    case "water":
      return backgroundWater;
    case "ice":
      return backgroundIce;
    case "ghost":
      return backgroundGhost;
    case "rock":
      return backgroundRock;
    default:
      return backgroundDefault;
  }
};

const playCry = (cry: string) => {
  if (!cry) return;
  const audio = new Audio(cry);
  audio.play();
};
</script>
