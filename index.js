const popup = document.getElementById('popup');
const reset = document.getElementById('reset');

const cell_1 = document.getElementById('1');
const cell_2 = document.getElementById('2');
const cell_3 = document.getElementById('3');
const cell_4 = document.getElementById('4');
const cell_5 = document.getElementById('5');
const cell_6 = document.getElementById('6');
const cell_7 = document.getElementById('7');
const cell_8 = document.getElementById('8');
const cell_9 = document.getElementById('9');

let move = 1; // крестики-1 нолики-0

let arrX = [];  // массив крестиков
let arrNull = []; // массив ноликов
const arrWin = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]]; // массив победных комбинайций

function imgMoveAdd(img){    // функция для анимации появления картинки
    img.classList.add('imgMove'); 
}

function addXToCell(cell) {
    if (cell.classList.contains('emptyCell') && move == 1) { //если ячейка пустая и сейчас ход крестиков
        const img = document.createElement('img');
        img.src = 'images/крестик.png';
        cell.append(img);
        cell.classList.remove('emptyCell');
        move = 0; // передаем ход ноликам
        arrX.push(cell.id); // передаем в массив информацию что в этой клетке есть X
        setTimeout(function(){ // анимация появления крестика
            imgMoveAdd(img)
        }, 30)
    }
}

cell_1.addEventListener('click', function() {
    addXToCell(cell_1);
});
cell_2.addEventListener('click', function() {
    addXToCell(cell_2);
});
cell_3.addEventListener('click', function() {
    addXToCell(cell_3);
});
cell_4.addEventListener('click', function() {
    addXToCell(cell_4);
});
cell_5.addEventListener('click', function() {
    addXToCell(cell_5);
});
cell_6.addEventListener('click', function() {
    addXToCell(cell_6);
});
cell_7.addEventListener('click', function() {
    addXToCell(cell_7);
});
cell_8.addEventListener('click', function() {
    addXToCell(cell_8);
});
cell_9.addEventListener('click', function() {
    addXToCell(cell_9);
});

function addNullToCell(cell) { // функция для появления нолика в ячейке
        const img = document.createElement('img');
        img.src = 'images/нолик.png';
        cell.append(img);
        cell.classList.remove('emptyCell');
        setTimeout(function(){ // анимация появления нолика
            imgMoveAdd(img);
        }, 30)
}

function addNull(){ //функция определяюая какую ячейку займёт нолик(рандомно)
    if(!move){
        move = 1;
        const emptyCells = Array.from(document.querySelectorAll('.emptyCell')); // создание массива пустых ячеек
        const randomId = Math.floor(Math.random() * emptyCells.length);
        const randomCell = emptyCells[randomId];
        addNullToCell(randomCell);
        arrNull.push(randomCell.id); // передаем в массив информацию что в этой клетке есть 0
    }
}

function clearField(){ // функция, приводящая все ячейки в исходное состояние
    const content = Array.from(document.querySelectorAll('.content'));
    for(let i = 0; i < 10; i++) {
        content[i].innerHTML = ''; // очищаем каждую ячейку
        move = 1;
        if (!content[i].classList.contains('emptyCell')){
        content[i].classList.add('emptyCell')
        }
    }
}

function checkWin() {
    for(let i = 0; i < arrWin.length; i++) {
        let win = arrWin[i].every(function(element) { //сверяем массивы крестиков и нулей с выигрышными комбинациями
         return arrX.includes(element.toString());
        })
        let lose = arrWin[i].every(function(element) {
            return arrNull.includes(element.toString());
           })
        if(win) {
            popup.classList.remove('hide');
            popup.innerHTML = 'WIN!';
            reset.innerHTML = 'Try again';
            reset.style.width = '110px';
        } else if (lose) {
            popup.classList.remove('hide');
            popup.innerHTML = 'LOSE :(';
            reset.innerHTML = 'Try again';
            reset.style.width = '110px';
        }
    }
}

setInterval(addNull, 1000)
setInterval(checkWin, 1000)

function newGame() {
    reset.style.width = '80px';
    if (reset.textContent.includes('Try again')) {
        reset.innerHTML = 'reset';
    }
    popup.classList.add('hide');
    arrX = [];
    arrNull = [];
    clearField();
}

reset.addEventListener('click', newGame)