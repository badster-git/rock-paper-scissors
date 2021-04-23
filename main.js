// Get DOM nodes
const images = Array.from(document.querySelectorAll('.card-image')),
      message = document.querySelector('.message'),
      d_playerScore =  document.querySelector('.player-score'),
      d_computerScore = document.querySelector('.computer-score'),
      d_rndNumber = document.querySelector('.rnd-number');

let playerScore = 0,
    computerScore = 0,
    rndNumber = 1;

images.forEach((image) => {
    image.addEventListener('click', () => {
        if (playerScore >= 5 || computerScore >= 5) { resetGame(); }
        else { 
            const results = startGame(image.dataset.image);
            setResults(results);
        }
    })
});

function playRound(playerSelection, computerSelection) {
    let possibilities = {
        'rock': 'scissors',
        'paper': 'rock',
        'scissors': 'paper'
    };

    if (computerSelection.toLowerCase() === possibilities[playerSelection.toLowerCase()]) {
        return `You Won! ${capitalize(playerSelection)} beats ${capitalize(computerSelection)}`;
    } else if (playerSelection.toLowerCase() === possibilities[computerSelection.toLowerCase()]) {
        return `You Lose! ${capitalize(computerSelection)} beats ${capitalize(playerSelection)}`;
    } else {
        return `Draw! Both chose ${capitalize(playerSelection)}`;
    }
}

function setResults(result) {
    if (result.slice(4,5) === 'W') playerScore++;
    else if (result.slice(4,5) === 'L') computerScore++;
    rndNumber++;

    d_playerScore.textContent = playerScore;
    d_computerScore.textContent = computerScore;
    d_rndNumber.textContent = rndNumber;
    message.textContent = result;

    if (playerScore >= 5 && computerScore < 5) { message.textContent = 'Game Over. You Won!'; }
    else if (playerScore < 5 && computerScore >= 5) { message.textContent = 'Game Over. You Lost!'; }
}

function getComputerMove() {
    const moves = ['Rock', 'Paper', 'Scissors'];
    let rand_num = Math.floor(Math.random() * (3));
    return moves[rand_num];
}

function updateImages(playerSelection, computerSelection) {
    const playerId = document.getElementById("player-result"),
          computerId = document.getElementById("computer-result");

    playerId.src = `images/${playerSelection.toLowerCase()}-hand.png`;
    computerId.src = `images/${computerSelection.toLowerCase()}-hand-2.png`;
    playerId.alt = `${capitalize(playerSelection)}`;
    computerId.alt = `${capitalize(computerSelection)}`;
    playerId.style.opacity = "1";
    computerId.style.opacity = "1";
}

function startGame(playerChoice) {
    let playerMove = capitalize(playerChoice),
        computerMove = getComputerMove();
       
    updateImages(playerMove, computerMove);
    return playRound(playerMove, computerMove);
}

function resetGame() {
    const playerId = document.getElementById("player-result"),
          computerId = document.getElementById("computer-result");
    playerScore = 0,
    computerScore = 0,
    rndNumber = 1;
    d_playerScore.textContent = playerScore;
    d_computerScore.textContent = computerScore;
    d_rndNumber.textContent = rndNumber;
    message.textContent = '';
    playerId.removeAttribute('alt');
    playerId.removeAttribute('style');
    playerId.removeAttribute('src');
    computerId.removeAttribute('alt');
    computerId.removeAttribute('style');
    computerId.removeAttribute('src');
}

// Helper Functions
const capitalize = (str) => {
    return str.toLowerCase().slice(0,1).toUpperCase().concat(str.slice(1));
}