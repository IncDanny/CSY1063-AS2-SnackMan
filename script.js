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
let enemySpeed = 0.3; // Change enemies speed
let numberOfEnemies = 1; // Change number of enemies
let probabilityOfMoreEnemies = 2; // Change the probability of more enemies appearing
let probabilityOfFasterEnemies = 5; // Change the probability of enemies getting faster

function chanceToGetHarderLevel() {
    let doIgetMoreEnemies = Math.floor(Math.random() * probabilityOfMoreEnemies);
    let doIgetFasterEnemies = Math.floor(Math.random() * probabilityOfFasterEnemies);


    switch (numberOfEnemies) {
        case 1:
            switch (doIgetMoreEnemies) {
                case 0:
                    numberOfEnemies++;
                    probabilityOfMoreEnemies += 5;
                    break;
            }
            break;
        case 2:
            switch (doIgetMoreEnemies) {
                case 0:
                    numberOfEnemies++;
                    probabilityOfMoreEnemies += 5;
                    break;
            }
            break;
        case 3:
            switch (doIgetMoreEnemies) {
                case 0:
                    numberOfEnemies++;
                    break;
            }
            break;
        case numberOfEnemies > 3:
            probabilityOfFasterEnemies = 1;
            break;
    }

    switch (doIgetFasterEnemies) {
        case 0:
            enemySpeed += 0.2;
            break;
    }
}

