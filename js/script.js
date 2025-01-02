  // Функция переключения видов (слайдер/модуль)
  function switchView(view) {
    console.log('Switching to view:', view); // Для отладки
    
    // Убираем активный класс со всех кнопок
    document.querySelectorAll('.switch-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Добавляем активный класс нажатой кнопке
    document.querySelector(`[data-view="${view}"]`).classList.add('active');

    // Переключаем отображение контейнеров
    const sliderItem = document.querySelector('.slider-item');
    const moduleContainer = document.querySelector('.module-container');

    switch(view) {
        case 'page':
            if(sliderItem) sliderItem.style.display = 'block';
            if(moduleContainer) moduleContainer.style.display = 'none';
            break;
        case 'module':
            if(sliderItem) sliderItem.style.display = 'none';
            if(moduleContainer) moduleContainer.style.display = 'block';
            break;
        case 'queue':
            // Логика для режима "По очереди"
            break;
    }
}


// Добавляем обработчики для кнопок переключения
document.querySelectorAll('.switch-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        console.log('Button clicked:', btn.dataset.view); // Для отладки
        switchView(btn.dataset.view);
    });
});

// Добавляем инициализацию при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Находим кнопку с классом active и активируем соответствующий вид
    const activeBtn = document.querySelector('.switch-btn.active');
    if (activeBtn) {
        switchView(activeBtn.dataset.view);
    }
});