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








const DicePage = document.getElementById('dice-page');
const SlotPage = document.getElementById('slot-page');
const DartsPage = document.getElementById('darts-page');
const RepPage = document.getElementById('replenish-button');
const loader = document.getElementById('loader');
const DartsLogo = document.getElementById('darts-logo')
const DiceLogo = document.getElementById('dice-logo')
const SlotLogo = document.getElementById('slot-logo')



const playersAmountElements = document.querySelectorAll('.players-amount');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

playersAmountElements.forEach((element) => {
    const randomNumber = getRandomInt(5, 10); // Генерируем случайное число от 5 до 10
    element.textContent = randomNumber; // Устанавливаем текст элемента
});














/*

function when_page_start(callback) {
    
    place_coef();
    place_init_user_info();

    setInterval(() => {
        const tg_id = window.Telegram.WebApp.WebappInitData.user.id;
        info(tg_id);
    }, 10000);


    callback();
}

window.addEventListener('load', () => {
    when_page_start(() => {
        anime({
            targets: ['.loader'],
            opacity: [1, 0],
            duration: 800,
            delay: 1200,
            easing: 'easeInOutExpo',
            complete: () => {
                loader.classList.add('off');
            },
        });
    });
});
*/
window.addEventListener('load', () => {
    anime({
        targets: ['.loader'],
        opacity: [1, 0],
        duration: 800,
        delay: 2000,
        easing: 'easeInOutExpo',
        complete: () => {
            loader.classList.add('off');
        },
    });
});



if (window.Telegram.WebApp.initDataUnsafe) {

    place_coef();
    place_init_user_info();

    setInterval(() => {
        const tg_id = window.Telegram.WebApp.initDataUnsafe.user.id; // Получаем tg_id
        info(tg_id); // Передаем tg_id в функцию info
    }, 10000); // Обновляем данные каждые 10 секунд
}








RepPage.addEventListener('click', () => {
  window.location.href = 'replenishment.html';
});


DartsPage.addEventListener('click', () => {
    loader.classList.remove('off');
    DartsLogo.classList.add('on')
    anime({
        targets: ['.loader', '.darts-logo-cont'],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeInOutExpo',
        complete: () => {
          window.location.href = 'darts.html';
        },
      });
});

DicePage.addEventListener('click', () => {
    loader.classList.remove('off');
    DiceLogo.classList.add('on')
    anime({
        targets: ['.loader', '.dice-logo-cont'],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeInOutExpo',
        complete: () => {
          window.location.href = 'dice.html';
        },
      });
});

SlotPage.addEventListener('click', () => {
    loader.classList.remove('off');
    SlotLogo.classList.add('on')
    anime({
        targets: ['.loader', '.slot-logo-cont'],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeInOutExpo',
        complete: () => {
          window.location.href = 'slot.html';
        },
      });
});



const Community = document.getElementById('community');
const Support = document.getElementById('support');
const ref = document.getElementById('ref')


Community.addEventListener('click', () => {
  openCommunity()
});

Support.addEventListener('click', () => {
    openSupport()
  });


function openCommunity() {
    window.Telegram.WebApp.openTelegramLink("https://t.me/EmojiBetCommunity");
}

function openSupport() {
    window.Telegram.WebApp.openTelegramLink("https://t.me/EmojiBetSupportBot");
}



let isAnimating = false;
const faq = document.getElementById('faq')
faq.addEventListener('click', () => {
    if (isAnimating) return; // Если анимация уже идет, выходим из функции
    isAnimating = true; // Устанавливаем состояние анимации в true
    setTimeout(() => {

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-cont';
        errorDiv.id = 'faq-error';
        errorDiv.innerHTML = '<img src="assets/error-faq.svg" alt="Image" class="error-window">';
        document.body.appendChild(errorDiv);
        const faqError = document.getElementById('faq-error')
        faqError.addEventListener('click', () => {
        openSupport()
        });
        
        setTimeout(() => {
            anime({
                targets: errorDiv,
                translateY: ['15vw', '0'], // Движение вниз на 15vw
                duration: 400,
                opacity: [0, 1],
                easing: 'easeInOutQuad',
                complete: () => {
                    setTimeout(() => {
                        anime({
                            targets: errorDiv,
                            translateY: ['0', '15vw'], // Возвращение на исходную позицию
                            duration: 400,
                            opacity: [1, 0],
                            easing: 'easeInOutQuad',
                            complete: () => {
                                errorDiv.remove();
                                isAnimating = false;
                            }
                        });
                    }, 2000);
                }
            });
        }, 0);
    }, 0);
})

