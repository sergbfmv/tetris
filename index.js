const SIZE_BLOCK = 30

const game = {
  area: [
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'x', 'o', 'o',],
    ['o', 'o', 'o', 'o', 'o', 'o', 'x', 'x', 'x', 'o',],
  ],
  activeTetromino: {
    x: 3,
    y: 0,
    block: [
      ['o', 'o', 'o',],
      ['x', 'o', 'o',],
      ['x', 'x', 'x',],
    ]
  },

  moveLeft() {
    this.activeTetromino.x -= 1
  },

  moveRight() {
    this.activeTetromino.x += 1
  },

  moveDown() {
    this.activeTetromino.y += 1
  },

  rotateTetromino() {

  },

  viewArea() {
    const area = JSON.parse(JSON.stringify(this.area))
    const {x, y, block} = this.activeTetromino

    for (let i = 0; i < block.length; i++) {
      const row = block[i]

      for (let j = 0; j < row.length; j++) {
        if (row[j] === 'x') {
          area[y + i][x + j] = block[i][j]
        }
      }
    }
    return area
  }
}

game.viewArea()




const container = document.querySelector('.container')

const canvas = document.createElement('canvas')
canvas.classList.add('game-area')
canvas.width = SIZE_BLOCK * 10
canvas.height = SIZE_BLOCK * 20

container.append(canvas)

const context = canvas.getContext('2d')

function showArea(area) {
  for (let y = 0; y < area.length; y++) {
    const line = area[y]

    for (let x = 0; x < line.length; x++) {
      const block = line[x]
      if (block === 'x') {
        context.fillStyle = 'blue'
        context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK)
        context.strokeStyle = 'white'
        context.strokeRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK)
      }
    }
  }
}

showArea(game.viewArea())
