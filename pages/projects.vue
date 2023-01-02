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
        <p>This page was last updated on Janaury 2nd, 2023.</p>
        <div v-if="filter === 'none'" class="active-buttons">
          <button class="active-button button" type="button" @click="setFilter('active')">What am I working on now?</button>
          <br />
          <div class="buttons">
            <button class="button is-info is-light" @click="setFilter('java')">Java/JVM</button>
            <button class="button is-warning is-light" @click="setFilter('mediawiki')">MediaWiki</button>
            <button class="button is-danger is-light" @click="setFilter('ruby')">Ruby</button>
            <button class="button is-primary is-light" @click="setFilter('web')">HTML/CSS/JS/TS</button>
            <button class="button is-success is-light" @click="setFilter('sql')">SQL</button>
            <button class="button is-info is-light" @click="setFilter('c')">C/C++/Assembly</button>
            <button class="button is-info is-light" @click="setFilter('csharp')">C#</button>
            <button class="button is-warning is-light" @click="setFilter('python')">Python</button>
            <button class="button is-danger is-light" @click="setFilter('matlab')">MATLAB</button>
            <button class="button is-warning is-light" @click="setFilter('rust')">Rust</button>
            <button class="button is-primary is-light" @click="setFilter('hardware')">Hardware</button>
          </div>
        </div>
        <div v-else class="buttons">
          <button v-if="filter !== 'none'" class="refresh-button button" type="button" @click="setFilter('none')">&#8634;</button>
        </div>
        <br /> <!-- This is just to have a space under the button. -->
        <p>The difference between a project being discontinued, abandoned, or complete is somewhat philosophical rather than concrete, so there's just a filter in regard to what I'm actively working on.</p>
      </div>
    </section>
    <section class="section">
      <div class="content" v-for="section in projects">
          <h3 class="subtitle">{{ section.title }}</h3>
          <ul>
            <li v-for="project in filterProjects(section.projects)">
              <span v-if="project.link">
                <a :href="project.link">{{ project.name }}</a>
              </span>
              <span v-else>
                {{ project.name }}
              </span>. <span v-html="project.desc"></span>
            </li>
          </ul>
      </div>
    </section>
  </div>
</template>