ref.addEventListener('click', () => {
    if (isAnimating) return; // Если анимация уже идет, выходим из функции
    isAnimating = true; // Устанавливаем состояние анимации в true
    setTimeout(() => {

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-cont';
        errorDiv.id = 'error';
        errorDiv.innerHTML = '<img src="assets/error-ref.svg" alt="Image" class="error-window">';
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            anime({
                targets: errorDiv,
                translateY: ['15vw', '0'], // Движение вниз на 15vw
                duration: 400,
                opacity: [0, 1],
                easing: 'easeInOutQuad',
                complete: () => {
                    setTimeout(() => {
                        anime({
                            targets: errorDiv,
                            translateY: ['0', '15vw'], // Возвращение на исходную позицию
                            duration: 400,
                            opacity: [1, 0],
                            easing: 'easeInOutQuad',
                            complete: () => {
                                errorDiv.remove();
                                isAnimating = false;
                            }
                        });
                    }, 2000);
                }
            });
        }, 0);
    }, 0);
})






































function place_coef() {
    
    fetch("https://31ee7ce5286315.lhr.life/get_last_game", {
        method: 'GET', // Указываем метод GET
        headers: {
            'Content-Type': 'application/json' // Указываем тип контента (необязательно для GET-запроса)
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Преобразуем ответ в JSON
    })
    .then(data => {
        updateGames(data); // Обработка полученных данных
    })
    .catch((error) => {
        console.error('Ошибка:', error);
    });
}






function place_init_user_info() {
/*
    const photoElement = document.getElementById('userPhoto');
    if (photoElement) {
        // Подставляем новый URL фотки
        photoElement.src = user.photo_url;
    } else {
        console.error('Элемент для фото не найден');
    }
*/
    const tg_id = window.Telegram.WebApp.initDataUnsafe.user.id;
    const usernameElement = document.getElementById('username');

    if (usernameElement) {
        usernameElement.innerText = window.Telegram.WebApp.initDataUnsafe.user.username;
    } else {
        console.error('Элемент для имени пользователя не найден');
    }

    info(tg_id);
}







function info(tg_id) {
    fetch('https://31ee7ce5286315.lhr.life/re_info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Указываем тип контента
        },
        body: JSON.stringify({ 'tg_id': tg_id }) // Преобразуем объект в JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        let newValue = data.balance;
        const UserBal = document.getElementById('balance');

        if (UserBal.innerText !== newValue) {
            UserBal.innerText = newValue;
        }
    })
    .catch((error) => {
        if (isAnimating) return; // Если анимация уже идет, выходим из функции
        isAnimating = true; // Устанавливаем состояние анимации в true

        setTimeout(() => {

            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-cont';
            errorDiv.id = 'error';
            errorDiv.innerHTML = '<img src="assets/error-all.svg" alt="Image" class="error-window">';
            document.body.appendChild(errorDiv);
            
            setTimeout(() => {
                anime({
                    targets: errorDiv,
                    translateY: ['15vw', '0'], // Движение вниз на 15vw
                    duration: 400,
                    opacity: [0, 1],
                    easing: 'easeInOutQuad',
                    complete: () => {
                        setTimeout(() => {
                            anime({
                                targets: errorDiv,
                                translateY: ['0', '15vw'], // Возвращение на исходную позицию
                                duration: 400,
                                opacity: [1, 0],
                                easing: 'easeInOutQuad',
                                complete: () => {
                                    errorDiv.remove();
                                    isAnimating = false;
                                }
                            });
                        }, 2000);
                    }
                });
            }, 0);
        }, 0);
    });
}





