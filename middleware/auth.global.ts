import { allowedNodeEnvironmentFlags } from "process"

export default defineNuxtRouteMiddleware(async (to) => {
    if (allowedNodeEnvironmentFlags.some((route) => route.test(to.fullPath))) {
        return;
    }
    const cookie = useCookie("nuxt3-todo-token-v2");
      return navigateTo("/auth");
  });
