window.addEventListener("DOMContentLoaded", () => {
    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent'),
        tabheaderItem = document.querySelector('.tabheader__items');


    function hideTabs() {
        tabContent.forEach(item => {
            item.style.display = 'none';
            item.classList.remove('fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })

    }

    function showTab(num = 0) {
        tabContent[num].style.display = 'block';
        // tabContent[num].classList.add('tabheader__item_active', 'fade');
        tabs[num].classList.add("tabheader__item_active", 'fade');
    }


    tabheaderItem.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target === item) {
                    hideTabs();
                    showTab(i);
                }
            })
        }
    });

    hideTabs();
    showTab();


    // Timer

    const deadLine = '2023-06-7';

    function getTimeRemaining(endTime) {
        let days,
            hours,
            minutes,
            seconds;

        const t = Date.parse(endTime) - Date.parse(new Date());
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
                days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor(t / (1000 * 60 * 60) % 24),
                minutes = Math.floor((t / 1000 / 60) % 60),
                seconds = Math.floor((t / 1000) % 60);
        }

        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        }

    }

    function getZero(num) {
        if (num < 10) {
            return `0${num}`
        } else {
            return num;
        }
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            setTimeInterval = setInterval(updateClock, 1000);


        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endTime);


            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);


            if (t.total <= 0) {
                clearInterval(setTimeInterval);
            }
        }
    }

    setClock('.timer', deadLine);


    // modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');


    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }


    modalTrigger.forEach(item => {
        item.addEventListener('click', openModal);
    });

    function modalClose() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', (e) =>{
        if(e.target === modal || e.target.getAttribute('data-close') == ''){
            modalClose();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.style.display === 'block') {
            modalClose();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight
            >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll',showModalByScroll);
        }
    }

    window.addEventListener('scroll',showModalByScroll);


    // class for cards

    class MenuCard {
        constructor(src, alt, title, description, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 36;
            this.changeToUAH();
        }


        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            }else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        10,
        '.menu .container',
        'menu__item',
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        15,
        '.menu .container',
        'menu__item',
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
        13,
        '.menu .container',
        'menu__item',
    ).render();

    // Forms
    const forms = document.querySelectorAll('form');

    const message = {
        loading : `img/form/spinner.svg`,
        success : `Спасибо, мы с вами свяжемся`,
        failure : `Что то пошло не так`,
    }

    forms.forEach(item =>{
        postData(item);
    });
    
    function postData(form) {
        form.addEventListener('submit', (e) => {
           e.preventDefault();

           const statusMessage = document.createElement('img');
           statusMessage.src = message.loading;
           statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;  
           `;
           form.append(statusMessage);
           // form.insertAdjacentHTML('afterend', statusMessage);

           const formData = new FormData(form);

           const object = {};
           formData.forEach(function (value, key){
              object[key] = value;
           });

            fetch('server.php', {
                method : 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(object),
            })
            .then(data => data.text())
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset();
            });
        })
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.style.display = 'none';
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
                <div class="modal__content">
                    <div class="modal__close" data-close>&times;</div>
                    <div class="modal__title">${message}</div>
                </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.style.display = 'block';
            modalClose();
        },4000);
    }
});


