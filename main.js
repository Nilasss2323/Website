// Находим форму и поля
const form = document.querySelector('.register-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Функция показа ошибки
function showError(input, message) {
    // Убираем старую ошибку
    const oldError = input.parentElement.querySelector('.error-message');
    if (oldError) oldError.remove();
    
    // Добавляем красную рамку
    input.style.borderColor = '#f44336';
    
    // Создаём сообщение об ошибке
    const error = document.createElement('p');
    error.className = 'error-message';
    error.style.color = '#f44336';
    error.style.fontSize = '12px';
    error.style.margin = '5px 0 0 0';
    error.textContent = message;
    input.parentElement.appendChild(error);
}

// Функция очистки ошибки
function clearError(input) {
    const oldError = input.parentElement.querySelector('.error-message');
    if (oldError) oldError.remove();
    input.style.borderColor = '';
}

// Валидация имени
function validateName() {
    const value = nameInput.value.trim();
    clearError(nameInput);
    
    if (value.length < 2) {
        showError(nameInput, 'Имя должно быть минимум 2 символа');
        return false;
    }
    if (!/^[а-яА-Яa-zA-Z]+$/.test(value)) {
        showError(nameInput, 'Имя может содержать только буквы');
        return false;
    }
    return true;
}

// Валидация email
function validateEmail() {
    const value = emailInput.value.trim();
    clearError(emailInput);
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        showError(emailInput, 'Введите корректный email');
        return false;
    }
    return true;
}

// Валидация пароля
function validatePassword() {
    const value = passwordInput.value;
    clearError(passwordInput);
    
    if (value.length < 6) {
        showError(passwordInput, 'Пароль должен быть минимум 6 символов');
        return false;
    }
    if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value)) {
        showError(passwordInput, 'Пароль должен содержать буквы и цифры');
        return false;
    }
    return true;
}

// Проверка при вводе
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);

// Проверка при отправке
form.addEventListener('submit', (e) => {
    e.preventDefault();  // ВСЕГДА блокируем отправку на сервер
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    
    if (!isNameValid || !isEmailValid || !isPasswordValid) {
        return;
    }
    
    // Сохраняем данные в localStorage
    localStorage.setItem('userName', nameInput.value.trim());
    localStorage.setItem('userEmail', emailInput.value.trim());
    
    // Переходим на главную
    window.location.href = 'main.html';
});