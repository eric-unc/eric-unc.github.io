<template>
  <div>
    <div>
      <section class="hero is-info is-bold">
        <div class="hero-head">
          <Navbar />
        </div>
        <div class="hero-body">
          <div class="container">
            <h1 class="title">Eric Schneider</h1>
            <h2 class="subtitle">Student at Virginia Tech</h2>
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
                <p>I was born in Charlotte, North Carolina, and raised in Weddington, North Carolina. I am currently a first-year PhD student at Virginia Tech, expecting to graduate in 2029.</p>
                <p>Welcome to my website! It's a bit outdated now... whoops! I promise to update it eventually! (June 2023)</p>
                <p>I however have recently updated my CV, so feel free to reference that. (August 2024)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="content">
        <h2 class="subtitle">Coursework and experience</h2>
        <p>In computer science, my course load is focused around major requirements (such as COMP 410: Data Structures and COMP 211: Systems Fundamentals), systems programming (such as COMP 520: Compilers and COMP 530: Operating Systems), and also applications (such as COMP 426: Modern Web Programming). In mathematics, my course load is focused around major requirements (such as MATH 383: Differential Equations), applications (such as MATH 528: Mathematical Methods for the Physical Sciences I), and classes related to computer science (such as MATH 548: Combinatorial Mathematics). The most relevant classes I've taken are listed on my <a href="Resume.pdf">resume</a>.</p>
        <p>I have been an undergraduate teaching assistant in Systems Fundamentals (COMP 211), an intermediate level computer science class, for four semesters. It teaches programming in the C language and lower-level computer concepts such as data representation, memory management, and parsing, as well as tools. With the help of Cindy Wang and Dylan Binley, I helped make <a href="https://comp211-20f.github.io/">an archival semester website</a>. I am now an undergraduate teaching assistant for Operating Systems (COMP 530), an advanced computer science elective.</p>
        <p>In the summer of 2021, I was an intern for VMware's Uhana team. <a href="https://docs.vmware.com/en/Uhana-by-VMware/1.0/uhana_piran_1_3/GUID-overview.html">Uhana</a> is a real-time big data platform for telecommunications, which generates and analyzes KPIs (key performance indicators) for 4G and 5G radio access networks (RAN). I worked on migrating the decoder service from using Apache Kafka Streams to Apache Flink. The decoder is an early part of the pipeline, which converts a stream of various formats (binary, JSON, ASN) into a unified format (protobufs). I enjoyed working at VMware, and also enjoyed mentoring for VMware High School Hacks, and participating in the intern borathon. I returned in the summer of 2022 to the same team, but with a more difficult project: splitting the overly complicated Flink-based streaker service into two smaller services: a session collator and a KPI composer. The composition of KPIs is the most important part of the Uhana platform, so being able to increase the stability of that component of the pipeline was a pleasure.</p>
        <p>I originally gained an appreciation for computer programming through <a href="https://ftb.fandom.com/wiki/Mods">Minecraft modding</a>. Although I am no longer very active in the scene, I have created, taken over, or contributed towards several well-used Minecraft mods. <a href="https://www.curseforge.com/minecraft/mc-mods/nuclear-control-2">Nuclear Control 2</a> (now discontinued) is probably my biggest project, which has more than 5.7 million downloads. Notable other projects include <a href="https://www.curseforge.com/minecraft/mc-mods/afsu-mod">the AFSU Mod</a> (with 206k downloads), <a href="https://www.curseforge.com/minecraft/mc-mods/flaxbeards-steam-power">Flaxbeard's Steam Power</a> (also known as Esteemed Innovation, with 997k downloads), <a href="https://www.curseforge.com/minecraft/mc-mods/world-control">World Control</a> (1.1m downloads), <a href="https://www.curseforge.com/minecraft/mc-mods/long-fall-boots">Long Fall Boots</a> (15.6m downloads), and <a href="https://www.curseforge.com/minecraft/mc-mods/huesodewiki">HuesoDeWiki</a> (with 5.7k downloads). All are written in Java.</p>
        <p>Creating mods accidentally brought me deep into the world of documenting mods. I am now an administrator of and a major contributor (with over 55,000 edits) towards the <a href="https://ftb.fandom.com/wiki/FTB_Wiki">Official FTB Wiki</a>, the largest, most popular and most up-to-date centralized repository of knowledge on modded Minecraft. Unfortunately I am no longer very active, and my current contributions are mostly administrative rather than writing new documentation. In August 2016, I was awarded <a href="https://help.fandom.com/wiki/Editor_of_the_Month">Gamepedia Editor of the Month</a> for my "hard work across Gamepedia."</p>
        <h2 class="subtitle">Technology expertise</h2>
        <p>Java is the programming language I feel the most natural in, since it is the first language I used when I started programming in 2013, and I have used it in many projects since. I am also fairly comfortable in C, and to a lesser degree, Ruby, and many more. Here are all the languages and technologies I have experience with:</p>
        <ul>
          <li><span class="has-text-weight-bold">Strong</span>: Java, C, MediaWiki.</li>
          <li><span class="has-text-weight-bold">Basic</span>:
            <ul>
              <li>Languages: Ruby, Rust, JavaScript, Groovy, HTML, CSS, Assembly (MIPS, x86), SQL (PostgreSQL, SQLite, MariaDB).</li>
              <li>Tools/frameworks: Git, Linux, Flink, Protocol Buffers, jQuery, Gradle, JUnit, Bulma, Heroku.</li>
            </ul>
          </li>
          <li><span class="has-text-weight-bold">Some</span>:
            <ul>
              <li>Languages: Lisp, Python, Verilog, Bash, Lua, C#, MATLAB, Mathematica, TypeScript, C++.</li>
              <li>Tools/frameworks: Bazel, Docker, Kubernetes, Kafka, Kafka Streams, Node.js, Vue.js, Nuxt.js, express.js, React.js, Make.</li>
            </ul>
          </li>
        </ul>
        <p>You can see how I've used this knowledge in <a href="./projects">the projects I've made</a>.</p>
        <p>Generally I am quite flexible when it comes to languages and frameworks. I've touched enough of everything to be able to adapt to whatever situation I need to.</p>
        <h2 class="subtitle">Personal</h2>
        <p>I try to run six days a week. I prefer to run long distances, and ideally would run 40 miles a week (although it's been a while). I've run seven marathons, which I am very proud of. I also lift weights six days a week, with an emphasis on hypertrophy.</p>
        <p>I like to play video games. Minecraft is my favorite, especially when modded. Other games I have enjoyed include The Binding of Issac, Cube 2: Sauerbraten, the Civilization series, and Bloons Tower Defense 6.</p>
        <p>I am interested in international politics and affairs, and I keep up with world news closely. I like cats, and love my parents' cats, Trixie and Scout.</p>
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
