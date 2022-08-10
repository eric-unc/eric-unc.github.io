<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title">2048 Game</h1>
        <h4 class="subtitle">By Eric Schneider</h4>
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

<script>
class Queue { // More or less
  constructor(maxlength){
    this.array = new Array(maxlength).fill(0)
    this.curr = 0 // Where to fill queue from
  }

  enque(val){
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

export default {
  head: {
    title: "Eric Schneider"
  },

  data() {
    return {
      board: createEmptyBoard(),
      score: 0,
      won: false,
      over: false,
      started: false
    }
  },

  methods: {
    getTileImage(tile) {
      switch(tile){
        case 0: // TODO: don't remember why this is a thing
          return "0.jpg"
        case 2:
          return "2.jpeg"
        case 4:
          return "4.jpg"
        case 8:
          return "8.jpg"
        case 16:
          return "16.jpg"
        case 32:
          return "32.jpg"
        case 64:
          return "64.jpg"
        case 128:
          return "128.jpg";
        case 256:
          return "256.jpg"
        case 512:
          return "512.jpg"
        case 1024:
          return "1024.gif"
        case 2048:
          return "2048.jpg"
        case 4096:
          return "4096.jpg"
        default:
          return "0.jpg" // shouldnt get here
      }
    },
    setup() {
      this.board = createEmptyBoard()
      this.addRandomTile()
      this.addRandomTile()

      this.score = 0
      this.won = false
      this.over = false
      this.started = true
      console.log(this.board)
    },
    addRandomTile() {
      let opens = this.getOpenTiles()

      if(opens.length === 0) return

      let randomOpen = Math.floor(Math.random() * opens.length)
      let row = opens[randomOpen][0]
      let column = opens[randomOpen][1]

      this.board[row][column] = Math.random() > 0.9 ? 4 : 2
    },
    getOpenTiles() {
      let ret = []

      for(let i = 0; i < 4; i++)
        for(let j = 0; j < 4; j++)
          if(this.board[i][j] === 0)
            ret.push([i, j])

      return ret
    },
    moveLeft() {
      let newBoard = createEmptyBoard()

      for(let i = 0; i < 4; i++) {
        let q = new Queue(4)
        let hasMerged = false

        for(let j = 0; j < 4; j++){
          let n = this.board[i][j]
          if(n === 0) continue

          if(q.curr !== 0){
            if(q.array[q.curr - 1] === n && !hasMerged){ // merge
              q.array[q.curr - 1] *= 2
              hasMerged = true
              this.score += q.array[q.curr - 1]

              if(q.array[q.curr - 1] === 2048)
                this.won = true
            }else{
              q.enque(n)
              hasMerged = false
            }
          } else { // this is just the initial case
            q.enque(n)
          }
        }

        for(let j = 0; j < 4; j++)
          newBoard[i][j] = q.array[j]
      }

      this.board = newBoard
    },
    orientCounterclockwise(times) {
      for (let t = 0; t < times; t++) {
        let newBoard = createEmptyBoard()

        for(let i = 0; i < 4; i++)
          for(let j = 0; j < 4; j++)
            newBoard[i][j] = this.board[4 - j - 1][i]

        this.board = newBoard;
      }
    },
    move(dir) {
      if (this.over || !this.started) return

      switch(dir){
        case 'left':
          this.moveLeft()
          break
        case 'up':
          this.orientCounterclockwise(3)
          this.moveLeft()
          this.orientCounterclockwise(1)
          break
        case 'down':
          this.orientCounterclockwise(1)
          this.moveLeft()
          this.orientCounterclockwise(3)
          break
        case 'right':
          this.orientCounterclockwise(2)
          this.moveLeft()
          this.orientCounterclockwise(2)
          break
      }

      this.addRandomTile()

      // check if the game is over
      if(this.getOpenTiles().length > 0) return // not over if there's any open tiles

      for(let i = 0; i < this.size; i++)
        for(let j = 0; j < this.size; j++){
          let n = this.board[i][j]

          if(n === this.board[i - 1][j] ||
              n === this.board[i + 1][j] ||
              n === this.board[i][j - 1] ||
              n === this.board[i][j + 1])
            return // not over if there is a possible move
        }

      this.over = true // otherwise, it is over
    }
  },

  mounted() {
    window.addEventListener('keydown', e => {
      e.preventDefault()

      switch(e.code){
        case 'ArrowLeft':
        case 'KeyA':
          this.move('left')
          break
        case 'ArrowRight':
        case 'KeyD':
          this.move('right')
          break
        case 'ArrowUp':
        case 'KeyW':
          this.move('up')
          break
        case 'ArrowDown':
        case 'KeyS':
          this.move('down')
          break
      }
    })
  }
}
</script>
