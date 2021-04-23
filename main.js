// Get DOM nodes
const images = Array.from(document.querySelectorAll('.card-image')),
      message = document.querySelector('.message'),
      d_playerScore =  document.querySelector('.player-score'),
      d_computerScore = document.querySelector('.computer-score'),
      d_rndNumber = document.querySelector('.rnd-number');

images.forEach((image) => {
    image.addEventListener('click', () => {
        if (playerScore >= 5 || computerScore >= 5) { resetGame(); }
        else { startGame(image.dataset.image); }
    })
});

let playerScore = 0,
    computerScore = 0,
    rndNumber = 1,
    tl = anime.timeline({
        loop: false,
        autoplay: false
    }).add({
        targets: '.game-anim .line',
        opacity: [0.5,1],
        scaleX: [0, 1],
        easing: "easeInOutExpo",
        duration: 700
      }).add({
        targets: '.game-anim .line',
        duration: 600,
        easing: "easeOutExpo",
        translateY: (el, i) => (-0.625 + 0.625*2*i) + "em"
      });

function getComputerMove() {
    const moves = ['Rock', 'Paper', 'Scissors'];
    let rand_num = Math.floor(Math.random() * (3));
    return moves[rand_num];
}

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

function getResults(result) {
    if (result.slice(4,5) === 'W') playerScore++;
    else if (result.slice(4,5) === 'L') computerScore++;
    rndNumber++;
}

function setResults() {
    d_playerScore.textContent = playerScore;
    d_computerScore.textContent = computerScore;
    d_rndNumber.textContent = rndNumber;
    message.textContent = rndResult;
}

function startGame(playerChoice) {
    let playerMove = capitalize(playerChoice),
        computerMove = getComputerMove(),
        rndResult = playRound(playerMove, computerMove);
    
    animateGameStart();


    if (playerScore >= 5 && computerScore < 5) { message.textContent = 'Game Over. You Won!'; }
    else if (playerScore < 5 && computerScore >= 5) { message.textContent = 'Game Over. You Lost!'; }

}

function resetGame() {
    playerScore = 0,
    computerScore = 0,
    rndNumber = 1;
    animateGameReset();
    d_playerScore.textContent = playerScore;
    d_computerScore.textContent = computerScore;
    d_rndNumber.textContent = rndNumber;
    message.textContent = '';
}

function animateGameStart() {
    console.log("animation started");
    tl.play();
}

const capitalize = (str) => {
    return str.toLowerCase().slice(0,1).toUpperCase().concat(str.slice(1));
}
//console.log(Game());