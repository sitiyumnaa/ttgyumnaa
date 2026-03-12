// Dark Mode Logic
const darkBtn = document.getElementById('dark-btn');
const body = document.body;
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    body.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);
}

function updateIcon(theme) {
    darkBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    darkBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
}

darkBtn.addEventListener('click', () => {
    const theme = body.getAttribute('data-theme');
    if (theme === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        updateIcon('light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        updateIcon('dark');
    }
});

// Sticky Navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.pastel-nav');
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// Form Validation & Submission
const form = document.getElementById('contactForm');

form.addEventListener('submit', function(e) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    clearErrors();
    let isValid = true;

    if (!nameInput.value.trim()) {
        showError(nameInput, 'Nama tidak boleh kosong');
        isValid = false;
    }

    if (!emailInput.value.trim()) {
        showError(emailInput, 'Email tidak boleh kosong');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, 'Format email tidak valid');
        isValid = false;
    }

    if (!messageInput.value.trim()) {
        showError(messageInput, 'Pesan tidak boleh kosong');
        isValid = false;
    }

    if (!isValid) {
        e.preventDefault();
        return;
    }
    
    // Form akan terkirim ke Formspree secara otomatis
    // (Jangan gunakan e.preventDefault() di sini)
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input, message) {
    input.classList.add('input-error');
    let errorDiv = input.parentElement.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.classList.add('error-message');
        input.parentElement.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function clearErrors() {
    document.querySelectorAll('input, textarea').forEach(i => i.classList.remove('input-error'));
    document.querySelectorAll('.error-message').forEach(e => e.style.display = 'none');
}

// Initialize AOS
if (typeof AOS !== 'undefined') AOS.init();