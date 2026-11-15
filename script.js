// Все элементы лайтбокса
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-image');
const closeBtn = document.getElementById('lightbox-close');
const prevBtn = document.getElementById('lightbox-prev');
const nextBtn = document.getElementById('lightbox-next');

// Текущая галерея (массив фото выбранного товара)
let currentGallery = [];
let currentIndex = 0;

// Функция открытия лайтбокса
function openLightbox(cardElement, startIndex = 0) {
    // Находим ВСЕ фото внутри этой карточки (и главное, и спрятанные)
    currentGallery = cardElement.querySelectorAll('.product-photo');
    
    // Запоминаем индекс, с которого начинаем (по умолчанию 0)
    currentIndex = startIndex;
    
    // Показываем первое фото
    updateLightboxImage();
    
    // Показываем лайтбокс
    lightbox.classList.add('active');
}

// Функция обновления картинки в лайтбоксе
function updateLightboxImage() {
    if (currentGallery.length === 0) return;
    const photo = currentGallery[currentIndex];
    lightboxImg.src = photo.src;
    lightboxImg.alt = photo.alt;
}

// Функция закрытия
function closeLightbox() {
    lightbox.classList.remove('active');
    currentGallery = []; // Очищаем, чтобы не было багов
}

// Листание вперёд
function nextImage() {
    if (currentGallery.length === 0) return;
    currentIndex = (currentIndex + 1) % currentGallery.length;
    updateLightboxImage();
}

// Листание назад
function prevImage() {
    if (currentGallery.length === 0) return;
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    updateLightboxImage();
}

// Вешаем событие на ВСЕ главные фото (которые видны)
document.querySelectorAll('.main-photo').forEach(photo => {
    photo.addEventListener('click', (e) => {
        // Находим родительский контейнер .product-image
        const card = e.target.closest('.product-image');
        // Открываем лайтбокс с этой карточкой
        openLightbox(card);
    });
});

// Кнопки управления
closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

// Клик по фону — закрыть
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Клавиши
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});