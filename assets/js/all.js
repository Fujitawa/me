document.addEventListener('DOMContentLoaded', (event) => {
    function positionGlasses() {
        var avatar = document.querySelector('.avatar');
        var img = document.querySelector('.me');
        var glasses = document.querySelector('.gl');
        glasses.style.position = "absolute";
        glasses.style.top = (img.offsetTop + img.offsetHeight / 2.5) - (glasses.offsetHeight / 2) + 'px';
        glasses.style.left = (img.offsetLeft + img.offsetWidth / 2) - (glasses.offsetWidth / 2.4) + 'px';
    }
    positionGlasses();
    window.onresize = positionGlasses;

    document.body.style.cursor = 'url(assets/img/cursor/normal.png), auto';

    var all = document.body.getElementsByTagName('*');

    for (var i=0, max=all.length; i < max; i++) {
        if (all[i].tagName == 'A' || 
            all[i].tagName == 'BUTTON' || 
            all[i].tagName == 'INPUT' || 
            all[i].tagName == 'TEXTAREA' || 
            all[i].tagName == 'SELECT' || 
            all[i].tagName == 'OPTION') {
            all[i].style.cursor = 'url(assets/img/cursor/hover.png), auto';
        }
    }


    document.querySelectorAll('.flex-item').forEach(item => {
        const info = item.querySelector('.info');
        const img = item.querySelector('img');

        item.addEventListener('mouseover', () => {
            const infoHeight = info.getBoundingClientRect().height;

            // Устанавливаем стили при наведении
            img.style.transform = `translateY(-${infoHeight}px)`;
            info.style.transform = 'translateY(0)';
        });

        item.addEventListener('mouseleave', () => {
            // Сбрасываем стили при убирании курсора
            img.style.transform = '';
            info.style.transform = 'translateY(100%)';
        });
    });

    document.querySelectorAll('[title]').forEach(item => {
        let tooltipText = item.getAttribute('title');
        item.removeAttribute('title');
        let tooltipSpan = document.createElement('span');
        tooltipSpan.classList.add('tooltiptext');
        tooltipSpan.textContent = tooltipText;
        item.classList.add('tooltip');
        item.appendChild(tooltipSpan);
    });
});
