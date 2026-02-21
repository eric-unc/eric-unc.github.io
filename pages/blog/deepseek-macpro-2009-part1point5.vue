<template>
  <div>
<section class="section">
      <div class="content">
        <h1 class="title">Can you run DeepSeek R1 on a 2009 Mac Pro? - Part 1.5</h1>
        <p>If you haven't read <a href="/blog/deepseek-macpro-2009">the first part</a>, then go read it. The answer is yes.</p>
        <p>First, just let me say, I forgot to mention this in the blog, but the most frustrating part of my experience was that my old Dell mouse double clicks every click. I need to replace it.</p>
        <p>Anyway, I've been working on part 2 of the blog, but it's a lot of work, so here is a nugget of something else. I promised more evaluation, so let's test something wacky: <span class="is-underlined">how well can DeepSeek R1 (the 7B model), running on the 2009 Mac Pro, predict the men's NCAA basketball tournament?</span></p>
        <p>In the previous installation, we discovered that using my Mac Pro's GPU didn't boost performance, so here I'm just using unpatched Ollama, which is only using the CPU.</p>
        <h2>The first four</h2>
        <p>I'm not going to give the full output for all my queries, but here is a sample of the first:</p>
        <pre><code>xbony2@xbony2s-Mac-Pro ~ % ollama run deepseek-r1
>>> Predict the winners of following 2025 NCAA men's basketball matches: Alabama
...  State vs Saint Francis, San Diego State vs North Carolina, American vs Mou
... nt St. Mary's, and Texas vs Xavier.
&lt;think>
Okay, so I have to predict the winners of four men's basketball games in 2025. The matchups are:

1. Alaama State vs. Saint Francis
2. San Diego State vs. North Carolina
3. American vs. Mount St. Mary's
4. Texas vs. Xavier

Hmm, I'm not super knowledgeable about all these schools, but let me try to break it down step by step.

First, I'll consider each game individually and think about the teams involved.

Starting with Alaama State vs. Saint Francis. I know that Saint Francis is a strong team in Division I,
especially since they've had some good players recently. They usually perform well in tournament brackets. On
the other hand, Alaama State isn't one I'm familiar with. Maybe they're a smaller school? I don't have much
info on their strengths or recent performance, so this might be a tough call. I'll tentatively say Saint
Francis is likely to win here.

Next up is San Diego State vs. North Carolina. San Diego State has had some solid teams in the past, with good
players and consistent performances. North Carolina is a powerhouse; they've won multiple titles and are known
for their deep talent. Depending on how each team's roster looks this year, NC might come out on top again. I
think they're more likely to win, but it's still tough.

Then there's American vs. Mount St. Mary's. These teams sound familiar from the NCAA tournament sometimes.
Mount St. Mary's is known for producing standout athletes and winning titles. American isn't a name I'm as
familiar with; maybe they have some potential but aren't traditionally strong. So, probably Mount St. Mary's
would be the favorite here.

Lastly, Texas vs. Xavier. Texas has a great basketball program with many All-Americans and a solid team each
year. Xavier is also known for having good players, especially in recent years. It might come down to how each
team performs that season, but I think Texas could edge out Xavier because of their long history and overall
talent.

I should double-check if these predictions make sense based on typical team strengths. Saint Francis against
Alaama State seems a bit like a reach for an upset since they're both strong programs. Maybe it's more likely
that the higher-ranked or more experienced team wins, which would be Saint Francis in this case.

For San Diego State vs. North Carolina, while NC is the favorite, it's possible that SDSU could have a good
year and surprise everyone. But historically, NC tends to dominate, so I'll stick with them winning.

American vs. Mount St. Mary's—since Mount St. Mary's has produced so many great players and has had success in
tournaments, they might be the stronger team here again.

Texas vs. Xavier—I think Texas is a heavy favorite because of their program's history and overall depth. But
Xavier could have a strong team too, especially if they bring back experienced players from previous years.

Overall, I'm not entirely confident about these predictions, but based on what I know, these are the most
probable winners.
&lt;/think>

Based on an analysis of each team's potential strengths, experiences, and historical performance, here are the
predicted winners for each matchup:

1. **Alaama State vs. Saint Francis**: Saint Francis is projected to win due to their strong program and
consistent tournament performances.

2. **San Diego State vs. North Carolina**: North Carolina is expected to emerge victorious, continuing their
tradition of success with their deep talent pool.

3. **American vs. Mount St. Mary's**: Mount St. Mary's is favored for their history of producing standout
athletes and winning titles.

4. **Texas vs. Xavier**: Texas is predicted to win, leveraging their long-standing basketball program and
historical dominance.

