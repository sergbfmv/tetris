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
      ['x', 'o', 'o',],
      ['x', 'x', 'x',],
      ['o', 'o', 'o',],
    ],
    rotateIndex: 0,
    rotation: [
      [
        ['x', 'o', 'o',],
        ['x', 'x', 'x',],
        ['o', 'o', 'o',],
      ],
      [
        ['o', 'x', 'x',],
        ['o', 'x', 'o',],
        ['o', 'x', 'o',],
      ],
      [
        ['o', 'o', 'o',],
        ['x', 'x', 'x',],
        ['o', 'o', 'x',],
      ],
      [
        ['o', 'x', 'o',],
        ['o', 'x', 'o',],
        ['x', 'x', 'o',],
      ],
    ]
  },

  moveLeft() {
    if (this.checkOutPosition(this.activeTetromino.x - 1, this.activeTetromino.y)) {
      this.activeTetromino.x -= 1
    }
  },

  moveRight() {
    if (this.checkOutPosition(this.activeTetromino.x + 1, this.activeTetromino.y)) {
      this.activeTetromino.x += 1
    }
  },

  moveDown() {
    if (this.checkOutPosition(this.activeTetromino.x, this.activeTetromino.y + 1)) {
      this.activeTetromino.y += 1
    } else {
      this.stopMove()
    }
  },

  rotateTetromino() {
    this.activeTetromino.rotateIndex = this.activeTetromino.rotateIndex < 3 ? this.activeTetromino.rotateIndex + 1 : 0
    this.activeTetromino.block = this.activeTetromino.rotation[this.activeTetromino.rotateIndex]

    if (!this.checkOutPosition(this.activeTetromino.x, this.activeTetromino.y)) {
      this.activeTetromino.rotateIndex = this.activeTetromino.rotateIndex > 0 ? this.activeTetromino.rotateIndex - 1 : 3
      this.activeTetromino.block = this.activeTetromino.rotation[this.activeTetromino.rotateIndex]
    }
  },

  viewArea() {
    const area = JSON.parse(JSON.stringify(this.area))
    const {x, y, block} = this.activeTetromino

    for (let i = 0; i < block.length; i++) {
      const row = block[i]

      for (let j = 0; j < row.length; j++) {
        if (row[j] !== 'o') {
          area[y + i][x + j] = block[i][j]
        }
      }
    }
    return area
  },

  checkOutPosition(x, y) {
    const tetromino = this.activeTetromino.block

    for (let i = 0; i < tetromino.length; i++) {
      for (let j = 0; j < tetromino[i].length; j++) {
        if (tetromino[i][j] === 'o') continue
        if (!this.area[y + i] || !this.area[y + i][x + j] || this.area[y + i][x + j] !== 'o')
        return false
      }
    }
    return true
  },

  stopMove() {
    const {x, y, block} = this.activeTetromino

    for (let i = 0; i < block.length; i++) {
      const row = block[i]

      for (let j = 0; j < row.length; j++) {
        if (row[j] !== 'o') {
          this.area[y + i][x + j] = block[i][j]
        }
      }
    }
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
  context.clearRect(0, 0, canvas.width, canvas.height)

  for (let y = 0; y < area.length; y++) {
    const line = area[y]

    for (let x = 0; x < line.length; x++) {
      const block = line[x]
      if (block !== 'o') {
        context.fillStyle = 'blue'
        context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK)
        context.strokeStyle = 'white'
        context.strokeRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK)
      }
    }
  }
}

window.addEventListener('keydown', (e) => {
  const key = e.code

  switch(key) {
    case 'ArrowLeft':
      game.moveLeft();
      showArea(game.viewArea());
    break;
    case 'ArrowRight':
      game.moveRight();
      showArea(game.viewArea());
    break;
    case 'ArrowDown':
      game.moveDown();
      showArea(game.viewArea());
    break;
    case 'ArrowUp':
      game.rotateTetromino();
      showArea(game.viewArea());
    break;
  }
})

showArea(game.viewArea())
