// Gameboard Module (IIFE)
const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const reset = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    const setMark = (index, mark) => {
        if (board[index] === "") {
            board[index] = mark;
            return true;
        }
        return false;
    };

    return { getBoard, setMark, reset };
})();

// Player Factory
const Player = (name, marker) => {
    return { name, marker };
};

// Game Controller Module (IIFE)
const GameController = (() => {
    let player1;
    let player2;
    let currentPlayer;
    let gameOver = false;

    const startGame = (name1, name2) => {
        player1 = Player(name1 || "Player 1", "X");
        player2 = Player(name2 || "Player 2", "O");
        currentPlayer = player1;
        gameOver = false;
        Gameboard.reset();
        DisplayController.render();
        DisplayController.setMessage(`${currentPlayer.name}'s turn (${currentPlayer.marker})`);
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const playRound = (index) => {
        if (gameOver) return;

        if (Gameboard.setMark(index, currentPlayer.marker)) {
            DisplayController.render();

            if (checkWinner(currentPlayer.marker)) {
                gameOver = true;
                DisplayController.setMessage(`${currentPlayer.name} Wins! 🎉`);
                return;
            }

            if (isTie()) {
                gameOver = true;
                DisplayController.setMessage("It's a Tie! 😐");
                return;
            }

            switchPlayer();
            DisplayController.setMessage(`${currentPlayer.name}'s turn (${currentPlayer.marker})`);
        }
    };

    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    const checkWinner = (marker) => {
        return winningCombos.some(combo =>
            combo.every(index => Gameboard.getBoard()[index] === marker)
        );
    };

    const isTie = () => {
        return Gameboard.getBoard().every(cell => cell !== "");
    };

    return { startGame, playRound };
})();

// Display Controller Module (IIFE)
const DisplayController = (() => {
    const boardDiv = document.getElementById("gameboard");
    const msgDiv = document.getElementById("message");

    const render = () => {
        boardDiv.innerHTML = "";
        Gameboard.getBoard().forEach((mark, index) => {
            const square = document.createElement("div");
            square.classList.add("square");
            square.textContent = mark;
            square.addEventListener("click", () => GameController.playRound(index));
            boardDiv.appendChild(square);
        });
    };

    const setMessage = (msg) => {
        msgDiv.textContent = msg;
    };

    return { render, setMessage };
})();

// Event Listeners
document.getElementById("startBtn").addEventListener("click", () => {
    const p1 = document.getElementById("p1").value;
    const p2 = document.getElementById("p2").value;
    GameController.startGame(p1, p2);
});

document.getElementById("restartBtn").addEventListener("click", () => {
    GameController.startGame("Player 1", "Player 2");
});
const soundX = document.getElementById("soundX");
const soundO = document.getElementById("soundO");
const soundWin = document.getElementById("soundWin");

function playSound(player) {
    if (player === "X") soundX.play();
    if (player === "O") soundO.play();
}

/* Call this inside your click handler */
function handleMove(cell, player) {
    playSound(player);
}

/* 🎉 Win Popup */
function showWinPopup(player) {
    document.getElementById("popupEmoji").innerText =
        player === "X" ? "🌸✨(≧▽≦)/✨🌸" : "💖🌈(❁´◡`❁)🌈💖";

    document.getElementById("popupText").innerText =
        player + " wins! Yayyy~ 🎀";

    document.getElementById("winPopup").classList.remove("hidden");

    soundWin.play();
}

/* Close popup */
function closePopup() {
    document.getElementById("winPopup").classList.add("hidden");
}
const playRound = (index) => {
    if (gameOver) return;

    if (Gameboard.setMark(index, currentPlayer.marker)) {
        // Play sound for X/O
        playSound(currentPlayer.marker);

        DisplayController.render();

        if (checkWinner(currentPlayer.marker)) {
            gameOver = true;

            DisplayController.setMessage(`${currentPlayer.name} Wins! 🎉`);

            // 🌸✨ Kawaii Win Popup — ADD HERE
            showWinPopup(currentPlayer.marker);

            return;
        }

        if (isTie()) {
            gameOver = true;
            DisplayController.setMessage("It's a Tie! 😐");
            return;
        }

        switchPlayer();
        DisplayController.setMessage(`${currentPlayer.name}'s turn (${currentPlayer.marker})`);
    }
};