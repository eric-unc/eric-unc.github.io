<template>
  <nav :class="['navbar', isDark ? 'is-dark' : 'is-info']" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a href="/" class="navbar-item has-text-weight-bold">Eric Schneider</a>
        <a role="button" class="navbar-burger" :class="{ 'is-active': menuOpen }" @click="menuOpen = !menuOpen" aria-label="menu" :aria-expanded="menuOpen.toString()">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" :class="{ 'is-active': menuOpen }">
        <div class="navbar-start">
          <a href="/research" class="navbar-item" :class="{ 'is-active': route.path === '/research' }">Research</a>
          <a href="/teaching" class="navbar-item" :class="{ 'is-active': route.path === '/teaching' }">Teaching</a>
          <a href="/software" class="navbar-item" :class="{ 'is-active': route.path === '/software' }">Software</a>
          <a href="/blog" class="navbar-item" :class="{ 'is-active': route.path.startsWith('/blog') }">Blog</a>
          <a href="/CV.pdf" class="navbar-item">Resume/CV</a>
        </div>
        <div class="navbar-end">
          <a
            role="button"
            class="navbar-item"
            @click.prevent="toggleTheme"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <!-- Sun icon: shown in dark mode to switch to light -->
            <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            <!-- Moon icon: shown in light mode to switch to dark -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
const route = useRoute()
const menuOpen = ref(false)

const isDark = ref(false)

onMounted(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const saved = localStorage.getItem('theme')
  if (saved === 'light' || saved === 'dark') {
    isDark.value = saved === 'dark'
  } else {
    isDark.value = mediaQuery.matches
  }
  mediaQuery.addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      isDark.value = e.matches
    }
  })
})

function toggleTheme() {
  isDark.value = !isDark.value
  const newTheme = isDark.value ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', newTheme)
  localStorage.setItem('theme', newTheme)
}
</script>