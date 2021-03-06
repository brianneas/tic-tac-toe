const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]

function checkBoard() {
  if (checkFullBoard()) {
    draw()
  }

  if (
    checkHorizontal(board) ||
    checkVertical() ||
    checkPositiveDiagonal() ||
    checkNegativeDiagonal()
  ) {
    return true
  } else {
    return false
  }
}

function checkHorizontal(array) {
  if (array.some(row => {
    return checkRow(row)
  })) {
    return winner()
  }
}

function checkVertical() {
  const transposedArray = board[0].map((col, i) => board.map(row => row[i]))
  return checkHorizontal(transposedArray)
}

function checkPositiveDiagonal() {
  const positiveDiagonal = []

  board.forEach((row, index) => {
    positiveDiagonal.push(row[index])
  })

  if (checkRow(positiveDiagonal)) {
    return winner()
  }
}

function checkNegativeDiagonal() {
  const negativeDiagonal = []

  board.forEach((row, index) => {
    negativeDiagonal.push(row[row.length - 1 - index])
  })

  if (checkRow(negativeDiagonal)) {
    return winner() // winner() should return true
  }
}

function checkRow(row) {
  return row.every(space => {
    return space === currentPlayer[currentPlayer.length - 1]
  })
}

function checkFullBoard() {
  return board.every(row => {
    if (row.every(cell => {
      return cell !== ''
    })) {
      return row
    }
  })
}

function winner() {
  const winnerMessage = currentPlayer[currentPlayer.length - 1] + ' won!'
  const messageClass = 'winnerMessage'
  const winner = $(`<p class="font ${messageClass}"></p>`).html(winnerMessage)

  $('.currentPlayerDisplay').hide()
  $('.gameDisplay').prepend(winner)

  window.setTimeout(function() { resetBoard(messageClass) }, 5000)

  return true
}

function draw() {
  const drawText = 'It\'s a draw.'
  const messageClass = 'drawMessage'
  const drawMessage = $(`<p class="font ${messageClass}"></p>`).html(drawText)

  $('.currentPlayerDisplay').hide()
  $('.gameDisplay').prepend(drawMessage)

  window.setTimeout(function() { resetBoard(messageClass) }, 5000)
}

function resetBoard(messageClass) {
  eraseBoard()

  const messageSelector = `.${messageClass}`

  $(messageSelector).remove()
  $('.currentPlayerDisplay').show()
}

function eraseBoard() {
  board.forEach(row => {
    row.forEach((cell, index, array) => {
      array[index] = ''
    })
  })

  $('.button').html('-')
}
