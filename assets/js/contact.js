document.addEventListener("DOMContentLoaded", function () {

    // 🔽 tumhara poora JS code yahan paste hoga

});

 // Initialize AOS animations
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
            }, 800);
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

        // Contact Form Submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const studentClass = document.getElementById('studentClass').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!firstName || !lastName || !email || !studentClass || !subject || !message) {
                alert('Please fill all required fields.');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                document.getElementById('successMessage').classList.add('show');
                
                // Reset form
                this.reset();
                
                // Scroll to success message
                document.getElementById('successMessage').scrollIntoView({ behavior: 'smooth' });
                
                // Restore button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    document.getElementById('successMessage').classList.remove('show');
                }, 5000);
                
                // In a real application, you would send this data to your backend
                console.log('Form submitted:', {
                    firstName,
                    lastName,
                    email,
                    studentClass,
                    subject,
                    message,
                    timestamp: new Date().toISOString()
                });
                
            }, 1500);
        });

        // FAQ Accordion
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                
                // Close all other FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    if (item !== faqItem) {
                        item.classList.remove('active');
                    }
                });
                
                // Toggle current FAQ item
                faqItem.classList.toggle('active');
            });
        });

        // Live Chat Simulation
        function startLiveChat() {
            const currentTime = new Date();
            const hours = currentTime.getHours();
            
            // Check if within business hours (10 AM - 8 PM)
            if (hours >= 10 && hours < 20) {
                alert('Live chat is now available! A support agent will join you shortly.');
                
                // In a real application, this would open a chat widget
                // For now, we'll simulate a chat interface
                setTimeout(() => {
                    const chatWindow = window.open('', '_blank', 'width=400,height=600');
                    if (chatWindow) {
                        chatWindow.document.write(`
                            <html>
                            <head>
                                <title>StudyHub Live Chat</title>
                                <style>
                                    body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
                                    .chat-header { background: #4361ee; color: white; padding: 15px; text-align: center; }
                                    .chat-messages { padding: 15px; height: 400px; overflow-y: auto; }
                                    .message { margin-bottom: 15px; padding: 10px; border-radius: 10px; max-width: 80%; }
                                    .support { background: #e0e7ff; align-self: flex-start; }
                                    .user { background: #4361ee; color: white; align-self: flex-end; margin-left: auto; }
                                    .chat-input { padding: 15px; border-top: 1px solid #ddd; display: flex; }
                                    .chat-input input { flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
                                    .chat-input button { background: #4361ee; color: white; border: none; padding: 10px 20px; margin-left: 10px; border-radius: 5px; cursor: pointer; }
                                </style>
                            </head>
                            <body>
                                <div class="chat-header">
                                    <h3>StudyHub Support</h3>
                                    <p>Chat with our support team</p>
                                </div>
                                <div class="chat-messages" id="chatMessages">
                                    <div class="message support">
                                        <strong>Support Agent:</strong><br>
                                        Hello! Welcome to StudyHub support. How can I help you today?
                                    </div>
                                </div>
                                <div class="chat-input">
                                    <input type="text" id="chatInput" placeholder="Type your message...">
                                    <button onclick="sendMessage()">Send</button>
                                </div>
                                <script>
                                    function sendMessage() {
                                        const input = document.getElementById('chatInput');
                                        const message = input.value.trim();
                                        if (message) {
                                            const chatMessages = document.getElementById('chatMessages');
                                            const userMessage = document.createElement('div');
                                            userMessage.className = 'message user';
                                            userMessage.innerHTML = '<strong>You:</strong><br>' + message;
                                            chatMessages.appendChild(userMessage);
                                            input.value = '';
                                            
                                            // Simulate auto-response after 2 seconds
                                            setTimeout(() => {
                                                const responses = [
                                                    "I understand. Let me check that for you.",
                                                    "Thanks for asking! Here's what I can tell you...",
                                                    "That's a great question! Many students ask about this.",
                                                    "I'll help you with that right away.",
                                                    "Let me connect you with our subject expert for this."
                                                ];
                                                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                                                const supportMessage = document.createElement('div');
                                                supportMessage.className = 'message support';
                                                supportMessage.innerHTML = '<strong>Support Agent:</strong><br>' + randomResponse;
                                                chatMessages.appendChild(supportMessage);
                                                chatMessages.scrollTop = chatMessages.scrollHeight;
                                            }, 2000);
                                            
                                            chatMessages.scrollTop = chatMessages.scrollHeight;
                                        }
                                    }
                                    
                                    // Allow Enter key to send message
                                    document.getElementById('chatInput').addEventListener('keypress', function(e) {
                                        if (e.key === 'Enter') {
                                            sendMessage();
                                        }
                                    });
                                <\/script>
                            </body>
                            </html>
                        `);
                    }
                }, 500);
            } else {
                alert('Live chat is available from 10 AM to 8 PM IST. Please try again during business hours or use our email support.');
            }
        }

        // Newsletter Form
        document.getElementById('newsletterForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('.newsletter-input').value;
            
            // Simple email validation
            if (email && email.includes('@') && email.includes('.')) {
                alert(`Thank you for subscribing with: ${email}\nYou'll receive updates about Class 6-10 study materials soon!`);
                this.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });

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

        // Auto-fill form with demo data for testing (remove in production)
        document.addEventListener('DOMContentLoaded', function() {
            // Check if we should pre-fill form for demo
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('demo') === 'true') {
                document.getElementById('firstName').value = 'Rohan';
                document.getElementById('lastName').value = 'Sharma';
                document.getElementById('email').value = 'rohan@example.com';
                document.getElementById('phone').value = '+91 98765 43210';
                document.getElementById('studentClass').value = '9';
                document.getElementById('subject').value = 'Study Materials';
                document.getElementById('message').value = 'I need help with Science Chapter 5. The notes are great but I need more practice questions.';
            }
        });