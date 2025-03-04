// Select all cells with the class 'cell'
const cells = document.querySelectorAll(".cell"); 
// Select the status text element by its ID
const statusText = document.querySelector("#statusText"); 
// Select the restart button by its ID
const restartBtn = document.querySelector("#restartBtn"); 
// Winning combinations in Tic Tac Toe game
const winConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Left diagonal
    [2, 4, 6]  // Right diagonal
];
// Array to store the current state of each cell
let options = ["", "", "", "", "", "", "", "", ""];
// Variable to keep track of current player
let currentPlayer = "X"; 
// Variable to check if the game is running
let running = false; 

// Start the game
initializeGame();

function initializeGame(){
    // Add click event to each cell
    cells.forEach(cell => cell.addEventListener("click", cellClicked)); 
    // Add click event to restart button
    restartBtn.addEventListener("click", restartGame); 
    // Display current player's turn
    statusText.textContent = `${currentPlayer}'s turn`; 
    // Set game to running
    running = true; 
}

function cellClicked(){
    // Get the index of the clicked cell
    const cellIndex = this.getAttribute("cellIndex"); 
    // If cell already filled or game not running, do nothing
    if(options[cellIndex] != "" || !running){ 
        return; 
    }
    // Update cell content and check for winner
    updateCell(this, cellIndex); 
    checkWinner(); 
}

function updateCell(cell, index){
    // Store the player's move in the options array
    options[index] = currentPlayer; 
    // Display player's symbol in the cell
    cell.textContent = currentPlayer; 
}

function changePlayer(){
    // Switch player from X to O or O to X
    currentPlayer = (currentPlayer == "X") ? "O" : "X"; 
    // Update status text to show next player's turn
    statusText.textContent = `${currentPlayer}'s turn`; 
}

function checkWinner(){
    let roundWon = false; // Flag to indicate if the round is won

    // Loop through each winning combination
    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i]; // Get current winning combination
        const cellA = options[condition[0]]; // First cell in combination
        const cellB = options[condition[1]]; // Second cell in combination
        const cellC = options[condition[2]]; // Third cell in combination

        // If any cell is empty, skip to next combination
        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        // If all three cells have the same value, player wins
        if(cellA == cellB && cellB == cellC){ 
            roundWon = true; 
            break; 
        }
    }

    if(roundWon){
        // Display winner message
        statusText.textContent = `${currentPlayer} wins!`; 
        // Stop the game
        running = false; 
    }
    else if(!options.includes("")){ // If no empty cells left, game is draw
        statusText.textContent = `Draw!`; 
        running = false; 
    }
    else{
        // If no winner, switch player
        changePlayer(); 
    }
}

function restartGame(){
    // Reset player to X
    currentPlayer = "X"; 
    // Clear the options array
    options = ["", "", "", "", "", "", "", "", ""];
    // Reset status text
    statusText.textContent = `${currentPlayer}'s turn`; 
    // Clear all cells
    cells.forEach(cell => cell.textContent = ""); 
    // Set game to running again
    running = true; 
}
