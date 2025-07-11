<template>
  <div>
    <div>
      <section class="hero is-info">
        <div class="hero-head">
          <Navbar />
        </div>
        <div class="hero-body">
          <div class="container">
            <h1 class="title">Eric Schneider</h1>
            <h2 class="subtitle">PhD Student at Virginia Tech</h2>
          </div>
        </div>
      </section>
    </div>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-narrow">
            <figure class="image is-128x128">
              <img src="/eric.png" class="is-rounded" alt="A picture of myself">
            </figure>
          </div>
          <div class="column">
            <div class="box">
              <div class="content">
                <p>Hello! My name is <strong>Eric Schneider</strong> (<em>he/him</em>).</p>
                <p>I am currently a second-year computer science PhD student at Virginia Tech, expecting to graduate in 2029. Previously, I earned an MS (2024) and a BS (2023) from UNC Chapel Hill in computer science (BS/MS) and mathematics (BS).</p>
                <p>My research interests are mainly in computer architecture, operating systems, and security. Currently, I am most interested in trusted execution environments (TEEs), sandboxing and isolation, and heterogeneous computing.</p>
                <p>Welcome to my website! I recently updated it and I hope to polish it a little more soon.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="content">
        <h2>Background</h2>
        <p>I got into programming very early in middle school, and I loved making software (mostly Minecraft mods), which propelled me to major in computer science once I got to college. There, I refined my taste to a more general love of computer science, rather than just programming, and I grew particularly interested in systems, especially in computer architecture, compilers/programming languages, and operating systems. I took all the classes I could for those topics, but didn't want to stop there; hence, that is how I got into systems research. Currently, my research is focused on trusted execution environments (TEEs); see my <a href="research.vue">research page</a> for more information on past and present research.</p>
        <p>Outside of classes and academia, I have worked on many hobby projects, including quite a few hackathon entries. I have also worked in industry thrice as an intern, working for VMware (summer 2021 and 2022) and Nutanix (2024). See my <a href="software.vue">software page</a> for more information on all the many projects I have contributed towards. For programming, I have the most experience in Java and C, and some in Ruby, Rust, JavaScript, and plenty others. You can see my list of skills on my <a href="/CV.pdf">CV</a>. If using a language I haven't used for a while, I can be a bit rusty, but I can always adapt fast. Generally, I'm pretty flexible when it comes to languages and frameworks, since I've touched enough of everything to be able to adapt to whatever situation I need to.</p>
        <p>Outside of academia and software, I love to exercise. I used to train for marathons (I've run seven), but after an injury and some hiatus, I am currently trying to transition towards triathlons. I also enjoy lifting weights. I occasionally like playing video games, especially Minecraft, reading the news, and cats.</p>

        <h2 class="subtitle">Contact</h2>
        <p>If you want to contact me, you can contact me through the address <code>e r i c t s @ vt . edu</code> (<a href="javascript:" @click="copyEmail">copy</a>). This is my student email, but it is continually monitored outside the school semester. Email is my preferred means of initial contact.</p>
        <p>You can add me on <a href="https://www.linkedin.com/in/eric-cs/">LinkedIn</a>. You are welcome to contact me there, but I don't check it as often. Also, usually my information on LinkedIn is a bit dated.</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  head: {
    title: "Eric Schneider"
  },

  methods: {
    copyEmail() {
      let emailAddress = "eric" + "ts" + "@" + "vt.edu";

      navigator.clipboard.writeText(emailAddress).then(() => {
        // Successfully copied.
      }, () => {
        console.error("Unable to write to clipboard!");
      });
    }
  }
}
</script>