function mazeGenerator() {
    // Player = 'P', Wall = '*', Enemy = 'E', Point = ' '
    /* let maze = [
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
    ]; */




    let maze = [
        ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
        ['*', 'P', '.', '*', '.', '.', '.', '.', '.', '*'],
        ['*', '.', '.', '.', '.', '.', '.', '*', '*', '*'],
        ['*', '.', '.', '.', '.', '.', '.', '.', '.', '*'],
        ['*', '.', '*', '*', '.', '.', '.', '.', '.', '*'],
        ['*', '.', '.', '.', '.', '.', '.', '*', '*', '*'],
        ['*', '.', '.', '*', '.', '.', '.', '.', '.', '*'],
        ['*', '.', '.', '.', '.', '.', '.', '*', '.', '*'],
        ['*', '.', '*', '.', '.', '.', '.', '.', '.', '*'],
        ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*']
    ];



    let column;
    let row;


    function findAValidCell() {
        column = Math.ceil(Math.random() * 8);
        row = Math.ceil(Math.random() * 8);
    }


    for (let i = 0; i < numberOfEnemies; i++) {

        findAValidCell();

        while (maze[row][column] !== '.') {
            findAValidCell();
        }
        maze[row][column] = 'E';
    }

    let addExtraSpeed = Math.floor(Math.random() * 4);
    let addExtraLive = Math.floor(Math.random() * 4);
    let addGoneWild = Math.floor(Math.random() * 4);

    if (addExtraSpeed == 0) {
        findAValidCell();
        while (maze[row][column] !== '.') {
            findAValidCell();
        }
        maze[row][column] = 'S';
    }

    if (addExtraLive == 0) {
        findAValidCell();
        while (maze[row][column] !== '.') {
            findAValidCell();
        }
        maze[row][column] = 'L';
    }

    if (addGoneWild == 0) {
        findAValidCell();
        while (maze[row][column] !== '.') {
            findAValidCell();
        }
        maze[row][column] = 'W';
    }




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
                    break;
                case 'S':
                    block.classList.add('speed-power-up');
                    break;
                case 'L':
                    block.classList.add('life-power-up');
                    break;
                case 'W':
                    block.classList.add('wild-power-up');
                    break;
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
let playerPosition = player.getBoundingClientRect();


let enemies = document.querySelectorAll('.enemy');


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


let playerGoneWild = false;

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
        let checkDistance = Math.max(speed, 1);

        if (!iAmUser && playerGoneWild) {
            speed = 0.1;
        }


        if ((iAmUser && rightPressed) || (!iAmUser && movementDirection == 0)) {
            let newRight = characterPosition.right + checkDistance;
            let rt = document.elementFromPoint(newRight, characterPosition.top);
            let rb = document.elementFromPoint(newRight, characterPosition.bottom);

            if ((!iAmUser && rt && rt.id == 'player' && !playerGoneWild) || (!iAmUser && rb && rb.id == 'player' && !playerGoneWild) || (iAmUser && rt && rt.classList.contains('enemy') && !playerGoneWild) || (iAmUser && rb && rb.classList.contains('enemy') && !playerGoneWild)) {
                playerCollidesWithEnemy();
                movementDirection = getSemiRandomDirection(movementDirection);
            }

            else if ((iAmUser && rt && rt.classList.contains('enemy') && playerGoneWild) || (iAmUser && rb && rb.classList.contains('enemy') && playerGoneWild)) {
                rt.classList.remove('enemy');
                rb.classList.remove('enemy');
                score.innerHTML = parseInt(score.innerHTML) + 5;
            }

            else if (!iAmUser && rt && rt.classList.contains('enemy') || (!iAmUser && rb && rb.classList.contains('enemy')) || (!iAmUser && rt && rt.id == 'player' && playerGoneWild) || (!iAmUser && rb && rb.id == 'player' && playerGoneWild)) {
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
            let newLeft = characterPosition.left - checkDistance;
            let lt = document.elementFromPoint(newLeft, characterPosition.top);
            let lb = document.elementFromPoint(newLeft, characterPosition.bottom);

            if ((!iAmUser && lt && lt.id == 'player' && !playerGoneWild) || (!iAmUser && lb && lb.id == 'player' && !playerGoneWild) || (iAmUser && lt && lt.classList.contains('enemy') && !playerGoneWild) || (iAmUser && lb && lb.classList.contains('enemy') && !playerGoneWild)) {
                playerCollidesWithEnemy();
                movementDirection = getSemiRandomDirection(movementDirection);
            }

            else if ((iAmUser && lt && lt.classList.contains('enemy') && playerGoneWild) || (iAmUser && lb && lb.classList.contains('enemy') && playerGoneWild)) {
                lt.classList.remove('enemy');
                lb.classList.remove('enemy');
                score.innerHTML = parseInt(score.innerHTML) + 5;
            }

            else if (!iAmUser && lt && lt.classList.contains('enemy') || (!iAmUser && lb && lb.classList.contains('enemy')) || (!iAmUser && lt && lt.id == 'player' && playerGoneWild) || (!iAmUser && lb && lb.id == 'player' && playerGoneWild)) {
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
            let newTop = characterPosition.top - checkDistance;
            let tl = document.elementFromPoint(characterPosition.left, newTop);
            let tr = document.elementFromPoint(characterPosition.right, newTop);

            if ((!iAmUser && tl && tl.id == 'player' && !playerGoneWild) || (!iAmUser && tr && tr.id == 'player' && !playerGoneWild) || (iAmUser && tl && tl.classList.contains('enemy') && !playerGoneWild) || (iAmUser && tr && tr.classList.contains('enemy') && !playerGoneWild)) {
                playerCollidesWithEnemy();
                movementDirection = getSemiRandomDirection(movementDirection);
            }

            else if ((iAmUser && tl && tl.classList.contains('enemy') && playerGoneWild) || (iAmUser && tr && tr.classList.contains('enemy') && playerGoneWild)) {
                tl.classList.remove('enemy');
                tr.classList.remove('enemy');
                score.innerHTML = parseInt(score.innerHTML) + 5;
            }

            else if (!iAmUser && tl && tl.classList.contains('enemy') || (!iAmUser && tr && tr.classList.contains('enemy')) || (!iAmUser && tl && tl.id == 'player' && playerGoneWild) || (!iAmUser && tr && tr.id == 'player' && playerGoneWild)) {
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
            let newBottom = characterPosition.bottom + checkDistance;
            let bl = document.elementFromPoint(characterPosition.left, newBottom);
            let br = document.elementFromPoint(characterPosition.right, newBottom);

            if ((!iAmUser && bl && bl.id == 'player' && !playerGoneWild) || (!iAmUser && br && br.id == 'player' && !playerGoneWild) || (iAmUser && bl && bl.classList.contains('enemy') && !playerGoneWild) || (iAmUser && br && br.classList.contains('enemy') && !playerGoneWild)) {
                playerCollidesWithEnemy();
                movementDirection = getSemiRandomDirection(movementDirection);
            }

            else if ((iAmUser && bl && bl.classList.contains('enemy') && playerGoneWild) || (iAmUser && br && br.classList.contains('enemy') && playerGoneWild)) {
                bl.classList.remove('enemy');
                br.classList.remove('enemy');
                score.innerHTML = parseInt(score.innerHTML) + 5;
            }

            else if (!iAmUser && bl && bl.classList.contains('enemy') || (!iAmUser && br && br.classList.contains('enemy')) || (!iAmUser && bl && bl.id == 'player' && playerGoneWild) || (!iAmUser && br && br.id == 'player' && playerGoneWild)) {
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

            let extraLife = document.querySelector('.life-power-up');
            if (extraLife) {
                let extraLifePosition = extraLife.getBoundingClientRect();
                if (characterPosition.left < extraLifePosition.right &&
                    characterPosition.right > extraLifePosition.left &&
                    characterPosition.top < extraLifePosition.bottom &&
                    characterPosition.bottom > extraLifePosition.top) {
                    lives += 1;
                    addLives(1);
                    extraLife.classList.remove('life-power-up');
                }
            }

            let extraSpeed = document.querySelector('.speed-power-up');
            if (extraSpeed) {
                let extraSpeedPosition = extraSpeed.getBoundingClientRect();
                if (characterPosition.left < extraSpeedPosition.right &&
                    characterPosition.right > extraSpeedPosition.left &&
                    characterPosition.top < extraSpeedPosition.bottom &&
                    characterPosition.bottom > extraSpeedPosition.top) {
                    speed++;
                    extraSpeed.classList.remove('speed-power-up');
                }
            }

            let goneWild = document.querySelector('.wild-power-up');
            if (goneWild) {
                let goneWildPosition = goneWild.getBoundingClientRect();
                if (characterPosition.left < goneWildPosition.right &&
                    characterPosition.right > goneWildPosition.left &&
                    characterPosition.top < goneWildPosition.bottom &&
                    characterPosition.bottom > goneWildPosition.top) {
                    playerGoneWild = true;
                    character.style.filter = 'hue-rotate(297deg) saturate(800%)';
                    goneWild.classList.remove('wild-power-up');
                    for (const enemy of enemies) {
                        enemy.style.backgroundPosition = '-389px -15px';
                        enemy.style.animation = 'none';
                    }
                }
            }
        }


        character._rafId = requestAnimationFrame(animate);


    }
    character._animate = animate;
    animate();
}


const livesDisplay = document.querySelector('.lives').firstElementChild.nextElementSibling;
let lives = 3;
addLives(lives);

function addLives(amount) {
    for (let i = 0; i < amount; i++) {
        let liveToBeAdded = document.createElement('li');
        livesDisplay.appendChild(liveToBeAdded);
    }
}

function removeLive() {
    let liveToBeRemoved = livesDisplay.firstElementChild;
    if (liveToBeRemoved) {
        lives -= 1;
        livesDisplay.removeChild(liveToBeRemoved);
    }
}

function playerCollidesWithEnemy() {

    releaseMovement();
    stopListeningForUserInputs();


    if (lives > 1) {
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

function playerEatsEnemy(enemy) {
    enemy.classList.remove('enemy');
    score.innerHTML = parseInt(score.innerHTML) + 5;
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
    helpButton.removeEventListener('click', toggleHelp);
    pauseGameButton.removeEventListener('click', pauseGameFunction);
    releaseMovement();
    stopListeningForUserInputs();
    for (const character of characters) {
        cancelAnimationFrame(character._rafId);
    }
    start.style.display = 'flex';
    document.querySelector('.start').firstElementChild.nextElementSibling.innerHTML = 'Next Level!';
    level.innerHTML++;
    main.innerHTML = '';
    chanceToGetHarderLevel();
    mazeGenerator();
    getCharacters();
    playerSpeed = 1;
    playerGoneWild = false;
    setTimeout(startGame, 2000);
}

function resetGame() {
    main.innerHTML = '';
    mazeGenerator();
    getCharacters();
    playerSpeed = 1;
    playerGoneWild = false;
    level.innerHTML = 1;
    score.innerHTML = 0;
    lives = 3;
    addLives(lives);
    startGame();
}

function endGame() {
    helpButton.removeEventListener('click', toggleHelp);
    pauseGameButton.removeEventListener('click', pauseGameFunction);
    releaseMovement();
    stopListeningForUserInputs();
    start.style.display = 'flex';
    document.querySelector('.start').firstElementChild.nextElementSibling.innerHTML = 'Restart Game?';
    start.addEventListener('click', resetGame);
    for (const character of characters) {
        cancelAnimationFrame(character._rafId);
    }
    gameStarted = false;
}

function startGame() {
    pauseGameButton.addEventListener('click', pauseGameFunction);
    helpButton.addEventListener('click', toggleHelp);
    start.removeEventListener('click', startGame);
    start.style.display = 'none';
    for (const character of characters) {
        animateCharacters(character);
    }
    gameStarted = true;
}

start.addEventListener('click', startGame);

const helpMenu = document.querySelector('.help');
const helpButton = document.querySelector('.helpButton');
helpMenu.style.display = 'none';

const pauseGameButton = document.querySelector('.pauseGame');
let gamePaused = false;
let gameStarted = false;
let helpMenuDisplayed = false;

function pauseGameFunction() {


    switch (gameStarted) {
        case false:
            pauseGameButton.innerHTML = 'Start a Game First!';
            setTimeout(function () {
                pauseGameButton.innerHTML = 'Pause';
            }, 1500);
            break;
        default:
            switch (gamePaused) {
                case false:
                    for (const character of characters) {
                        cancelAnimationFrame(character._rafId);
                    }
                    pauseGameButton.innerHTML = 'Resume';
                    start.style.display = 'flex';
                    document.querySelector('.start').firstElementChild.nextElementSibling.innerHTML = 'Game Paused! Resume?';
                    start.addEventListener('click', pauseGameFunction);
                    gamePaused = true;
                    break;
                default:
                    if (helpMenuDisplayed) {
                        helpMenuDisplayed = false;
                        helpMenu.style.display = 'none';
                    }
                    for (const character of characters) {
                        if (character._animate) {
                            character._animate();
                        }
                    }
                    start.removeEventListener('click', pauseGameFunction);
                    start.style.display = 'none';
                    pauseGameButton.innerHTML = 'Pause';
                    gamePaused = false;
                    break;
            }
    }





}

pauseGameButton.addEventListener('click', pauseGameFunction);

function toggleHelp() {
    switch (gameStarted) {
        case false:
            switch (helpMenuDisplayed) {
                case false:
                    helpMenuDisplayed = true;
                    helpMenu.style.display = 'block';
                    break;
                default:
                    helpMenuDisplayed = false;
                    helpMenu.style.display = 'none';
                    break;
            }
            break;
        default:
            switch (gamePaused) {
                case true:
                    switch (helpMenuDisplayed) {
                        case false:
                            helpMenuDisplayed = true;
                            helpMenu.style.display = 'block';
                            break;
                        default:
                            helpMenuDisplayed = false;
                            helpMenu.style.display = 'none';
                            break;
                    }
                    break;
                default:
                    switch (helpMenuDisplayed) {
                        case false:
                            pauseGameFunction();
                            helpMenuDisplayed = true;
                            helpMenu.style.display = 'block';
                            break;
                        default:
                            helpMenuDisplayed = false;
                            helpMenu.style.display = 'none';
                            break;
                    }
                    break;

            }
            break;

    }

}

helpButton.addEventListener('click', toggleHelp);
