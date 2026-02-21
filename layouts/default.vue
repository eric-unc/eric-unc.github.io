<template>
  <div style="display: flex; flex-direction: column; min-height: 100vh;">
    <Navbar />
    <slot />
    <footer class="footer mt-auto">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            <strong>Eric Schneider</strong> &nbsp;·&nbsp;
            <a href="https://github.com/eric-unc">GitHub</a> &nbsp;·&nbsp;
            <a href="https://www.linkedin.com/in/eric-cs/">LinkedIn</a> &nbsp;·&nbsp;
            <a href="/CV.pdf">CV</a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
