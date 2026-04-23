let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

const leftScreenButton = document.querySelector('#lbttn');
const upScreenButton = document.querySelector('#ubttn');
const rightScreenButton = document.querySelector('#rbttn');
const downScreenButton = document.querySelector('#dbttn');

const main = document.querySelector('main');
let speed = 1 // Change players speed

function mazeGenerator() {
    // Player = 'P', Wall = '*', Enemy = 'E', Point = ' '
    let maze = [
        ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
        ['*', 'P', ' ', '*', ' ', ' ', ' ', ' ', 'E', '*'],
        ['*', ' ', ' ', ' ', ' ', ' ', ' ', '*', '*', '*'],
        ['*', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '*'],
        ['*', ' ', '*', '*', ' ', ' ', ' ', ' ', ' ', '*'],
        ['*', ' ', ' ', ' ', ' ', ' ', ' ', '*', '*', '*'],
        ['*', ' ', ' ', '*', ' ', 'E', ' ', ' ', ' ', '*'],
        ['*', ' ', ' ', ' ', ' ', ' ', ' ', '*', ' ', '*'],
        ['*', 'E', '*', ' ', ' ', ' ', ' ', ' ', ' ', '*'],
        ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*']
    ];

    // Populates the maze
    maze.forEach((y) => {
        y.forEach((x) => {
            let block = document.createElement('div')
            block.classList = 'block'

            switch (x) {
                case '*':
                    block.classList.add('wall')
                    break;
                case 'P':
                    block.id = 'player';
                    break;
                case 'E':
                    block.classList.add('enemy');
                    break
                default:
                    block.classList.add('point')
            }

            main.appendChild(block)
        })
    })

}

mazeGenerator();

// Player movement
function keyUp(event) {
    if (event.key === 'ArrowUp') {
        upPressed = false;
    } else if (event.key === 'ArrowDown') {
        downPressed = false;
    } else if (event.key === 'ArrowLeft') {
        leftPressed = false;
    } else if (event.key === 'ArrowRight') {
        rightPressed = false;
    }
}

function keyDown(event) {
    if (event.key === 'ArrowUp') {
        releaseMovement();
        upPressed = true;
    } else if (event.key === 'ArrowDown') {
        releaseMovement();
        downPressed = true;
    } else if (event.key === 'ArrowLeft') {
        releaseMovement();
        leftPressed = true;
    } else if (event.key === 'ArrowRight') {
        releaseMovement();
        rightPressed = true;
    }
}

function leftScreenButtonClicked() {
    leftPressed = true;
    upPressed = false;
    downPressed = false;
    rightPressed = false;
}

function upScreenButtonClicked() {
    upPressed = true;
    downPressed = false;
    leftPressed = false;
    rightPressed = false;
}

function rightScreenButtonClicked() {
    rightPressed = true;
    upPressed = false;
    downPressed = false;
    leftPressed = false;
}

function downScreenButtonClicked() {
    downPressed = true;
    upPressed = false;
    leftPressed = false;
    rightPressed = false;
}

function releaseMovement() {
    upPressed = false;
    downPressed = false;
    leftPressed = false;
    rightPressed = false;
}

let score = document.querySelector('#score');
score.innerHTML = 0;
let startText = document.querySelector('#startText');

let player = document.querySelector('#player');
let playerTop = 0;
let playerLeft = 0;

let playerPosition = player.getBoundingClientRect();

let movementInterval;


let lives;

function playerCollidesWithEnemy() {
    releaseMovement();
    stopListeningForUserInputs();
    cancelAnimationFrame(movementInterval);

    if (lives > 1) {
        lives -= 1;
        player.classList = 'hit';
        setTimeout(move, 1500);
    }
    
    else {
        player.classList = 'dead';
        setTimeout(endGame, 1500);
    }
}

