document.addEventListener("DOMContentLoaded", () => {
  // Фиксированный хедер
  const header = document.querySelector(".header");
  const main = document.querySelector(".main");
  const headerHeight = header.offsetHeight;

  // Инициализация слайдера
  const slider = document.querySelector(".slider");
  const slides = slider.querySelectorAll(".slider-item");
  const dots = slider.querySelectorAll(".dot");
  let currentSlide = 0;
  let isAnimating = false;
  let autoplayTimeout = null;

  function showSlide(index, withAnimation = false) {
    if (currentSlide === index && withAnimation) return;

    // Останавливаем текущий таймаут
    if (autoplayTimeout) {
      clearTimeout(autoplayTimeout);
    }

    // Если анимация уже идет, прерываем её
    if (isAnimating) {
      dots.forEach((dot) => {
        dot.classList.remove("loading");
      });
      isAnimating = false;
    }

    // Убираем все активные классы
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => {
      dot.classList.remove("active", "loading");
    });

    // Добавляем класс активности
    slides[index].classList.add("active");
    dots[index].classList.add("active");

    if (withAnimation) {
      isAnimating = true;
      dots[index].classList.add("loading");

      // Ждем окончания анимации
      setTimeout(() => {
        dots[index].classList.remove("loading");
        isAnimating = false;
        startAutoplay(); // Запускаем автопереключение после анимации
      }, 800);
    }

    // Показываем текущий слайд
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });

    currentSlide = index;
  }

  function startAutoplay() {
    // Очищаем предыдущий таймаут если есть
    if (autoplayTimeout) {
      clearTimeout(autoplayTimeout);
    }

    // Устанавливаем новый таймаут
    // autoplayTimeout = setTimeout(() => {
    //   if (!isAnimating) {
    //     const nextSlide = (currentSlide + 1) % slides.length;
    //     showSlide(nextSlide, false);
    //     startAutoplay(); // Рекурсивно запускаем следующее переключение
    //   }
    // }, 5000);
  }

  // Обработчик клика по точкам
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      // Прерываем текущую анимацию если она есть
      if (isAnimating) {
        dots.forEach((d) => d.classList.remove("loading"));
        isAnimating = false;
      }

      if (currentSlide !== index) {
        showSlide(index, true);
      }
    });
  });

  // Обработчик наведения мыши на слайдер
  slider.addEventListener("mouseenter", () => {
    if (autoplayTimeout) {
      clearTimeout(autoplayTimeout);
    }
  });

  slider.addEventListener("mouseleave", () => {
    startAutoplay();
  });

  // Обработчики для нижних кнопок переключения
  document.querySelectorAll(".bottom-switch .switch-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      if (this.classList.contains("active")) return;

      const dots = document.querySelectorAll(".bottom-switch .switch-btn");
      dots.forEach((dot) => {
        dot.classList.remove("active", "loading");
      });

      // Добавляем классы для анимации
      this.classList.add("active", "loading");

      // Убираем класс loading после завершения анимации
      setTimeout(() => {
        this.classList.remove("loading");
      }, 800);
    });
  });

  // Показываем первый слайд и запускаем автопереключение
  showSlide(0, false);
  
});


document.addEventListener('DOMContentLoaded', function() {
  // Слайдер
  const slider = document.querySelector('.slider');
  const sliderDots = document.querySelectorAll('.slider-dots .dot');
  const sliderItems = document.querySelectorAll('.slider-item');
  
  // Модуль
  const moduleContainer = document.querySelector('.module-container');
  
  // Кнопки переключения видов (исправленный селектор)
  const switchBtns = document.querySelectorAll('.switch-btn');
  const pageBtn = document.querySelector('[data-view="page"]');
  const moduleBtn = document.querySelector('[data-view="module"]');

  // Функция переключения слайдов
  function showSlide(index) {
      sliderItems.forEach(item => item.classList.remove('active'));
      sliderDots.forEach(dot => dot.classList.remove('active'));
      
      sliderItems[index].classList.add('active');
      sliderDots[index].classList.add('active');
  }

  // Обработчики для точек слайдера
  sliderDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
          showSlide(index);
      });
  });

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

  // Инициализация
  showSlide(0);
  switchView('page');

  // Обработчик для кнопки "Вернуться к списку"
  const backButton = document.querySelector('.back-button');
  if (backButton) {
      backButton.addEventListener('click', function() {
          window.location.href = 'index.html';
      });
  }
});