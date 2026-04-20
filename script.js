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
        stopMovingUsingScreenButtons();
        upPressed = true;
    } else if (event.key === 'ArrowDown') {
        stopMovingUsingScreenButtons();
        downPressed = true;
    } else if (event.key === 'ArrowLeft') {
        stopMovingUsingScreenButtons();
        leftPressed = true;
    } else if (event.key === 'ArrowRight') {
        stopMovingUsingScreenButtons();
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

function stopMovingUsingScreenButtons() {
    upPressed = false;
    downPressed = false;
    leftPressed = false;
    rightPressed = false;
}

const player = document.querySelector('#player');
let playerTop = 0;
let playerLeft = 0;

function move() {
    const playerPosition = player.getBoundingClientRect();
    
    if (downPressed == true) {
        let newBottom = playerPosition.bottom + 1;

        let bl = document.elementFromPoint(playerPosition.left, newBottom);
        let br = document.elementFromPoint(playerPosition.right, newBottom);

        if (bl.classList.contains('wall') == false && br.classList.contains('wall') == false) {
            playerTop += speed;
            player.style.top = playerTop + 'px';
            player.classList = 'down';
        }
    }
    else if (upPressed == true) {
        let newTop = playerPosition.top - 1;

        let tl = document.elementFromPoint(playerPosition.left, newTop);
        let tr = document.elementFromPoint(playerPosition.right, newTop);

        if (tl.classList.contains('wall') == false && tr.classList.contains('wall') == false) {
            playerTop -= speed;
            player.style.top = playerTop + 'px';
            player.classList = 'up';
        }
    }
    else if (leftPressed == true) {
        let newLeft = playerPosition.left - 1;

        let lt = document.elementFromPoint(newLeft, playerPosition.top);
        let lb = document.elementFromPoint(newLeft, playerPosition.bottom);

        if (lt.classList.contains('wall') == false && lb.classList.contains('wall') == false) {
            playerLeft -= speed;
            player.style.left = playerLeft + 'px';
            player.classList = 'left';
        }
    }
    else if (rightPressed == true) {
        let newRight = playerPosition.right + 1;

        let rt = document.elementFromPoint(newRight, playerPosition.top);
        let rb = document.elementFromPoint(newRight, playerPosition.bottom);

        if (rt.classList.contains('wall') == false && rb.classList.contains('wall') == false) {
            playerLeft += speed;
            player.style.left = playerLeft + 'px';
            player.classList = 'right';
        }
    }
    requestAnimationFrame(move);
}

move();

function listenForUserInputs() {
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
    leftScreenButton.addEventListener('click', leftScreenButtonClicked);
    upScreenButton.addEventListener('click', upScreenButtonClicked);
    rightScreenButton.addEventListener('click', rightScreenButtonClicked);
    downScreenButton.addEventListener('click', downScreenButtonClicked);
}

const start = document.querySelector('.start');

function startGame() {
    start.style.display = 'none'
    listenForUserInputs();
}

start.addEventListener('click', startGame);

