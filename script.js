// Pricing Toggle
const billingToggle = document.getElementById('billing-toggle');
const toggleLabels = document.querySelectorAll('.toggle-label');
const priceAmounts = document.querySelectorAll('.plan-price .amount');

billingToggle.addEventListener('change', function() {
    const isYearly = this.checked;

    // Update toggle labels
    toggleLabels.forEach(label => {
        if (label.dataset.period === 'yearly') {
            label.classList.toggle('active', isYearly);
        } else {
            label.classList.toggle('active', !isYearly);
        }
    });

    // Update prices with animation
    priceAmounts.forEach(amount => {
        const monthly = amount.dataset.monthly;
        const yearly = amount.dataset.yearly;

        amount.style.opacity = '0';
        amount.style.transform = 'translateY(-10px)';

        setTimeout(() => {
            amount.textContent = isYearly ? yearly : monthly;
            amount.style.opacity = '1';
            amount.style.transform = 'translateY(0)';
        }, 150);
    });
});

// Add transition styles for price animation
priceAmounts.forEach(amount => {
    amount.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other items
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
        });

        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .pricing-card, .step, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add animate-in styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Toggle label click handlers
toggleLabels.forEach(label => {
    label.addEventListener('click', () => {
        if (label.dataset.period === 'yearly') {
            billingToggle.checked = true;
        } else {
            billingToggle.checked = false;
        }
        billingToggle.dispatchEvent(new Event('change'));
    });
});