<script>
// I'd really like to move this to a JSON file but that's a bit complicated.
// This is organized by sections
const projects = [
  {
    // section title
    title: "Main projects",
    // the projects in that section
    projects: [
      {
        // name of project
        name: "streakersplit",
        // project status ('active' or 'active')
        status: 'inactive',
        // array of languages/technologies
        langs: ['java'],
        // description (fully HTML)
        desc: "streakersplit is a project for <a href=\"https://docs.vmware.com/en/Uhana-by-VMware/1.0/uhana_piran_1_3/GUID-overview.html\">VMware Uhana</a>, a platform for providing real-time telecommunication performance analysis, which uses machine learning and AI to diagnose problems. <a href=\"https://www.youtube.com/watch?v=ld8j2N2BEDA\">This video</a> explains Uhana better than I can. Anyway, the goal of the streakersplit project is to separate the large streakerflink service into two new services, sessioncollator and kpi-composer, in order to decrease complexity and allow newer VMware projects (TCx) to be able to easily reuse the kpi-composer. Unfortunately, Uhana is a proprietary project, so I cannot share any source code. I worked on this for my 2022 internship at VMware. Project status: <span class=\"proj-complete-c\">Complete</span>."
      },
      {
        name: "decoderflink",
        status: 'inactive',
        langs: ['java'],
        desc: "decoderflink is a service of VMware Uhana, which is a rewritten/refactored part of the origin decoder service.  The decoder transforms a big data stream of various format into a unified format (protobufs); it was originally written using Kafka Streams, and I ported it/rewrote it to use Apache Flink. I worked on this during my 2021 internship at VMware. Project status: <span class=\"proj-complete-c\">Complete</span>."
      },
      {
        name: "Official FTB Wiki",
        // optional: link to project
        link: "https://ftb.fandom.com/wiki/FTB_Wiki",
        status: 'active',
        langs: ['mediawiki', 'web'],
        desc: `The Official FTB Wiki is an online publicly edited wiki that documents the world of modded Minecraft, including mods, modpacks, and other third-party content for Minecraft. In 2014, I started documenting my own mod (Nuclear Control 2), and I got so far into documenting that I started documenting other people's mods. Now I'm an administrator, and I have over 50,000 edits on the wiki. I used to edit each day and make a lot of new articles, but nowadays I mostly just do administrative tasks. Contributing to the wiki has involved:
        <ul>
            <li>Writing and editing content in an encyclopedic tone using MediaWiki.</li>
            <li>Analyzing Java (and rarely Scala/Kotlin) to obtain information for the wiki.</li>
            <li>Engaging with other editors on various platforms.</li>
            <li>Creating and modifying templates and other wiki components, using wikitext, Lua, JavaScript, and CSS.</li>
            <li>Developing third party tools and scripts to deal with wiki management tasks, usually in Ruby, occasionally in Java and Groovy (see other projects).</li>
            <li>Refining wiki guidelines/help, managing the translation projects, community management (including managing the Discord, appearing in virtual events, and organizing editathons).</li>
        </ul>
        Project status: <span class="proj-active-c">Semi-actively working on</span>.`
      },
      {
        name: "Nuclear Control 2",
        link: "https://www.curseforge.com/minecraft/mc-mods/nuclear-control-2",
        status: 'inactive',
        langs: ['java'],
        desc: "Nuclear Control 2 is an addon to a Minecraft mod called IndustrialCraft 2. It is also a fork of Nuclear Control, originally created by Shedar. It helps players monitor their nuclear reactors, but it might be more famous for the <a href=\"https://ftb.gamepedia.com/Advanced_Information_Panel\">Advanced Information Panel</a> and the <a href=\"https://ftb.gamepedia.com/Howler_Alarm\">Howler Alarm</a>, the latter of which can be used to annoy unfortunate victims for hours on end. I ported it, with collaboration from Zuxelus and dmf444, from Minecraft 1.6.2 to 1.7.2 to 1.7.10. Pyrolusite modernized the art. We made some changes/improvements to the mod, which are documented <a href=\"https://ftb.gamepedia.com/IC2_Nuclear_Control/Changelog\">here</a>. Nuclear Control 2 is currently discontinued and replaced by a new mod, World Control (see below). Made in Java. GitHub <a href=\"https://github.com/xbony2/Nuclear-Control\">here</a>. Project status: <span class=\"proj-discontinued-c\">Discontinued</span>."
      },
      {
        name: "ESAEBSAD",
        link: "https://github.com/xbony2/Experimental-Self-Aware-Electronic-Based-Space-Analyzing-Droid",
        status: 'inactive',
        langs: ['ruby'],
        desc: "ESAEBSAD is an IRC bot that can be used to manipulate wiki content, as well as perform some silly commands. Its more useful functions include the find-replace command, the double redirect fixer, and the translated categories generator. I wrote this in Ruby, and you can say it worked out pretty well, since it convinced my fellow administrator Eli to rewrite his bot in Ruby instead of Perl. Since we stopped using IRC, ESAEBSAD was replaced by ESAEBSAD2, which is being replaced with ESAEBSAD3. Project status: <span class=\"proj-discontinued-c\">Discontinued</span>."
      }
    ]
  },
  {
    title: "2022",
    projects: [
      {
        name: "WorseThanVim", // December
        link: "https://github.com/eric-unc/WorseThanVim",
        status: 'inactive',
        langs: ['c'],
        desc: "WorseThanVim is a port of BetterThanVim in C++ (from Rust), made over winter break just to prove I know some C++. Project status: <span class=\"proj-complete-c\">Effectively complete</span>."
      },
      {
        name: "NAShell", // November
        status: 'inactive',
        langs: ['c', 'hardware'],
        desc: "Not A Shell (NAShell) was a school project. I implemented a simple single-cycle MIPS processor in Verilog for an FPGA, and then wrote this program in Assembly for it. NAShell supports 12 simple commands, ~120 characters (including several special characters), supported by ~900 instructions and ~900 words in static memory. I drew all of the \"Ericscii\" characters myself, and it shows. You can see my demo <a href='https://www.youtube.com/watch?v=AlkD0imRwz8'>here</a>. Project status: <span class=\"proj-complete-c\">Effectively complete</span>."
      },
      {
        name: "streakersplit", // May
        status: 'inactive',
        langs: ['java'],
        desc: "See top."
      },
      {
        name: "JOS", // Jan
        status: 'inactive',
        langs: ['c'],
        desc: "This was a school project to implement key portions of an operating system. The OS supports boot loading, virtual memory, processes/environments, multiprogramming, a file system and shell, and a partial implementation of a hypervisor. It also has special support for floating point operations. Although I would like to return to finish the hypervisor, and complete the optional networking assignment, I consider it done for now. Project status: <span class=\"proj-complete-c\">Effectively complete</span>."
      }
    ]
  },
  {
    title: "2021",
    projects: [
      {
        name: "MagnumVM", // Nov
        link: "https://devpost.com/software/magnumvm",
        status: 'inactive',
        langs: ['rust'],
        desc: "MagnumVM is a custom process virtual machine that I made for queer_hack 2021, which I worked on alone. It's written in Rust. It's somewhat on the experimental side, but it won 1st Place! In the future, I hope to clean it up, and then make an assembler/compiler targeting it. GitHub <a href=\"https://github.com/eric-unc/magnum\">here</a>. Project status: <span class=\"proj-complete-c\">Complete for now</span>."
      },
      {
        name: "The Calculator", // Nov
        link: "https://devpost.com/software/the-calculator-xo3jau",
        status: 'inactive',
        langs: ['rust'],
        desc: "For HackNC 2021, I wanted to do something, but I was busy that weekend. So me and Chongyi Zheng just made a simple calculator in Rust. He made the \"backend\" (the parser/evaluator) and I made the \"frontend\" (the very simple GUI). Even though I spent only about 5 hours of effort on it, I enjoyed learning about the state of the GUI scene in Rust (which is ever-changing). You can try it <a href=\"./hacknc2021\">here</a> using WASM. The web GUI version is slightly different from the native version. You can use the application as a CLI also. GitHub <a href='https://github.com/eric-unc/hacknc2021'>here</a>. Project status: <span class=\"proj-complete-c\">Complete</span>."
      },
      {
        name: "Psil", // June
        link: "https://github.com/eric-unc/psil",
        status: 'active',
        langs: ['rust'],
        desc: "Psil is a Lisp-like programming language, which uses Limp as a prototype. It has a standard variety of types (numbers, booleans, strings, symbols, procedures), some composite types (lists, tables), bindings, control logic, mix of functional/procedural programming, a native documentation generator (like Javadocs), and a decently sized standard library (currently over 50 built-in procedures). <span class=\"proj-active-c\">Working on, sporadically</span>."
      },
      {
        name: "decoderflink", // May
        status: 'inactive',
        langs: ['java'],
        desc: "Limp is a Lisp-like programming language implemented in Rust I made for PackHacks 2021, with some contributions from Chongyi Zheng. I really wanted to create a language from scratch, as well as get some more Rust use. The language is very much a toy language, missing many important constructs, but it has a few powerful features, including conditionals, boolean logic, basic integer/float operations, and bitwise operations. It is succeeded by Psil. GitHub <a href=\"https://github.com/eric-unc/limp\">here</a>."
      },
      {
        name: "miniJava Compiler", // Jan
        link: "https://github.com/eric-unc/520-compiler",
        status: 'inactive',
        langs: ['java'],
        desc: "This was a school project to create a compiler for a subset of Java. My compiler supports basic integer and boolean operations, arrays, basic control logic, and some level of OOP. I completed the assignment but did not complete all extra credit parts; there's support for field initialization, constructors, for loops, and some level of broken support for overloading. Although I would like to return to finish overloading, more likely I will start a new compiler at some point. Project status: <span class=\"proj-complete-c\">Effectively complete</span>."
      },
      {
        name: "ESAEBSAD3", // Jan
        link: "https://github.com/xbony2/ESAEBSAD3",
        status: 'inactive',
        langs: ['ruby', 'sql'],
        desc: "This is the third (and hopefully final) iteration of my bot. It is a Discord bot used to manipulate wiki content, as well as do some other stuff. It's written in Ruby and hosted on Heroku, with a PostgreSQL database to log (and potentially undo) actions. Project status: <span class=\"proj-active-c\">Working on, sporadically</span>."
      },
    ]
  },
  {
    title: "2020",
    projects: [
      {
        name: "SAP-1", // Dec
        status: 'inactive',
        langs: ['hardware'],
        desc: "This was a hardware project to create <a href=\"https://eater.net/8bit\">an 8-bit computer</a>. If it is ever finished, I hope to upload many pictures of it. I originally started on it during the 2020 break, but haven't really touched it since. It's about 75% complete. You can see a picture of it <a href=\"computer.jpg\">here</a>. Project status: <span class=\"proj-abandoned-c\">On hiatus</span>."
      },
      {
        name: "BetterThanVim", // Dec
        link: "https://devpost.com/software/betterthanvim",
        status: 'inactive',
        langs: ['rust'],
        desc: "BetterThanVim is an <code>ed</code>-like command line command-based text editor that I made for queer_hack 2020. This was a conceptual idea that was especially interesting to me, so I decided to work on it alone. It's written in Rust. I consider this to be finished since it works and completes the general concept. GitHub <a href=\"https://github.com/eric-unc/queerhack2020\">here</a>. Project status: <span class=\"proj-complete-c\">Effectively complete</span>."
      },
      {
        name: "Tar Heel Calendar", // Nov
        link: "https://tar-heel-calendar.herokuapp.com/",
        status: 'inactive',
        langs: ['web', 'sql'],
        desc: "This was created by me, Victoria Hoffman, Alfred Mathew, and Ezri White for our COMP 426: Modern Web Programming final. It is a calendar/scheduling website. Because it's on Heroku, it may take a while to come online if it hasn't been used in a while. The frontend uses React.js, Bulma, and axios, while the backend (which I was in charge of) uses Node.js, express, MariaDB, the mysql NPM package, and Heroku. The GitHub is <a href=\"https://github.com/calendar-gang/tar-heel-calendar\">here</a>.  Project status: <span class=\"proj-inactive-c proj-complete-c\">Complete</span>."
      },
      {
        name: "COMP 211: Systems Fundamentals (fall 2020) website", // Nov
        link: "https://comp211-20f.github.io/",
        status: 'inactive',
        langs: ['web'],
        desc: " This was created by me, Dylan Binley, and Cindy Wang for our COMP 227: Effective Peer Tutoring final project. It is a website for the course, with links to all the lectures and resources, plus some extra resources. It's a static website, using HTML/CSS/JS and Bulma. GitHub <a href=\"https://github.com/comp211-20f/comp211-20f.github.io\">here</a> (currently private). Project status: <span class=\"proj-complete-c\">Complete</span>."
      },
      {
        name: "Mad Muzzic", // Oct
        link: "https://devpost.com/software/mad-muzzic",
        status: 'inactive',
        langs: ['web', 'python'],
        desc: "This is a website created by me, Anand Hande, and Leonard Zhang for HackNC. It allows users to upload a midi file, using machine learning to generate a continuation of it. It wasn't really finished (and we did not win), because we put too much importance into getting a goodnight's sleep, but it was interesting to make. On the frontend, which I was in charge of, we used React.js and Bulma, and on the backend, we used Python Flask, Music21, Keras, and Google Cloud. GitHub <a href=\"https://github.com/eric-unc/hacknc2020\">here</a>. Project status: <span class=\"proj-complete-c\">Complete</span> (we're done with it, effectively)."
      },
      {
        name: "Newton's Law of Cooling", // June
        link: "https://github.com/eric-unc/MATH-383L-final",
        status: 'inactive',
        langs: ['matlab'],
        desc: "This was the final project for my laboratory for differential equations. It's an 11-page paper, presentation, and GitHub repo (with coding in MATLAB). The GitHub has links to the other components of the project in the README. Project status: <span class=\"proj-complete-c\">Complete</span>."
      },
      {
        name: "Breath", // late Jan
        link: "https://globalgamejam.org/2020/games/breath-8",
        status: 'inactive',
        langs: ['csharp'],
        desc: "This is a game made in Unity (using C#) which is a submission to the Global Game Jam (2020). The goal is to not run out of oxygen. Farts lower the oxygen level by a lot. Having the mouth closed will slowly deplete oxygen, while having it open (use the space bar) will slowly bring it back. The longer you last the better your score. It's a bit like Floppy Bird. This was made by me, Richard Pan, and Dylan Binley. I did much of the code and I Photoshopped some assets. GitHub <a href=\"https://github.com/eric-unc/GGJ2020\">here</a>. The GitHub is more updated than the GGJ entry since Richard made some last-minute improvements before we had to present. We probably weren't the best game in the room but we used Unity for the first time and so gained some Unity/C# experience. And like most hackathons, about 10% of the time allocated went to actually working, with 90% of the time going to sleeping, eating, goofing off, pretending to work, going to workshops, etc. Oh well. Project status: <span class=\"proj-complete-c\">Complete</span>."
      },
      {
        name: "This website", // Jan
        status: 'active',
        langs: ['web'],
        desc: "Yep! Originally was written in HTML/CSS/JS with jQuery, now migrated to Nuxt.js/Vue.js (specifically Nuxt 3/Vue 3, which uses a bit of TypeScript). Styled with Bulma, hosted using GitHub Pages. GitHub <a href=\"https://github.com/eric-unc/eric-unc.github.io\">here</a>. Project status: <span class=\"proj-active-c\">Some migration/updating is ongoing</span>."
      },
    ]
  },
  {
    title: "2019",
    projects: [
      {
        name: "Conway's Game", // Nov
        link: "https://github.com/eric-unc/a8-conway-the-gamer",
        status: 'inactive',
        langs: ['java'],
        desc: "Made in Java Swing. This was an extra credit assignment for COMP 401. Although most school assignments aren't noteworthy, I think this one is since I made it from scratch and it has a bunch of cool options. Unfortunately it doesn't work very well in large sizes. Project status: <span class=\"proj-complete-c\">Complete</span>."
      },
      {
        name: "Ball Game", // Nov
        link: "https://github.com/eric-unc/401hackathon",
        status: 'inactive',
        langs: ['java'],
        desc: "his is a Java Swing game where the player shoots at ten balls to get points. This was made for a hackathon just for COMP 401 students. We (me, Dylan Binley, Anand Hande) didn't win, probably because the game is genuinely difficult, not super intuitive, and we didn't have time to make it aesthetically pleasing. The gravity is pretty cool. Made in &lt;12 hours. Project status: <span class=\"proj-complete-c\">Complete</span>."
      },
      {
        name: "Language Fun",
        link: "https://github.com/a8675309/HackNCSilentDisco0",
        status: 'inactive',
        langs: ['java'],
        desc: "This is an Android app that we (me, Anand Hande, Dylan Binley) made for HackNC. It's our first Android app. The app lets you practice the top 100 most common words in Spanish and French. It's not really complete, and not released anywhere. We did not win. Made in 24 hours (minus when we slept and goofed off) in Java. Project status: <span class=\"proj-complete-c\">Complete</span>."
      },
      {
        name: "Coabot", // before June?
        link: "https://gist.github.com/xbony2/28908b42ec3851c6141787dd81ff1bbf",
        status: 'inactive',
        langs: ['ruby'],
        desc: "It's an exercise planner made in Ruby made for personal use. I never really used it though. I believe I made since I wasn't busy enough in my online art appreciation class. Project status: <span class=\"proj-complete-c\">Complete</span>."
      },
    ]
  },
  {
    title: "2018",
    projects: [
      {
        name: "ESAEBSAD2", // Feb
        link: "https://github.com/xbony2/ESAEBSAD2",
        status: 'inactive',
        langs: ['java'],
        desc: "A Discord bot written in Groovy to replace ESAEBSAD. I technically started this in early 2018 but didn't really do much until late 2019. Unfortunately the dependencies I relied on no longer function, so I decided to create an ESAEBSAD3. "
      }
    ]
  },
  {
    title: "2017",
    projects: [
      {
        name: "Gamepedia Rapid Anti-Spam Patrol (GRASP)", // Sep
        link: "https://help.fandom.com/wiki/Gamepedia_Rapid_Anti-Spam_Patrol",
        status: 'inactive',
        langs: ['mediawiki'],
        desc: "This was an initiative across Gamepedia to revert vandalism (and rarely spam) across wikis. I was appointed a GRASP member. When I was active I patrolled like 10-20 wikis a day to check for vandalism. Project status: <span class=\"proj-abandoned-c\">Inactive</span>."
      },
      {
        name: "Long Fall Boots", // Aug
        link: "https://www.curseforge.com/minecraft/mc-mods/long-fall-boots",
        status: 'inactive',
        langs: ['java'],
        desc: "Ported/recreated small mod from Minecraft 1.11 to 1.12.2 in Java, and from 1.14 to 1.15/1.16.1/1.16.4/1.17.1/1.18. GitHub <a href=\"https://github.com/xbony2/Long-Fall-Boots\">here</a>. Project status: <span class=\"proj-complete-c\">Complete</span> (until the next update)."
      },
      {
        name: "HuesoDeWiki", // Jan
        link: "https://www.curseforge.com/minecraft/mc-mods/huesodewiki",
        status: 'inactive',
        langs: ['java'],
        desc: "HuesoDeWiki is a Minecraft mod created by me in Java to create a base page of blocks and items in the game. It also has a command to copy structures in a <a href=\"https://ftb.fandom.com/wiki/Template:Cg/Multiblock/Alt\">{{Cg/Multiblock/Alt}}</a> format, but Hubry made that part. GitHub <a href=\"https://github.com/xbony2/HuesoDeWiki\">here</a>. Project status: <span class=\"proj-complete-c\">Complete</span>."
      },
    ]
  },
  {
    title: "2016",
    projects: [
      {
        name: "BlockRenderer", // Dec
        link: "https://www.curseforge.com/minecraft/mc-mods/blockrenderer",
        status: 'inactive',
        langs: ['java'],
        desc: "BlockRenderer is a Minecraft mod created by unascribed used to dump renders of blocks and items. We use it at the FTB Wiki to make tilesheets. I ported the mod from Minecraft 1.10 to 1.11. I was working on porting it from Minecraft 1.12 to 1.15 but someone beat me to it. GitHub <a href=\"https://github.com/xbony2/BlockRenderer\">here</a> (my fork). Project status: <span class=\"proj-abandoned-c\">Abandoned</span>."
      },
      {
        name: "Bonemealable babies", // Aug
        link: "https://www.curseforge.com/minecraft/mc-mods/bonemealable-babies",
        status: 'inactive',
        langs: ['java'],
        desc: "This is a small joke mod for Minecraft written in Java (there was a test port in Groovy, but it had issues) that allows baby animals to be grown by right-clicking them with Bone Meal. Now updated to the latest version of Minecraft. GitHub <a href=\"https://github.com/xbony2/Bonemealable-babies\">here</a>. Project status: <span class=\"proj-complete-c\">Complete</span>."
      },
      {
        name: "BunnyTech", // Aug
        link: "https://github.com/elifoster/TheModdingTrials",
        status: 'inactive',
        langs: ['java'],
        desc: "BunnyTech is a small Minecraft mod made in Java by me and Eli Foster during The Modding Trials, a mod-making competition. I tried to make a TESLA-based Basic Generator (which burned Coal) but it didn't work. Eli successfully made a <a href=\"https://ftb.fandom.com/wiki/Bunny%27s_Tail\">Bunny's Tail</a> that lets the player jump. We didn't win. Project status: <span class=\"proj-complete-c\">Complete</span>/<span class=\"proj-abandoned-c\">Abandoned</span>."
      },
      {
        name: "ATT-9001", // Jun
        link: "https://github.com/FTB-Gamepedia/ATT-9001",
        status: 'inactive',
        langs: ['ruby'],
        desc: "AKA the Auto Tile Translator 9001. This a tool made in Ruby for the FTB Wiki. Given language files from a mod, it will automatically translate tiles registered on the wiki based on those official translations. It supports both <code>.lang</code> and <code>.json</code> files. Project status: <span class=\"proj-complete-c\">Complete</span>."
      },
      {
        name: "World Control", // May
        link: "https://www.curseforge.com/minecraft/mc-mods/world-control",
        status: 'inactive',
        langs: ['java'],
        desc: "World Control was a Minecraft mod written in Java that was a recreation of Nuclear Control 2 for Minecraft 1.10 and 1.12, and without requiring IC2. I was the project manager more or less, although dmf444 has probably taken more initiative than me. Zuxelus started his own fork of the original Nuclear Control called <a href=\"https://www.curseforge.com/minecraft/mc-mods/energy-control\">Energy Control</a>, which is the unofficial replacement for this mod, since me and the other developers didn't have enough time to work on it. GitHub <a href=\"https://github.com/World-Control-Team/World-Control\">here</a>. Project status: <span class=\"proj-discontinued-c\">Discontinued</span>."
      },
      {
        name: "The Madness of Little Emma Wiki",
        link: "https://tmole.gamepedia.com/The_Madness_of_Little_Emma_Wiki",
        status: 'inactive',
        langs: ['mediawiki'],
        desc: "This is a wiki that I was the administrator of for a period of time, gaining a bit more than 1500 edits. I made templates and many pages. I am no longer involved. The game is an indie game, not especially popular, and not being updated anymore. I don't think anyone plays it nowadays. So yeah, I don't see much of a reason to return to the wiki.  Project status: <span class=\"proj-abandoned-c\">Abandoned</span>."
      },
      {
        name: "Gadget-toolbar.js", // Feb
        link: "https://ftb.fandom.com/wiki/MediaWiki:Gadget-toolbar.js",
        status: 'inactive',
        langs: ['mediawiki', 'web'],
        desc: "This is a MediaWiki Gadget written in JavaScript that expands the default WikiEditor to include templates commonly used on the FTB Wiki (infoboxes, crafting grids, etc). Currently retired because Fandom moved to a simpler source editor. Project status: <span class=\"proj-complete-c\">Complete</span>/<span class=\"proj-abandoned-c\">Abandoned</span>."
      },
    ]
  },
  {
    title: "2015",
    projects: [
      {
        name: "autosummary.js", // Oct
        link: "https://ftb.fandom.com/wiki/User:Xbony2/common/autosummary.js",
        status: 'inactive',
        langs: ['mediawiki', 'web'],
        desc: "This used to be a pretty basic script, but I made it more powerful in 2019. Basically, you can set a default edit summary which is saved via cookies to be used whenever you edit, and you can also toggle that to be on or off as desired. Also, if creating a new page, and there's no summary, it will make the default summary \"created page\" (which was the original use). Made in JavaScript. Currently retired because it no longer works with the latest version of MediaWiki/the Fandom platform. Project status: <span class=\"proj-complete-c\">Complete</span>/<span class=\"proj-abandoned-c\">Abandoned</span>."
      },
      {
        name: "MediaWiki::Butt", // Sep
        link: "https://github.com/FTB-Gamepedia/MediaWiki-Butt-Ruby",
        status: 'inactive',
        langs: ['ruby'],
        desc: "MediaWiki::Butt is a Ruby library/gem that makes it easy to perform wiki actions in Ruby. It's created by Eli Foster, with me as a co-author. Mostly I fixed random stuff, but I also added the random articles function and namespace constants. I've used MediaWiki::Butt in ESAEBSAD, ATT-9001, and a bunch of random scripts. Project status: <span class=\"proj-abandoned-c\">Inactively involved</span>."
      },
      {
        name: "AntiEndPortalMod", // Jul
        link: "https://github.com/xbony2/AntiEndPortalMod",
        status: 'inactive',
        langs: ['java'],
        desc: "This is a small Minecraft mod created by me in Java that disables the creation of the End Portal by the Ender Dragon, and makes the Ender Dragon drop its egg as an item. It's for Minecraft 1.7.10. This was made by request of a friend and never officially released. It's currently unmaintained. It's a simple mod but was hard to implement since I had to use a library called <a href=\"https://asm.ow2.io/\">ASM</a> to manipulate the bytecode at runtime. Project status: <span class=\"proj-complete-c\">Complete</span>/<span class=\"proj-abandoned-c\">Abandoned</span>."
      },
      {
        name: "Shiny Stones Mod 2", // Jan
        link: "https://www.minecraftforum.net/forums/mapping-and-modding-java-edition/minecraft-mods/2323075-1-7-10-shinystones-mod-2",
        status: 'inactive',
        langs: ['java'],
        desc: "This was a port/recreation of a small mod that I liked from Minecraft 1.6 to 1.7.10. Written in Java. Never was popular; it mostly just adds a few decorative blocks. GitHub <a href=\"https://github.com/xbony2/Shiny-Stones-2-Mod\">here</a>. Project status: <span class=\"proj-complete-c\">Complete</span>/<span class=\"proj-abandoned-c\">Abandoned</span>."
      },
    ]
  },
  {
    title: "2014",
    projects: [
      {
        name: "ESAEBSAD", // Dec
        link: "https://github.com/xbony2/Experimental-Self-Aware-Electronic-Based-Space-Analyzing-Droid",
        status: 'inactive',
        langs: ['ruby'],
        desc: "See top."
      },
      {
        name: "Flaxbeard's Steam Power", // Oct 19
        link: "https://www.curseforge.com/minecraft/mc-mods/flaxbeards-steam-power",
        status: 'inactive',
        langs: ['java'],
        desc: "This a large Minecraft mod made originally by Flaxbeard and maintained by SatanicSanta. I'm a co-author/contributor. I mostly just did bug fixes/code cleanup as well as some crossmod integration, including support IC2 canning of FSP's foods, adding a Steamed Imphide for Natura, cross-FSP-IC2-Natura support for that, and NEI support for the Rock Smasher and Steam Heater. Also introduced some config stuff, helped bring back the Block Placer, and added some Rock Smasher recipes. The newer iteration of this mod is called \"Esteemed Innovation\" (after the in-game book). I'm no longer involved with the project. GitHub <a href=\"https://github.com/Esteemed-Innovation/Esteemed-Innovation\">here</a>. Project status: <span class=\"proj-abandoned-c\">Abandoned</span>."
      },
      {
        name: "AFSU Mod", // Oct 5
        link: "https://www.curseforge.com/minecraft/mc-mods/afsu-mod",
        status: 'inactive',
        langs: ['java'],
        desc: "This is a small Minecraft mod made by me in Java. It's an addon to IndustrialCraft 2 that adds a 5th tier of energy (EU) storage called the AFSU (the block) and the AFB. Currently the mod is abandoned. GitHub <a href=\"https://github.com/xbony2/AFSU\">here</a>. Project status: <span class=\"proj-abandoned-c\">Abandoned</span>."
      },
      {
        name: "My original website", // Sep
        link: "https://xbony2.github.io/",
        status: 'inactive',
        langs: ['web'],
        desc: "This website isn't super great. Project status: <span class=\"proj-complete-c\">Complete, I guess</span> (works for what I need)."
      },
      {
        name: "IndustrialEx", // Jul 31
        link: "https://github.com/xbony2/IndustrialEx",
        status: 'inactive',
        langs: ['java'],
        desc: "IndustrialEx is a Minecraft mod created by me in Java that is an addon to IndustrialCraft 2. Unfortunately, I never considered it finished and released it. Currently it's abandoned. This is sad because it had a bunch of cool features, like Nano/Quantum baubles, Natura crops, a rotor made of Dark Steel, and a \"hardcore\" Macerator recipe. Project status: <span class=\"proj-abandoned-c\">Abandoned</span>."
      },
      {
        name: "Official FTB Wiki", // Jul 15
        link: "https://ftb.fandom.com/wiki/FTB_Wiki",
        status: 'active',
        langs: ['mediawiki', 'web'],
        desc: "See top."
      },
      {
        name: "Nuclear Control 2", // June
        link: "https://www.curseforge.com/minecraft/mc-mods/nuclear-control-2",
        status: 'inactive',
        langs: ['java'],
        desc: "See top."
      },
      {
        name: "Bony's Desertcraft",
        link: "https://www.minecraftforum.net/forums/mapping-and-modding-java-edition/minecraft-mods/2076392-modjam4-1-7-bonys-desertcraft",
        status: 'inactive',
        langs: ['java'],
        desc: "Bony's Desertcraft is the first Minecraft mod I released. It has a bunch of cool Desert-related survival items and blocks. It was written in Java and created for ModJam 4. BitBucket is <a href=\"https://bitbucket.org/xbony2/modjam-4-maybe\">here</a>. Project status: <span class=\"proj-complete-c\">Complete</span>/<span class=\"proj-abandoned-c\">Abandoned</span>."
      },
      {
        name: "Bitm", // Jan
        link: "https://github.com/xbony2/Bitm",
        status: 'inactive',
        langs: ['java'],
        desc: "Bitm was my first Minecraft mod, or rather, a reimplementation of it. Written in Java. I originally started it in mid 2013, but unfortunately that original version (which was written for Minecraft 1.4.7) is now lost. The last version of Bitm was for Minecraft 1.6.2. Never released. The code is pretty embarrassing. There's some decorative blocks and items. Project status: <span class=\"proj-abandoned-c\">Abandoned</span>."
      },
    ]
  }
]

export default {
  head: {
    title: "Eric Schneider - Projects"
  },

  data() {
    return {
      filter: "none",
      projects: projects,
    }
  },

  methods: {
    filterProjects(toFilter) {
      switch (this.filter) {
        case 'active':
          return toFilter.filter(proj => proj.status === 'active')
        case "none":
          return toFilter
        default: // lang filter
          return toFilter.filter(proj => proj.langs.includes(this.filter))
      }
    },
    setFilter(newFilter) {
      this.filter = newFilter
    }
  }
}
</script>

<style>
.active-button {
  font-weight: bold;
}

.active-buttons button {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.refresh-button {
  font-weight: bold;
  margin-left: auto;
  margin-right: auto;
}

/* the -c is for color */
.proj-active-c {
  color: green;
  font-weight: bold;
}

.proj-complete-c {
  color: green;
  font-weight: bold;
}

.proj-discontinued-c {
  color: yellow;
  font-weight: bold;
}

.proj-abandoned-c {
  color: red;
  font-weight: bold;
}
</style>
