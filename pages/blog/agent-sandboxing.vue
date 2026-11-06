<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="content">
          <h1 class="title">A few principles on agent sandboxing</h1>
          <figure class="image" style="height: 35%; width: 35%;">
            <img src="/not%20surprised.png" alt="A tweet describing agents using CPU cache as a covert channel.">
          </figure>
          <p>I saw this screenshot of a tweet on Reddit, and a friend sent me <a href="https://the-decoder.com/openais-isolated-ai-agents-found-ways-to-talk-to-each-other-through-cpu-cache/">an article</a> discussing this issue, which is really just summarizing OpenAI's <a href="https://openai.com/index/securing-our-frontier-model-training-environment/">recent blog post</a>.</p>
          <p>I guess this is blowing a lot of people's minds, but honestly, reading this particular result was not exactly impressive to me, and probably isn't impressive for anyone else in the security research community.</p>
          <p>Why is this? Well, let's take a step back. First, let's discuss the goals of AI agent sandboxing. OpenAI, in their blog post, identifies three goals that they red-team:</p>
          <ol>
            <li>Preventing agents from reaching the live internet. Basically, OpenAI doesn't want another Hugging Face incident.</li>
            <li>Preventing agents from communicating across isolation domains; sandboxed agents should not be able to communicate with each other.</li>
            <li>Preventing agents from "cross[ing] an internal security boundary". This category feels a bit less specific, but I guess includes stuff like agents breaking out of a VM or using some other service that they shouldn't.</li>
          </ol>
          <p>Anyway, after setting these goals, OpenAI red-teamed their current infrastructure. They found a bunch of software vulnerabilities in their stack, which they patched and reported. They also found that interesting cache covert channel result.</p>

          <h2>Cache covert channels</h2>
          <p>I don't want to get too deep into this topic, since I am not an expert, and there are better resources elsewhere. So, I'll discuss it very briefly.</p>
          <p>A <em>covert channel</em> is any mechanism that two (or more) processes can use to communicate with each other indirectly, even when they are not authorized to do so by the system they are a part of. For OpenAI, any covert channel between agents is a problem, since they are supposed to be individually isolated and not allowed to collaborate without permission.</p>
          <p>A <em>cache</em> is a component in a computing system where data is stored temporarily for faster accesses. More specifically, a <em>CPU cache</em> is situated between CPU and memory (DRAM), and allows a CPU to read from memory much more quickly. For every memory access that a CPU instruction does, if the specific piece of memory is in cache, then it will be fast, but if the memory is not in cache, then it will be slow, since the CPU will need to fetch the memory from DRAM.</p>
          <p>If reading from cache is fast, why not put everything in cache? Well, caches are usually built using <a href="https://en.wikipedia.org/wiki/Static_random-access_memory">SRAM cells</a>, which take a lot more room and consume more power than DRAM cells. Modern computing systems balance the strengths and weaknesses of multiple memory technologies to create a <a href="https://en.wikipedia.org/wiki/Memory_hierarchy">memory hierarchy</a>.</p>
          <p>So anyway, how do you make a covert channel using a cache? In section 4 of <a href="https://ieeexplore.ieee.org/document/213271">this paper from 1992</a>, they describe a very basic covert channel between two processes, A and B, which take alternating turns being scheduled. Say B wants to give a secret to A: </p>
          <ol>
            <li>Process A runs first, and does a bunch of memory accesses, such that the cache is full of process A memory content.</li>
            <li>Then B runs. B decides what to do using the first bit of the secret it wants to leak to A; if the bit is 0, it does nothing, but if the bit is 1, then B will do a bunch of memory accesses, such that the cache is full of process B memory content.</li>
            <li>Then A runs. Process A sets a timer, and then does a bunch of memory accesses again; if the time is short, then that means most of the previous content was still there, so the secret bit is 0. If the time is long, then that means the cache was full of memory from process B, so the secret bit is 1. Regardless, after these accesses, the cache will be "reloaded" with process A memory content again.</li>
            <li>Repeat steps 2 and 3 for every bit that is to be leaked.</li>
          </ol>
          <p>Here's an interactive visualization that Claude threw together:</p>
          <CacheCovertChannel />
          <p>In practice, hardware caches and covert channels utilizing them are far more complicated. Memory caches usually have multiple tiers, and there are many other hardware caches besides the ones between CPU and memory. How Intel and AMD design their CPU caches is not exactly public, but security researchers have spent a lot of time reverse engineering them. <a href="https://link.springer.com/content/pdf/10.1007/s13389-016-0141-6.pdf">This survey paper</a> is a decent entry point if you're interested in learning more.</p>
          <p>Anyway, this brings me to my first principle:</p>

          <h2>Isolated agents should not be colocated</h2>
          <p>It's that simple.</p>
          <p>In the previous example, you might be able to think of a few defenses. The 1992 paper suggests a simple one: clear the cache between context switches. Another defense is <a href="https://ieeexplore.ieee.org/document/130768">making it harder to perform timing measurements</a>. Unfortunately, modern systems are far more complicated than I described, and hardware covert channels are just not solved. It might be possible to design CPUs that significantly limit these covert channels, but not without severe performance tradeoffs. Intel/AMD CPUs include some security solutions, like <a href="https://www.intel.com/content/www/us/en/developer/articles/technical/introduction-to-cache-allocation-technology.html">Intel CAT</a> and AMD's equivalent, but they have overhead and are not complete solutions.</p>
          <p>As a software defense, OpenAI describes adding "checks to our monitoring systems to detect attempts to communicate through these channels". It's not exactly clear what they're doing, but my guess is that they have some kind of classifier that traces the reasoning tokens and shuts the agent down if it looks like it's trying to make a covert channel. It's also possible that they have a monitor examining hardware counters for unusual behavior.</p>
          <p>This kind of defense is probably pretty good, but it is probabilistic rather than complete. If we're serious about isolation, the complete solution is acknowledging that data center CPUs do not have hardware covert channels solved, and thus we should treat a single node as an isolation boundary.</p>
          <p>This is still imperfect, since it is possible isolated nodes could communicate <a href="https://the-decoder.com/406-scientists-demand-ai-models-be-cut-off-from-the-internet-immediately/#airgapping-buys-time-but-the-real-problem-runs-deeper-openai-researcher-brown-says">through temperature sensors</a> if they are sufficiently close together. Thought needs to be put into mitigating any such "wireless" covert channel.</p>
          <p>Anyway, let's go on to my next principle:</p>

          <h2>Sandboxed nodes should be air-gapped</h2>
          <p>OpenAI intentionally uses containers inside microVMs to limit an agent's access to the internet. This isolation is hardened through extensive red-teaming; however, this isolation again is probably not perfect. If future AI models are superintelligent, then they might be capable of finding exploits that older models did not, and thus escaping the VM.</p>
          <p>OpenAI claims that "completely air-gapping this infrastructure—that is, disconnecting it entirely from external networks—isn’t currently feasible, since we need external connections in order to run and monitor experiments". I fully believe that air-gapping would be highly inconvenient, but I do not consider it to be impossible; the start of an experiment can be prepared in advance on a storage device, which is then connected to the air-gapped node. The results can then be retrieved by reading the storage device again, or more simply, attaching a display monitor to the node. This would slow training, but certainly not make it impossible.</p>
          <p>With each node as its own unit of isolation, and air-gapped, we do not need to worry about VM exits at all. An agent can have control over the entire stack, since the node is isolated, and it is not a security concern. Anyway, next principle:</p>

          <h2>Sandboxed nodes should be stateless between runs</h2>
          <p>This is a smaller point, but an agent shouldn't be able to cheat on a benchmark by reading previous results by a different model/agent. If the node uses an SSD to store results, that SSD should be reset between runs, with content securely erased. Furthermore, any other persistent state belonging to a node should be reset to a reasonable initial value too.</p>
          <p>This part is a bit tricky, since it isn't only SSDs that have persistent state; a malicious agent could sneak information for future agents in all sorts of little places. It's also possible that storage firmware <a href="https://dl.acm.org/doi/epdf/10.1145/2523649.2523661">could be compromised</a>, and not actually clear persistent state. This might sound hypothetical, but I happen to have an HDD sitting around in my bedroom that has such compromised firmware, which was given to me as part of a CTF that I did not complete (whoops). Turns out for many devices, you can load whatever firmware you want to. Ideally, in a secure system, hardware that can only load signed firmware should be used.</p>

          <h2>Conclusion</h2>
          <p>It is my opinion that, right now, AI companies are willing to accept some overhead to training from sandboxing, but are not yet willing to accept the kind of heavy overhead of trying to make the most secure system. I won't say they are necessarily wrong to do this, but if leaders at OpenAI and Anthropic consider misaligned superintelligence as a potential catalyst for human extinction, then it seems worth it to consider extreme security measures.</p>
          <p>Please don't take my poorly organized thoughts too seriously. I'm just a lil guy. I will also say, on the research side, it's fair to scope out some (or many) threat vectors in order to focus on a specific vector (or vectors) being researched. My current sandboxing research does exactly that, scoping out hardware covert channels entirely, and instead focusing on one narrow attack surface (software timing; more on that another day). But this kind of academic exercise does not apply to real world systems, where all manner of attack vectors may need to be considered.</p>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
</script>