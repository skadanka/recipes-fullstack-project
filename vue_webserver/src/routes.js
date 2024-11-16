import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";


const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId/:recipe",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
    props: true
  },
  {
    path: "/my-favorites",
    name: "favorites",
    component: () => import("./pages/FavoritePage")
  },
  {
    path: "/my-family-recipes",
    name: "family",
    component: () => import("./pages/FamilyRecipesPage")
  },
  {
    path: "/private-recipes",
    name: "private-recipes",
    component: () => import("./pages/PrivatePage")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage")
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
