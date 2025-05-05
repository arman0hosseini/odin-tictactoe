function gameboard() {
    const board = [];
    const row = 3;
    const col = 3;

    for (let i = 0; i < row; i++) {
        board[i] = [];
        for (let j = 0; j < col; j++) {
            board[i][j] = {
                location: `${i + 1} ${j + 1}`,
                symbol: null,
            };
        }
    }

    return {
        board: board
    };
}

/**
 * 
 * @param {string} name 
 * @param {string} symbol 
 * @returns 
 */
function player(name, symbol) {
    const playerName = name;
    const playerSymbol = symbol;
    return { playerName, playerSymbol };
}

function game() {
    let gameboard1 = gameboard();
    const player1 = player("Arman", "O");
    const player2 = player("Loser", "X");
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



    function restart() {
        gameboard1 = gameboard();
    }

    function check(player) {
        const playerSymbol = player.playerSymbol;
        const occupiedLocations = [];
        for (const row of gameboard1.board) {
            for (const columns of row) {
                if (columns.symbol === playerSymbol) {
                    occupiedLocations.push(columns.location);
                }
            }
        }

        for (const combo of winningCombos) {
            const isWinning = combo.every(function (value) {
                if (occupiedLocations.includes(value)) return true;
                else return false;
            })
            if (isWinning) {
                return true;
            }
        }
        return false;
    }

    function choose(player, choice) {
        let location = [];
        if (!isNaN(Number(choice))) {
            if (choice.charAt(0) < 1 || choice.charAt(0) > 3) {
                if (choice.charAt(0) < 1) location[0] = 0;
                else if (choice.charAt(0) > 3) location[0] = 2;
            }
            else {
                location[0] = Number(choice.charAt(0)) - 1;
            }
            if (choice.charAt(1) < 1 || choice.charAt(1) > 3) {
                if (choice.charAt(1) < 1) location[1] = 0;
                else if (choice.charAt(1) > 3) location[1] = 2;
            }
            else {

                location[1] = Number(choice.charAt(1)) - 1;
            }
        }
        else {
            restart();
            return;
        }

        if (gameboard1.board[location[0]][location[1]].symbol === null) {
            return location;
        }
        else {
            return false;
        }
    }

    function playRound() {
        let turnCounter = 0;
        outerloop: while (true) {
            while (true) {
                const userInput1 = prompt("What is your choice player1? ")
                const location = choose(player1, userInput1);
                if (!location) {
                    console.log("Already Taken!")
                    continue;
                }
                else {
                    gameboard1.board[location[0]][location[1]].symbol = player1.playerSymbol;
                    turnCounter++;
                    console.log(gameboard1.board);
                    const winCheck = check(player1);
                    if (winCheck) {
                        console.log(`${player1.playerName} Won!`);
                        break outerloop;
                    }
                    if (turnCounter === 9) {
                        console.log("Draw");
                        break outerloop;

                    }
                    break;
                }
            }
            while (true) {
                const userInput2 = prompt("What is your choice player2?");
                const location = choose(player2, userInput2)
                if (!location) {
                    console.log("Already Taken!")
                    continue;
                }
                else {
                    gameboard1.board[location[0]][location[1]].symbol = player2.playerSymbol;
                    turnCounter++;
                    console.log(gameboard1.board);
                    const winCheck = check(player2);

                    if (winCheck) {
                        console.log(`${player2.playerName} Won!`);
                        break outerloop;
                    }
                    break;
                }

            }
        }
    }


    return { playRound };

}


const game1 = game();

game1.playRound();