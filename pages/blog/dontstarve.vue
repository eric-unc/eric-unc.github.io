<template>
  <div>
    <section class="section">
      <div class="content">
        <h1 class="title">Can AI make a Don't Starve mod?</h1>
        <p>Between doing research, I've been playing a good amount of <a href="https://store.steampowered.com/app/219740/Dont_Starve/">Don't Starve</a>, an older indie game that I bought maybe a decade ago. It's a really good game, and I would recommend it to anyone who has time to sink.</p>
        <p>The game also has a modding API and a decently sized (although mostly historic) modding community. Personally, I don't find using any Don't Starve mods to be very appealing; between the base game, three DLCs, and the multiplayer sequel, there's a ton of content for me to go through already. There are plenty of "quality of life" mods too, but I personally feel like those are cheating in some sort of way. If the developers didn't program a minimap, then you shouldn't play with one (in my opinion).</p>
        <p>There's a couple interesting mods, like <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=1697986974&searchtext=">this one inspired by Chinese mythology</a>. Honestly, it might less than a "couple"; after scrolling through a lot of mods, I don't see any others that I would consider worth trying. There's a few decently designed character mods, but I don't find much appeal in playing any character besides Wilson.</p>
        <p>Still, it's pretty cool that Klei (the company behind Don't Starve) expose endpoints for fans to make such content. A decade ago, was one of those fans; I wanted to create my own mod, but <a href="https://github.com/xbony2/StarveEx/blob/master/src/starveex/main.lua">I didn't really have any ideas</a>, so it didn't go very far.</p>
        <p>Since I've been playing the game recently, I wanted to explore modding again. And now with AI, I can make a mod just by prompting. Right? Right? Right??</p>
        <p>Well, I tried with Claude. I've been using Claude a lot for my research, and it is tremendously useful. I mainly use it through the VS Code plugin, and so I decided to try to make a mod using the CLI.</p>
        <p>My idea? A Garfield character. Adding a new character doesn't seem like it would be too hard. My initial prompt didn't give too much detail, allowing Claude to come up with its own design.</p>
        <p>It spat out code right away; I checked the <code>modinfo.lua</code> file and asked it to support the base Don't Starve game, and not Don't Starve Together, since it mixed those up. But also, the initial assets it generated were... not good.</p>
        <figure class="image" style="height: 50%; width: 50%;">
          <img src="/dontstarve/ds0.png" alt="Initial Garfield image.">
        </figure>
        <p>Claude doesn't actually have the capability to generate images, so it wrote <a href="https://github.com/eric-unc/dontstarve-garfield/blob/7823817fd59b94b9c18fb45c8d2252a937e2582b/tools/generate_art.py#L58">Python code</a> that would then generate the assets. Honestly, it's impressive for what it is, but not really ideal. Luckily, there is a third-party <a href="https://github.com/guinacio/claude-image-gen">Claude skill</a> for image generation using Google Gemini. It isn't free and I had to make an account, but Google gave me something like $70 worth of free credit just for signing up.</p>
        <p>And then just like that, I had a mod that I could load.</p>
        <figure class="image" style="height: 50%; width: 50%;">
          <img src="/dontstarve/ds1.png" alt="The mod in the mod screen.">
        </figure>
        <p>Except, after hitting "Apply", it failed immediately.</p>
        <figure class="image" style="height: 50%; width: 50%;">
          <img src="/dontstarve/ds2.png" alt="An error message.">
        </figure>
        <p>So, I gave the error message to Claude, and it changed some stuff. Then I tried it again, and it crashed.</p>
        <p>So, I told Claude to check the logs and then fix it. Then I tried it again, and it crashed.</p>
        <p>Rinse and repeat. Rinse and repeat. Rinse and repeat.</p>
        <p>At this point, I realized that I should have just given Claude a sample mod. It was able to find the Lua code for the base game's content, but it really struggled interpreting it and being able to use it to then make the mod.</p>
        <p>It doesn't help that the unofficial API documentation is only on <a href="https://web.archive.org/web/20190715184623/http://dontstarveapi.com/">the Internet Archive</a>. There are some tutorials on <a href="https://forums.kleientertainment.com/forums/topic/28021-getting-started-guides-tutorials-and-examples/">the forums</a> that maybe I could have linked Claude to. But eventually, after telling Claude "It crashed again" enough times, it did start working.</p>
        <figure class="image" style="height: 50%; width: 50%;">
          <img src="/dontstarve/ds3.png" alt="The initial character selection screen.">
        </figure>
        <p>Well, kind of working. The text in the character selection screen was missing, and the art was flipped. And once I started a world, the game crashed. It took a couple more times telling Claude to fix it, eventually I could play my custom character.</p>
        <figure class="image" style="height: 50%; width: 50%;">
          <img src="/dontstarve/ds4.png" alt="Garfield! Except it looks like the default character, but slightly orange.">
        </figure>
        <p>Yay! Now I can play as "Garfield"!</p>
        <p>Okay, yes, that's Wilson, the default character, but slightly orange. Claude did not create art for the actual character, opting to make some code to just reuse the assets of the game. This is lazy, but creating actual art is pretty difficult, since the characters are all animated. You have to make a lot of art to make a new Don't Starve character.</p>
        <p>Claude also in general struggled a lot with dealing with all the assets and binary files with Don't Starve. It tried to examine a lot of them "manually" to figure out what's going on, with mixed results. Still, I asked Claude to try and make actual character, because an orange Wilson was not good enough.</p>
        <p>The more I worked on this project, the more I really wish I just copied <a href="https://forums.kleientertainment.com/forums/topic/46849-tutorial-using-extended-sample-character-template/">a good tutorial</a>. I am certain that it would have taken less time and been more fun to do things the old fashioned way. Also, Claude's "buddy" feature is ugly.</p>
        <figure class="image" style="height: 25%; width: 25%;">
          <img src="/dontstarve/ds5.png" alt="Claude's 'buddy' feature.">
        </figure>
        <p>Did you know that a "veldt" (or "veld") is <a href="https://upload.wikimedia.org/wikipedia/commons/c/c1/Typical_Veld_near_Petrified_forest_%28Namibia%29.jpg">a kind of beautiful African rural landscape</a>? Also, <a href="https://www.libraryofshortstories.com/storiespdf/the-veldt.pdf">"The Veldt"</a> is also a short story by Ray Bradbury, who is more famous for Fahrenheit 451.</p>
        <p>Anyway, after 16 minutes, Claude finally generating some kind of character art. Hopefully it looks better than orange Wilson.</p>
        <figure class="image" style="height: 50%; width: 50%;">
          <img src="/dontstarve/ds6.png" alt="Still WIP character art.">
        </figure>
        <p>Yikes.</p>
        <p>Anyway, in "The Veldt", two parents spend top dollar to live in a house where everything is automated, and they don't need to do any chores. Also, they turned their nursery into a virtual reality room, where anything children can imagine can come to life. Their children use to simulate, well, the veldts of Africa.</p>
        <p>Back to Claude. It finished, and now when I load the game, the character looks like an orange Wilson again. Claude said that was fine, and that it wasn't done yet, so I had it continue making sprites.</p>
        <p>Anyway, in the virtual reality room, not only is a veldt visually shown, the room really feels like a veldt. You can feel the heat, and see zebras and lions, just as if they were in front of you.</p>
        <p>Back to Claude. It managed to generate some of cat ears for Wilson. Obviously, it doesn't look quite right yet.</p>
        <figure class="image" style="height: 50%; width: 50%;">
          <img src="/dontstarve/ds7.png" alt="Still WIP character art.">
        </figure>
        <p>In The Veldt, the children are obsessed with seeing veldts, and become obsessed with seeing lions violently kill their prey. Furthermore, they become obsessed with the smell of blood and the screams of the prey. This disturbs the parents, who lock up the nursery. The children confront their parents, and demand they reopen the nursery, and the parents relent.</p>
        <p>The next day, the father brings in a psychologist friend, who examines the virtual reality room. The psychologist states, while the original goal of the room was to help the children, the room was now encouraging them to pursue and imagine violent fantasies. He states that the parent should immediately tear it down and force their children to get mental health treatment.</p>
        <p>Anyway, Claude generated some more parts.</p>
        <figure class="image" style="height: 50%; width: 50%;">
          <img src="/dontstarve/ds8.png" alt="Still WIP character art.">
        </figure>
        <p>Back to The Veldt. The father and psychologist flip the switch to turn the room off, and the children become very agitated by this. The psychologist leaves. Meanwhile, the father goes even farther, turning off all the machines that do the chores in the house, while the children beg him to reopen the nursery.</p>
        <p>After enough begging, he decides to let them to use the machine for just one more minute, before turning it off forever. The parents breath for a couple minutes, and discuss their plans to rebuild their life with less technology. But then, far off, they hear the children scream.</p>
        <p>Back to Claude. It's been working on this for a while, so it should be good, right?</p>
        <figure class="image" style="height: 50%; width: 50%;">
          <img src="/dontstarve/ds9.png" alt="Still WIP character art.">
        </figure>
        <p>I've dipped into extra usage twice, by the way. Luckily, I have extra credits from whatever Claude promotion.</p>
        <p>Anyway... the parents run into the nursery. Then, the door slams; their children lock them in it from the outside. The parents scream and demand to be let out, while the lions begin to walk closer and closer to them.</p>
        <p>The parents recall the simulated screams that they heard from the nursery before, and realize that, rather than being the screams of zebras, they were their own screams all along.</p>
        <p>The psychologist returns, and enters the now reopened nursery. He asks the children where their parents are, and they state that they'll be there shortly. In the distance of the veldt, the psychologist sees the lions, who are eating a pair of carcasses.</p>
        <p>Anyway, back to Don't Starve.</p>
        <figure class="image" style="height: 50%; width: 50%;">
          <img src="/dontstarve/ds10.png" alt="Still WIP character art.">
        </figure>
        <p>Are we for real?</p>
        <p>Part of the reason this looks awful is that Claude has been trying to update Wilson's assets by writing Python code to draw over it. I encouraged Claude to try and use the skill I gave it to make new art, but it didn't seem to do much.</p>
        <figure class="image" style="height: 20%; width: 20%;">
          <img src="/dontstarve/ds11.png" alt="Still WIP character art...">
        </figure>
        <p>Even worse, Claude is in denial.</p>
        <figure class="image" style="height: 50%; width: 50%;">
          <img src="/dontstarve/ds12.png" alt="Claude thinks Garfield looks just fine.">
        </figure>
        <p>At this point of the project, I'm done. You can get the mod if you want <a href="https://github.com/eric-unc/dontstarve-garfield/">on GitHub</a>.</p>
        <p>Some of the ideas Claude came up with for Garfield is interesting, though. Garfield is a bit slow, less sane, and has a greater hunger rate; also, every 7th day (every Monday), Garfield losses 10 sanity is 20% slower. But, he gets bonus hungry filled from crockpot recipes, and can eat monster meat. Claude also added lasagna as a new food.</p>
        <p>Most of the AI generated art was not good, but I do like this one:</p>
        <figure class="image" style="height: 40%; width: 40%;">
          <img src="/dontstarve/ds13.png" alt="Garfield save screen.">
        </figure>
        <p>So yeah. Anyway, maybe in a couple years if these tools are better, I'll try this again. But for now, Claude is on my naughty list.</p>
        <p>By the way, I did not beat Fallout 2 on my Steam Deck; I almost finished the game but put it down after reaching the final boss fight.</p>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
</script>