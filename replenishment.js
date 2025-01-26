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

/*
function openWinthdraw(){
    const tg_id = window.Telegram.WebApp.WebappInitData.user.id

    fetch(url, {
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
            return response.json(); // Преобразуем ответ в JSON
        })
        .then(data => {
    window.Telegram.WebApp.openTelegramLink(data.check_url);
    })
        .catch((error) => {
            console.error('Ошибка:', error);
        });
}


*/

const LobbyPage = document.getElementById('back-lobby-button');
LobbyPage.addEventListener('click', () => {
    loader.classList.remove('off');
    anime({
        targets: '.loader',
        opacity: [0, 1],
        duration: 500,
        easing: 'easeInOutExpo',
        complete: () => {
          window.location.href = 'index.html';
        },
      });
});


window.addEventListener('load', () => {
    anime({
        targets: ['.replenish-cont', '.withdraw-cont'],
        translateY: ['24.6vw', '0'],
        opacity: [0, 1],
        duration: 400,
        easing: 'easeOutExpo'
    });
    vibrateDevice(200)
});






const DepBut = document.getElementById('deposit');
let isAnimating = false; // Счетчик для отслеживания состояния анимации

DepBut.addEventListener('click', () => {
    //openDeposit(); // Ваша существующая функция

    if (isAnimating) return; // Если анимация уже идет, выходим из функции
    isAnimating = true; // Устанавливаем состояние анимации в true

    setTimeout(() => {

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-cont';
        errorDiv.id = 'error';
        errorDiv.innerHTML = '<img src="assets/error-close.png" alt="Image" class="error-window">';
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
        }, 1500);
    }, 0);
});



function openDeposit() {
    window.Telegram.WebApp.openTelegramLink("http://t.me/send?start=IVTGIPBCeUDC");
}


function vibrateDevice(duration) {
        if ("vibrate" in navigator) {
            navigator.vibrate(duration);
        } else {
            console.log("Вибрация не поддерживается на этом устройстве.");
        }
}
