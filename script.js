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

function moveEnemies(enemy) {
    let ghostTop = 0;
    let ghostLeft = 0;
    let movementDirection = Math.floor(Math.random() * 4);

    function animate() {
        let enemyPosition = enemy.getBoundingClientRect();

        if (movementDirection == 0) {
            let newRight = enemyPosition.right + 1;
            let rt = document.elementFromPoint(newRight, enemyPosition.top);
            let rb = document.elementFromPoint(newRight, enemyPosition.bottom);

            if ((rt && rt.id == 'player') || (rb && rb.id == 'player')) {
                playerCollidesWithEnemy();
                movementDirection = Math.floor(Math.random() * 4);
            }
            else if ((rt && !rt.classList.contains('wall')) && (rb && !rb.classList.contains('wall'))) {
                ghostLeft += enemySpeed;
                enemy.style.left = ghostLeft + 'px';
            }
            else {
                movementDirection = Math.floor(Math.random() * 4);
            }
        }
        else if (movementDirection == 1) {
            let newLeft = enemyPosition.left - 1;
            let lt = document.elementFromPoint(newLeft, enemyPosition.top);
            let lb = document.elementFromPoint(newLeft, enemyPosition.bottom);

            if ((lt && lt.id == 'player') || (lb && lb.id == 'player')) {
                playerCollidesWithEnemy();
                movementDirection = Math.floor(Math.random() * 4);
            }
            else if ((lt && !lt.classList.contains('wall')) && (lb && !lb.classList.contains('wall'))) {
                ghostLeft -= enemySpeed;
                enemy.style.left = ghostLeft + 'px';
            }
            else {
                movementDirection = Math.floor(Math.random() * 4);
            }
        }
        else if (movementDirection == 2) {
            let newTop = enemyPosition.top - 1;
            let tl = document.elementFromPoint(enemyPosition.left, newTop);
            let tr = document.elementFromPoint(enemyPosition.right, newTop);

            if ((tl && tl.id == 'player') || (tr && tr.id == 'player')) {
                playerCollidesWithEnemy();
                movementDirection = Math.floor(Math.random() * 4);
            }
            else if ((tl && !tl.classList.contains('wall')) && (tr && !tr.classList.contains('wall'))) {
                ghostTop -= enemySpeed;
                enemy.style.top = ghostTop + 'px';
            }
            else {
                movementDirection = Math.floor(Math.random() * 4);
            }
        }
        else if (movementDirection == 3) {
            let newBottom = enemyPosition.bottom + 1;
            let bl = document.elementFromPoint(enemyPosition.left, newBottom);
            let br = document.elementFromPoint(enemyPosition.right, newBottom);

            if ((bl && bl.id == 'player') || (br && br.id == 'player')) {
                playerCollidesWithEnemy();
                movementDirection = Math.floor(Math.random() * 4);
            }
            else if ((bl && !bl.classList.contains('wall')) && (br && !br.classList.contains('wall'))) {
                ghostTop += enemySpeed;
                enemy.style.top = ghostTop + 'px';
            }
            else {
                movementDirection = Math.floor(Math.random() * 4);
            }
        }

        EnemyMovementInterval = requestAnimationFrame(animate);
        enemy.animationId = EnemyMovementInterval;
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
    if (isColliding) return;
    isColliding = true;
    
    releaseMovement();
    stopListeningForUserInputs();
    cancelAnimationFrame(movementInterval);

    if (lives > 1) {
        lives -= 1;
        removeLive();
        player.classList = 'hit';
        setTimeout(function() {
            isColliding = false;
            move();
        }, 1500);
    }

    else {
        removeLive();
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

        if ((bl && bl.classList.contains('enemy') == true) || (br && br.classList.contains('enemy') == true)) {
            playerCollidesWithEnemy();
            return;
        }

        else if ((bl && !bl.classList.contains('wall')) && (br && !br.classList.contains('wall'))) {
            playerTop += speed;
            player.style.top = playerTop + 'px';
            player.classList = 'down';
        }


    }
    else if (upPressed == true) {
        let newTop = playerPosition.top - 1;

        let tl = document.elementFromPoint(playerPosition.left, newTop);
        let tr = document.elementFromPoint(playerPosition.right, newTop);

        if ((tl && tl.classList.contains('enemy') == true) || (tr && tr.classList.contains('enemy') == true)) {
            playerCollidesWithEnemy();
            return;
        }

        else if ((tl && !tl.classList.contains('wall')) && (tr && !tr.classList.contains('wall'))) {
            playerTop -= speed;
            player.style.top = playerTop + 'px';
            player.classList = 'up';
        }

    }
    else if (leftPressed == true) {
        let newLeft = playerPosition.left - 1;

        let lt = document.elementFromPoint(newLeft, playerPosition.top);
        let lb = document.elementFromPoint(newLeft, playerPosition.bottom);

        if ((lt && lt.classList.contains('enemy') == true) || (lb && lb.classList.contains('enemy') == true)) {
            playerCollidesWithEnemy();
            return;
        }

        else if ((lt && !lt.classList.contains('wall')) && (lb && !lb.classList.contains('wall'))) {
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

        else if ((rt && !rt.classList.contains('wall')) && (rb && !rb.classList.contains('wall'))) {
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
        nextLevel();
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

function nextLevel() {
    releaseMovement();
    stopListeningForUserInputs();
    start.style.display = 'flex';
    document.querySelector('.start').firstElementChild.nextElementSibling.innerHTML = 'Next Level!';
    level.innerHTML++;
    main.innerHTML = '';
    mazeGenerator();
    enemies = document.querySelectorAll('.enemy');
    player = document.querySelector('#player');
    playerTop = 0;
    playerLeft = 0;
    setTimeout(startGame, 2000);
}

function resetGame() {
    main.innerHTML = '';
    mazeGenerator();
    enemies = document.querySelectorAll('.enemy');
    player = document.querySelector('#player');
    level.innerHTML = 1;
    score.innerHTML = 0;
    playerTop = 0;
    playerLeft = 0;
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
    cancelAnimationFrame(movementInterval);
    for (const enemy of enemies) {
        cancelAnimationFrame(enemy.animationId);
    }
    
}

function startGame() {
    start.removeEventListener('click', startGame);
    start.style.display = 'none';
    isColliding = false;
    move();
    for (const enemy of enemies) {
        moveEnemies(enemy);
    }
}

start.addEventListener('click', startGame);
