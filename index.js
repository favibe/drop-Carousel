class Dropdown {
  constructor(container) {
    this.container = container;
    this.button = container.querySelector('.dropdown-btn');
    this.menu = container.querySelector('.dropdown-menu');
    this.init();
  }

  init() {
    // Toggle dropdown on click
    this.button.addEventListener('click', () => {
      this.menu.classList.toggle('visible');
    });

    // Hide menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.container.contains(e.target)) {
        this.menu.classList.remove('visible');
      }
    });
  }
}

// Initialize all dropdowns on the page
document.querySelectorAll('.dropdown').forEach((dropdownList) => {
  new Dropdown(dropdownList);
});
