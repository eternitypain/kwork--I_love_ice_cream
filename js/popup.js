document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы
    const logoButton = document.querySelector('.header__menu-logo-img');
    const popup = document.getElementById('logoPopup');
    const closeButton = document.querySelector('.close-popup');

    // Открываем попап при клике на лого
    logoButton.addEventListener('click', function(e) {
        e.preventDefault();
        popup.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
    });

    // Закрываем попап при клике на крестик
    closeButton.addEventListener('click', function() {
        popup.style.display = 'none';
        document.body.style.overflow = ''; // Возвращаем прокрутку страницы
    });

    // Закрываем попап при клике вне изображения
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Закрываем попап при нажатии Esc
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.style.display === 'block') {
            popup.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});