import { AppViewModel } from './viewmodels/AppViewModel.js';

document.addEventListener('DOMContentLoaded', () => {
    const viewModel = new AppViewModel();

    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const mockupContainer = document.getElementById('mockup-container');
    const faqList = document.getElementById('faq-list');

    function render() {
        // Hero Section
        const heroData = viewModel.getHeroData();

        // Mockups
        mockupContainer.innerHTML = viewModel.getMockupData().map((mockup, index) => `
            <div class="mockup-item">
                ${index === 0 ? '<img src="/src/assets/Logo_circle.svg" alt="" class="rotating-icon">' : ''}
                <img src="${mockup.src}" alt="${mockup.alt}">
            </div>
        `).join('');

        // FAQ Section (Initial Render)
        faqList.innerHTML = viewModel.getFaqData().map(item => `
            <div class="faq-item" data-id="${item.id}">
                <div class="faq-header">
                    <div class="faq-icon">+</div>
                    <div class="faq-question">${item.question}</div>
                </div>
                <div class="faq-content-wrapper">
                    <div class="faq-answer">
                        ${item.answer}
                    </div>
                </div>
            </div>
        `).join('');

        // Add event listeners once
        document.querySelectorAll('.faq-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.getAttribute('data-id'));
                viewModel.toggleFaq(id);
            });
        });

        // Initial sync
        updateFaqUI();
    }

    function updateFaqUI() {
        const faqData = viewModel.getFaqData();
        const faqElements = document.querySelectorAll('.faq-item');

        faqElements.forEach((el, index) => {
            const data = faqData[index];
            const icon = el.querySelector('.faq-icon');

            if (data.isOpen) {
                el.classList.add('active');
                icon.textContent = '−';
            } else {
                el.classList.remove('active');
                icon.textContent = '+';
            }
        });
    }

    // Initial render
    render();

    // Subscribe to state changes
    viewModel.subscribe(() => {
        updateFaqUI();
    });
});
