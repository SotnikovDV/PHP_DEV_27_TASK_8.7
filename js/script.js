let minValue = 0; //parseInt(prompt('Минимальное знание числа для игры', '0'));
let maxValue = 100; //parseInt(prompt('Максимальное знание числа для игры', '100'));
alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
let answerNumber = 0; //Math.floor((minValue + maxValue) / 2);
let orderNumber = 0; //1;
let gameRun = false; //true;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

startGame();

function startGame() {
    minValue = parseInt(prompt('Минимальное знание числа для игры', '0'));
    maxValue = parseInt(prompt('Максимальное знание числа для игры', '100'));
    answerNumber = Math.floor((minValue + maxValue) / 2);
    orderNumber = 1;
    gameRun = true;
    orderNumberField.innerText = orderNumber;
    answerField.innerText = `Вы загадали число ${answerNumber}?`;
        
}

function startRulet(){
    document.querySelector('#card-quest').style.display = "none";
    document.querySelector('#card-play').style.display = "block";
    setTimeout(() => {  stopRulet(); }, 1000);
}

function stopRulet(){
    document.querySelector('#card-play').style.display = "none";
    document.querySelector('#card-quest').style.display = "block";
}

// кнопка "Сначала"
document.querySelector('#btnRetry').addEventListener('click', startGame);

// кнопка "Больше"
document.querySelector('#btnOver').addEventListener('click', function () {
    if (gameRun) {
        if (minValue === maxValue) {
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            startRulet();
            minValue = answerNumber + 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = `Вы загадали число ${answerNumber}?`;
        }
    }  else {
        answerField.innerText = `Начните новую игру.\n\u{1F914}`;
    }        
})

// кнопка "Меньше"
document.querySelector('#btnLess').addEventListener('click', function () {
    if (gameRun) {
        if (minValue === maxValue) {
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            startRulet();
            maxValue = answerNumber - 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = `Вы загадали число ${answerNumber}?`;
        }
    } else {
        answerField.innerText = `Начните новую игру.\n\u{1F914}`;
    }
})

// кнопка "Равно"
document.querySelector('#btnEqual').addEventListener('click', function () {
    if (gameRun) {
        answerField.innerText = `Я всегда угадываю\n\u{1F60E}`
        gameRun = false;
    } else {
        answerField.innerText = `Начните новую игру.\n\u{1F914}`;
    }
})