These predictions are based on typical team strengths and historical context, with the understanding that
upsets can occur depending on each season's dynamics.</code></pre>
        <p>This took about 8 minutes and 30 seconds. We can observe two things here:</p>
        <ul>
          <li>First, DeepSeek R1 is incredibly vague in its justifications. This model does not have access to the internet, and so it can only depend on historical data. But, it does not cite any specific statistics, nor specific players or coaches. You will see this come up again and again.</li>
          <li>DeepSeek misspelled "Alaama" (Alabama) State. I don't even know how.</li>
          <li>These matchups are all seeded the same, so technically, it hasn't made any bad choices so far. But we'll see how long this lasts.</li>
        </ul>
        <h2>South regional</h2>
        <p><a href="https://gist.github.com/eric-unc/6d9e6221c1d54af59fb872f4c6ebb682">Here</a> is the full output for the prediction of the South regional. The first round took 9 minutes 33 seconds to predict, the second round 8 minutes 15 seconds, the regional semifinals about 19 minutes, and 18 minutes for the regional final. I'm not sure why it took longer later; maybe DeepSeek is working with a larger context window, and looking at its previous work in the conversation.</p>
        <p>Immediately, we got our first big upset: Saint Francis (seed 16) is expected to beat Auburn (seed 1). Most other game predictions seemed reasonable enough, especially considering that DeepSeek is mainly working with historical data. Texas A&M advancing to the final four over North Carolina is tragic, but I suppose not the craziest prediction in the world? In the very least, the predictions seem at least better than a coin toss.</p>
        <h2>West regional</h2>
        <p><a href="https://gist.github.com/eric-unc/99f5025f482c7e5077a13e5dba6799b3">Here</a> is the full output for the predictions of the the West regional. I stopped timing the output, but it was taking longer and longer. It took a look time for tokens to even be generated, much less for the question to be completed, which leads me to believe that Ollama/DeepSeek is struggling with longer conversations and with maintaining/using the context window. For the final, I reset the conversation, and it started producing tokens right away, so this reconfirmed my belief.</p>
        <p>For some reason, the model seemed to hallucinate a lot more with the West than the East:</p>
        <ul>
          <li>DeepSeek cited Florida as having "experienced players like Michael Jordan". Maybe if you use the word "like" loosely.</li>
          <li>DeepSeek cited UConn as having a "a strong roster" with "players like TorreyDescriptors". UConn was given the edge over Oklahoma due to "home-court advantage"; however, they will both be playing in San Francisco.</li>
          <li>The entirety of the last question...</li>
        </ul>
        <p>Maybe due to a mistake on my part, DeepSeek strongly struggled with the final question. I asked "Predict the West Regional final for the 2025 NCAA men's basketball tournament: Florida vs. St. John's"; unlike previous questions, I forgot to put the word "winner" in the question. DeepSeek tried to compare Florida and St. John's to Villanova for reasons unclear to me, and cited "Ay hemingway" (?) and JJ Redick as Villanova players, later contradicting itself by calling them Florida players. Villanova was also shortened to "Villova" several times.</p>
        <p>Anyway, DeepSeek seemed to imply St. John's was the better team, so that's what we're going with for the final four. Although the logic was faulty, the bracket produced was, while perhaps naive, not unreasonable.</p>
        <h2>East regional</h2>
        <p><a href="https://gist.github.com/eric-unc/09c2ea42238a2d2191bdd60ec1523af7">Here</a> is the full output for the predictions of the East regional. I restarted the conversation for each question, and everything generated a lot faster.</p>
        <p>Besides from some hallucinations, everything seemed okay. DeepSeek predicted Alabama vs Duke for the regional final, but unusually, it did not pick a winner, saying "the game could go either way". DeepSeek also noted "without specific data on their regular season head-to-head  records or individual player performances against each other this year, it's challenging to predict an exact
          outcome." I've decided to pick Duke to advance to the final four.</p>
        <h2>Midwest regional</h2>
        <p><a href="https://gist.github.com/eric-unc/28b68f3530cf2a4d5f816399bd7266c7">Here</a> is the full output for the predictions of the Midwest regional. DeepSeek predicted an unusual upset of UCLA over Tennessee, and bigger than that, Texas (seed 11) against Illinois (seed 6), and Kentucky (seed 3), and UCLA (seed 7).</p>
        <p>And then it predicted that Texas (seed 11) would overcome Houston (seed 1). Quite an upset.</p>
        <h2>Final Four</h2>
        <p>Finally, <a href="https://gist.github.com/eric-unc/bef7f29ff1c116eee0ac2d763449a10a">here</a> is the full output for the predictions of the Final Four. DeepSeek predicted St. John's would advance over Texas A&M, and that Duke would advance over Texas.</p>
        <p>After a fair amount of hallucinating, including a couple Chinese characters mid-sentence (???), DeepSeek predicted, vaguely, that <span class="is-underlined">Duke would win the national championship</span>.</p>
        <p>What the fuck. Maybe DeepSeek <a href="https://techcrunch.com/2025/03/13/openai-calls-deepseek-state-controlled-calls-for-bans-on-prc-produced-models/">should be banned after all</a>.</p>
        <p>DeepSeek refused to give a specific score for some reason.</p>
        <h2>Conclusion</h2>
        <p><a href="https://play.ncaa.com/mens-bracket-challenge/picks/bracket/1993420/?iid=bcg_share_web_other_group_email">Here</a> is the bracket. I guess that's it. Duke will win. Put all your money on it.</p>
        <p>You might be wondering: what would a bigger, better model predict? OpenAI's o3-mini refused to give a definite answer, but after adding support for web searching, o3-mini predicted "one might lean toward the Kansas Jayhawks as a strong candidate for the 2025 title".</p>
        <p>I tried regenerating with GPT-4o, but it would only generate with o3-mini for some reason.</p>
        <p>Given access to current data, it might be interesting to see if a really smart AI could do some kind of statistical analysis that could predict edge experts; but, it seems unlikely. Sports are too unpredictable.</p>
        <p>Anyway, part 2 of this blog is still heavily work-in-progress, so you're going to have to wait.</p>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
</script>