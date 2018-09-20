<template>
  <div>
    <button @click="init()">init</button>
    <button @click="oneRoom()">oneRoom</button>
    <button @click="heightHalf()">height half</button>
    <button @click="widthHalf()">width half</button>
    <input type="text" placeholder="row" v-model="row">
    <input type="text" placeholder="column" v-model="column">
    <ul v-for="(items, row) in board" :key="row">
      <component v-for="(item, col) of board[row]" :key="col" :is="item"></component>
    </ul>
  </div>
</template>

<script>
import Wall from './components/Wall.vue'
import Floor from './components/Floor.vue'

const WALL = 'wall'
const FLOOR = 'floor'

export default {
  components: {
    'wall': Wall,
    'floor': Floor
  },
  data () {
    return {
      column: 30,
      row: 30,
      board: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.board = []
      for (let r = 0; r < this.row; r++) {
        this.board.push([])
        for (let c = 0; c < this.column; c++) {
          this.board[r].push(WALL)
        }
      }
    },
    oneRoom () {
      this.init()

      let [top, bottom, left, right] = this.createRoom({ wmin: 0, wmax: this.row - 1, hmin: 0, hmax: this.column - 1 })
      for (let r = top; r <= bottom; r++) {
        for (let c = left; c <= right; c++) {
          this.$set(this.board[r], c, FLOOR)
        }
      }
    },
    heightHalf () { // 100なら50 0~49 50~99
      this.init()

      let hhalf = this.column / 2
      let [top, bottom, left, right] = this.createRoom({ wmin: 0, wmax: hhalf - 1, hmin: 0, hmax: this.column - 1 })
      for (let r = top; r <= bottom; r++) {
        for (let c = left; c <= right; c++) {
          this.$set(this.board[r], c, FLOOR)
        }
      }

      [top, bottom, left, right] = this.createRoom({ wmin: hhalf, wmax: this.row - 1, hmin: 0, hmax: this.column - 1 })
      for (let r = top; r <= bottom; r++) {
        for (let c = left; c <= right; c++) {
          this.$set(this.board[r], c, FLOOR)
        }
      }
    },
    widthHalf () { // 100なら50 0~49 50~99
      this.init()

      let whalf = this.row / 2
      let [top, bottom, left, right] = this.createRoom({ wmin: 0, wmax: this.row - 1, hmin: 0, hmax: whalf - 1 })
      for (let r = top; r <= bottom; r++) {
        for (let c = left; c <= right; c++) {
          this.$set(this.board[r], c, FLOOR)
        }
      }

      [top, bottom, left, right] = this.createRoom({ wmin: 0, wmax: this.row - 1, hmin: whalf, hmax: this.column - 1 })
      for (let r = top; r <= bottom; r++) {
        for (let c = left; c <= right; c++) {
          this.$set(this.board[r], c, FLOOR)
        }
      }
    },
    createRoom ({ wmin, wmax, hmin, hmax }) {
      let top = Math.floor(Math.random() * (wmax - wmin) + wmin)
      let bottom = Math.floor(Math.random() * (wmax - wmin) + wmin)
      if (top > bottom) {
        [bottom, top] = [top, bottom]
      }
      if (bottom - top <= 5) { // 部屋の縦幅が小さすぎる場合
        bottom = top + 5
        while (bottom > wmax) {
          [top , bottom, left, right] = this.createRoom({ wmin, wmax, hmin, hmax })
        }
      }

      let left = Math.floor(Math.random() * (hmax - hmin) + hmin)
      let right = Math.floor(Math.random() * (hmax - hmin) + hmin)
      if (left > right) {
        [right, left] = [left, right]
      }
      if (right - left <= 5) { // 部屋の横幅が小さすぎる場合
        right = left + 5
        while (right > hmax) {
          [top, bottom, left, right] = this.createRoom({ wmin, wmax, hmin, hmax })
        }
      }

      return [top, bottom, left, right]
    }
  }
}
</script>

<style scoped>
ul {
  display: flex;
  padding: 0;
  margin: 0;
}

.wall {
  display: block;
  width: 10px;
  height: 10px;
  background-color: #444;
}
</style>
