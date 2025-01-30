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










function openWinthdraw() {
    const tg_id = window.Telegram.WebApp.initDataUnsafe.user.id;

    fetch('https://a3c104a330d9a6.lhr.life/withdraw', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Указываем тип контента
            },
            body: JSON.stringify({'tg_id': tg_id}) // Преобразуем объект в JSON
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Преобразуем ответ в JSON
        })
        .then(data => {

            if (data.url === "error") {
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
            } else if (data.url === "no_money") {
                if (isAnimating) return;
                isAnimating = true;

                setTimeout(() => {

                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'error-cont';
                    errorDiv.id = 'error';
                    errorDiv.innerHTML = '<img src="assets/error-withdraw.svg" alt="Image" class="error-window">';
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
            }else {
                window.Telegram.WebApp.openTelegramLink(data.url);
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





const LobbyPage = document.getElementById('back-lobby-button');
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


window.addEventListener('load', () => {
    anime({
        targets: ['.replenish-cont', '.withdraw-cont'],
        translateY: ['24.6vw', '0'],
        opacity: [0, 1],
        duration: 400,
        easing: 'easeOutExpo'
    });
});





const WithBut = document.getElementById('withdraw');
WithBut.addEventListener('click', () => {
    openWinthdraw()
})

const DepBut = document.getElementById('deposit');
let isAnimating = false; // Счетчик для отслеживания состояния анимации






DepBut.addEventListener('click', () => {
    checkDeposit()
});



function openDeposit() {
    window.Telegram.WebApp.openTelegramLink("http://t.me/CryptoTestnetBot?start=IVjtvpByFTlG");
}



function checkDeposit() {

    const tg_id = window.Telegram.WebApp.initDataUnsafe.user.id;
    const first_name = window.Telegram.WebApp.initDataUnsafe.user.first_name;
    const last_name = window.Telegram.WebApp.initDataUnsafe.user.last_name;

    fetch('https://a3c104a330d9a6.lhr.life/replenish', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Указываем тип контента
        },
        body: JSON.stringify({ 'tg_id': tg_id, 'username': `${first_name} ${last_name}` })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.status === "success") {
            openDeposit();
            if (isAnimating) return; // Если анимация уже идет, выходим из функции
            isAnimating = true; // Устанавливаем состояние анимации в true
        
            setTimeout(() => {
        
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-cont';
                errorDiv.id = 'error';
                errorDiv.innerHTML = '<img src="assets/error-close.svg" alt="Image" class="error-window">';
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
        } else {
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

