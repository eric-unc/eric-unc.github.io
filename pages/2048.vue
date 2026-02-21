<template>
  <div>
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">2048 Game</h1>
          <h2 class="subtitle">By Eric Schneider</h2>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <button class="button is-danger" @click="setup" v-if="started">Reset</button>
        <button class="button is-success" @click="setup" v-else>Start</button>
      </div>
      <br />
      <div class="container">
        <table class="table is-fullwidth tile is-ancestor is-vertical">
          <tr class="tile is-parent" v-for="row in board">
            <td v-for="tile in row">
              <div v-if="tile === 0" class="tile is-child image is-64x64 box"></div>
              <div v-else-if="tile > 4096" class="tile is-child image is-64x64 box">
                {{ tile }} <!-- this is unlikely, but you never know -->
              </div>
              <figure v-else class="tile image is-64x64">
                <img :src="getTileImage(tile)" alt="A 2048 tile.">
              </figure>
            </td>
          </tr>
        </table>
      </div>
      <div class="container">
        <p>The score is: {{ score }}</p>
      </div>
      <div class="container">
        <p v-if="!over">This game is ongoing.</p>
        <p v-else-if="won"><strong>You've won!</strong></p>
        <p v-else><strong>You've lost!</strong></p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="notification is-primary">
          <p>Welcome to 2048! To play, use the arrow keys or WASD to move the tiles around the screen. Tiles of the same number will merge, and give you points. Reaching a tile of 2048 will make you win, but if you're really good you can get 4096!</p>
        </div>
        <div class="notification is-info">
          <p>This is written with Vue.js now, like the rest of the website. You can view the original 2048 source code, as written for COMP 426, <a href="https://github.com/eric-unc/eric-unc.github.io/tree/old/2048">here</a>, which used jQuery. Both are stylized with Bulma.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
class Queue { // More or less
  constructor(maxlength) {
    this.array = new Array(maxlength).fill(0)
    this.curr = 0 // Where to fill queue from
  }

  enque(val) {
    this.array[this.curr] = val
    this.curr++
  }
}

function createEmptyBoard() {
  let board = new Array(4)
  for (let i = 0; i < 4; i++)
    board[i] = new Array(4).fill(0)
  return board
}

const board = ref(createEmptyBoard())
const score = ref(0)
const won = ref(false)
const over = ref(false)
const started = ref(false)

function getTileImage(tile) {
  let ret = "0.jpg"
  switch (tile) {
    case 0: // TODO: don't remember why this is a thing
      ret = "0.jpg"; break
    case 2:
      ret = "2.jpeg"; break
    case 4:
      ret = "4.jpg"; break
    case 8:
      ret = "8.jpg"; break
    case 16:
      ret = "16.jpg"; break
    case 32:
      ret = "32.jpg"; break
    case 64:
      ret = "64.jpg"; break
    case 128:
      ret = "128.jpg"; break
    case 256:
      ret = "256.jpg"; break
    case 512:
      ret = "512.jpg"; break
    case 1024:
      ret = "1024.gif"; break
    case 2048:
      ret = "2048.jpg"; break
    case 4096:
      ret = "4096.jpg"; break
    default:
      ret = "0.jpg" // shouldnt get here
  }
  return "2048/" + ret
}

function setup() {
  board.value = createEmptyBoard()
  addRandomTile()
  addRandomTile()
  score.value = 0
  won.value = false
  over.value = false
  started.value = true
  console.log(board.value)
}

function addRandomTile() {
  let opens = getOpenTiles()
  if (opens.length === 0) return
  let randomOpen = Math.floor(Math.random() * opens.length)
  let row = opens[randomOpen][0]
  let column = opens[randomOpen][1]
  board.value[row][column] = Math.random() > 0.9 ? 4 : 2
}

function getOpenTiles() {
  let ret = []
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++)
      if (board.value[i][j] === 0)
        ret.push([i, j])
  return ret
}

function moveLeft() {
  let newBoard = createEmptyBoard()
  for (let i = 0; i < 4; i++) {
    let q = new Queue(4)
    let hasMerged = false
    for (let j = 0; j < 4; j++) {
      let n = board.value[i][j]
      if (n === 0) continue
      if (q.curr !== 0) {
        if (q.array[q.curr - 1] === n && !hasMerged) { // merge
          q.array[q.curr - 1] *= 2
          hasMerged = true
          score.value += q.array[q.curr - 1]
          if (q.array[q.curr - 1] === 2048)
            won.value = true
        } else {
          q.enque(n)
          hasMerged = false
        }
      } else { // this is just the initial case
        q.enque(n)
      }
    }
    for (let j = 0; j < 4; j++)
      newBoard[i][j] = q.array[j]
  }
  board.value = newBoard
}

function orientCounterclockwise(times) {
  for (let t = 0; t < times; t++) {
    let newBoard = createEmptyBoard()
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++)
        newBoard[i][j] = board.value[4 - j - 1][i]
    board.value = newBoard
  }
}

function move(dir) {
  if (over.value || !started.value) return
  switch (dir) {
    case 'left':
      moveLeft(); break
    case 'up':
      orientCounterclockwise(3); moveLeft(); orientCounterclockwise(1); break
    case 'down':
      orientCounterclockwise(1); moveLeft(); orientCounterclockwise(3); break
    case 'right':
      orientCounterclockwise(2); moveLeft(); orientCounterclockwise(2); break
  }
  addRandomTile()
  // check if the game is over
  if (getOpenTiles().length > 0) return // not over if there's any open tiles
  over.value = true // otherwise, it is over
}

onMounted(() => {
  window.addEventListener('keydown', e => {
    e.preventDefault()
    switch (e.code) {
      case 'ArrowLeft':
      case 'KeyA':
        move('left'); break
      case 'ArrowRight':
      case 'KeyD':
        move('right'); break
      case 'ArrowUp':
      case 'KeyW':
        move('up'); break
      case 'ArrowDown':
      case 'KeyS':
        move('down'); break
    }
  })
})
</script>
