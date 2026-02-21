// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-01-26",
  modules: ['@nuxt/image', '@nuxtjs/sitemap'],
  site: {
    url: 'https://eric-unc.tech',
    name: 'Eric Schneider',
  },
  app: {
    head: {
      titleTemplate: '%s – Eric Schneider',
      meta: [
        { name: 'author', content: 'Eric Schneider' },
      ],
      script: [
        {
          innerHTML: `(function(){var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}})();`,
        },
      ],
    },
  },
})
