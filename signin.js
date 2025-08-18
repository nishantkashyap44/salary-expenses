
 document.getElementById("signin-btn").addEventListener("click", function () {
    window.location.href = "dashboard.html";
  });

const mobileInput = document.getElementById('mobile');
    const passwordInput = document.getElementById('password');
    const togglePwBtn = document.getElementById('toggle-password');
    const mobileError = document.getElementById('mobile-error');
    const passwordError = document.getElementById('password-error');
    const signInBtn = document.getElementById('signin-btn');
    const formMessage = document.getElementById('form-message');
    const form = document.getElementById('signin-form');

    function validateMobile(val) {
      return /^[0-9]{10}$/.test(val);
    }
    function validatePassword(val) {
      return val.trim().length >= 6;
    }
    function updateBtnState() {
      signInBtn.disabled = !(validateMobile(mobileInput.value) && validatePassword(passwordInput.value));
    }

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

    togglePwBtn.addEventListener('click', () => {
      const isHidden = passwordInput.type === 'password';
      passwordInput.type = isHidden ? 'text' : 'password';
      togglePwBtn.textContent = isHidden ? 'Hide' : 'Show';
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      signInBtn.disabled = true;
      formMessage.classList.remove('hidden');
      formMessage.textContent = 'Signing in...';
      setTimeout(() => {
        formMessage.textContent = '✅ Signed in successfully!';
        signInBtn.disabled = false;
      }, 1000);
    });

    window.addEventListener('load', updateBtnState);