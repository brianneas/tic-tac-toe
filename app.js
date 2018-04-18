const currentPlayer = []
const player1 = 'X'
const player2 = 'O'

const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]

$(document).ready(function() {
  $('.startGame').on('click', function(event) {
    currentPlayer.push($('.selector option:selected').text())
    displayPlayer()
    $('.gameSetUp').hide()
    $('.gameDisplay').show()
  })

  $('.button').on('click', function(event) {
    if ($(event.target).html() === '-') {
      play($(event.target))
    }
  })
})

function play(target) {
  const place = target.attr('id').split('')

  addToBoard(place)

  if (currentPlayer[currentPlayer.length - 1] === 'X') {
    target.html(player1)
    checkBoard()
    currentPlayer.push(player2)
  } else {
    target.html(player2)
    checkBoard()
    currentPlayer.push(player1)
  }

  displayPlayer()
}

function displayPlayer() {
  $('.currentPlayer').html(currentPlayer[currentPlayer.length - 1])
}

function addToBoard(place) {
  const currentPlace = []

  place.forEach(element => {
    currentPlace.push(parseInt(element))
  })

  board[currentPlace[0]][currentPlace[1]] = currentPlayer[currentPlayer.length - 1]
}

function checkBoard() {
  checkHorizontal(board)
  checkVertical()
  checkPositiveDiagonal()
  checkNegativeDiagonal()
}

function checkHorizontal(array) {
  array.forEach(row => {
    if (checkRow(row)) {
      winner()
    }
  })
}

function checkVertical() {
  const transposedArray = board[0].map((col, i) => board.map(row => row[i]))
  checkHorizontal(transposedArray)
}

function checkPositiveDiagonal() {
  const positiveDiagonal = []

  board.forEach((row, index) => {
    positiveDiagonal.push(row[index])
  })

  if (checkRow(positiveDiagonal)) {
    winner()
  }
}

function checkNegativeDiagonal() {
  const negativeDiagonal = []

  board.forEach((row, index) => {
    negativeDiagonal.push(row[row.length - 1 - index])
  })

  if (checkRow(negativeDiagonal)) {
    winner()
  }
}

function checkRow(row) {
  return row.every(space => {
    return space === currentPlayer[currentPlayer.length - 1]
  })
}

function winner() {
  const alertMessage = currentPlayer[currentPlayer.length - 1] + ' won!'
  alert(alertMessage)
}
