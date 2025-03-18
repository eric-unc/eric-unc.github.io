<template>
  <div>
    <section class="hero is-info is-bold">
      <div class="hero-head">
        <Navbar />
      </div>
    </section>
    <section class="section">
      <div class="content">
        <h1 class="title">Can you run DeepSeek R1 on a 2009 Mac Pro? - Part 2</h1>
        <p>If you haven't read <a href="/blog/deepseek-macpro-2009">the first part</a>, then go read it. The answer is yes.</p>
        <p>I forgot to mention this in the blog, but the most frustrating part of my experience was that my old Dell mouse double clicks every click. I need to replace it.</p>
        <h2>Frontend</h2>
        <p>I said I might try installing <a href="https://github.com/open-webui/open-webui">Open WebUI</a> again or another frontend, or I could try to make my own frontend. This seemed like a lot of work, so obviously, I just asked ChatGPT to make a frontend for it. It decided to use React and Tailwind, which seemed pretty fine to me. Installing NPM and all that crap was annoying, but at least I didn't need to use Docker.</p>

        <h2>Footnotes</h2>
        <p id="footnote-1">[1] idk.</p>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
</script>