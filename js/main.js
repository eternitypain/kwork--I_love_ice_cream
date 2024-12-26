// Добавьте этот код к существующему JavaScript
function initSlider() {
  const dots = document.querySelectorAll(".dot");
  const slides = document.querySelectorAll(".slider-item");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  // Автоматическое переключение слайдов
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);

  // Клик по точкам
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      currentSlide = i;
      showSlide(currentSlide);
    });
  });

  // Показываем первый слайд
  showSlide(0);
}

document.addEventListener("DOMContentLoaded", () => {
  initSlider();
});

// ==============================//

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider");
  const slides = slider.querySelectorAll(".slider-item");
  const dots = slider.querySelectorAll(".dot");
  let currentSlide = 0;
  let isAnimating = false;
  let autoplayTimeout = null;

  function showSlide(index, withAnimation = false) {
    if (isAnimating) return;
    if (currentSlide === index && withAnimation) return; // Предотвращаем повторное нажатие на активную точку

    // Останавливаем текущий таймаут
    if (autoplayTimeout) {
      clearTimeout(autoplayTimeout);
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
    autoplayTimeout = setTimeout(() => {
      if (!isAnimating) {
        const nextSlide = (currentSlide + 1) % slides.length;
        showSlide(nextSlide, false);
        startAutoplay(); // Рекурсивно запускаем следующее переключение
      }
    }, 5000);
  }

  // Обработчик клика по точкам
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      if (!isAnimating && currentSlide !== index) {
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

  // Показываем первый слайд и запускаем автопереключение
  showSlide(0, false);
  startAutoplay();
});

// // Предотвращение масштабирования через Ctrl + колесико мыши
// document.addEventListener('wheel', function(e) {
//   if (e.ctrlKey) {
//       e.preventDefault();
//   }
// }, { passive: false });

// // Предотвращение масштабирования через клавиатуру
// document.addEventListener('keydown', function(e) {
//   if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=')) {
//       e.preventDefault();
//   }
// });

// Добавляем обработчики для нижних кнопок переключения
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
