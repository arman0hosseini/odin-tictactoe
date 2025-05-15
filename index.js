// function gameboard() {
//     const board = [];
//     const row = 3;
//     const col = 3;

//     for (let i = 0; i < row; i++) {
//         board[i] = [];
//         for (let j = 0; j < col; j++) {
//             board[i][j] = {
//                 location: `${i + 1} ${j + 1}`,
//                 symbol: null,
//             };
//         }
//     }

//     return {
//         board: board
//     };
// }

// /**
//  * 
//  * @param {string} name 
//  * @param {string} symbol 
//  * @returns 
//  */
// function player(name, symbol) {
//     const playerName = name;
//     const playerSymbol = symbol;
//     return { playerName, playerSymbol };
// }

// function game() {
//     let gameboard1 = gameboard();
//     const player1 = player("Arman", "O");
//     const player2 = player("Loser", "X");
//     const winningCombos = [
//         // Rows
//         ["1 1", "1 2", "1 3"],
//         ["2 1", "2 2", "2 3"],
//         ["3 1", "3 2", "3 3"],

//         // Columns
//         ["1 1", "2 1", "3 1"],
//         ["1 2", "2 2", "3 2"],
//         ["1 3", "2 3", "3 3"],

//         // Diagonals
//         ["1 1", "2 2", "3 3"],
//         ["1 3", "2 2", "3 1"]
//     ];



//     function restart() {
//         gameboard1 = gameboard();
//     }

//     function check(player) {
//         const playerSymbol = player.playerSymbol;
//         const occupiedLocations = [];
//         for (const row of gameboard1.board) {
//             for (const columns of row) {
//                 if (columns.symbol === playerSymbol) {
//                     occupiedLocations.push(columns.location);
//                 }
//             }
//         }

//         for (const combo of winningCombos) {
//             const isWinning = combo.every(function (value) {
//                 if (occupiedLocations.includes(value)) return true;
//                 else return false;
//             })
//             if (isWinning) {
//                 return true;
//             }
//         }
//         return false;
//     }

//     function choose(player, choice) {
//         let location = [];
//         if (!isNaN(Number(choice))) {
//             if (choice.charAt(0) < 1 || choice.charAt(0) > 3) {
//                 if (choice.charAt(0) < 1) location[0] = 0;
//                 else if (choice.charAt(0) > 3) location[0] = 2;
//             }
//             else {
//                 location[0] = Number(choice.charAt(0)) - 1;
//             }
//             if (choice.charAt(1) < 1 || choice.charAt(1) > 3) {
//                 if (choice.charAt(1) < 1) location[1] = 0;
//                 else if (choice.charAt(1) > 3) location[1] = 2;
//             }
//             else {

//                 location[1] = Number(choice.charAt(1)) - 1;
//             }
//         }
//         else {
//             restart();
//             return;
//         }

//         if (gameboard1.board[location[0]][location[1]].symbol === null) {
//             return location;
//         }
//         else {
//             return false;
//         }
//     }

//     function playRound() {
//         let turnCounter = 0;
//         outerloop: while (true) {
//             while (true) {
//                 const userInput1 = prompt("What is your choice player1? ")
//                 const location = choose(player1, userInput1);
//                 if (!location) {
//                     console.log("Already Taken!")
//                     continue;
//                 }
//                 else {
//                     gameboard1.board[location[0]][location[1]].symbol = player1.playerSymbol;
//                     turnCounter++;
//                     console.log(gameboard1.board);
//                     const winCheck = check(player1);
//                     if (winCheck) {
//                         console.log(`${player1.playerName} Won!`);
//                         break outerloop;
//                     }
//                     if (turnCounter === 9) {
//                         console.log("Draw");
//                         break outerloop;

//                     }
//                     break;
//                 }
//             }
//             while (true) {
//                 const userInput2 = prompt("What is your choice player2?");
//                 const location = choose(player2, userInput2)
//                 if (!location) {
//                     console.log("Already Taken!")
//                     continue;
//                 }
//                 else {
//                     gameboard1.board[location[0]][location[1]].symbol = player2.playerSymbol;
//                     turnCounter++;
//                     console.log(gameboard1.board);
//                     const winCheck = check(player2);

//                     if (winCheck) {
//                         console.log(`${player2.playerName} Won!`);
//                         break outerloop;
//                     }
//                     break;
//                 }

//             }
//         }
//     }


//     return { playRound };

// }


// const game1 = game();

