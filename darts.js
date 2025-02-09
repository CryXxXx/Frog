const movingCircle = document.getElementById('movingCircle');
const filled = document.getElementById('filled');
const sliderContainer = document.querySelector('.slider-container');
const betNumberElement = document.querySelector('.bet-number'); // Элемент для вывода текущего значения


let currentValueIndex = 0;
let isDragging = false;
const totalMovementWidth = 81.5; // Общая длина передвижения кружка в vw
const increment = totalMovementWidth / 6; // Увеличение на одну шестую часть от 81.5vw


const values = ["0,25", "0,50", "1,00", "1,50", "2,00", "2,50", "3,00"];

function updateSlider() {
    const leftPosition = (currentValueIndex / 6) * totalMovementWidth;

    movingCircle.style.left = `${leftPosition}vw`; // Устанавливаем позицию кружка
    filled.style.width = `${(1.5 + currentValueIndex * increment)}vw`; // Обновляем ширину заполненной области
    betNumberElement.textContent = values[currentValueIndex]; // Обновляем текст в элементе bet-number
}

function getCurrentValueIndex(mouseX) {
    const totalWidth = sliderContainer.offsetWidth;
    const newIndex = Math.round((mouseX / totalWidth) * 6);
    return Math.max(0, Math.min(newIndex, 6));
}

// Обработчики событий для мыши
movingCircle.addEventListener('mousedown', (event) => {
    isDragging = true;
    document.body.style.cursor = 'grabbing';
    movingCircle.classList.add('dragging');
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
    movingCircle.classList.remove('dragging');
});

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

