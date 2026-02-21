<template>
  <div>
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Blog</h1>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
      <div class="content">
        <p>This is my blog.</p>
        <ul>
          <li><a href="/blog/fallout1">July 12, 2025 - I beat Fallout 1 on Steam Deck</a></li>
          <li><a href="/blog/deepseek-macpro-2009-part1point5">March 18, 2025 - Can you run DeepSeek R1 on a 2009 Mac Pro? - Part 1.5</a></li>
          <li><a href="/blog/deepseek-macpro-2009">March 2, 2025 - Can you run DeepSeek R1 on a 2009 Mac Pro?</a></li>
        </ul>
      </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Blog',
  description: 'Blog by Eric Schneider on technology, gaming, and other topics.',
  ogTitle: 'Blog – Eric Schneider',
  ogDescription: 'Blog posts on technology, gaming, and other topics.',
  ogImage: 'https://eric-unc.tech/eric.png',
  twitterCard: 'summary',
})
</script>