function updateGames(last_game_list) {
    const blocks = document.querySelectorAll('.last-game');
    blocks.forEach((block, index) => {
        const gameData = last_game_list[`${index + 1}game`];
        const { Profit, user, data, game } = gameData;


        const gameInfo = block.querySelector('.game-info');
        gameInfo.textContent = `@${user} в ${data}`;


        const gameProfit = block.querySelector('.game-profit');
        gameProfit.innerHTML = `<span style="color: #a1a1a1;">+ </span>${Profit}`;


        const imagePath = (game) => {
            if (game === 'dice') {
                return Profit >= 3.7 ? 'assets/dice-sup-plate.svg' : 'assets/dice-def-plate.svg';
            } else if (game === 'darts') {
                return Profit >= 3.7 ? 'assets/darts-sup-plate.svg' : 'assets/darts-def-plate.svg';
            } else if (game === 'slot') {
                return Profit >= 3.7 ? 'assets/slot-sup-plate.svg' : 'assets/slot-def-plate.svg';
            }
            return '';
        };

        const gamePlate = document.createElement('img');
        gamePlate.src = imagePath(game);
        gamePlate.alt = "Game Plate";
        gamePlate.classList.add('game-plate');
        block.appendChild(gamePlate);

        // Установка цвета текста в game-info
        const textColor = Profit >= 3.7 ? '#f0f0f0' : '#a1a1a1';
        gameInfo.style.color = textColor;
    });
}