// game1.playRound();


// UI Version
function gameBoard(containerSelector) {
    const container = document.querySelector(containerSelector);
    let board = [];
    for (let i = 1; i <= 3; i++) {
        board[i - 1] = [];
        for (let j = 1; j <= 3; j++) {
            const cell = document.createElement("div");
            cell.classList.add(`cell`, `row-${i}`, `col-${j}`);
            cell.dataset.location = `${i} ${j}`;
            board[i - 1][j - 1] = {
                htmlCellElement: cell,
                location: cell.dataset.location,
                symbol: null
            };
            container.appendChild(cell);
        }
    }
    return { board };
}

function player(name, symbol) {
    const playerName = name;
    const playerSymbol = symbol;
    return { playerName, playerSymbol };
}

function game() {
    let currentGameBoard = gameBoard(".game-board");
    const nameBtn = document.querySelector("#name-button");
    const gameStartContainer = document.querySelector(".game-start");
    const gameBoardContainer = document.querySelector(".game-board");
    const gameResultContainer = document.querySelector(".game-result");
    const gameResult = gameResultContainer.querySelector(".result");
    const restartBtn = gameResultContainer.querySelector(".restart");
    const winningCombos = [
        // Rows
        ["1 1", "1 2", "1 3"],
        ["2 1", "2 2", "2 3"],
        ["3 1", "3 2", "3 3"],

        // Columns
        ["1 1", "2 1", "3 1"],
        ["1 2", "2 2", "3 2"],
        ["1 3", "2 3", "3 3"],

        // Diagonals
        ["1 1", "2 2", "3 3"],
        ["1 3", "2 2", "3 1"]
    ];
    let player1;
    let player2;
    let currentPlayer = null;
    let moveCount = 0;

    nameBtn.addEventListener("click",
        function (event) {
            event.preventDefault();
            const player1Name = (document.querySelector("#player1-name")).value;
            const player2Name = (document.querySelector("#player2-name")).value;
            if (player1Name == "" || player2Name == "") {
                if (player1Name == "" && player2Name == "") alert("Where are the names mate?!");
                else if (player1Name == "") alert("Enter a name for player1");
                else if (player2Name == "") alert("Enter a name for player2");
                return;
            }
            player1 = player(player1Name, "O");
            player2 = player(player2Name, "X");
            currentPlayer = player1;
            alert("LET'S GO");
            gameStartContainer.style.display = "none";
            gameBoardContainer.style.display = "grid";
        }
    )

    restartBtn.addEventListener("click", restart);

    gameBoardContainer.addEventListener("click",
        function (e) {
            const targetCell = e.target;
            const targetLocation = targetCell.dataset.location;




            if (targetCell.textContent !== "" || !targetCell.classList.contains("cell")) {
                if (targetCell.textContent !== "") {
                    alert("Already Taken");
                    return;
                }
                else if (!targetCell.classList.contains("cell")) {
                    alert("Click on a Cell");
                    return;
                }
            }
            targetCell.textContent = currentPlayer.playerSymbol;
            for (const row of currentGameBoard.board) {
                for (const col of row) {
                    if (col.location === targetLocation) col.symbol = currentPlayer.playerSymbol;
                }
            }

            if (check(currentPlayer)) showResult(`${currentPlayer.playerName} Won!`);


            moveCount++;
            if (moveCount === 9) showResult(`Draw!`);

            currentPlayer = (currentPlayer === player1) ? player2 : player1;
        }
    )

    function showResult(text) {
        gameStartContainer.style.display = "none";
        gameBoardContainer.style.display = "none";
        gameResultContainer.style.display = "flex";
        gameResult.textContent = text;
    }


    function check(player) {
        const currentPlayerSymbol = player.playerSymbol;
        const occupiedLocations = [];
        for (const row of currentGameBoard.board) {
            for (const col of row) {
                if (col.symbol === currentPlayerSymbol) occupiedLocations.push(col.location);
            }
        }

        for (const combo of winningCombos) {
            const isWinning = combo.every(value => occupiedLocations.includes(value));
            if (isWinning) {
                return true;
            }
        }
        return false;
    }

    function restart() {
        gameBoardContainer.innerHTML = "";
        currentGameBoard = gameBoard(".game-board");
        moveCount = 0;
        currentPlayer = player1;
        gameResultContainer.style.display = "none";
        gameBoardContainer.style.display = "none";
        gameStartContainer.style.display = "flex";
    }

}
game();