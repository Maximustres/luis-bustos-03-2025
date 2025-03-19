import { defineStore } from "pinia";
import apiPokemon from "../apis/PokemonApi";

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
  stats: { name: string; value: number }[];
  cry: string;
}

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    pokemonList: [] as Pokemon[],
    team: [] as Pokemon[],
    loading: false,
    error: null as string | null,
    cache: {} as Record<string, any>,
  }),

  actions: {
    async cachedGet(url: string) {
      if (this.cache[url]) {
        return this.cache[url];
      }
      const response = await apiPokemon.get(url);
      this.cache[url] = response;
      return response;
    },

    async fetchPokemon() {
      try {
        this.loading = true;

        const response = await this.cachedGet("?limit=151");
        this.pokemonList = await Promise.all(
          response.data.results.map(async (p: { name: string }) => {
            const pokeDetails = await this.cachedGet(`${p.name}`);
            return {
              id: pokeDetails.data.id,
              name: p.name,
              image: pokeDetails.data.sprites.front_default,
              types: pokeDetails.data.types.map((t: any) => t.type.name),
              height: pokeDetails.data.height,
              weight: pokeDetails.data.weight,
              stats: pokeDetails.data.stats.map((s: any) => ({
                name: s.stat.name,
                value: s.base_stat,
              })),
              cry: pokeDetails.data.cries?.latest,
            };
          })
        );

        this.loadTeamFromStorage();
      } catch (error) {
        this.error = "Error al cargar los Pokémon";
      } finally {
        this.loading = false;
      }
    },

    togglePokemon(pokemon: Pokemon) {
      const index = this.team.findIndex((p) => p.id === pokemon.id);

      if (index === -1) {
        if (this.team.length < 6) {
          this.team.push(pokemon);
        } else {
          alert(
            "El equipo ya está lleno. Debes quitar un Pokémon antes de agregar otro."
          );
        }
      } else {
        this.team.splice(index, 1);
      }

      this.saveTeamToStorage();
    },

    saveTeamToStorage() {
      localStorage.setItem("pokemonTeam", JSON.stringify(this.team));
    },

    loadTeamFromStorage() {
      const storedTeam = localStorage.getItem("pokemonTeam");
      if (storedTeam) {
        this.team = JSON.parse(storedTeam);
      }
    },
  },
});
