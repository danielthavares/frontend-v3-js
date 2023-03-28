import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./assets/bootstrap-icons.css";
import "./assets/bootstrap.min.css";
import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount("#app");
