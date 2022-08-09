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
        <div v-if="filter === 'none'" class="active-buttons">
          <button class="active-button button" type="button" @click="setFilter('active')">What am I working on now?</button>
          <br />
          <div class="buttons">
            <button class="button is-info is-light" @click="setFilter('java')">Java/JVM</button>
            <button class="button is-warning is-light">MediaWiki</button>
            <button class="button is-danger is-light">Ruby</button>
            <button class="button is-primary is-light">HTML/CSS/JS</button>
            <button class="button is-success is-light">SQL</button>
            <button class="button is-info is-light">C/C++</button>
            <button class="button is-info is-light ">C#</button>
            <button class="button is-warning is-light">Python</button>
            <button class="button is-danger is-light">MATLAB</button>
            <button class="button is-warning is-light">Rust</button>
            <button class="button is-primary is-light">Hardware</button>
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
      <div class="content">
        <div v-for="section in projects">
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
        langs: ['mediawiki, web'],
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
    ]
  },
]

function makeProjects(filter) {
  let ret = ""


  let sections = []
  projects.forEach(project => {
    switch (filter) {
      case "active":
        if (project.status !== "active") return;
        break;
      case "none":
        break;
      default:
        if (!project.langs.includes(filter)) return;
        break;
    }

    if (!sections.includes(project.sect)) {
      if (sections.length !== 0) ret += "</ul>"
      ret += "<h3 class=\"subtitle\">Section name</h3>"
      ret += "<ul>"

      sections.push(project.sect)
    }

    ret += "<li class=\""
    ret += project.status === 'active' ? 'proj-active ' : 'proj-inactive '
    project.langs.forEach(lang => ret += 'proj-' + lang + ' ')
    ret += "\">"
    ret += project.link ? "<a href=\"" + project.link + "\">" + project.name + "</a>" : project.name
    ret += ". " + project.desc
    ret += "</li>"
  })

  ret += "</ul>"

  return ret
}

export default {
  data() {
    return {
      filter: "none",
      projects: projects,
    }
  },

  methods: {
    filterProjects(toFilter) {
      switch (this.filter) {
        case "active":
          return toFilter.filter(proj => proj.status === "active")
        case "none":
          return toFilter
        default: // lang filter
          return toFilter.filter(proj => proj.langs.includes(this.filter))
      }
    },
    setFilter(newFilter) {
      this.filter = newFilter
    }
    /*filterProj(lang) {
      this.filter = lang;
      this.projects = makeProjects(this.filter);
    }*/
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
