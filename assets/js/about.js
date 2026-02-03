addEventListener("DOMContentLoaded", function () {

    // 🔽 tumhara poora JS code yahan paste hoga

});
  // Initialize AOS animationsdocument.
        AOS.init({
            duration: 800,
            once: false,
            offset: 100
        });

        // Hide loading screen
        window.addEventListener('load', function() {
            setTimeout(() => {
                document.getElementById('loading').classList.add('hidden');
                setTimeout(() => {
                    document.getElementById('loading').style.display = 'none';
                }, 500);
            }, 1000);
        });

        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        document.getElementById('mobileMenuBtn').addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            const authButtons = document.querySelector('.auth-buttons');
            
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            authButtons.style.display = authButtons.style.display === 'flex' ? 'none' : 'flex';
            
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'white';
                navLinks.style.padding = '2rem';
                navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                navLinks.style.gap = '1rem';
                
                authButtons.style.position = 'absolute';
                authButtons.style.top = 'calc(100% + 200px)';
                authButtons.style.left = '0';
                authButtons.style.right = '0';
                authButtons.style.background = 'white';
                authButtons.style.padding = '2rem';
                authButtons.style.flexDirection = 'column';
                authButtons.style.gap = '1rem';
            }
        });

        // Newsletter form submission
        document.getElementById('newsletterForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('.newsletter-input').value;
            
            // Show success message
            alert(`Thank you for subscribing with: ${email}\nYou'll receive updates about our mission and impact!`);
            this.reset();
        });

        // Animate stats numbers
        function animateStats() {
            const statNumbers = document.querySelectorAll('.stat-number[data-count]');
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const suffix = stat.textContent.replace(/[0-9]/g, '');
                const duration = 2000;
                const step = 20;
                const increment = target / (duration / step);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    
                    if (suffix.includes('%')) {
                        stat.textContent = Math.round(current) + suffix;
                    } else if (suffix.includes('+')) {
                        stat.textContent = Math.round(current) + suffix;
                    } else {
                        stat.textContent = Math.round(current);
                    }
                }, step);
            });
        }

        // Animate stats when they come into view
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        // Observe the stats section
        const statsSection = document.querySelector('.impact-stats');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
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
        document.querySelectorAll('.mission-card, .stat-card, .team-card, .value-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                if (this.classList.contains('stat-card')) {
                    this.style.transform = 'translateY(-10px)';
                } else if (this.classList.contains('team-card')) {
                    this.style.transform = 'translateY(-15px)';
                } else if (this.classList.contains('mission-card')) {
                    this.style.transform = 'translateY(-15px)';
                } else if (this.classList.contains('value-card')) {
                    this.style.transform = 'translateX(10px)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                if (this.classList.contains('stat-card')) {
                    this.style.transform = 'translateY(0)';
                } else if (this.classList.contains('team-card')) {
                    this.style.transform = 'translateY(0)';
                } else if (this.classList.contains('mission-card')) {
                    this.style.transform = 'translateY(0)';
                } else if (this.classList.contains('value-card')) {
                    this.style.transform = 'translateX(0)';
                }
            });
        });