const prev = document.querySelectorAll('button.__carousel_prev');
const next = document.querySelectorAll('button.__carousel_next');
const slides = document.querySelectorAll('.__carousel_slides > div');
let dots;
let currentSlide = 0;

function slideTo(index) {
    currentSlide = index >= slides.length || index < 0 ? 0 : index;
    slides.forEach(elt => (elt.style.transform = `translateX(-${currentSlide * 100}%)`));
    dots.forEach(
        (elt, key) =>
            (elt.classList = `rounded-lg m-1 cursor-pointer border-[6px] border-solid ${key === currentSlide ? 'border-red-600' : 'border-gray-500'}`)
    );
}

for (let i = 0; i < slides.length; i++) {
    let dot = `<span data-slidId="${i}" class="rounded-lg m-1 cursor-pointer border-[6px] border-solid ${i == currentSlide ? 'border-red-600' : 'border-gray-500'}"></span>`;
    document.querySelector('.__carousel_dots').innerHTML += dot;
}

dots = document.querySelectorAll('.__carousel_dots > span');
dots.forEach((elt, key) => elt.addEventListener('click', () => slideTo(key)));

prev.forEach(elt => elt.addEventListener('click', () => slideTo(--currentSlide)));
next.forEach(elt => elt.addEventListener('click', () => slideTo(++currentSlide)));
