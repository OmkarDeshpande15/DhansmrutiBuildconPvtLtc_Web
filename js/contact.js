// ==========================================
// ANIMATED CONTACT PAGE - FULL FUNCTIONALITY
// ==========================================

(function () {
    'use strict';

    // ==========================================
    // DOM READY
    // ==========================================
    document.addEventListener('DOMContentLoaded', function () {

        // ==========================================
        // HAMBURGER MENU
        // ==========================================
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function () {
                this.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu on link click
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function () {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });

            // Close menu on outside click
            document.addEventListener('click', function (e) {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        }

        // ==========================================
        // SCROLL ANIMATIONS
        // ==========================================
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // ==========================================
        // FORM INPUT ANIMATIONS
        // ==========================================
        const formInputs = document.querySelectorAll('.form-input');

        formInputs.forEach(input => {
            // Add focus effect
            input.addEventListener('focus', function () {
                this.parentElement.classList.add('focused');
                const label = this.parentElement.querySelector('label');
                if (label) {
                    label.style.color = '#ff6b35';
                }
            });

            // Remove focus effect
            input.addEventListener('blur', function () {
                this.parentElement.classList.remove('focused');
                const label = this.parentElement.querySelector('label');
                if (label && !this.value) {
                    label.style.color = '#ffffff';
                }
            });

            // Floating label effect
            input.addEventListener('input', function () {
                if (this.value) {
                    this.parentElement.classList.add('has-value');
                } else {
                    this.parentElement.classList.remove('has-value');
                }
            });
        });

        // ==========================================
        // FORM SUBMISSION
        // ==========================================
        const contactForm = document.getElementById('contactForm');
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');
        const submitButton = contactForm.querySelector('.submit-button');

        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                message: document.getElementById('message').value.trim()
            };

            // Validate form
            if (!validateForm(formData)) {
                showError('Please fill in all fields correctly.');
                return;
            }

            // Disable submit button
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            try {
                // Simulate API call (replace with your actual API endpoint)
                await sendFormData(formData);

                // Show success message
                showSuccess();

                // Reset form
                contactForm.reset();

                // Clear has-value classes
                document.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('has-value');
                });

            } catch (error) {
                console.error('Form submission error:', error);
                showError('Failed to send message. Please try again.');
            } finally {
                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.innerHTML = '<span class="button-text">Send Message</span><i class="fas fa-paper-plane"></i>';
            }
        });

        // ==========================================
        // FORM VALIDATION
        // ==========================================
        function validateForm(data) {
            // Name validation
            if (data.name.length < 2) {
                return false;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                return false;
            }

            // Phone validation (basic)
            const phoneRegex = /^[0-9\s\-\+\(\)]{10,}$/;
            if (!phoneRegex.test(data.phone)) {
                return false;
            }

            // Message validation
            if (data.message.length < 10) {
                return false;
            }

            return true;
        }

        // ==========================================
        // SEND FORM DATA
        // ==========================================
        async function sendFormData(data) {
            // Simulate API call with timeout
            // Replace this with your actual API endpoint
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Simulate success
                    console.log('Form data:', data);

                    // For actual implementation, use:
                    /*
                    fetch('YOUR_API_ENDPOINT', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    })
                    .then(response => response.json())
                    .then(result => resolve(result))
                    .catch(error => reject(error));
                    */

                    resolve({ success: true });
                }, 1500);
            });
        }

        // ==========================================
        // SHOW SUCCESS MESSAGE
        // ==========================================
        function showSuccess() {
            errorMessage.classList.remove('show');
            successMessage.classList.add('show');

            // Hide after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);

            // Add confetti effect (optional)
            createConfetti();
        }

        // ==========================================
        // SHOW ERROR MESSAGE
        // ==========================================
        function showError(message) {
            successMessage.classList.remove('show');
            errorMessage.querySelector('p').textContent = message;
            errorMessage.classList.add('show');

            // Hide after 5 seconds
            setTimeout(() => {
                errorMessage.classList.remove('show');
            }, 5000);

            // Shake the form
            contactForm.style.animation = 'shake 0.5s';
            setTimeout(() => {
                contactForm.style.animation = '';
            }, 500);
        }

        // ==========================================
        // CONFETTI EFFECT
        // ==========================================
        function createConfetti() {
            const colors = ['#ff6b35', '#f7931e', '#4caf50', '#2196f3'];
            const confettiCount = 30;

            for (let i = 0; i < confettiCount; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.style.cssText = `
                        position: fixed;
                        width: 10px;
                        height: 10px;
                        background: ${colors[Math.floor(Math.random() * colors.length)]};
                        top: 50%;
                        left: 50%;
                        opacity: 1;
                        pointer-events: none;
                        z-index: 9999;
                        border-radius: 50%;
                    `;
                    document.body.appendChild(confetti);

                    const angle = Math.random() * Math.PI * 2;
                    const velocity = 200 + Math.random() * 200;
                    const vx = Math.cos(angle) * velocity;
                    const vy = Math.sin(angle) * velocity;

                    let posX = window.innerWidth / 2;
                    let posY = window.innerHeight / 2;
                    let opacity = 1;

                    const animation = setInterval(() => {
                        posX += vx * 0.016;
                        posY += vy * 0.016 + 100 * 0.016;
                        opacity -= 0.02;

                        confetti.style.left = posX + 'px';
                        confetti.style.top = posY + 'px';
                        confetti.style.opacity = opacity;

                        if (opacity <= 0) {
                            clearInterval(animation);
                            confetti.remove();
                        }
                    }, 16);
                }, i * 30);
            }
        }

        // ==========================================
        // INPUT REAL-TIME VALIDATION
        // ==========================================
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');

        if (emailInput) {
            emailInput.addEventListener('blur', function () {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.value && !emailRegex.test(this.value)) {
                    this.style.borderColor = '#f44336';
                    this.parentElement.querySelector('label').style.color = '#f44336';
                } else if (this.value) {
                    this.style.borderColor = '#4caf50';
                    this.parentElement.querySelector('label').style.color = '#4caf50';
                }
            });

            emailInput.addEventListener('focus', function () {
                this.style.borderColor = '#ff6b35';
                this.parentElement.querySelector('label').style.color = '#ff6b35';
            });
        }

        if (phoneInput) {
            phoneInput.addEventListener('input', function () {
                // Allow only numbers, spaces, and common phone characters
                this.value = this.value.replace(/[^\d\s\-\+\(\)]/g, '');
            });

            phoneInput.addEventListener('blur', function () {
                const phoneRegex = /^[0-9\s\-\+\(\)]{10,}$/;
                if (this.value && !phoneRegex.test(this.value)) {
                    this.style.borderColor = '#f44336';
                    this.parentElement.querySelector('label').style.color = '#f44336';
                } else if (this.value) {
                    this.style.borderColor = '#4caf50';
                    this.parentElement.querySelector('label').style.color = '#4caf50';
                }
            });

            phoneInput.addEventListener('focus', function () {
                this.style.borderColor = '#ff6b35';
                this.parentElement.querySelector('label').style.color = '#ff6b35';
            });
        }

        // ==========================================
        // PARALLAX EFFECT ON MAP
        // ==========================================
        const mapSection = document.querySelector('.map-section');
        let ticking = false;

        window.addEventListener('scroll', function () {
            if (!ticking && mapSection) {
                window.requestAnimationFrame(function () {
                    const scrolled = window.pageYOffset;
                    const mapOffset = mapSection.offsetTop;
                    const mapHeight = mapSection.offsetHeight;

                    if (scrolled > mapOffset - window.innerHeight &&
                        scrolled < mapOffset + mapHeight) {
                        const parallax = (scrolled - mapOffset) * 0.3;
                        const mapIframe = document.querySelector('.map-iframe');
                        if (mapIframe) {
                            mapIframe.style.transform = `translateY(${parallax}px)`;
                        }
                    }

                    ticking = false;
                });

                ticking = true;
            }
        });

        // ==========================================
        // ADD SHAKE ANIMATION TO CSS
        // ==========================================
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
                20%, 40%, 60%, 80% { transform: translateX(10px); }
            }
        `;
        document.head.appendChild(style);

        // ==========================================
        // CONSOLE MESSAGE
        // ==========================================
        console.log('%c✨ Contact Page Loaded! ✨',
            'color: #ff6b35; font-size: 20px; font-weight: bold;'
        );
        console.log('%c🚀 Form is functional and ready!',
            'color: #4caf50; font-size: 14px; font-weight: bold;'
        );

    });

})();