let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

const leftScreenButton = document.querySelector('#lbttn');
const upScreenButton = document.querySelector('#ubttn');
const rightScreenButton = document.querySelector('#rbttn');
const downScreenButton = document.querySelector('#dbttn');

const main = document.querySelector('main');
let playerSpeed = 1 // Change players speed
let enemySpeed = 0.5; // Change enemies speed


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

    /* let maze = [
        ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
        ['*', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '*'],
        ['*', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '*'],
        ['*', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '*'],
        ['*', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '*'],
        ['*', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '*'],
        ['*', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '*'],
        ['*', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '*'],
        ['*', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '*'],
        ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*']
    ]; */




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
    if (event.key === 'ArrowUp' || event.key === 'w') {
        upPressed = false;
    } else if (event.key === 'ArrowDown' || event.key === 's') {
        downPressed = false;
    } else if (event.key === 'ArrowLeft' || event.key === 'a') {
        leftPressed = false;
    } else if (event.key === 'ArrowRight' || event.key === 'd') {
        rightPressed = false;
    }
}

function keyDown(event) {
    if (event.key === 'ArrowUp' || event.key === 'w') {
        releaseMovement();
        upPressed = true;
    } else if (event.key === 'ArrowDown' || event.key === 's') {
        releaseMovement();
        downPressed = true;
    } else if (event.key === 'ArrowLeft' || event.key === 'a') {
        releaseMovement();
        leftPressed = true;
    } else if (event.key === 'ArrowRight' || event.key === 'd') {
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

let score = document.querySelector('.score').firstElementChild.nextElementSibling;
score.innerHTML = 0;

let level = document.querySelector('.level').firstElementChild.nextElementSibling;
level.innerHTML = 1;

let player = document.querySelector('#player');
let playerTop = 0;
let playerLeft = 0;

let playerPosition = player.getBoundingClientRect();

let movementInterval;


let enemies = document.querySelectorAll('.enemy');

let isColliding = false;

let characters = [];
characters[0] = player;
for (const enemy of enemies) {
    characters.push(enemy);
}

function getCharacters() {
    player = document.querySelector('#player');
    enemies = document.querySelectorAll('.enemy');
    characters = [];
    characters[0] = player;
    for (const enemy of enemies) {
        characters.push(enemy);
    }
}

function getSemiRandomDirection(direction) {
    let oldDirection = direction;
    movementDirection = Math.floor(Math.random() * 4);
    if (movementDirection == oldDirection) {
        return getSemiRandomDirection(oldDirection);
    }
    else {
        return movementDirection;
    }
}

function animateCharacters(character) {


    let speed = enemySpeed;

    let characterPosition = character.getBoundingClientRect();

    let characterTop = 0;
    let characterLeft = 0;
    let movementDirection = Math.floor(Math.random() * 4);

    let iAmUser = false;

    if (character.id == 'player') {
        listenForUserInputs();
        iAmUser = true;
        speed = playerSpeed;
    };

    function animate() {
        characterPosition = character.getBoundingClientRect();

        if ((iAmUser && rightPressed) || (!iAmUser && movementDirection == 0)) {
            let newRight = characterPosition.right + 1;
            let rt = document.elementFromPoint(newRight, characterPosition.top);
            let rb = document.elementFromPoint(newRight, characterPosition.bottom);

            if ((!iAmUser && rt && rt.id == 'player') || (!iAmUser && rb && rb.id == 'player') || (iAmUser && rt && rt.classList.contains('enemy')) || (iAmUser && rb && rb.classList.contains('enemy'))) {
                playerCollidesWithEnemy();
                movementDirection = getSemiRandomDirection(movementDirection);
            }

            else if (!iAmUser && rt && rt.classList.contains('enemy') || (!iAmUser && rb && rb.classList.contains('enemy'))) {
                movementDirection = getSemiRandomDirection(movementDirection);
            }

            else if ((rt && !rt.classList.contains('wall')) && (rb && !rb.classList.contains('wall'))) {
                characterLeft += speed;
                character.style.left = characterLeft + 'px';
                if (iAmUser) {
                    character.classList = 'right';
                }
            }
            else {
                movementDirection = Math.floor(Math.random() * 4);
            }
        }
        else if ((iAmUser && leftPressed) || (!iAmUser && movementDirection == 1)) {
            let newLeft = characterPosition.left - 1;
            let lt = document.elementFromPoint(newLeft, characterPosition.top);
            let lb = document.elementFromPoint(newLeft, characterPosition.bottom);

            if ((!iAmUser && lt && lt.id == 'player') || (!iAmUser && lb && lb.id == 'player') || (iAmUser && lt && lt.classList.contains('enemy')) || (iAmUser && lb && lb.classList.contains('enemy'))) {
                playerCollidesWithEnemy();
                movementDirection = getSemiRandomDirection(movementDirection);
            }

            else if (!iAmUser && lt && lt.classList.contains('enemy') || (!iAmUser && lb && lb.classList.contains('enemy'))) {
                movementDirection = getSemiRandomDirection(movementDirection);
            }

            else if ((lt && !lt.classList.contains('wall')) && (lb && !lb.classList.contains('wall'))) {
                characterLeft -= speed;
                character.style.left = characterLeft + 'px';
                if (iAmUser) {
                    character.classList = 'left';
                }
            }
            else {
                movementDirection = Math.floor(Math.random() * 4);
            }
        }
        else if ((iAmUser && upPressed) || (!iAmUser && movementDirection == 2)) {
            let newTop = characterPosition.top - 1;
            let tl = document.elementFromPoint(characterPosition.left, newTop);
            let tr = document.elementFromPoint(characterPosition.right, newTop);

            if ((!iAmUser && tl && tl.id == 'player') || (!iAmUser && tr && tr.id == 'player') || (iAmUser && tl && tl.classList.contains('enemy')) || (iAmUser && tr && tr.classList.contains('enemy'))) {
                playerCollidesWithEnemy();
                movementDirection = getSemiRandomDirection(movementDirection);
            }

            else if (!iAmUser && tl && tl.classList.contains('enemy') || (!iAmUser && tr && tr.classList.contains('enemy'))) {
                movementDirection = getSemiRandomDirection(movementDirection);
            }

            else if ((tl && !tl.classList.contains('wall')) && (tr && !tr.classList.contains('wall'))) {
                characterTop -= speed;
                character.style.top = characterTop + 'px';
                if (iAmUser) {
                    character.classList = 'up';
                }
            }
            else {
                movementDirection = Math.floor(Math.random() * 4);
            }
        }
        else if ((iAmUser && downPressed) || (!iAmUser && movementDirection == 3)) {
            let newBottom = characterPosition.bottom + 1;
            let bl = document.elementFromPoint(characterPosition.left, newBottom);
            let br = document.elementFromPoint(characterPosition.right, newBottom);

            if ((!iAmUser && bl && bl.id == 'player') || (!iAmUser && br && br.id == 'player') || (iAmUser && bl && bl.classList.contains('enemy')) || (iAmUser && br && br.classList.contains('enemy'))) {
                playerCollidesWithEnemy();
                movementDirection = getSemiRandomDirection(movementDirection);
            }

            else if (!iAmUser && bl && bl.classList.contains('enemy') || (!iAmUser && br && br.classList.contains('enemy'))) {
                movementDirection = getSemiRandomDirection(movementDirection);
            }

            else if ((bl && !bl.classList.contains('wall')) && (br && !br.classList.contains('wall'))) {
                characterTop += speed;
                character.style.top = characterTop + 'px';
                if (iAmUser) {
                    character.classList = 'down';
                }
            }
            else {
                movementDirection = Math.floor(Math.random() * 4);
            }
        
        
        }

        if (iAmUser) {
            let points = document.querySelectorAll('.point');
            for (const point of points) {
                let pointPosition = point.getBoundingClientRect();
                if (characterPosition.left < pointPosition.right &&
                    characterPosition.right > pointPosition.left &&
                    characterPosition.top < pointPosition.bottom &&
                    characterPosition.bottom > pointPosition.top) {
                    point.classList.remove('point');
                    score.innerHTML = parseInt(score.innerHTML) + 1;
                }
            }

            if (points.length == 0) {
                nextLevel();
                return;
            }
        }


        movementInterval = requestAnimationFrame(animate);
        character.animationId = movementInterval;

    
    }
    animate();
}


const livesDisplay = document.querySelector('.lives').firstElementChild.nextElementSibling;
let lives = 3;
addLives();

function addLives() {
    for (let i = 0; i < lives; i++) {
        let liveToBeAdded = document.createElement('li');
        livesDisplay.appendChild(liveToBeAdded);
    }
}

function removeLive() {
    let liveToBeRemoved = livesDisplay.firstElementChild;
    if (liveToBeRemoved) {
        livesDisplay.removeChild(liveToBeRemoved);
    }
}

function playerCollidesWithEnemy() {
    
    releaseMovement();
    stopListeningForUserInputs();
    

    if (lives > 1) {
        lives -= 1;
        removeLive();
        player.classList = 'hit';
        setTimeout(listenForUserInputs, 1500);
        return;
    }

    else {
        removeLive();
        player.classList = 'dead';
        setTimeout(endGame, 1500);
    }

    return;
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

function nextLevel() {
    releaseMovement();
    stopListeningForUserInputs();
    for (const character of characters) {
        cancelAnimationFrame(character.animationId);
    }
    start.style.display = 'flex';
    document.querySelector('.start').firstElementChild.nextElementSibling.innerHTML = 'Next Level!';
    level.innerHTML++;
    main.innerHTML = '';
    mazeGenerator();
    getCharacters();
    setTimeout(startGame, 2000);
}

function resetGame() {
    main.innerHTML = '';
    mazeGenerator();
    getCharacters();
    level.innerHTML = 1;
    score.innerHTML = 0;
    lives = 3;
    addLives();
    startGame();
}

function endGame() {
    releaseMovement();
    stopListeningForUserInputs();
    start.style.display = 'flex';
    document.querySelector('.start').firstElementChild.nextElementSibling.innerHTML = 'Restart Game?';
    start.addEventListener('click', resetGame);
    for (const character of characters) {
        cancelAnimationFrame(character.animationId);
    }
}

function startGame() {
    start.removeEventListener('click', startGame);
    start.style.display = 'none';
   for (const character of characters) {
        animateCharacters(character);
    }
}

start.addEventListener('click', startGame);