document.querySelector('.overlay').addEventListener('click', (event) => {
    const rect = sliderContainer.getBoundingClientRect();
    const mouseX = event.clientX - rect.left; // Позиция клика относительно sliderContainer
    currentValueIndex = getCurrentValueIndex(mouseX); // Получаем индекс ближайшего значения
    updateSlider(); // Обновляем состояние ползунка
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

































const editCircle = document.getElementById('edit-circle');
const enterWindow = document.getElementById('enter-window');
const backGame = document.getElementById('back-game');
const greyCont = document.getElementById('grey-cont');

let enterAnim = false;
let isAnimating = false;

editCircle.addEventListener('click', () => {
    if (enterAnim) return;
    enterAnim = true;

    enterWindow.classList.add('on');
    backGame.classList.add('on');
    anime({
        targets: enterWindow,
        opacity: [0, 1],
        duration: 500,
        easing: 'easeInOutExpo',
        complete: () => {
            greyCont.classList.add('on');
            anime({
                targets: ['#back-circle', '#enter-cont'],
                opacity: [0, 1],
                duration: 400,
                easing: 'easeInOutExpo',
                complete: () => {
                    amountInput.focus();
                }
            });
            anime({
                targets: '#gray-element',
                translateY: ['-15vw', '-3vw'],
                duration: 350,
                delay: 100,
                easing: 'spring',
            });
            enterAnim = false;
        },
    });
});

function resetAnimation() {
    anime.set('#gray-element', {
        translateY: '-15vw',
    });

    enterWindow.classList.remove('on');
    backGame.classList.remove('on');
    greyCont.classList.remove('on');
}

function animateElements() {
    anime({
        targets: ['#back-circle', '#enter-cont', '#enter-window'],
        opacity: [1, 0],
        duration: 600,
        easing: 'easeInOutExpo',
        complete: () => {
            resetAnimation();
            enterAnim = false;
        }
    });
}



const amountInput = document.getElementById('amount-input');
const amountText = document.querySelector('.amount-text');

amountInput.addEventListener('input', () => {
    let inputValue = amountInput.value;

    // Заменяем точки на запятые
    inputValue = inputValue.replace('.', ',');

    // Оставляем только цифры и одну запятую
    inputValue = inputValue.replace(/[^0-9,]/g, '');

    // Ограничиваем количество запятых до одной
    const parts = inputValue.split(',');
    if (parts.length > 2) {
        inputValue = parts[0] + ',' + parts.slice(1).join('');
    }

    amountInput.value = inputValue;
    amountText.textContent = inputValue || 'Enter Amount';
});

amountInput.addEventListener('blur', () => {
    let inputValue = amountInput.value.replace(',', '.');

    // Форматируем до двух знаков после запятой
    if (!isNaN(inputValue) && inputValue !== '') {
        inputValue = parseFloat(inputValue).toFixed(2).replace('.', ',');
        amountInput.value = inputValue;
        amountText.textContent = inputValue;
    }

    // Проверяем минимальное значение
    const numericValue = parseFloat(inputValue.replace(',', '.'));
    if (numericValue < 0.25) {
        // Сбрасываем текст и значение
        amountInput.value = '';
        amountText.textContent = 'Enter Amount';

        // Показываем клавиатуру снова
        amountInput.focus();

        // Если анимация уже идет, выходим
        if (isAnimating) return;

        isAnimating = true;

        // Создаем и отображаем сообщение об ошибке
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-cont';
        errorDiv.id = 'error';
        errorDiv.innerHTML = '<img src="assets/error-min-bet.svg" alt="Image" class="error-window">';
        document.body.appendChild(errorDiv);

        setTimeout(() => {
            anime({
                targets: errorDiv,
                translateY: ['15vw', '0'],
                duration: 400,
                opacity: [0, 1],
                easing: 'easeInOutQuad',
                complete: () => {
                    setTimeout(() => {
                        anime({
                            targets: errorDiv,
                            translateY: ['0', '15vw'],
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
    } else {
        // Проверяем, равно ли значение "Enter Amount"
        if (amountText.textContent === 'Enter Amount') {
            animateElements();
            return;
        }

        if (!values.includes(inputValue)) {
            currentValueIndex = values.length - 1;
        } else {
            currentValueIndex = values.indexOf(inputValue);
        }

        updateSlider();
        betNumberElement.textContent = inputValue;

        animateElements();
    }
});


               





















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



let gameInProgress = false; // Флаг для отслеживания состояния игры

if (window.Telegram.WebApp.initDataUnsafe) {
    const tg_id = window.Telegram.WebApp.initDataUnsafe.user.id;
    info(tg_id);
}

setInterval(() => {
    if (!gameInProgress) {
        if (window.Telegram.WebApp.initDataUnsafe) {
            const tg_id = window.Telegram.WebApp.initDataUnsafe.user.id;
            info(tg_id);
        }
    }
}, 30000);

function info(tg_id) {
    fetch('https://9503cafe27f9d8.lhr.life/re_info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'tg_id': tg_id })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        let newValue = data.balance; // Получаем значение баланса из ответа
        updateBalance(newValue); // Обновляем баланс в элементе
    })
    .catch((error) => {
        if (isAnimating) return;
        isAnimating = true;

        setTimeout(() => {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-cont';
            errorDiv.id = 'error';
            errorDiv.innerHTML = '<img src="assets/error-all.svg" alt="Image" class="error-window">';
            document.body.appendChild(errorDiv);
            
            setTimeout(() => {
                anime({
                    targets: errorDiv,
                    translateY: ['15vw', '0'],
                    duration: 400,
                    opacity: [0, 1],
                    easing: 'easeInOutQuad',
                    complete: () => {
                        setTimeout(() => {
                            anime({
                                targets: errorDiv,
                                translateY: ['0', '15vw'],
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



function getCurrentBalance() {
    const userBalanceElement = document.getElementById('balance'); // Получаем элемент по ID
    return parseFloat(userBalanceElement.textContent.replace(',', '.')) || 0; // Преобразуем текст в число
}

function updateBalance(newBalance) {
    const userBalanceElement = document.getElementById('balance'); // Получаем элемент по ID
    userBalanceElement.textContent = parseFloat(newBalance).toFixed(2).replace('.', ','); // Обновляем текст с форматированием
}



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



function openDeposit() {
    window.Telegram.WebApp.openTelegramLink("http://t.me/CryptoTestnetBot?start=IVjtvpByFTlG");
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
    gameInProgress = false;
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

        const currentBalance = getCurrentBalance(); // Получаем текущий баланс
        
        const betAmount = parseFloat(values[currentValueIndex].replace(',', '.')); // Преобразуем ставку в число

        if (currentBalance < betAmount) {
            if (isAnimating) return;
            isAnimating = true;

            setTimeout(() => {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-dep-cont';
                errorDiv.id = 'deposit-error';
                errorDiv.innerHTML = '<img src="assets/error-deposit.svg" alt="Image" class="error-window">';
                document.body.appendChild(errorDiv);
                const depError = document.getElementById('deposit-error');
                depError.addEventListener('click', () => {
                    openDeposit();
                });
                setTimeout(() => {
                    anime({
                        targets: errorDiv,
                        translateY: ['-15vw', '0'],
                        duration: 400,
                        opacity: [0, 1],
                        easing: 'easeInOutQuad',
                        complete: () => {
                            setTimeout(() => {
                                anime({
                                    targets: errorDiv,
                                    translateY: ['0', '-15vw'],
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
            return;
        }

        // Обновляем баланс
        const newBalance = currentBalance - betAmount;
        updateBalance(newBalance); // Обновляем отображаемый баланс

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
                gameInProgress = true;

                const tg_id = window.Telegram.WebApp.initDataUnsafe.user.id;
                const username = window.Telegram.WebApp.initDataUnsafe.user.username;
                const coef = calculateCoef();

                fetch('https://9503cafe27f9d8.lhr.life/darts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        'tg_id': tg_id, 
                        'username': username, 
                        'coef': coef, 
                        'amount': betAmount // Используем betAmount
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    handleServerResponse(data);
                })
                .catch(error => {
                    if (isAnimating) return;
                    isAnimating = true;

                    setTimeout(() => {
                        const errorDiv = document.createElement('div');
                        errorDiv.className = 'error-cont';
                        errorDiv.id = 'error';
                        errorDiv.innerHTML = '<img src="assets/error-all.svg" alt="Image" class="error-window">';
                        document.body.appendChild(errorDiv);
                        
                        setTimeout(() => {
                            anime({
                                targets: errorDiv,
                                translateY: ['15vw', '0'],
                                duration: 400,
                                opacity: [0, 1],
                                easing: 'easeInOutQuad',
                                complete: () => {
                                    setTimeout(() => {
                                        anime({
                                            targets: errorDiv,
                                            translateY: ['0', '15vw'],
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
    const betMenuCont = document.querySelector('.bet-menu-cont');

    let selectedValues;

    if (result.status === 'win') {
        selectedValues = winningValues[selectedOptionType];
    } else if (result.status === 'lose') {
        selectedValues = losingValues.filter(value => !winningValues[selectedOptionType].includes(value));
    } else if (result.status === 'no_money') {

        if (isAnimating) return;
        isAnimating = true;

        setTimeout(() => {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-dep-cont';
            errorDiv.id = 'deposit-error';
            errorDiv.innerHTML = '<img src="assets/error-deposit.svg" alt="Image" class="error-window">';
            document.body.appendChild(errorDiv);
            const depError = document.getElementById('deposit-error')
            depError.addEventListener('click', () => {
            openDeposit()
            });
            setTimeout(() => {
                anime({
                    targets: errorDiv,
                    translateY: ['-15vw', '0'],
                    duration: 400,
                    opacity: [0, 1],
                    easing: 'easeInOutQuad',
                    complete: () => {
                        setTimeout(() => {
                            anime({
                                targets: errorDiv,
                                translateY: ['0', '-15vw'],
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
        return;
    }

    const randomIndex = Math.floor(Math.random() * selectedValues.length);
    const randomValue = selectedValues[randomIndex];

    const newImageSrc = `assets/darts-apng-${randomValue}.png`;
    const newImage = new Image();
    newImage.src = newImageSrc;

    newImage.onload = function() {
        const currentImage = document.getElementById('myAPNG');
        const apgCont = document.getElementById('apng-container');
        const userBalanceElement = document.querySelector('.user-balance'); 

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
                    let currentBalance = parseFloat(userBalanceElement.textContent.replace(',', '.')) || 0;
                    if (result.status === 'win') {
                        currentBalance += parseFloat(result.amount); // Добавляем сумму к балансу
                    }
                    userBalanceElement.textContent = currentBalance.toFixed(2).replace('.', ',');

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





