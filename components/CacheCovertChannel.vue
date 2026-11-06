<template>
  <div class="ccc" role="group" aria-label="Interactive animation of a cache covert channel">
    <div class="ccc-bits">
      <div>
        <div class="ccc-label">Secret held by B (click to flip)</div>
        <div class="ccc-bit-row">
          <button
            v-for="(bit, i) in secret"
            :key="i"
            type="button"
            class="ccc-bit ccc-bit--secret"
            :class="{ 'is-current': frame.bit === i }"
            :aria-label="`Secret bit ${i + 1}, currently ${bit}`"
            @click="flip(i)"
          >{{ bit }}</button>
        </div>
      </div>
      <div>
        <div class="ccc-label">Decoded by A</div>
        <div class="ccc-bit-row">
          <span
            v-for="(_, i) in secret"
            :key="i"
            class="ccc-bit"
            :class="{ 'is-current': frame.bit === i }"
          >{{ frame.received[i] ?? '?' }}</span>
        </div>
      </div>
    </div>

    <div class="ccc-cache-header">
      <span class="ccc-label">CPU cache</span>
      <span v-if="frame.running" class="ccc-running" :class="`ccc-owner--${frame.running}`">Running: process {{ frame.running }}</span>
    </div>
    <div class="ccc-cache">
      <div
        v-for="(owner, i) in frame.cache"
        :key="i"
        class="ccc-line"
        :class="[owner && `ccc-owner--${owner}`, i === frame.line && 'is-active', i === frame.line && frame.result && `is-${frame.result}`]"
      >{{ owner }}</div>
    </div>

    <div class="ccc-timer" :class="{ 'is-off': frame.time === null }">
      <div class="ccc-label">
        A's timer: {{ frame.time === null ? 'off' : `${frame.time} cycles` }}
        <span v-if="frame.result"> ({{ frame.result }}, +{{ frame.result === 'hit' ? HIT_CYCLES : MISS_CYCLES }})</span>
      </div>
      <div class="ccc-meter">
        <div class="ccc-meter-fill" :style="{ width: `${(frame.time ?? 0) / MAX_CYCLES * 100}%` }"></div>
        <div class="ccc-meter-threshold" :style="{ left: `${THRESHOLD_CYCLES / MAX_CYCLES * 100}%` }"></div>
      </div>
      <div class="ccc-meter-labels" :style="{ paddingLeft: `${THRESHOLD_CYCLES / MAX_CYCLES * 100}%` }">
        <span>&uarr; slower than this means 1</span>
      </div>
    </div>

    <p class="ccc-caption" aria-live="polite">{{ frame.caption }}</p>

    <div class="buttons">
      <button type="button" class="button is-small is-info" @click="togglePlay">{{ playing ? 'Pause' : atEnd ? 'Replay' : 'Play' }}</button>
      <button type="button" class="button is-small" :disabled="atEnd" @click="nextStep">Next step</button>
      <button type="button" class="button is-small" :disabled="index === 0" @click="restart">Restart</button>
    </div>
  </div>
</template>
<script setup lang="ts">
type Owner = 'A' | 'B'

interface Frame {
  stage: number
  running: Owner | null
  bit: number | null
  cache: (Owner | null)[]
  line: number | null
  result: 'hit' | 'miss' | null
  time: number | null
  received: number[]
  caption: string
}

const LINES = 16
const HIT_CYCLES = 4
const MISS_CYCLES = 200
const MAX_CYCLES = LINES * MISS_CYCLES
const THRESHOLD_CYCLES = MAX_CYCLES / 4
const FRAME_MS = 120
const HOLD_FRAMES = 15 // How long to linger on each decoded bit

// Every animation frame is precomputed, so playback is only an index into this list
function buildFrames(bits: number[]): Frame[] {
  const frames: Frame[] = []
  const cache: (Owner | null)[] = Array(LINES).fill(null)
  const received: number[] = []
  let stage = 0

  const push = (frame: Pick<Frame, 'running' | 'bit' | 'caption'> & Partial<Frame>) => {
    frames.push({ line: null, result: null, time: null, ...frame, stage, cache: [...cache], received: [...received] })
  }

  push({ running: null, bit: null, caption: 'Press play to watch B leak its secret to A, one bit at a time.' })

  stage++
  for (let line = 0; line < LINES; line++) {
    cache[line] = 'A'
    push({ running: 'A', bit: null, line, caption: 'Step 1: A runs and reads a lot of memory, filling the cache with its own data.' })
  }

  bits.forEach((bit, i) => {
    stage++
    const sendCaption = bit
      ? `Step 2: B runs. Bit ${i + 1} is 1, so B reads a lot of memory, evicting all of A's data.`
      : `Step 2: B runs. Bit ${i + 1} is 0, so B does nothing, and A's data stays in the cache.`
    for (let line = 0; line < LINES; line++) {
      if (bit) cache[line] = 'B'
      push({ running: 'B', bit: i, line: bit ? line : null, caption: sendCaption })
    }

    stage++
    let time = 0
    for (let line = 0; line < LINES; line++) {
      const result = cache[line] === 'A' ? 'hit' : 'miss'
      time += result === 'hit' ? HIT_CYCLES : MISS_CYCLES
      cache[line] = 'A'
      push({ running: 'A', bit: i, line, result, time, caption: 'Step 3: A runs, starts its timer, and rereads its data. This also reloads the cache for the next round.' })
    }

    stage++
    const decoded = time > THRESHOLD_CYCLES ? 1 : 0
    received.push(decoded)
    for (let hold = 0; hold < HOLD_FRAMES; hold++) {
      const verdict = decoded
        ? `That took ${time} cycles. Slow: A's data had been evicted, so bit ${i + 1} is 1.`
        : `That took ${time} cycles. Fast: A's data was still there, so bit ${i + 1} is 0.`
      push({ running: 'A', bit: i, time, caption: verdict })
    }
  })

  stage++
  push({ running: null, bit: null, caption: 'A now has the whole secret, even though the two processes only ever read their own memory.' })
  return frames
}

