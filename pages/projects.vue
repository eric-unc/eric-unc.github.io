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
        <div v-for="section in projects">
          <h3 class="subtitle">{{ section.title }}</h3>
          <ul>
            <li v-for="project in filterProjects(section.projects)">{{ project.name }}</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const sections = [
  "Main projects",
  "2022"
]

// Organized by sections here
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
        // description
        desc: "streakersplit is a project for Uhana"
      },
      {
        name: "Official FTB Wiki",
        // optional: link to project
        link: "https://ftb.fandom.com/wiki/FTB_Wiki",
        status: 'active',
        langs: ['mediawiki, web'],
        desc: "The Official FTB Wiki is..."
      },
    ]
  },
  {
    title: "2022",
    projects: [
      {
        name: "JOS",
        status: 'inactive',
        langs: ['c'],
        desc: "JOS was cool."
      }
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
    /*filterProj(lang) {
      this.filter = lang;
      this.projects = makeProjects(this.filter);
    }*/
  }
}
</script>
