const movingCircle = document.getElementById('movingCircle');
const filled = document.getElementById('filled');
const sliderContainer = document.querySelector('.slider-container');
const betNumberElement = document.querySelector('.bet-number'); // Элемент для вывода текущего значения
const betPlusCont = document.querySelector('.bet-plus-cont'); // Элемент для кнопки "плюс"

let currentValueIndex = 0;
let isDragging = false;
const totalMovementWidth = 81.5; // Общая длина передвижения кружка в vw
const increment = totalMovementWidth / 6; // Увеличение на одну шестую часть от 81.5vw

// Массив значений, соответствующих индексам
const values = ["0,25", "0,50", "1,00", "1,50", "2,00", "2,50", "3,00"];

function updateSlider() {
    const leftPosition = (currentValueIndex / 6) * totalMovementWidth; // Используем 81.5vw вместо ширины контейнера

    movingCircle.style.left = `${leftPosition}vw`; // Устанавливаем позицию кружка
    filled.style.width = `${(1.5 + currentValueIndex * increment)}vw`; // Обновляем ширину заполненной области
    betNumberElement.textContent = values[currentValueIndex]; // Обновляем текст в элементе bet-number
}

function getCurrentValueIndex(mouseX) {
    const totalWidth = sliderContainer.offsetWidth;
    const newIndex = Math.round((mouseX / totalWidth) * 6); // Изменено на 6
    return Math.max(0, Math.min(newIndex, 6)); // Изменено на 6
}

// Обработчики событий для мыши
movingCircle.addEventListener('mousedown', (event) => {
    isDragging = true;
    document.body.style.cursor = 'grabbing';
    movingCircle.classList.add('dragging'); // Добавляем класс для активации псевдоэлемента
});

