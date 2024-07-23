score = 0;
cross_collide = true;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);

document.onkeydown = function (e) {
    console.log("Key Code is : ", e.keyCode)
    if (e.keyCode == 38) {
        dino = document.querySelector('.dino')
        dino.classList.add('animatedino');
        setTimeout(() => {
            dino.classList.remove('animatedino')
        }, 1000);
    }

    if (e.keyCode == 39) {
        dino = document.querySelector('.dino')
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    }
    if (e.keyCode == 37) {
        dino = document.querySelector('.dino')
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }

}


setInterval(() => {
    dino = document.querySelector('.dino');
    gameover = document.querySelector('.gameover');
    obstracle = document.querySelector('.obstracle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
    ox = parseInt(window.getComputedStyle(obstracle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstracle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    console.log(offsetX, offsetY);
    // if collided the game Over visible
    if (offsetX < 115 && offsetY < 52) {
        gameover.style.visibility = 'visible';
        obstracle.classList.remove('obstracleAni')
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    //otherwise increase the score 
    else if (offsetX < 80 && cross_collide) { //offset=nearbyValue
        score += 1;
        updateScore(score);
        cross_collide = false;
        setTimeout(() => { // update the score after 1 sec or 1000ms
            cross_collide = true;
        }, 1000);
        setTimeout(() => {
            anirDur = parseFloat(window.getComputedStyle(obstracle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstracle.style.animationDuration = newDur + 's';
            console.log("An Dutration", newDur);
        }, 500);
    }
}, 10);




function updateScore(score) {
    scoreCont.innerHTML = "Your Score is :  " + score

}