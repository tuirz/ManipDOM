// Carrousel JS
if (document.querySelector('.carrousel-slide')) {
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
}

// Liste de courses JS
if (document.getElementById('course-form')) {
  const form = document.getElementById('course-form');
  const input = document.getElementById('course-input');
  const list = document.getElementById('course-list');
  const clear = document.getElementById('clear-courses');
  const save = document.getElementById('save-courses');
  const load = document.getElementById('load-courses');
  const sort = document.getElementById('sort-courses');

  function addItem(text) {
    const li = document.createElement('li');
    li.textContent = text;
    li.title = 'Clique pour supprimer';
    li.style.cursor = 'pointer';
    li.onclick = () => li.remove();
    list.appendChild(li);
  }

  form.onsubmit = function(e) {
    e.preventDefault();
    if (input.value.trim()) {
      addItem(input.value.trim());
      input.value = '';
      input.focus();
    }
  };

  clear.onclick = () => list.innerHTML = '';

  save.onclick = () => {
    const items = [];
    for (let li of list.children) items.push(li.textContent);
    localStorage.setItem('courses', JSON.stringify(items));
    alert('Liste sauvegardée !');
  };

  load.onclick = () => {
    list.innerHTML = '';
    const items = JSON.parse(localStorage.getItem('courses') || '[]');
    for (let item of items) addItem(item);
  };

  sort.onclick = () => {
    const items = [];
    for (let li of list.children) items.push(li.textContent);
    items.sort();
    list.innerHTML = '';
    for (let item of items) addItem(item);
  };
}

// Score Keeper JS
if (document.getElementById('btn-p1')) {
  let score1 = 0;
  let score2 = 0;
  let max = 5;
  const scoreP1 = document.getElementById('score-p1');
  const scoreP2 = document.getElementById('score-p2');
  const scoreMax = document.getElementById('score-max');
  const btnP1 = document.getElementById('btn-p1');
  const btnP2 = document.getElementById('btn-p2');
  const btnReset = document.getElementById('btn-reset');

  function updateDisplay() {
    scoreP1.textContent = score1;
    scoreP2.textContent = score2;
    if (score1 >= max) {
      scoreP1.style.color = 'green';
      scoreP2.style.color = '';
      btnP1.disabled = true;
      btnP2.disabled = true;
    } else if (score2 >= max) {
      scoreP2.style.color = 'green';
      scoreP1.style.color = '';
      btnP1.disabled = true;
      btnP2.disabled = true;
    } else {
      scoreP1.style.color = '';
      scoreP2.style.color = '';
      btnP1.disabled = false;
      btnP2.disabled = false;
    }
  }

  btnP1.onclick = function() {
    if (score1 < max && score2 < max) {
      score1++;
      updateDisplay();
    }
  };
  btnP2.onclick = function() {
    if (score1 < max && score2 < max) {
      score2++;
      updateDisplay();
    }
  };
  btnReset.onclick = function() {
    score1 = 0;
    score2 = 0;
    updateDisplay();
  };
  scoreMax.oninput = function() {
    max = parseInt(scoreMax.value) || 1;
    btnP1.disabled = false;
    btnP2.disabled = false;
    updateDisplay();
  };
  updateDisplay();
}
