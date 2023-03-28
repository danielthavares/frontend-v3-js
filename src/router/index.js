import { createRouter, createWebHistory } from "vue-router";
import Header from "../components/core/VHeader.vue";
import Footer from "../components/core/VFooter.vue";
import Home from "../views/HomeView.vue";
import Login from "../views/LoginView.vue";
import Unauthorized from "../views/401View.vue";
import Forbidden from "../views/403View.vue";
import NotFound from "../views/404View.vue";

const _headerAndFooter = (default_component) => {
  return {
    header: Header,
    default: default_component,
    footer: Footer,
  };
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      components: _headerAndFooter(Home),
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/about",
      name: "about",
      components: _headerAndFooter(() => import("../views/AboutView.vue")),
    },
    {
      path: "/produtos",
      name: "produtos",
      components: _headerAndFooter(() =>
        import("../views/produtos/ProdutoListView.vue")
      ),
    },
    {
      path: "/produtos/form/:action",
      name: "produtos_form",
      components: _headerAndFooter(() =>
        import("../views/produtos/ProdutoFormView.vue")
      ),
    },
    {
      path: "/example/modal",
      name: "example_modal",
      components: _headerAndFooter(() =>
        import("../views/examples/ModalView.vue")
      ),
    },
    {
      path: "/forbidden",
      name: "forbidden",
      component: Forbidden,
    },
    {
      path: "/unauthorized",
      name: "unauthorized",
      component: Unauthorized,
    },
    {
      path: "/:pathMatch(.*)",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export default router;