function move() {
    listenForUserInputs();
    playerPosition = player.getBoundingClientRect();

    if (downPressed == true) {
        let newBottom = playerPosition.bottom + 1;

        let bl = document.elementFromPoint(playerPosition.left, newBottom);
        let br = document.elementFromPoint(playerPosition.right, newBottom);

        if (bl.classList.contains('enemy') == true || br.classList.contains('enemy') == true) {
            playerCollidesWithEnemy();
            return;
        }

        else if (bl.classList.contains('wall') == false && br.classList.contains('wall') == false) {
            playerTop += speed;
            player.style.top = playerTop + 'px';
            player.classList = 'down';
        }

        
    }
    else if (upPressed == true) {
        let newTop = playerPosition.top - 1;

        let tl = document.elementFromPoint(playerPosition.left, newTop);
        let tr = document.elementFromPoint(playerPosition.right, newTop);

        if (tl.classList.contains('enemy') == true || tr.classList.contains('enemy') == true) {
            playerCollidesWithEnemy();
            return;
        }

        else if (tl.classList.contains('wall') == false && tr.classList.contains('wall') == false) {
            playerTop -= speed;
            player.style.top = playerTop + 'px';
            player.classList = 'up';
        }

    }
    else if (leftPressed == true) {
        let newLeft = playerPosition.left - 1;

        let lt = document.elementFromPoint(newLeft, playerPosition.top);
        let lb = document.elementFromPoint(newLeft, playerPosition.bottom);

        if (lt.classList.contains('enemy') == true || lb.classList.contains('enemy') == true) {
            playerCollidesWithEnemy();
            return;
        }

        else if (lt.classList.contains('wall') == false && lb.classList.contains('wall') == false) {
            playerLeft -= speed;
            player.style.left = playerLeft + 'px';
            player.classList = 'left';
        }

    }
    else if (rightPressed == true) {
        let newRight = playerPosition.right + 1;

        let rt = document.elementFromPoint(newRight, playerPosition.top);
        let rb = document.elementFromPoint(newRight, playerPosition.bottom);

        if (rt.classList.contains('enemy') == true || rb.classList.contains('enemy') == true) {
            playerCollidesWithEnemy();
            return;
        }

        else if (rt.classList.contains('wall') == false && rb.classList.contains('wall') == false) {
            playerLeft += speed;
            player.style.left = playerLeft + 'px';
            player.classList = 'right';
        }


    }

    let points = document.querySelectorAll('.point');
    for (const point of points) {
        pointPosition = point.getBoundingClientRect();

        if (playerPosition.left < pointPosition.right &&
            playerPosition.right > pointPosition.left &&
            playerPosition.top < pointPosition.bottom &&
            playerPosition.bottom > pointPosition.top) {
            point.classList.remove('point');
            score.innerHTML = parseInt(score.innerHTML) + 1;
        }


    }

    if (points.length == 0) {
        endGame();
        return;
    }

    movementInterval = requestAnimationFrame(move);
}



function listenForUserInputs() {
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
    leftScreenButton.addEventListener('click', leftScreenButtonClicked);
    upScreenButton.addEventListener('click', upScreenButtonClicked);
    rightScreenButton.addEventListener('click', rightScreenButtonClicked);
    downScreenButton.addEventListener('click', downScreenButtonClicked);
}

function stopListeningForUserInputs() {
    document.removeEventListener('keydown', keyDown);
    document.removeEventListener('keyup', keyUp);
    leftScreenButton.removeEventListener('click', leftScreenButtonClicked);
    upScreenButton.removeEventListener('click', upScreenButtonClicked);
    rightScreenButton.removeEventListener('click', rightScreenButtonClicked);
    downScreenButton.removeEventListener('click', downScreenButtonClicked);
}

const start = document.querySelector('.start');

function resetGame() {
    main.innerHTML = '';
    mazeGenerator();
    player = document.querySelector('#player');
    score.innerHTML = 0;
    playerTop = 0;
    playerLeft = 0;
    startGame();
}

function endGame() {
    releaseMovement();
    stopListeningForUserInputs();
    start.style.display = 'flex';
    startText.innerHTML = 'Reset?';
    start.addEventListener('click', resetGame);
    cancelAnimationFrame(movementInterval);
}

function startGame() {
    start.removeEventListener('click', startGame);
    start.style.display = 'none'
    lives = 3;
    move();
}

start.addEventListener('click', startGame);
