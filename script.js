document.addEventListener('DOMContentLoaded', () => {
  const supportButton = document.querySelector('.btn__support');
  const moreButton = document.querySelector('.btn__more');
  const recommendationsSection = document.querySelector('.recommendations');
  const image = document.querySelector('.recommendations__image');
  const mobileImagePlaceholder = document.querySelector('.recommendations__mobile-image');
  const moreSection = document.querySelector('.price-table');
  const trackMobile = document.querySelector('.carousel__track-mobile');
  const cardsMobile = Array.from(trackMobile.children);
  const indicatorContainer = document.querySelector('.stages__carousel-indicators');
  const track = document.querySelector('.carousel__track');
  const cards = Array.from(track.children);
  const nextButton = document.querySelector('.next__button');
  const prevButton = document.querySelector('.prev__button');
  const nextMobileButton = document.querySelector('.next__mobile');
  const prevMobileButton = document.querySelector('.prev__mobile');
  const currentSlideElement = document.querySelector('.current__slide');

  let cardWidth = cards[0].getBoundingClientRect().width;
  let visibleCards = window.innerWidth <= 640 ? 1 : (window.innerWidth <= 1199 ? 2 : 3);
  let currentIndex = 0;

  const logicalCardsCount = 5;
  let currentMobileIndex = 0;

  function scrollToSection(section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }

  supportButton.addEventListener('click', () => {
    scrollToSection(recommendationsSection);
  });

  moreButton.addEventListener('click', () => {
    scrollToSection(moreSection);
  });

  function moveImageForMobile() {
    if (window.innerWidth <= 1199) {
      // Изображение перемещается внутрь текста на мобильных устройствах и на планшетах
      if (mobileImagePlaceholder && image) {
        mobileImagePlaceholder.appendChild(image);
      }
    } else {
      // Изображение возвращается на его первоначальное место на больших экранах
      if (recommendationsSection && image) {
        recommendationsSection.appendChild(image);
      }
    }
  }

  moveImageForMobile();

  window.addEventListener('resize', moveImageForMobile);

  function updateSlidePosition() {
    cardWidth = cards[0].getBoundingClientRect().width;
    visibleCards = window.innerWidth <= 640 ? 1 : (window.innerWidth <= 1199 ? 2 : 3);

    const amountToMove = -cardWidth * currentIndex;
    track.style.transform = `translateX(${amountToMove}px)`;

    if (window.innerWidth <= 640) {
      currentSlideElement.textContent = currentIndex + 1;
    } else {
      currentSlideElement.textContent = `${Math.min(currentIndex + visibleCards, cards.length)}`;
    }
  }

  nextButton.addEventListener('click', () => {
    if (currentIndex + visibleCards < cards.length) {
      currentIndex += visibleCards;
    } else {
      currentIndex = 0;
    }

    updateSlidePosition();
  });

  prevButton.addEventListener('click', () => {
    if (currentIndex - visibleCards >= 0) {
      currentIndex -= visibleCards;
    } else {
      currentIndex = cards.length - visibleCards;
    }

    updateSlidePosition();
  });

  function autoSlide() {
    nextButton.click();
  }

  setInterval(autoSlide, 4000);

  window.addEventListener('resize', () => {
    updateSlidePosition();
  });

  updateSlidePosition();

  for (let i = 0; i < logicalCardsCount; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');

    if (i === 0) {
      dot.classList.add('active');
    }
    if (indicatorContainer) {
      indicatorContainer.appendChild(dot);
    }
  }

  const dots = Array.from(indicatorContainer.children);

  function updateCardPosition() {
    if (currentMobileIndex < 0) {
      currentMobileIndex = 0;
    }
    if (currentMobileIndex >= logicalCardsCount) {
      currentMobileIndex = logicalCardsCount - 1;
    }

    const amountToMove = -currentMobileIndex * 123;
    trackMobile.style.transform = `translateX(${amountToMove}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[currentMobileIndex]) {
      dots[currentMobileIndex].classList.add('active');
    }

    updateButtonState();
  }

  function updateButtonState() {
    if (currentMobileIndex === 0) {
      prevMobileButton.classList.add('disabled');
    } else {
      prevMobileButton.classList.remove('disabled');
    }

    if (currentMobileIndex >= logicalCardsCount - 1) {
      nextMobileButton.classList.add('disabled');
    } else {
      nextMobileButton.classList.remove('disabled');
    }
  }

  nextMobileButton.addEventListener('click', () => {
    if (currentMobileIndex < cardsMobile.length - 1) {
      currentMobileIndex += 1;
      updateCardPosition();
    }
  });

  prevMobileButton.addEventListener('click', () => {
    if (currentMobileIndex > 0) {
      currentMobileIndex -= 1;
      updateCardPosition();
    }
  });

  updateButtonState();
});