const secret = ref([0, 1, 0, 1, 1, 0])
const frames = computed(() => buildFrames(secret.value))
const index = ref(0)
const frame = computed(() => frames.value[index.value]!)
const atEnd = computed(() => index.value === frames.value.length - 1)

const playing = ref(false)
let timer: ReturnType<typeof setInterval> | undefined

function pause() {
  playing.value = false
  clearInterval(timer)
}

function play() {
  playing.value = true
  timer = setInterval(() => {
    index.value++
    if (atEnd.value) pause()
  }, FRAME_MS)
}

function togglePlay() {
  if (playing.value) {
    pause()
    return
  }
  if (atEnd.value) index.value = 0
  play()
}

function nextStep() {
  pause()
  const next = frames.value.findIndex(f => f.stage > frame.value.stage)
  index.value = next === -1 ? frames.value.length - 1 : next
}

function restart() {
  pause()
  index.value = 0
}

function flip(i: number) {
  restart()
  secret.value = secret.value.map((bit, j) => j === i ? 1 - bit : bit)
}

onBeforeUnmount(pause)
</script>
<style scoped>
.ccc {
  --ccc-a: #2563eb;
  --ccc-b: #b45309;
  border: 1px solid var(--bulma-border);
  border-radius: 8px;
  padding: 1rem;
  margin: 1.5rem 0;
  max-width: 40rem;
}

.ccc-label {
  font-size: 0.8rem;
  color: var(--bulma-text-weak);
  margin-bottom: 0.25rem;
}

.ccc-bits {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.ccc-bit-row {
  display: flex;
  gap: 0.25rem;
}

.ccc-bit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: 1px solid var(--bulma-border);
  border-radius: 4px;
  background: none;
  color: var(--bulma-text);
  font-family: monospace;
  font-size: 1rem;
}

.ccc-bit--secret {
  cursor: pointer;
}

.ccc-bit.is-current {
  border-color: var(--bulma-text);
  box-shadow: 0 0 0 1px var(--bulma-text);
}

.ccc-cache-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 1.5rem;
  margin-bottom: 0.25rem;
}

.ccc-running {
  font-size: 0.8rem;
  border-radius: 4px;
  padding: 0 0.5rem;
}

.ccc-cache {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 0.25rem;
}

.ccc-line {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.25rem;
  border-radius: 4px;
  border: 1px dashed var(--bulma-border);
  font-family: monospace;
}

.ccc-owner--A,
.ccc-owner--B {
  color: #fff;
  border-style: solid;
}

.ccc-owner--A {
  background: var(--ccc-a);
  border-color: var(--ccc-a);
}

.ccc-owner--B {
  background: var(--ccc-b);
  border-color: var(--ccc-b);
}

.ccc-line.is-active {
  outline: 2px solid var(--bulma-text);
  outline-offset: 1px;
}

.ccc-line.is-hit {
  outline-color: var(--bulma-success);
}

.ccc-line.is-miss {
  outline-color: var(--bulma-danger);
}

.ccc-timer {
  margin-top: 1rem;
}

.ccc-timer.is-off {
  opacity: 0.5;
}

.ccc-meter {
  position: relative;
  height: 0.75rem;
  border-radius: 4px;
  background: var(--bulma-border);
}

.ccc-meter-fill {
  height: 100%;
  border-radius: 4px;
  background: var(--ccc-a);
}

.ccc-meter-threshold {
  position: absolute;
  top: -0.2rem;
  bottom: -0.2rem;
  width: 2px;
  background: var(--bulma-text);
}

.ccc-meter-labels {
  font-size: 0.7rem;
  color: var(--bulma-text-weak);
  margin-top: 0.2rem;
}

.ccc-caption {
  min-height: 3em;
  margin: 0.75rem 0 !important;
}
</style>
