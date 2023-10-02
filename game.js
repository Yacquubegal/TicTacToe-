let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'));


let playerChoice = prompt("Welcome to Tic Tac Toe! Choose 'X' or 'O'");

// Validate user input
while (playerChoice !== 'X' && playerChoice !== 'O') {
    playerChoice = prompt("Invalid choice! Please choose 'X' or 'O'");
}

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = playerChoice;
let spaces = Array(9).fill(null);

let winningBlocks = null;

const startGame = () => {
    boxes.forEach((box) => box.addEventListener('click', boxClicked));
};

function boxClicked(e) {
    const id = e.target.id;

    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerHasWon() !== false) {
            playerText.innerHTML = `${currentPlayer} has won!`;
            let winning_blocks = playerHasWon();
            
            winning_blocks.forEach((box) => (boxes[box].style.backgroundColor = winnerIndicator));
            return;
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;

        if (currentPlayer == X_TEXT || currentPlayer == O_TEXT) {
            computerTurn();
        }
    }
}

//Computer chooses any empty space on the board
function computerTurn() {
    if (!playerHasWon()) {
        const emptySpaces = spaces.reduce((acc, elem, index) => {
            if (elem == null) {
                acc.push(index);
            }
            return acc;
        }, []);
        
        const randomIndex = Math.floor(Math.random() * emptySpaces.length);
        const computerMove = emptySpaces[randomIndex];
        
        spaces[computerMove] = currentPlayer;
        boxes[computerMove].innerText = currentPlayer;
        
        if(playerHasWon()) {
            playerText.innerHTML = `${currentPlayer} has won!`;
            winningBlocks.forEach((box) => (boxes[box].style.backgroundColor = winnerIndicator));
            return;
        }
    
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
    }
}

//Computer always tries to choose a space adjacent to a space it already owns
function computerTurnIntermediate() {
    const ownedSpaces = spaces.reduce((acc, elem, index) => { if (elem === currentPlayer) { acc.push(index); } return acc; }, []);
    const adjacentSpaces = ownedSpaces.reduce((acc, elem) => { const adjacent = [elem - 1, elem + 1, elem - gridSize, elem + gridSize]; adjacent.forEach((space) => { if (spaces[space] === null && !acc.includes(space) && space >= 0 && space < spaces.length) { acc.push(space); } }); return acc; }, []);
    const randomIndex = Math.floor(Math.random() * adjacentSpaces.length); const computerMove = adjacentSpaces[randomIndex];
    
    spaces[computerMove] = currentPlayer; boxes[computerMove].innerText = currentPlayer;

    if (playerHasWon() !== false) { 
        playerText.innerHTML = `${currentPlayer} has won!`;
        let winning_blocks = playerHasWon();
        winning_blocks.forEach((box) => (boxes[box].style.backgroundColor = winnerIndicator)); return;
    }

currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
}

//Allow user to select the beginner level and validate with a green checkmark upon click
document.getElementById('beginner').addEventListener('click', function() {
    this.classList.toggle('checked');
    document.getElementById('intermediate').classList.remove('checked');
});

//Allow user to select the intermediate level and validate with a green checkmark upon click
document.getElementById('intermediate').addEventListener('click', function() {
    this.classList.toggle('checked');
    document.getElementById('beginner').classList.remove('checked');
});

//Logic for game difficulty selection that is not currently working

/* const beginnerButton = document.getElementById("beginner");
const intermediateButton = document.getElementById("intermediate");

beginnerButton.addEventListener("click", computerTurn);
intermediateButton.addEventListener("click", computerTurnIntermediate); */

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition;

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            winningBlocks = [a, b, c];
            return true;
        }
    }
    return false;
}

restartBtn.addEventListener('click', restart);

function restart() {
    spaces.fill(null);
    winningBlocks = null;

    boxes.forEach((box) => {
        box.innerText = '';
        box.style.backgroundColor = '';
    });

    let newPlayerChoice = prompt("Choose 'X' or 'O'");
    while (newPlayerChoice.toUpperCase() !== 'X' && newPlayerChoice.toUpperCase() !== 'O') {
        newPlayerChoice = prompt("Invalid choice! Please choose 'X' or 'O'");
    }
    
    // Update currentPlayer based on the new player choice
    currentPlayer = newPlayerChoice.toUpperCase() === 'X' ? X_TEXT : O_TEXT;
    playerChoice = newPlayerChoice.toUpperCase(); // Assign the new player choice to playerChoice variable

    playerText.innerHTML = 'Tic Tac Toe';
}

startGame();


