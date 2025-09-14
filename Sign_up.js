const nameInput = document.getElementById('name');
const mobileInput = document.getElementById('mobile');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm-password');
const termsCheckbox = document.getElementById('terms');
const nameError = document.getElementById('name-error');
const mobileError = document.getElementById('mobile-error');
const passwordError = document.getElementById('password-error');
const confirmError = document.getElementById('confirm-error');
const signupBtn = document.getElementById('signup-btn');
const formMessage = document.getElementById('form-message');
const form = document.getElementById('signup-form');

// Validation functions
function validateName(val) {
    return val.trim().length >= 3;
}
function validateMobile(val) {
    return /^[0-9]{10}$/.test(val.trim());
}
function validatePassword(val) {
    return val.trim().length >= 6;
}
function passwordsMatch() {
    return passwordInput.value === confirmInput.value && confirmInput.value.trim() !== '';
}
function updateBtnState() {
    signupBtn.disabled = !(
        validateName(nameInput.value) &&
        validateMobile(mobileInput.value) &&
        validatePassword(passwordInput.value) &&
        passwordsMatch() &&
        termsCheckbox.checked
    );
}

// Input event listeners for validation
nameInput.addEventListener('input', (e) => {
    if (e.target.value && !validateName(e.target.value)) {
        nameError.textContent = 'Name must be at least 3 characters.';
        nameError.classList.remove('hidden');
    } else {
        nameError.classList.add('hidden');
    }
    updateBtnState();
});

mobileInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
    if (e.target.value && !validateMobile(e.target.value)) {
        mobileError.textContent = 'Enter a valid 10-digit mobile number.';
        mobileError.classList.remove('hidden');
    } else {
        mobileError.classList.add('hidden');
    }
    updateBtnState();
});

passwordInput.addEventListener('input', (e) => {
    if (e.target.value && !validatePassword(e.target.value)) {
        passwordError.textContent = 'Password must be at least 6 characters.';
        passwordError.classList.remove('hidden');
    } else {
        passwordError.classList.add('hidden');
    }
    updateBtnState();
});

confirmInput.addEventListener('input', (e) => {
    if (e.target.value && !passwordsMatch()) {
        confirmError.textContent = 'Passwords do not match.';
        confirmError.classList.remove('hidden');
    } else {
        confirmError.classList.add('hidden');
    }
    updateBtnState();
});

termsCheckbox.addEventListener('change', updateBtnState);

// Form submit
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload
    signupBtn.disabled = true;
    formMessage.classList.remove('hidden');
    formMessage.textContent = 'Creating account...';

    // Log input values to console
    console.log("Name:", nameInput.value);
    console.log("Mobile:", mobileInput.value);
    console.log("Password:", passwordInput.value);
    console.log("Confirm Password:", confirmInput.value);
    console.log("Terms accepted:", termsCheckbox.checked);

    // Save user data to localStorage
    localStorage.setItem('signupData', JSON.stringify({
        name: nameInput.value,
        mobile: mobileInput.value,
        password: passwordInput.value
    }));

    // Simulate account creation then redirect
    setTimeout(() => {
        formMessage.textContent = '✅ Account created successfully!';
        signupBtn.disabled = false;
       // window.location.href = "Sign_in.html";
    }, 1000);
});

// Initialize button state on page load
window.addEventListener('load', updateBtnState);
