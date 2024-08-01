const scriptURL = 'https://script.google.com/macros/s/AKfycbzTbCafdf_HUaUiweYAY6XvJ-X5kWIivUk48HfwRopa3nZbTpJJ_JsecOMfTnI24txV8A/exec';

const form = document.forms['contact-form'];
const submitButton = form.querySelector('input[type="submit"]');

form.addEventListener('submit', e => {
  e.preventDefault();
  
  const formData = new FormData(form);

  let isFormValid = true;
  document.getElementById("status").textContent = "";

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailField = form.querySelector('input[type="email"]');

  formData.forEach((value, key) => {
    if (!value.trim()) {
      isFormValid = false;
      document.getElementById("status").textContent = "Please fill in all fields.";
    }
  });

  if (isFormValid && emailField && !emailRegex.test(emailField.value.trim())) {
    isFormValid = false;
    document.getElementById("status").textContent = "Please enter a valid email address.";
  }

  if (isFormValid) {
    submitButton.disabled = true;

    fetch(scriptURL, { method: 'POST', body: formData })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        alert("Form has been submitted successfully!!");
      })
      .then(() => {
        window.location.reload();
      })
      .catch(error => {
        console.error('Error!', error.message);
        document.getElementById("status").textContent = "Oops! Something went wrong.";
        submitButton.disabled = false;
      });
  }
});
