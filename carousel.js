//https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry
//for publishing my package
class Carousel {
  constructor(container) {
    this.container = container;
    this.slides = Array.from(container.querySelectorAll('.slide'));
    this.prevBtn = container.querySelector('.prev');
    this.nextBtn = container.querySelector('.next');
    this.dotsContainer = container.querySelector('.dots');
    this.current = 0;
    this.autoSlideInterval = null;
    this.init();
  }

  init() {
    this.createDots();
    this.updateSlides();
    this.prevBtn.addEventListener('click', () => this.prev());
    this.nextBtn.addEventListener('click', () => this.next());
    this.autoSlide();
  }

  createDots() {
    this.dotsContainer.innerHTML = '';
    this.slides.forEach((k, i) => {
      const dot = document.createElement('span');
      dot.addEventListener('click', () => {
        this.current = i;
        this.updateSlides();
        this.resetTimer();
      });
      this.dotsContainer.appendChild(dot);
    });
  }

  updateSlides() {
    this.slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === this.current);
    });
    this.container.querySelector('.carousel').style.transform = `translateX(-${this.current * 100}%)`;
    const dots = this.dotsContainer.querySelectorAll('span');
    dots.forEach((dot, i) => dot.classList.toggle('active', i === this.current));
  }

  prev() {
    this.current = (this.current - 1 + this.slides.length) % this.slides.length;
    this.updateSlides();
    this.resetTimer();
  }

  next() {
    this.current = (this.current + 1) % this.slides.length;
    this.updateSlides();
    this.resetTimer();
  }

  autoSlide() {
    this.autoSlideInterval = setInterval(() => this.next(), 5000);
  }

  resetTimer() {
    clearInterval(this.autoSlideInterval);
    this.autoSlide();
  }
}

// Initialize carousel
document.querySelectorAll('.carousel-container').forEach(container => new Carousel(container));
