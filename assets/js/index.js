document.addEventListener("DOMContentLoaded", function () {

    // 🔽 tumhara poora JS code yahan paste hoga

});

AOS.init({
    duration: 800,
    once: false,
    offset: 100
});

// Hide loading screen
window.addEventListener('load', function () {
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
        }, 500);
    }, 1000);
});

// Header scroll effect
window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
// Mobile menu toggle - SIMPLE VERSION
document.getElementById('mobileMenuBtn').addEventListener('click', function () {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');

    // Close when clicking outside
    document.addEventListener('click', function closeMenu(e) {
        if (!navLinks.contains(e.target) && e.target.id !== 'mobileMenuBtn') {
            navLinks.classList.remove('show');
            document.removeEventListener('click', closeMenu);
        }
    });
});

// Newsletter form submission
document.getElementById('newsletterForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = this.querySelector('.newsletter-input').value;

    // Show success message
    alert(`Thank you for subscribing with: ${email}\nYou'll receive updates soon!`);
    this.reset();

    // In a real app, you would send this to your backend
});

// Testimonial rotation
const testimonials = [
    {
        text: "\"StudyHub helped me go from 65% to 92% in just 6 months. The notes are so well-explained and the solutions made complex problems easy to understand!\"",
        name: "Ayush Aryan ",
        class: "Class 10 Student, Delhi",
        initials: "AA",
        rating: 5
    },
    {
        text: "\"As a parent, I was looking for reliable study materials for my child. StudyHub exceeded my expectations! The content is accurate, well-structured, and completely free.\"",
        name: "....",
        class: "class 7 student, Mumbai",
        initials: "..",
        rating: 4
    },
    {
        text: "\"The video explanations on StudyHub made difficult Science concepts so easy to understand. I went from struggling with Physics to topping my class!\"",
        name: "Gyandeo kumar",
        class: "Class 8 Student, Bihar",
        initials: "GK",
        rating: 5
    }
];

let currentTestimonial = 0;
const testimonialCard = document.querySelector('.testimonial-card');

function rotateTestimonial() {
    if (!testimonialCard) return;

    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    const testimonial = testimonials[currentTestimonial];

    // Fade out
    testimonialCard.style.opacity = '0';

    setTimeout(() => {
        testimonialCard.innerHTML = `
                    <div class="testimonial-rating">
                        ${'<i class="fas fa-star"></i>'.repeat(testimonial.rating)}
                        ${testimonial.rating < 5 ? '<i class="far fa-star"></i>'.repeat(5 - testimonial.rating) : ''}
                    </div>
                    <p class="testimonial-text">${testimonial.text}</p>
                    <div class="testimonial-author">
                        <div class="author-avatar">${testimonial.initials}</div>
                        <div class="author-info">
                            <h4>${testimonial.name}</h4>
                            <p>${testimonial.class}</p>
                        </div>
                    </div>
                `;

        // Fade in
        setTimeout(() => {
            testimonialCard.style.opacity = '1';
        }, 50);
    }, 300);
}

// Rotate testimonials every 8 seconds
if (testimonialCard) {
    setInterval(rotateTestimonial, 8000);

    // Initial rotation after 8 seconds
    setTimeout(rotateTestimonial, 8000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add hover effect to cards
document.querySelectorAll('.feature-card, .class-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-15px)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});
document.addEventListener("DOMContentLoaded", function () {

    const menuBtn = document.getElementById("mobileMenuBtn");
    const navLinks = document.querySelector(".nav-links");
    const authButtons = document.querySelector(".auth-buttons");

    if (menuBtn) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("show");
            authButtons.classList.toggle("show");
        });
    }

});
document.getElementById('globalSearch').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const query = this.value.toLowerCase();
        if (query.includes('class')) {
            window.location.href = 'class-6.html';
        } else if (query.includes('math')) {
            window.location.href = 'class-6.html#math';
        }
    }
});
