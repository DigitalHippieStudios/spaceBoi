document.addEventListener('DOMContentLoaded', () => {
    const blocks = document.querySelectorAll('.game div'); //use All cause multiple divs
    const display = document.querySelector('#result'); //use All cause multiple divs

    let width = 15;
    let currPlayerIndex = 202;
    let currEnemyIndex = 0;
    let takeDown = []; //this is an array
    let score = 0;
    let direction = 1;
    let enemyId;

    //these are aliens
    const enemies = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39
    ]

    //draw alien boi
    enemies.forEach(enemy => blocks[currEnemyIndex + enemy].classList.add('enemy'));

    //hero boi
    blocks[currPlayerIndex].classList.add('player');

    //set up functions
    //move player horizontally
    movePlayer = (e) => {
        blocks[currPlayerIndex].classList.remove('player');
        switch (e.keyCode) {
            case 37:
                if (currPlayerIndex % width !== 0) {
                    currPlayerIndex -= 1
                }
                break;
            case 39:
                if (currPlayerIndex % width < width - 1) {
                    currPlayerIndex += 1
                }
                break;
        }
        blocks[currPlayerIndex].classList.add('player');

    }

    document.addEventListener('keydown', movePlayer);


    //move the baddies
    moveAliens = (e) => {
        const leftEdge = enemies[0] % width === 0;
        const rightEdge = enemies[enemies.length - 1] % width === width - 1;
        console.log("rightEdge = " + rightEdge);
        console.log("direction = " + direction);
        //check board edge
        if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
            direction = width;
        }

        if (direction === width) {
            if (leftEdge) {
                direction = 1
            } else {
                direction = -1
            }
        }

        for (let i = 0; i <= enemies.length - 1; i++) {
            blocks[enemies[i]].classList.remove('enemy');
        }

        for (let i = 0; i <= enemies.length - 1; i++) {
            enemies[i] += direction;
        }

        for (let i = 0; i <= enemies.length - 1; i++) {
            blocks[enemies[i]].classList.add('enemy');
        }

        //game over
        if (blocks[currPlayerIndex].classList.contains('enemy', 'player')) {
            display.textContent = "GAME OVER";
            blocks[currPlayerIndex].classList.add('boom');
            clearInterval(enemyId);
        }
        for (let i = 0; i <= enemies.length - 2; i++) {
            if (enemies[i] > (blocks.length - (width - 1))) {
                display.textContent = "GAME OVER";
                clearInterval(enemyId);
            }
        }



    }

    enemyId = setInterval(moveAliens, 500);

    shoot = (e) => {
        let laserId;
        let currLaserPos = currPlayerIndex;

        //move laser
        moveLaser = () => {
            blocks[currLaserPos].classList.remove('laser');
            currLaserPos -= width;
            blocks[currLaserPos].classList.add('laser');
            if (blocks[currLaserPos].classList.add('laser')) {
                blocks[currLaserPos].classList.contains('enemy');
                blocks[currLaserPos].classList.remove('enemy');
                blocks[currLaserPos].classList.add('boom');

                setTimeout(() => blocks[currLaserPos].classList.remove('boom'));
                clearInterval(laserId);

                const enemiesDown = enemies.indexOf(currLaserPos);
                takeDown.push(enemiesDown);
                score++;
                display.textContent = score;
            }

            if (currLaserPos < width) {
                clearInterval(laserId);
                setTimeout(() => blocks[currLaserPos].classList.remove('laser'), 100)

            }

        }
        // document.addEventListener('keyup', e => {
        //     if (e.keyCode === 32) {
        //         laserId = setInterval(moveLaser, 100);
        //     }
        // })

        switch(e.keyCode){
            case 32:
                laserId = setInterval(moveLaser, 100);
                break;
        }


    }






})

document.addEventListener('keyup', shoot);