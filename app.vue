<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@import "bulma/css/bulma.min.css";

/* Applied immediately by the FOUC-prevention script before Vue hydrates,
   preventing a flash of the bright blue navbar in dark mode. */
html[data-theme="dark"] .navbar.is-info {
  background-color: hsl(0, 0%, 21%);
}
</style>