/*
// Пример массива с данными о последних играх
let last_game_list = {
    "1game": {"Profit": 4.0, "user": 'username1', "data": '00:00', "game": 'darts'},
    "2game": {"Profit": 2.5, "user": 'username2', "data": '00:05', "game": 'dice'},
    "3game": {"Profit": 3.8, "user": 'username3', "data": '00:10', "game": 'slot'},
    "4game": {"Profit": 1.2, "user": 'username4', "data": '00:15', "game": 'darts'},
    "5game": {"Profit": 3.0, "user": 'username5', "data": '00:20', "game": 'dice'}
};

// Константы для высоты блока и общего смещения
const BLOCK_HEIGHT_VW = 8.33; // Высота блока в vw
const OFFSET_ADDITIONAL_VW = 2.083; // Дополнительное смещение в vw
const TOTAL_OFFSET_VW = BLOCK_HEIGHT_VW + OFFSET_ADDITIONAL_VW; // Общее смещение в vw




// Функция для обновления блока с игрой
function updateGameBlock(gameData, block) {
    const { Profit, user, data, game } = gameData;

    // Подстановка информации в game-info
    const gameInfo = block.querySelector('.game-info');
    gameInfo.textContent = `@${user} в ${data}`;

    // Подстановка информации в game-profit
    const gameProfit = block.querySelector('.game-profit');
    gameProfit.innerHTML = `<span style="color: #a1a1a1;">+ </span>${Profit}`; // Добавляем символ «+» с нужным цветом

    // Определение изображения в зависимости от игры и прибыли
    const imagePath = getImagePath(game, Profit);
    const gamePlate = document.createElement('img'); // Создаем элемент img
    gamePlate.src = imagePath; // Устанавливаем путь к изображению
    gamePlate.alt = "Game Plate"; // Устанавливаем альтернативный текст
    gamePlate.classList.add('game-plate'); // Добавляем класс game-plate
    block.appendChild(gamePlate); // Добавляем изображение в блок

    // Установка цвета текста в game-info
    const textColor = Profit >= 3.7 ? '#f0f0f0' : '#a1a1a1';
    gameInfo.style.color = textColor; // Изменение цвета текста
}

// Функция для получения пути к изображению в зависимости от игры и прибыли
function getImagePath(game, Profit) {
    if (game === 'dice') {
        return Profit >= 3.7 ? 'assets/dice-sup-plate.svg' : 'assets/dice-def-plate.svg';
    } else if (game === 'darts') {
        return Profit >= 3.7 ? 'assets/darts-sup-plate.svg' : 'assets/darts-def-plate.svg';
    } else if (game === 'slot') {
        return Profit >= 3.7 ? 'assets/slot-sup-plate.svg' : 'assets/slot-def-plate.svg';
    }
    return ''; // Возвращаем пустую строку, если игра не распознана
}




// Функция для обновления всех блоков с играми
function updateGames() {
    const blocks = document.querySelectorAll('.last-game');
    for (let i = 0; i < blocks.length; i++) {
        updateGameBlock(last_game_list[`${i + 1}game`], blocks[i]);
    }
}


// Функция для анимации смещения блоков вниз
function animateBlocksDown(n) {
    const blocks = document.querySelectorAll('.last-game');
    const blockHeight = TOTAL_OFFSET_VW * (window.innerWidth / 100); // Общее смещение в пикселях
    const translateY = n * blockHeight; // Расчет общего смещения

    // Применение анимации к каждому блоку
    blocks.forEach(block => {
        block.style.transform = `translateY(${translateY}px)`;
    });
}


// Функция для получения новых данных с сервера
function fetchNewData() {
    // Здесь должен быть код для запроса данных с сервера
    // Например, мы просто будем обновлять last_game_list случайными значениями для демонстрации

    // Имитация получения новых данных
    const newGameData = {
        "1game": {"Profit": Math.random() * 5, "user": 'username6', "data": '00:25', "game": 'darts'},
        "2game": {"Profit": Math.random() * 5, "user": 'username7', "data": '00:30', "game": 'dice'},
        "3game": {"Profit": Math.random() * 5, "user": 'username8', "data": '00:35', "game": 'slot'},
        "4game": {"Profit": Math.random() * 5, "user": 'username9', "data": '00:40', "game": 'darts'},
        "5game": {"Profit": Math.random() * 5, "user": 'username10', "data": '00:45', "game": 'dice'}
    };

    // Проверка на количество новых игр
    const newGamesCount = Object.keys(newGameData).length;
    if (newGamesCount > 0) {
        // Сохранение старых данных
        const oldGameData = last_game_list;

        // Обновление last_game_list новыми данными
        last_game_list = newGameData;

        // Анимация смещения блоков
        animateBlocksDown(newGamesCount);

        // Обновление блоков с новыми данными
        updateGames();

        // Удаление старых блоков (последние n)
        const gameContainer = document.querySelector('.last-games-cont');
        for (let i = 0; i < newGamesCount; i++) {
            gameContainer.removeChild(gameContainer.lastChild); // Удаляем последний блок
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateGames(); // Инициализация обновления при загрузке страницы
});

// Пример запроса обновления каждые 10 секунд
setInterval(() => {
    fetchNewData(); // Получение новых данных и обновление интерфейса
}, 10000);



























// Функция для обновления блока с игрой
function updateGameBlock(gameData, block) {
    const { Profit, user, data, game } = gameData;

    // Подстановка информации в game-info
    const gameInfo = block.querySelector('.game-info');
    gameInfo.textContent = `@${user} в ${data}`;

    // Подстановка информации в game-profit
    const gameProfit = block.querySelector('.game-profit');
    gameProfit.innerHTML = `<span style="color: #a1a1a1;">+ </span>${Profit}`; // Добавляем символ «+» с нужным цветом

    // Определение изображения в зависимости от игры и прибыли
    const imagePath = getImagePath(game, Profit);
    const gamePlate = document.createElement('img'); // Создаем элемент img
    gamePlate.src = imagePath; // Устанавливаем путь к изображению
    gamePlate.alt = "Game Plate"; // Устанавливаем альтернативный текст
    gamePlate.classList.add('game-plate'); // Добавляем класс game-plate
    block.appendChild(gamePlate); // Добавляем изображение в блок

    // Установка цвета текста в game-info
    const textColor = Profit >= 3.7 ? '#f0f0f0' : '#a1a1a1';
    gameInfo.style.color = textColor; // Изменение цвета текста
}
*/