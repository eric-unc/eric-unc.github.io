<template>
  <div>
    <section class="hero is-info is-bold">
      <div class="hero-head">
        <Navbar />
      </div>
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Projects</h1>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="content">
        <p>This is a list of all of my projects. This list is sometimes outdated, and yes, it's very long. For a more succinct version, look at my resume instead. This is a very expanded version of that.</p>
        <p>This page was last updated on July 29th, 2022.</p>
        <div class="show-just-active-buttons">
          <button class="show-just-active-button button" type="button">What am I working on now?</button>
          <br />
          <div class="buttons">
            <button class="button is-info is-light button-java">Java/JVM</button>
            <button class="button is-warning is-light button-mw">MediaWiki</button>
            <button class="button is-danger is-light button-rb">Ruby</button>
            <button class="button is-primary is-light button-html">HTML/CSS/JS</button>
            <button class="button is-success is-light button-sql">SQL</button>
            <button class="button is-info is-light button-c">C/C++</button>
            <button class="button is-info is-light button-csharp">C#</button>
            <button class="button is-warning is-light button-py">Python</button>
            <button class="button is-danger is-light button-matlab">MATLAB</button>
            <button class="button is-warning is-light button-rust">Rust</button>
            <button class="button is-primary is-light button-hardware">Hardware</button>
          </div>
        </div>
        <button class="refresh-button button" type="button">&#8634;</button>
        <br /> <!-- This is just to have a space under the button. -->
        <p>The difference between a project being discontinued, abandoned, or complete is somewhat philosophical rather than concrete, so there's just a filter in regard to what I'm actively working on.</p>
      </div>
    </section>
    <section class="section">
      <div class="content">
        {{ projects }}
      </div>
    </section>
  </div>
</template>

<script>
function makeProjects() {
  return "These are the projects ig";
}

export default {
  data() {
    return {
      projects: makeProjects()
    }
  },

  methods: {
    filterJava() {

    }
  }
}
</script>
