const gameBoard = document.querySelector('#gameboard');
const infoDisplay = document.querySelector('#info');

const startCells = [
    "", "", "", "", "", "", "", "", "",
]

let go = 'circle';
infoDisplay.textContent = "Circle goes first!"

function createBoard() {
    startCells.forEach((cell, index) => {
        const cellElement = document.createElement('div')
        cellElement.classList.add('square')
        cellElement.id = index
        cellElement.addEventListener('click', addGo)
        gameBoard.append(cellElement)
    })

}
createBoard();

let circleWinner = 0;
let squareWinner = 0;

function updateWinnerCount() {
    const circleWinnerElement = document.querySelector('#circleWinner');
    const squareWinnerElement = document.querySelector('#squareWinner');

    circleWinnerElement.textContent = `Circle: ${circleWinner}`;
    squareWinnerElement.textContent = `Square: ${squareWinner}`;
}

function addGo(e) {
    const goDisplay = document.createElement('div')
    goDisplay.classList.add(go)
    e.target.append(goDisplay)

    go = go === "circle" ? "cross" : "circle"
    infoDisplay.textContent = "It is now " + go + "'s go."
    e.target.removeEventListener('click', addGo)

    checkScore()
}

function checkScore() {
    const allSquares = document.querySelectorAll('.square')
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];


    winningCombos.forEach((array => {
        const circleWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains('circle'))

        if (circleWins) {
            infoDisplay.textContent = "Circle Wins! Game Over!"
            circleWinner++;
            updateWinnerCount();
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
    }))


    winningCombos.forEach((array => {
        const crossWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains('cross'))

        if (crossWins) {
            infoDisplay.textContent = "Cross Wins! Game Over!"
            squareWinner++;
            updateWinnerCount();
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
    }))

    function checkDraw() {
        const allSquares = document.querySelectorAll('.square')
        const isDraw = Array.from(allSquares).every(square => square.firstChild)

        if (isDraw) {
            infoDisplay.textContent = "It's a draw! Game Over!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
        }
    }
    checkDraw()

}

const playAgainButton = document.querySelector('#button');

function addPlayAgainButton() {
    playAgainButton.addEventListener('click', resetGame);
}

addPlayAgainButton()

function resetGame() {
    gameBoard.innerHTML = '';
    createBoard();
    infoDisplay.textContent = "Circle goes first!";
}
