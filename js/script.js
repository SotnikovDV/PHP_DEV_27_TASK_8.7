let minValue = 0; 
let maxValue = 100; 
let answerNumber = 0;
let orderNumber = 0; 
let gameRun = false; 

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

const cardParam = document.querySelector('#card-param');
const cardQuest = document.querySelector('#card-quest');
const cardPlay  = document.querySelector('#card-play');
const cardBtn  = document.querySelector('#card-btn');

const btnStart  = document.querySelector('#btnStart');
const btnRetry  = document.querySelector('#btnRetry')

initGame();

// Инициализация параметров
function initGame() {
    const phraseRandom = Math.round(Math.random()*2);
    const answerPhrase = (['Загадайте число', 'Не забудьте загадать число', 'С вас число, а я угадаю!'])[phraseRandom];
    
    // Переключим игровое поле на запрос параметров
    cardQuest.style.display = "none";
    cardBtn.style.display = "none";
    cardParam.style.display = "block";

    minValue = 0; 
    maxValue = 100; 

    answerNumber = Math.floor((minValue + maxValue) / 2);
    orderNumber = 0;
    gameRun = false;
    orderNumberField.innerText = answerPhrase; 
    orderNumberField.style.color = 'red';
    answerField.innerText = '';
        
}
// кнопка "Сначала"
btnRetry.addEventListener('click', initGame);

// Начать новую игру
function startGame() {
    const phraseRandom = Math.round(Math.random()*2);
    const answerPhrase = (['Вы загадали число', 'Ваше число', 'А может быть это'])[phraseRandom];
    
    const minInput = document.querySelector('#minNumber');
    const maxInput = document.querySelector('#maxNumber');

    if (!minInput.value) {
        document.querySelector("#sayMinMax").innerText = 'укажите минимальное число';
        minInput.focus();
        return;
    } else if (!maxInput.value) {
        document.querySelector("#sayMinMax").innerText = 'укажите максимальное число';
        maxInput.focus();
        return;
    } else if (parseInt(minInput.value) > parseInt(maxInput.value)){
        document.querySelector("#sayMinMax").innerText = 'минимальное число должно быть меньше максимального';
        minInput.focus();
        return;
    }
    else {
        document.querySelector("#sayMinMax").innerText = 'можно поменять минимальное и/или максимальное число';
    }
    
    // Переключим игровое поле на игру
    cardParam.style.display = "none";
    cardQuest.style.display = "block";
    cardBtn.style.display = "block";

    minValue = parseInt(minInput.value); 
    maxValue = parseInt(maxInput.value); 

    answerNumber = Math.floor((minValue + maxValue) / 2);
    orderNumber = 1;
    gameRun = true;
    orderNumberField.innerText = 'Вопрос №1'; 
    orderNumberField.style.color = '';
    answerField.innerText = answerPhrase + ` ${answerNumber} ?`;
    startRulet();    
    
}
// кнопка "Поехали"
btnStart.addEventListener('click', startGame);

// Запуск анимации
function startRulet(){
    cardQuest.style.display = "none";
    cardPlay.style.display = "block";
    setTimeout(() => {  stopRulet(); }, 1000);
}

// Остановка анимации
function stopRulet(){
    cardPlay.style.display = "none";
    cardQuest.style.display = "block";
}

// кнопка "Больше"
document.querySelector('#btnOver').addEventListener('click', function () {
    const phraseRandom = Math.round(Math.random()*2);
    const answerPhrase = (['Вы загадали число', 'Ваше число', 'А может быть это'])[phraseRandom];

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
            orderNumberField.innerText = 'Вопрос №' + orderNumber;
            answerField.innerText = answerPhrase + ` ${answerNumber} ?`;
        }
    }  else {
        answerField.innerText = `Начните новую игру.\n\u{1F914}`;
    }        
})

// кнопка "Меньше"
document.querySelector('#btnLess').addEventListener('click', function () {
    const phraseRandom = Math.round(Math.random()*2);
    const answerPhrase = (['Вы загадали число', 'Ваше число', 'А может быть это'])[phraseRandom];

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
            orderNumberField.innerText = 'Вопрос №' + orderNumber;
            answerField.innerText = answerPhrase + ` ${answerNumber} ?`;
        }
    } else {
        answerField.innerText = `Начните новую игру.\n\u{1F914}`;
    }
})

// кнопка "Верно"
document.querySelector('#btnEqual').addEventListener('click', function () {
    const phraseRandom = Math.round(Math.random()*2);
    const answerPhrase = (['Я всегда угадываю!', 'Какой я молодец!', 'Где моя медаль?'])[phraseRandom];
    const answerPhrase2 = (['Начните новую игру', 'Ещё сыграем?', 'Жми кнопку [Заново]'])[phraseRandom];

    if (gameRun) {
        answerField.innerText = answerPhrase + `\n\u{1F60E}`
        gameRun = false;
    } else {
        answerField.innerText = answerPhrase2 + `\n\u{1F914}`;
    }
})
