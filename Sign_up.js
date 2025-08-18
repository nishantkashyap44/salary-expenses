 document.getElementById("signup-btn").addEventListener("click", function () {
      window.location.href = "signin.html";
    });
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

    function validateName(val) {
      return val.trim().length >= 3;
    }
    function validateMobile(val) {
      return /^[0-9]{10}$/.test(val);
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

    // Name validation
    nameInput.addEventListener('input', (e) => {
      if (e.target.value && !validateName(e.target.value)) {
        nameError.textContent = 'Name must be at least 3 characters.';
        nameError.classList.remove('hidden');
      } else {
        nameError.classList.add('hidden');
      }
      updateBtnState();
    });

    // Mobile validation
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

    // Password validation
    passwordInput.addEventListener('input', (e) => {
      if (e.target.value && !validatePassword(e.target.value)) {
        passwordError.textContent = 'Password must be at least 6 characters.';
        passwordError.classList.remove('hidden');
      } else {
        passwordError.classList.add('hidden');
      }
      updateBtnState();
    });

    // Confirm Password validation
    confirmInput.addEventListener('input', (e) => {
      if (e.target.value && !passwordsMatch()) {
        confirmError.textContent = 'Passwords do not match.';
        confirmError.classList.remove('hidden');
      } else {
        confirmError.classList.add('hidden');
      }
      updateBtnState();
    });

    // Terms checkbox
    termsCheckbox.addEventListener('change', updateBtnState);

    // Simulated submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      signupBtn.disabled = true;
      formMessage.classList.remove('hidden');
      formMessage.textContent = 'Creating account...';
      setTimeout(() => {
        formMessage.textContent = '✅ Account created successfully!';
        signupBtn.disabled = false;
      }, 1000);
    });

    window.addEventListener('load', updateBtnState);