document.addEventListener('mousemove', (event) => {
    if (isDragging) {
        const rect = sliderContainer.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        currentValueIndex = getCurrentValueIndex(mouseX);
        updateSlider();
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.cursor = 'default';
    movingCircle.classList.remove('dragging'); // Убираем класс при отпускании
});

// Обработчики событий для сенсорных устройств
movingCircle.addEventListener('touchstart', (event) => {
    isDragging = true;
    document.body.style.cursor = 'grabbing';
    movingCircle.classList.add('dragging'); // Добавляем класс при удерживании
});

document.addEventListener('touchmove', (event) => {
    if (isDragging) {
        const rect = sliderContainer.getBoundingClientRect();
        const touchX = event.touches[0].clientX - rect.left; // Используем координаты первого касания
        currentValueIndex = getCurrentValueIndex(touchX);
        updateSlider();
    }
});

document.addEventListener('touchend', () => {
    isDragging = false;
    document.body.style.cursor = 'default';
    movingCircle.classList.remove('dragging'); // Убираем класс при отпускании
});

// Обработчик события для кнопки "плюс"
betPlusCont.addEventListener('click', () => {
    if (currentValueIndex < values.length - 1) { // Если текущее значение меньше максимального
        currentValueIndex++; // Увеличиваем индекс
        updateSlider(); // Обновляем положение круга и текст
    }
});

updateSlider();
///////////////////////////////////////////////////////////////////////////////////////




const LobbyPage = document.getElementById('back-lobby-button');
const loader = document.getElementById('loader');
const DartsLogo = document.getElementById('darts-logo')

window.addEventListener('load', () => {
    anime({
        targets: ['.loader', '.darts-logo-cont'],
        opacity: [1, 0],
        duration: 800,
        easing: 'easeInOutExpo',
        complete: () => {
          loader.classList.add('off');
          DartsLogo.classList.add('off')
        },
      });
});

LobbyPage.addEventListener('click', () => {
    loader.classList.remove('off');
    anime({
        targets: '.loader',
        opacity: [0, 1],
        duration: 800,
        easing: 'easeInOutExpo',
        complete: () => {
          window.location.href = 'index.html';
        },
      });
});


///////////////////////////////////////////////////////////////////////////////
/*
document.addEventListener('dragstart', (e) => {
    e.preventDefault(); // Отключает перетаскивание
});

document.addEventListener('contextmenu', (e) => {
    e.preventDefault(); // Отключает контекстное меню
});

// Отключение выделения при долгом нажатии на мобильных устройствах
document.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Предотвращает выделение
});

*/

////////////////////////////////////////////////////////////////////////////////////////
/*

const apgCont = document.getElementById('apng-container')
let activeOption = null;
let allDef = true; // Флаг, чтобы отслеживать состояние всех опций
let selectedOptionType = ''; // Переменная для хранения типа выбранной опции

function changeImage(selectedOption) {
    const defImage = selectedOption.querySelector('.def');
    const supImage = selectedOption.querySelector('.sup');

    // Если есть активный блок, и это не тот же самый блок
    if (activeOption && activeOption !== selectedOption) {
        const activeDefImage = activeOption.querySelector('.def');
        const activeSupImage = activeOption.querySelector('.sup');

        // Возвращаем активный блок к состоянию def
        activeDefImage.style.opacity = '1';
        activeSupImage.style.opacity = '0';
    }

    // Анимация для выбранного блока
    if (supImage.style.opacity === '0') {
        defImage.style.opacity = '0';
        supImage.style.opacity = '1';
        activeOption = selectedOption; // Устанавливаем активный блок
        selectedOptionType = selectedOption.classList[1]; // Сохраняем тип выбранной опции
        allDef = false; // Устанавливаем флаг, что не все опции в состоянии def
    } else {
        // Если уже активен, возвращаем его обратно
        defImage.style.opacity = '1';
        supImage.style.opacity = '0';
        activeOption = null; // Сбрасываем активный блок
        selectedOptionType = ''; // Сбрасываем тип выбранной опции
        allDef = true; // Устанавливаем флаг, что все опции теперь в состоянии def
    }

    // Управление состоянием bet-button
    toggleBetButton();
}

function toggleBetButton() {
    const betButtonDef = document.querySelector('.bet-button .def');
    const betButtonSup = document.querySelector('.bet-button .sup');

    if (allDef) {
        betButtonDef.style.opacity = '1';
        betButtonSup.style.opacity = '0';
    } else {
        betButtonDef.style.opacity = '0';
        betButtonSup.style.opacity = '1';
    }
}

function handleBetButtonClick() {
    const betButtonSup = document.querySelector('.bet-button .sup');

    if (betButtonSup.style.opacity === '1') {

        const betMenuCont = document.querySelector('.bet-menu-cont');
        const activeDefImage = activeOption.querySelector('.def');
        const activeSupImage = activeOption.querySelector('.sup');
        const betButtonDef = document.querySelector('.bet-button .def');
        const betButtonSup = document.querySelector('.bet-button .sup');

        anime({
            targets: apgCont,
            translateY: '10vh',
            duration: 600,
            easing: 'easeInOutQuad',
        });

        anime({
            targets: betMenuCont,
            translateY: '150%', // Сдвиг вниз на 150%
            duration: 800, // Длительность анимации
            easing: 'easeInOutQuad',
            update: function() {
                activeDefImage.style.opacity = '1';
                activeSupImage.style.opacity = '0';
                betButtonDef.style.opacity = '1';
                betButtonSup.style.opacity = '0';
            },
            complete: function() {
                anime({
                    targets: apgCont,
                    opacity: 0,
                    duration: 500,
                    easing: 'easeInOutQuad',
                });
                resetState();
            }
        });
    }
}

document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', () => changeImage(option));
});

// Добавляем обработчик событий для кнопки ставки
const BetBut = document.getElementById('bet-button');
BetBut.addEventListener('click', () => {
    handleBetButtonClick();
});

function resetState() {
    activeOption = null;
    allDef = true;
    selectedOptionType = '';
}

*/


document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', () => changeImage(option));
});

const BetBut = document.getElementById('bet-button');
BetBut.addEventListener('click', () => {
    handleBetButtonClick();
});


const apgCont = document.getElementById('apng-container');
let activeOption = null;
let allDef = true;
let selectedOptionType = '';
let coef = 0;

function changeImage(selectedOption) {
    const defImage = selectedOption.querySelector('.def');
    const supImage = selectedOption.querySelector('.sup');


    if (activeOption && activeOption !== selectedOption) {
        const activeDefImage = activeOption.querySelector('.def');
        const activeSupImage = activeOption.querySelector('.sup');


        activeDefImage.style.opacity = '1';
        activeSupImage.style.opacity = '0';
    }


    if (supImage.style.opacity === '0') {
        defImage.style.opacity = '0';
        supImage.style.opacity = '1';
        activeOption = selectedOption;
        selectedOptionType = selectedOption.classList[1];
        allDef = false;
    } else {
        
        defImage.style.opacity = '1';
        supImage.style.opacity = '0';
        activeOption = null;
        selectedOptionType = '';
        allDef = true;
    }   
    toggleBetButton();
}





