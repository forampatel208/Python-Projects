let modeBtn = document.querySelector("#mode");
let body = document.querySelector("body");
let currMode = "light";

let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// Toggle between light and dark modes
modeBtn.addEventListener("click", () => {
    if (currMode === "light") {
        currMode = "dark";
        body.classList.add("dark");
        body.classList.remove("light");
        modeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    } else {
        currMode = "light";
        body.classList.add("light");
        body.classList.remove("dark");
        modeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
});

let turnO = true; // Player O or Player X
let count = 0; // To count moves (for detecting a draw)

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Function to reset the game
const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    updateTurnMessage();  // Reset the message to indicate Player O's turn
};

// Function to update the turn message
const updateTurnMessage = () => {
    const turnMessage = turnO ? "Player O's turn" : "Player X's turn";
    document.getElementById("turn-msg").innerText = turnMessage;
};

// Initialize the game
updateTurnMessage();  // Show message when the game starts

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            if (turnO) {
                // Set 'O' with a specific color
                box.innerText = "O";
                box.style.color = "#ff5733";  // Color for 'O'
                turnO = false;
            } else {
                // Set 'X' with a different color
                box.innerText = "X";
                box.style.color = "#33c1ff";  // Color for 'X'
                turnO = true;
            }
            box.disabled = true;
            count++;

            let isWinner = checkWinner();

            if (count === 9 && !isWinner) {
                gameDraw();
            } else if (!isWinner) {
                updateTurnMessage();  // Update turn message only if no one has won
            }
        }
    });
});

// Function to handle a draw
const gameDraw = () => {
    msg.innerText = "It's a draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Function to disable all boxes after a game ends
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Function to enable all boxes for a new game
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";  // Clear the boxes for the next game
    }
};

// Function to show the winner
const showWinner = (winner) => {
    msg.innerHTML = `<strong>🎉 Congratulations, ${winner} wins! 🎉</strong>`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Function to check if there's a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;  // No winner yet
};

// Add event listeners for New Game and Reset buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
