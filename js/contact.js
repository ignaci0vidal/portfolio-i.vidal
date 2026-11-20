(() => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const button = form.querySelector('button[type="submit"]');
  const status = document.getElementById('contact-status');
  const fields = [...form.querySelectorAll('input:not([name="_gotcha"]), textarea')];
  const originalButton = button.innerHTML;
  const english = document.documentElement.lang === 'en';
  const messages = english ? {
    sending: 'Sending message...',
    success: 'Message sent. Thank you for getting in touch!',
    error: 'Error: your message could not be sent. Try again or email ignaciovidal@gmail.com.',
    timeout: 'Error: the service took too long to respond. Check whether your message arrived before trying again.',
    limit: 'Error: too many attempts. Wait a few minutes and try again.',
    invalid: 'Check the highlighted fields before sending.',
    required: 'Please complete this field.',
    email: 'Enter a valid email address.',
    short: 'Write a message with at least 10 characters.',
    phone: 'Enter a phone number with 7 to 15 digits; spaces, +, hyphens and parentheses are allowed.',
    spam: 'Error: the message could not be processed. Email ignaciovidal@gmail.com.',
    cooldown: 'Please wait 30 seconds before sending another message.',
  } : {
    sending: 'Enviando mensaje...',
    success: 'Mensaje enviado. ¡Gracias por contactarme!',
    error: 'Error: no se pudo enviar el mensaje. Intentá nuevamente o escribí a ignaciovidal@gmail.com.',
    timeout: 'Error: el servicio tardó demasiado en responder. Comprobá si el mensaje llegó antes de volver a intentar.',
    limit: 'Error: demasiados intentos. Esperá unos minutos y volvé a intentar.',
    invalid: 'Revisá los campos marcados antes de enviar.',
    required: 'Completá este campo.',
    email: 'Ingresá un correo electrónico válido.',
    short: 'Escribí un mensaje de al menos 10 caracteres.',
    phone: 'Ingresá un teléfono de 7 a 15 dígitos; podés usar espacios, +, guiones y paréntesis.',
    spam: 'Error: no se pudo procesar el mensaje. Escribí a ignaciovidal@gmail.com.',
    cooldown: 'Esperá 30 segundos antes de enviar otro mensaje.',
  };

  // Keep native HTML validation available when JavaScript is disabled.
  form.noValidate = true;
  let sending = false;
  let lastSuccess = 0;

  function showStatus(state, message) {
    status.dataset.state = state;
    status.textContent = message;
  }

  function validate(field) {
    field.setCustomValidity('');
    const value = field.value.trim();
    if (field.required && !value) field.setCustomValidity(messages.required);
    else if (field.type === 'email' && field.validity.typeMismatch) field.setCustomValidity(messages.email);
    else if (field.name === 'mensaje' && value.length < 10) field.setCustomValidity(messages.short);
    else if (field.name === 'telefono' && value &&
      (!/^[+0-9() .-]+$/.test(value) || value.replace(/[^0-9]/g, '').length < 7 || value.replace(/[^0-9]/g, '').length > 15)) {
      field.setCustomValidity(messages.phone);
    }
    const valid = field.validity.valid;
    field.setAttribute('aria-invalid', String(!valid));
    document.getElementById(field.id + '-error').textContent = valid ? '' : field.validationMessage;
    return valid;
  }

  fields.forEach((field) => {
    field.addEventListener('blur', () => validate(field));
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') validate(field);
      if (!sending) showStatus('', '');
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending) return;
    fields.forEach((field) => { field.value = field.value.trim(); });
    const valid = fields.map(validate).every(Boolean);
    if (!valid) {
      showStatus('error', messages.invalid);
      fields.find((field) => !field.validity.valid).focus();
      return;
    }
    if (form.elements.namedItem('_gotcha').value) {
      showStatus('error', messages.spam);
      return;
    }
    if (lastSuccess && Date.now() - lastSuccess < 30000) {
      showStatus('error', messages.cooldown);
      return;
    }

    sending = true;
    const data = new FormData(form);
    fields.forEach((field) => { field.readOnly = true; });
    button.disabled = true;
    button.textContent = messages.sending;
    form.setAttribute('aria-busy', 'true');
    showStatus('sending', messages.sending);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch(form.action, {
        method: 'POST', body: data,
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });
      if (!response.ok) {
        showStatus('error', response.status === 429 ? messages.limit : messages.error);
        return;
      }
      lastSuccess = Date.now();
      form.reset();
      fields.forEach((field) => {
        field.setCustomValidity('');
        field.removeAttribute('aria-invalid');
        document.getElementById(field.id + '-error').textContent = '';
      });
      showStatus('success', messages.success);
    } catch (error) {
      showStatus('error', error.name === 'AbortError' ? messages.timeout : messages.error);
    } finally {
      clearTimeout(timeout);
      sending = false;
      fields.forEach((field) => { field.readOnly = false; });
      button.disabled = false;
      button.innerHTML = originalButton;
      form.removeAttribute('aria-busy');
    }
  });
})();
