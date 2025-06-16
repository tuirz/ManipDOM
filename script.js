// Carrousel JS
const slides = document.querySelectorAll('.carrousel-slide');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let current = 0;

function showSlide(index) {
  for (let i = 0; i < slides.length; i++) {
    if (i === index) {
      slides[i].classList.add('active');
    } else {
      slides[i].classList.remove('active');
    }
  }
}

prevBtn.addEventListener('click', function() {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
});

nextBtn.addEventListener('click', function() {
  current = (current + 1) % slides.length;
  showSlide(current);
});

showSlide(current);

