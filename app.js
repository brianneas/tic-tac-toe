const currentPlayer = ['X']
const player1 = 'X'
const player2 = 'O'

const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]

$(document).ready(function() {
  displayPlayer()

  $('.button').on('click', function(event) {
    const buttonId = $(this).attr('id')
    if ($(event.target).html() === '-') {
      play($(event.target))
    }
  })
})

function play(target) {
  if (currentPlayer[currentPlayer.length - 1] === 'X') {
    target.html(player1)
    currentPlayer.push(player2)
  } else {
    target.html(player2)
    currentPlayer.push(player1)
  }

  displayPlayer()
}

function displayPlayer() {
  $('.currentPlayer').html(currentPlayer[currentPlayer.length - 1])
}
