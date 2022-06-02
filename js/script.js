let minValue = 0;
let maxValue = 100;
let answerNumber = 0;
let orderNumber = 0;
let gameRun = false;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

const cardParam = document.querySelector('#card-param');
const cardQuest = document.querySelector('#card-quest');
const cardPlay = document.querySelector('#card-play');
const cardBtn = document.querySelector('#card-btn');

const btnStart = document.querySelector('#btnStart');
const btnRetry = document.querySelector('#btnRetry')

initGame();

let r, e = [
    ["", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять", "десять", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать"],
    ["", "", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто"],
    ["", "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьсот", "восемьсот", "девятьсот"]
];

function u(r) {
    return parseFloat(r)
}

function oneWord(r, i, a) {
    let f, l, o = "";
    if (3 === r.length && (f = r.substr(0, 1), r = r.substr(1, 3), o = e[2][f] + " "), r < 20 ? o = o + e[0][u(r)] + " " : (f = r.substr(0, 1), l = r.substr(1, 2), o = o + e[1][f] + " " + e[0][l] + " "), 0 === i) {
        o += "";
    } else 1 === i ? "  " !== o && (o += s(r, ["тысяча ", "тысячи ", "тысяч "]), o = o.replace("один ", "одна ").replace("два ", "две ")) : 2 === i ? "  " !== o && (o += s(r, ["миллион ", "миллиона ", "миллионов "])) : 3 === i && (o += s(r, ["миллиард ", "миллиарда ", "миллиардов "]));
    return o
}

function numberWords(r, e) {
    let t = typeof r;
    if ("number" !== t && "string" !== t) return !1;
    if ("string" === t && (r = u(r.replace(",", ".")), isNaN(r))) return !1;
    if (!r) return "ноль";
    let sign = r < 0 ? "минус " : "";
    let n, s;
    r = r.toFixed(2), -1 !== r.indexOf(".") && (n = r.split("."), r = n[0], s = n[1]);
    for (var f, l = "", o = r.length - 1, c = "", b = 0; o >= 0;) f = r.substr(o, 1), c = f + c, 3 !== c.length && 0 !== o || isNaN(u(c)) || (l = oneWord(c, b, e) + l, c = "", b++), o--;
    return l = sign + l.replace(/\s+/g, " "), l
};

// Инициализация параметров
function initGame() {
    const phraseRandom = Math.round(Math.random() * 2);
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
    const phraseRandom = Math.round(Math.random() * 2);
    const answerPhrase = (['Вы загадали число', 'Ваше число', 'А может быть это'])[phraseRandom];

    const minInput = document.querySelector('#minNumber');
    const minInputValue = minInput.value;
    const maxInput = document.querySelector('#maxNumber');
    const maxInputValue = maxInput.value;

    // Проверка ввода границ диапазона 
    if (!minInputValue || (minInputValue < -999)) {
        minInput.value = -999;
        document.querySelector("#sayMinMax").innerText = 'установил за Вас минимальное число';
        minInput.focus();
        return;
    } else if (!maxInputValue || (maxInputValue > 999)) {
        maxInput.value = 999;
        document.querySelector("#sayMinMax").innerText = 'установил за Вас максимальное число';
        maxInput.focus();
        return;
    } else if (parseInt(minInputValue) > parseInt(maxInputValue)) {
        document.querySelector("#sayMinMax").innerText = 'минимальное число должно быть меньше максимального';
        minInput.focus();
        return;
    } else {
        document.querySelector("#sayMinMax").innerText = 'можно поменять минимальное и/или максимальное число';
    }

    // Переключим игровое поле на игру
    cardParam.style.display = "none";
    cardQuest.style.display = "block";
    cardBtn.style.display = "block";

    minValue = parseInt(minInputValue);
    maxValue = parseInt(maxInputValue);

    answerNumber = Math.floor((minValue + maxValue) / 2);
    orderNumber = 1;
    gameRun = true;
    orderNumberField.innerText = 'Вопрос №1';
    orderNumberField.style.color = '';
    answerField.innerText = answerPhrase + ' ' + numbForAnswer(answerNumber) + '?';
    startRulet();

}
// кнопка "Поехали"
btnStart.addEventListener('click', startGame);

// Запуск анимации
function startRulet() {
    cardQuest.style.display = "none";
    cardPlay.style.display = "block";
    setTimeout(() => {
        stopRulet();
    }, 1000);
}

// Остановка анимации
function stopRulet() {
    cardPlay.style.display = "none";
    cardQuest.style.display = "block";
}

// Форматирование числа для вывода
function numbForAnswer(numb) {
    let answerWords = /*String(numb); */ numberWords(numb);
    if (answerWords.length > 20) {
        answerWords = String(numb);
    }
    return answerWords;
}

// кнопка "Больше"
document.querySelector('#btnOver').addEventListener('click', function () {
    const phraseRandom = Math.round(Math.random() * 2);
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
            answerField.innerText = answerPhrase + ' ' + numbForAnswer(answerNumber) + '?';
        }
    } else {
        answerField.innerText = `Начните новую игру.\n\u{1F914}`;
    }
})

// кнопка "Меньше"
document.querySelector('#btnLess').addEventListener('click', function () {
    const phraseRandom = Math.round(Math.random() * 2);
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
            answerField.innerText = answerPhrase + ' ' + numbForAnswer(answerNumber) + '?';
        }
    } else {
        answerField.innerText = `Начните новую игру.\n\u{1F914}`;
    }
})

// кнопка "Верно"
document.querySelector('#btnEqual').addEventListener('click', function () {
    const phraseRandom = Math.round(Math.random() * 2);
    const answerPhrase = (['Я всегда угадываю!', 'Какой я молодец!', 'Где моя медаль?'])[phraseRandom];
    const answerPhrase2 = (['Начните новую игру', 'Ещё сыграем?', 'Жми кнопку [Заново]'])[phraseRandom];

    if (gameRun) {
        answerField.innerText = answerPhrase + `\n\u{1F60E}`
        gameRun = false;
    } else {
        answerField.innerText = answerPhrase2 + `\n\u{1F914}`;
    }
})