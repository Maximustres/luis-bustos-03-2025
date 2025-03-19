<template>
  <div class="flex flex-col h-screen">
    <LoadingScreen />

    <nav class="p-4 bg-[#d30a40] text-white flex justify-between">
      <router-link to="/" class="font-bold">Inicio</router-link>
      Pokedex Team
      <router-link to="/team" class="font-bold">Equipo</router-link>
    </nav>

    <main class="flex-1 p-4">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import LoadingScreen from "./components/LoadingScreen.vue";
</script>
