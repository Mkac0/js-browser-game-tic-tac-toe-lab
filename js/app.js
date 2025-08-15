/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

/*---------------------------- Variables (state) ----------------------------*/

let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const boardEl = document.querySelector('.board');
const resetBtnEl = document.getElementById('reset');
console.log(squareEls);
console.log(messageEl);

/*-------------------------------- Functions --------------------------------*/

function init() {
    console.log('init called');
    board = Array(9).fill('');
    turn = 'X';
    winner = false;
    tie = false;
    render();
};

function render() {
    updateBoard();
    updateMessage();
};

function updateBoard() {
    board.forEach((cellValue, index) => {
        squareEls[index].textContent = cellValue;
    });
};

function updateMessage() {
    if (tie && !winner) {
        messageEl.textContent = `It's a tie`;
    }else if (!winner && !tie) {
        messageEl.textContent = `${turn}'s, turn`;
    } else {
        const lastPlayer = turn === 'X' ? 'O' : 'X';
        messageEl.textContent = `${lastPlayer} wins`;
    };
};

function placePiece(index) {
    board[index] = turn;
};

function checkForWinner() {
    winner = false;
    for (const [a, b, c] of winningCombos) {
        const option1 = board[a];
        const option2 = board[b];
        const option3 = board[c];

        if (option1 !== '' && option1 === option2 && option1 === option3) {
            winner = true;
            return;
        };
    };
};

function checkForTie() {
    if (winner) return;
    tie = !board.includes('');
    console.log('tie' , tie);
}

function switchPlayerTurn() {
    if (winner) return;
    turn = (turn === 'X') ? 'O' : 'X';
    console.log('turn' , turn);
};



function handleClick(event) {
    if (!event.target.classList.contains('sqr')) return;
    const squareIndex = Number(event.target.id);
    if (winner || board[squareIndex] !== '') return;

    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    if (!winner) switchPlayerTurn();
    render();
};

/*----------------------------- Event Listeners -----------------------------*/

boardEl.addEventListener('click', handleClick);
resetBtnEl.addEventListener('click', init);

init();
console.log(init);

// Pseudocode
//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.
