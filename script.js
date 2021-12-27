const editPlayer1Button = document.getElementById('edit-player1-button');
const editPlayer2Button = document.getElementById('edit-player2-button');
const cancelButton = document.getElementById('cancel');

const overlay = document.getElementById('overlay');
const backdrop = document.getElementById('backdrop');

let editedPlayer = 0;

// --------------------open-overlay--------------------
function openOverlay(event) {
    editedPlayer = + event.target.dataset.playerid; // + converts string to number  +'1' => 1


    overlay.style.display = "block";
    backdrop.style.display = "block"


}

// --------------------close-overlay--------------------
function cancelOverlay() {
    overlay.style.display = "none";
    backdrop.style.display = "none";
    formInputField.classList.remove('error');
    errorsOutput.textContent = '';
    formElement.firstChild.value = '';

}

editPlayer1Button.addEventListener('click', openOverlay);
editPlayer2Button.addEventListener('click', openOverlay);

cancelButton.addEventListener('click', cancelOverlay);


// selecting form

const formElement = document.querySelector('form');
const errorsOutput = document.getElementById('config-errors');
const formInputField = document.getElementById('form-input-field');
// -----------------
let activePlayer = 0;
const players = [
    {
        name: '',
        symbol: 'X'
    },
    {
        name: '',
        symbol: 'O'
    },
];
// --------------------
function submitForm(event) {
    console.log(event.target)
    event.preventDefault();
    const formData = new FormData(event.target);
    const enteredPlayerName = formData.get('username').trim();  // '   almas ' => 'almas'


    if (enteredPlayerName === '')  // (!enteredplayername)=> false
    {
        formInputField.classList.add('error');
        errorsOutput.textContent = "Please enter a valid name!";

        //return also has another function. When you execute return you    stop the execution of the functionin which you call it.So lines there after which we will see when add,will not be executed if return was executed.

        return;
    }
    const updatedPlayerDataElement = document.getElementById('player' + editedPlayer);

    updatedPlayerDataElement.children[1].textContent = enteredPlayerName;     //h3 element

    // -----------------storing the player name--------------
    // if(editedPlayer ===1) {
    //     player[1].name = enteredPlayerName;

    // }

    // else{
    //     players[2].name = enteredPlayerName
    // }

    players[editedPlayer - 1].name = enteredPlayerName;

    cancelOverlay();
}

formElement.addEventListener('submit', submitForm);


// -------------active-game--------------

const staetNewGameButton = document.getElementById('start-game-btn');
const gameArea = document.getElementById('active-game');

function startNewGame() {
    if (players[0].name === '' || players[1].name === '') {
        alert("Please set player name for both the players");
        return;
    }

    resetGame();
    
    try1.firstElementChild.firstElementChild.textContent=players[activePlayer].name;
    gameArea.style.display = 'block';
}
staetNewGameButton.addEventListener('click', startNewGame);

// ---------------------------------------------

const try1 = document.getElementById('try1');

const gameFieldElements = document.getElementById('game-board');

const currentPlayerName = document.getElementById('#active-player-name');

function switchPlayer() {
    if (activePlayer === 0) {
        activePlayer = 1;
    }

    else {
        activePlayer = 0;
    }
    console.log( try1.firstElementChild.firstElementChild);
    

    try1.firstElementChild.firstElementChild.textContent=players[activePlayer].name;
}

// ---------------gamedata------------
let currentRound = 1;

const gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];
// -------------------------------------
function selectGameField(event) {
    const selectedField = event.target;

    const selectedColumn = selectedField.dataset.col - 1; //since col value start at 1 thats why we detuct one and the col value in html is string but when we perform mathematical operation the string automatically converted to string
    const selectedrow = selectedField.dataset.row - 1;

    // if someone click on field which is already click by other player
    if (gameData[selectedrow][selectedColumn] > 0) {
        alert('please select an empty field');
        return;
    }

    event.target.textContent = players[activePlayer].symbol; //players[0]
    event.target.classList.add('disabled');


    gameData[selectedrow][selectedColumn] = activePlayer + 1;


    const winnerid = checkForGameOver();
    

    if(winnerid !== 0) {
        endGame(winnerid);
    }

    currentRound++;
    // console.log(currentRound);
    switchPlayer();
}


    gameFieldElements.addEventListener('click', selectGameField);



//---------------deciding winner-----------------

function checkForGameOver() {

    //checking the rows for equality


    // if(gameData[0][0] > 0 && 
    //    gameData[0][0]=== gameData[0][1] && 
    //    gameData[0][1] === gameData[0][2])
    // {
    //     return gameData[0][0];  // return player id
    // }

    // if(gameData[1][0] > 0 && 
    //    gameData[1][0]=== gameData[0][1] && 
    //    gameData[1][1] === gameData[0][2])
    //  {
    //      return gameData[1][0]; 
    //  }

    //  if(gameData[2][0] > 0 && 
    //     gameData[2][0]=== gameData[0][1] && 
    //     gameData[2][1] === gameData[0][2])
    //  {
    //      return gameData[2][0]; 
    //  }

    for (i = 0; i < 3; i++) {
        if (gameData[i][0] > 0 &&
            gameData[i][0] === gameData[i][1] &&
            gameData[i][1] === gameData[i][2]) {
            return gameData[i][0];  // return player id
        }
    }

    //checking the columns for equality
    for (i = 0; i < 3; i++) {
        if (gameData[0][i] > 0 &&
            gameData[0][i] === gameData[1][i] &&
            gameData[1][i] === gameData[2][i]) {
            return gameData[0][i];  // return player id
        }
    }

    //checking diagonaly (top left to bottom right)
    if (gameData[0][0] > 0 &&
        gameData[0][0] === gameData[1][1] &&
        gameData[1][1] === gameData[2][2]) {
        return gameData[0][0];  // return player id
    }


    //checking diagonaly (bottom left to top right)
    if (gameData[2][0] > 0 &&
        gameData[2][0] === gameData[1][1] &&
        gameData[1][1] === gameData[0][2]) {
        return gameData[2][0];  // return player id
    }

    if (currentRound === 9) {
        return -1;
    }

    return 0;
}

// ------------game-over----------

const gameOver = document.getElementById('game-over');
function endGame(winnerId){
    gameOver.style.display = 'block';

    if(winnerId > 0) //always greater than 0 cauz for draw its -1
    {
        
        const winnerName = players[winnerId - 1].name
        // const winner = document.getElementById('winner-name');
        // winner.textContent = winnerName;
        
        gameOver.firstElementChild.firstElementChild.textContent= winnerName;
    }

    else //for draw 
    {
        gameOver.firstElementChild.textContent = 'It\'s a draw'  //acess h2 element
    }
}


// restart game----------------------

function resetGame(){
    activePlayer = 0;
    currentRound = 1;
    gameOver.firstElementChild.innerHTML = 'You Won, <span id="winner-name">Player Name</span>!';
    gameOver.style.display='none';

    let gameFieldIndex = 0;
    for(let i = 0; i<3; i++){
        for(let j = 0; j<3; j++){
            gameData[i][j]=0;

            gameFieldElements.children[gameFieldIndex].textContent='';
            gameFieldElements.classList.remove('disabled');
            gameFieldIndex++;
        }
    }
}