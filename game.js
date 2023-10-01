let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))


let playerChoice = prompt("Welcome to Tic Tac Toe! Choose 'X' or 'O'");

// Validate user input
while (playerChoice !== 'X' && playerChoice !== 'O') {
    playerChoice = prompt("Invalid choice! Please choose 'X' or 'O'");
  }

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = playerChoice;
let spaces = Array(9).fill(null)

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {
    const id = e.target.id

    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerHasWon() !==false){
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()

            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT

        if (currentPlayer == X_TEXT || currentPlayer == O_TEXT) {
            computerTurn() // Computer plays after the user square is chosen
          }
    }
}

//Computer selects a random, empty space
function computerTurn() {
    const emptySpaces = spaces.reduce((acc, elem, index) => {
        if (elem == null) {
            acc.push(index)
        }
        return acc
    }, [])
    
    const randomIndex = Math.floor(Math.random() * emptySpaces.length)
    const computerMove = emptySpaces[randomIndex]
    
    spaces[computerMove] = currentPlayer
    boxes[computerMove].innerText = currentPlayer
    
    if(playerHasWon() !== false){
        playerText.innerHTML = `${currentPlayer} has won!`
        let winning_blocks = playerHasWon()

        winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
        return
    }

    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
}
var done = false;
for (var i = 0; !done && i < boxes.length; i++) {
    if (spaces[i] == currentPlayer) {
        var cellNeighbors = neighbors[i];
        for (const x of cellNeighbors) {
            if (!spaces[x]) {
                spaces[x] = currentPlayer;
                boxes[x].innerText = currentPlayer;
                done = true;
                break;
            }
        }
    }
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const neighbors = {
    0: [1, 3, 4],
    1: [0, 2, 4],
    2: [1, 4, 5],
    3: [0, 4, 6],
    4: [0, 1, 2, 3, 5, 6, 7, 8],
    5: [2, 4, 8],
    6: [3, 4, 7],
    7: [4, 6, 8],
    8: [4, 5, 7]
};

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false
}

restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)

    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
    })

    playerText.innerHTML = 'Tic Tac Toe'

    currentPlayer = playerChoice
}

startGame()
