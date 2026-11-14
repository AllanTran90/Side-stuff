// Small progressive enhancements. The shop works without JavaScript.

// − / + buttons on quantity inputs
document.querySelectorAll('[data-stepper]').forEach((stepper) => {
    const input = stepper.querySelector('input');
    const min = Number(input.min) || 1;
    const max = Number(input.max) || 99;

    stepper.addEventListener('click', (event) => {
        const button = event.target.closest('[data-step]');
        if (!button) return;

        const next = (Number(input.value) || min) + Number(button.dataset.step);
        input.value = Math.min(max, Math.max(min, next));
    });
});

// Hide the flash message after a few seconds
const toast = document.querySelector('[data-toast]');
if (toast) {
    setTimeout(() => {
        toast.classList.add('is-hiding');
        toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, 3000);
}

// "Print receipt" button
document.querySelector('[data-print]')?.addEventListener('click', () => window.print());
