function tabs() {
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
}

module.exports = tabs;