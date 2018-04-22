const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]

function checkBoard() {
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
  board.forEach(row => {
    if (row.every(cell => {
      if (cell !== '') {
        return cell
      }
    })) {
      // TODO Add what to do with full board
    }
  })
}

function winner() {
  const winnerMessage = currentPlayer[currentPlayer.length - 1] + ' won!'
  const winner = $('<p class="font winnerMessage"></p>').html(winnerMessage)

  $('.currentPlayerDisplay').hide()
  $('.gameDisplay').prepend(winner)

  window.setTimeout(resetBoard, 5000)

  return true
}

function resetBoard() {
  board.forEach(row => {
    row.forEach((cell, index, array) => {
      array[index] = ''
    })
  })

  $('.winnerMessage').remove()
  $('.button').html('-')
  $('.currentPlayerDisplay').show()
}
