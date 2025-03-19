<template>
  <div class="w-full">
    <LineChart :chart-data="chartData" :chart-options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const props = defineProps<{
  stats: { name: string; value: number }[];
}>();

const statOrder = [
  "hp",
  "attack",
  "defense",
  "special-attack",
  "special-defense",
  "speed",
];

const statColors: Record<string, string> = {
  hp: "#FF4C4C",
  attack: "#FFB74D",
  defense: "#4CAF50",
  "special-attack": "#64B5F6",
  "special-defense": "#9575CD",
  speed: "#FFD54F",
};

const orderedStats = computed(() =>
  statOrder.map(
    (statName) =>
      props.stats.find((stat) => stat.name === statName) || {
        name: statName,
        value: 0,
      }
  )
);

const chartData = computed(() => ({
  labels: orderedStats.value.map((stat) =>
    stat.name.replace("-", " ").toUpperCase()
  ),
  datasets: [
    {
      label: "Estadísticas",
      data: orderedStats.value.map((stat) => stat.value),
      borderColor: "#0079AF",
      backgroundColor: "rgba(0, 121, 175, 0.2)",
      pointBackgroundColor: orderedStats.value.map(
        (stat) => statColors[stat.name] || "#777"
      ),
      pointBorderColor: "#fff",
      pointRadius: 6,
      pointHoverRadius: 8,
      tension: 0.3,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      suggestedMin: 0,
      suggestedMax: 150,
      ticks: {
        stepSize: 25,
        color: "#333",
      },
      grid: {
        color: "#ddd",
      },
    },
    x: {
      ticks: {
        color: "#333",
      },
      grid: {
        display: false,
      },
    },
  },
};
</script>

<style>
.w-full .chartjs-legend {
  display: none !important;
}
</style>
