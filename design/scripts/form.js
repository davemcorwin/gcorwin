function verifyReCAPTCHA(event) {
  var reCAPTCHAResponse = grecaptcha.getResponse();
  if (reCAPTCHAResponse.length === 0) {
    event.preventDefault();
    return false;
  }
}

function registerReCAPTCHAVerification() {
  ['short-contact-form', 'long-contact-form', 'long-form']
    .map(name => document.forms[name])
    .filter(form => form !== undefined)
    .forEach(form => form.addEventListener('submit', verifyReCAPTCHA))
}

window.addEventListener('load', registerReCAPTCHAVerification);