function toggleBetButton() {
    const betButtonDef = document.querySelector('.bet-button .def');
    const betButtonSup = document.querySelector('.bet-button .sup');

    if (allDef) {
        betButtonDef.style.opacity = '1';
        betButtonSup.style.opacity = '0';
    } else {
        betButtonDef.style.opacity = '0';
        betButtonSup.style.opacity = '1';
    }
}

function resetState() {
    activeOption = null;
    allDef = true;
    selectedOptionType = '';
}

function calculateCoef() {
    switch (selectedOptionType) {
        case 'red':
            return 1.85;
        case 'white':
            return 2.85;
        case 'center':
            return 4.35;
        case 'miss':
            return 4.35;
        default:
            return 0;
    }
}




function handleBetButtonClick() {
    const betButtonSup = document.querySelector('.bet-button .sup');

    if (betButtonSup.style.opacity === '1') {
        const betMenuCont = document.querySelector('.bet-menu-cont');
        const activeDefImage = activeOption.querySelector('.def');
        const activeSupImage = activeOption.querySelector('.sup');
        const betButtonDef = document.querySelector('.bet-button .def');
        const betButtonSup = document.querySelector('.bet-button .sup');

        anime({
            targets: apgCont,
            translateY: '10vh',
            duration: 600,
            easing: 'easeInOutQuad',
        });

        anime({
            targets: betMenuCont,
            translateY: '150%',
            duration: 800,
            easing: 'easeInOutQuad',
            update: function() {
                activeDefImage.style.opacity = '1';
                activeSupImage.style.opacity = '0';
                betButtonDef.style.opacity = '1';
                betButtonSup.style.opacity = '0';
            },
            complete: function() {

                const tg_id = window.Telegram.WebApp.initDataUnsafe.user.id;
                const username = window.Telegram.WebApp.initDataUnsafe.user.username;
                const coef = calculateCoef();
                const betNumber = values[currentValueIndex].replace(',', '.');

                fetch('https://01245a322abb79.lhr.life/darts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        'tg_id': tg_id, 
                        'username': username, 
                        'coef': coef, 
                        'amount': betNumber
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    handleServerResponse(data); // Вызываем функцию с полученными данными
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                });
            }
        });
    }
}




function handleServerResponse(result) {
    const winningValues = {
        red: [1, 3, 5],
        white: [2, 4],
        center: [1],
        miss: [6],
    };

    const losingValues = [1, 2, 3, 4, 5, 6];

    let selectedValues;
    if (result.status === 'win') {
        selectedValues = winningValues[selectedOptionType];
    } else if (result.status === 'lose') {
        selectedValues = losingValues.filter(value => !winningValues[selectedOptionType].includes(value));
    }

    const randomIndex = Math.floor(Math.random() * selectedValues.length);
    const randomValue = selectedValues[randomIndex];

    const newImageSrc = `assets/dice-apng-${randomValue}.png`;
    const newImage = new Image(); // Создаем новый объект Image
    newImage.src = newImageSrc; // Устанавливаем путь к новому изображению

    newImage.onload = function() {
        const currentImage = document.getElementById('myAPNG');
        const apgCont = document.getElementById('apng-container');
        const betMenuCont = document.querySelector('.bet-menu-cont');
        const userBalanceElement = document.querySelector('.user-balance'); // Элемент для отображения баланса

        anime({
            targets: apgCont,
            opacity: 0,
            duration: 600,
            easing: 'easeInOutQuad',
            complete: () => {
                if (currentImage) {
                    currentImage.remove();
                }

                newImage.id = 'myAPNG';
                newImage.alt = 'Анимация';
                apgCont.appendChild(newImage);

                anime({
                    targets: apgCont,
                    opacity: 1,
                    duration: 600,
                    easing: 'easeInOutQuad',
                });
                setTimeout(() => {

                    let currentBalance = parseFloat(userBalanceElement.textContent.replace(',', '.')) || 0; // Получаем текущее значение баланса, заменяя запятую на точку
                    if (result.status === 'win') {
                        currentBalance += parseFloat(result.amount); // Добавляем сумму к балансу
                    }
                    userBalanceElement.textContent = currentBalance.toFixed(2).replace('.', ','); // Обновляем элемент с балансом, показывая 2 знака после запятой

                    resetState();

                    anime({
                        targets: apgCont,
                        translateY: 0,
                        duration: 600,
                        easing: 'easeInOutQuad',
                    });

                    anime({
                        targets: betMenuCont,
                        translateY: 0,
                        duration: 800,
                        easing: 'easeInOutQuad',
                    });
                }, 3500);
            }
        });
    };
}
