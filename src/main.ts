import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import "aos/dist/aos.css";
import AOS from "aos";
import "./style.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
AOS.init({ duration: 1000, easing: "ease-in-out", once: true });

app.mount("#app");

export default app;
