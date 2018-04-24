const currentPlayer = []
const player1 = 'X'
const player2 = 'O'

$(document).ready(function() {
  $('.startGame').on('click', function(event) {
    currentPlayer.push($('.selector option:selected').text())
    displayPlayer()
    $('.gameSetUp').hide()
    $('.gameDisplay').show()
  })

  $('.cell').on('click', function(event) {
    if ($(event.target).html() === '-') {
      play($(event.target))
    }
  })

  $('.playerSwitchButton').on('click', function(event) {
    resetBoard()
    clearCurrentPlayerHistory()
    $('.gameDisplay').hide()
    $('.gameSetUp').show()
  })

  $('.resetButton').on('click', function(event) {
    resetBoard()
  })
})

function play(target) {
  const place = target.attr('id').split('')

  addToBoard(place)

  if (currentPlayer[currentPlayer.length - 1] === 'X') {
    target.html(player1) // sets the button to the player1 symbol
    if (checkBoard()) {
      currentPlayer.push(player1)
    } else {
      currentPlayer.push(player2)
    }
  } else {
    target.html(player2)
    if (checkBoard()) {
      currentPlayer.push(player2)
    } else {
      currentPlayer.push(player1)
    }
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

function clearCurrentPlayerHistory() {
  currentPlayer.length = 0
}
