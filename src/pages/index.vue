<template>
  <div>
    <div class="item">
      <template v-if="notCreate === -1">
        ng room
      </template>
      <template v-else>
        ok room
      </template>
      | minimum room width: <vs-input-number v-model="min"/>
    </div>
    <div class="item">
      <vs-button vs-color="primary" vs-type="filled" @click="init()">init</vs-button>
      <vs-button vs-color="success" vs-type="filled" @click="oneRoom()">oneRoom</vs-button>
      <vs-button vs-color="success" vs-type="filled" @click="widthHalf()">width half</vs-button>
      <vs-button vs-color="success" vs-type="filled" @click="heightHalf()">height half</vs-button>
    </div>
    <div class="item">
      vertical length<vs-input-number v-model="row"/>
      horizontal length<vs-input-number v-model="column"/>
    </div>
    <div class="item">
      <vs-button vs-color="success" vs-type="filled" @click="widthN()">width N</vs-button>
      <vs-button vs-color="success" vs-type="filled" @click="heightN()">height N</vs-button>
    </div>
    <div class="item">
      vertical divisions<vs-input-number v-model="height"/>
      horizontal divisions<vs-input-number v-model="width"/>
    </div>
    <ul v-for="(items, row) in board" :key="row">
      <component v-for="(item, col) of board[row]" :key="col" :is="item"></component>
    </ul>
  </div>
</template>

<script>
import Wall from '../components/Wall.vue'
import Floor from '../components/Floor.vue'

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
      row: 32,
      width: 3,
      height: 3,
      min: 5,
      board: []
    }
  },
  mounted () {
    this.init()
  },
  computed: {
    notCreate () {
      if (this.min * this.height * 2 > this.row) {
        console.warn('not height')  
        this.$vs.notify({
          time:2000,
          title:'not height',
          text:'min * height * 2 > row',
          color:'danger',
          icon:'query_builder'
        })
        return -1
      }
      if (this.min * this.width * 2 > this.column) {
        console.warn('not width')  
        this.$vs.notify({
          time:2000,
          title:'not width',
          text:'min * width * 2 > column',
          color:'danger',
          icon:'query_builder'
        })
        return -1
      }
      console.log('ok')
      return 0
    }
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

      let hhalf = this.row / 2
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

      let whalf = this.column / 2
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
    heightN () {
      this.init()
      const divsion = Math.floor(this.row / this.width)
      for (let i = 0; i <= this.row - divsion; i += divsion) {
        let [top, bottom, left, right] = this.createRoom({ wmin: i, wmax: i + divsion - 1, hmin: 0, hmax: this.column - 1 })
        for (let r = top; r <= bottom; r++) {
          for (let c = left; c <= right; c++) {
            this.$set(this.board[r], c, FLOOR)
          }
        }
      }
    },
    widthN () {
      this.init()
      const divsion = Math.floor(this.column / this.height)
      for (let i = 0; i <= this.column - divsion; i += divsion) {
        let [top, bottom, left, right] = this.createRoom({ wmin: 0, wmax: this.row - 1, hmin: i, hmax: i + divsion - 1 })
        for (let r = top; r <= bottom; r++) {
          for (let c = left; c <= right; c++) {
            this.$set(this.board[r], c, FLOOR)
          }
        }
      }
    },
    createRoom ({ wmin, wmax, hmin, hmax }) {
      let top = Math.floor(Math.random() * (wmax - wmin) + wmin)
      let bottom = Math.floor(Math.random() * (wmax - wmin) + wmin)
      if (top > bottom) {
        [bottom, top] = [top, bottom]
      }
      if (bottom - top <= this.min) { // 部屋の縦幅が小さすぎる場合
        bottom = top + this.min
        while (bottom > wmax) {
          [top , bottom, left, right] = this.createRoom({ wmin, wmax, hmin, hmax })
        }
      }

      let left = Math.floor(Math.random() * (hmax - hmin) + hmin)
      let right = Math.floor(Math.random() * (hmax - hmin) + hmin)
      if (left > right) {
        [right, left] = [left, right]
      }
      if (right - left <= this.min) { // 部屋の横幅が小さすぎる場合
        right = left + this.min
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

.item {
  display: flex;
  padding-bottom: 0.5rem;
}
</style>
