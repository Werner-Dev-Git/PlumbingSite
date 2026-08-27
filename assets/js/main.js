/**
 * Plumbing Pro - Main JavaScript
 * ================================
 */

(function() {
    'use strict';

    // DOM Ready
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize all components
        Preloader.init();
        StickyHeader.init();
        MobileNav.init();
        SmoothScroll.init();
        ScrollToTop.init();
        FormHandler.init();
        CardTilt.init();
        ScrollProgress.init();
    });

    /**
     * Preloader
     */
    const Preloader = {
        init: function() {
            const preloader = document.querySelector('.preloader');
            if (!preloader) return;

            window.addEventListener('load', function() {
                setTimeout(function() {
                    preloader.classList.add('loaded');
                    setTimeout(function() {
                        preloader.style.display = 'none';
                    }, 500);
                }, 500);
            });
        }
    };

    /**
     * Sticky Header
     */
    const StickyHeader = {
        init: function() {
            const header = document.getElementById('sticky-header');
            if (!header) return;

            let lastScrollTop = 0;
            const scrollThreshold = 100;

            window.addEventListener('scroll', function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                if (scrollTop > scrollThreshold) {
                    header.classList.add('sticky');
                } else {
                    header.classList.remove('sticky');
                }

                lastScrollTop = scrollTop;
            });
        }
    };

    /**
     * Mobile Navigation
     */
    const MobileNav = {
        init: function() {
            const toggle = document.querySelector('.mobile-menu-toggle');
            const wrapper = document.querySelector('.mobile-nav-wrapper');
            const overlay = document.querySelector('.mobile-nav-overlay');
            const closeBtn = document.querySelector('.mobile-nav-close');
            const hasSubmenu = document.querySelectorAll('.mobile-menu .has-submenu');

            if (!toggle || !wrapper) return;

            // Toggle mobile nav
            toggle.addEventListener('click', function() {
                wrapper.classList.add('active');
                document.body.style.overflow = 'hidden';
            });

            // Close mobile nav
            const closeNav = function() {
                wrapper.classList.remove('active');
                document.body.style.overflow = '';
            };

            if (closeBtn) {
                closeBtn.addEventListener('click', closeNav);
            }

            if (overlay) {
                overlay.addEventListener('click', closeNav);
            }

            // Handle submenu toggle
            hasSubmenu.forEach(function(item) {
                const link = item.querySelector('a');
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    item.classList.toggle('open');
                });
            });

            // Close nav on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && wrapper.classList.contains('active')) {
                    closeNav();
                }
            });
        }
    };

    /**
     * Smooth Scroll
     */
    const SmoothScroll = {
        init: function() {
            const links = document.querySelectorAll('a[href^="#"]');

            links.forEach(function(link) {
                link.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    
                    if (href === '#') return;

                    const target = document.querySelector(href);
                    
                    if (target) {
                        e.preventDefault();
                        
                        const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
                        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
    };

    /**
     * Scroll To Top
     */
    const ScrollToTop = {
        init: function() {
            const scrollBtn = document.querySelector('.scroll-to-top');
            if (!scrollBtn) return;

            // Show/hide button based on scroll position
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    scrollBtn.classList.add('visible');
                } else {
                    scrollBtn.classList.remove('visible');
                }
            });

            // Scroll to top on click
            scrollBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    };

    /**
     * Card Tilt Effect
     */
    const CardTilt = {
        init: function() {
            const cards = document.querySelectorAll('[data-tilt]');
            if (!cards.length) return;

            cards.forEach(function(card) {
                card.addEventListener('mousemove', CardTilt.handleTilt);
                card.addEventListener('mouseleave', CardTilt.resetTilt);
            });
        },

        handleTilt: function(e) {
            const card = this;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-15px) scale(1.02)';
        },

        resetTilt: function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        }
    };

    /**
     * Scroll Progress Bar
     */
    const ScrollProgress = {
        init: function() {
            const progressBar = document.getElementById('scrollProgress');
            if (!progressBar) return;

            window.addEventListener('scroll', function() {
                ScrollProgress.updateProgress(progressBar);
            });

            // Initial update
            ScrollProgress.updateProgress(progressBar);
        },

        updateProgress: function(progressBar) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            progressBar.style.width = scrollPercent + '%';
        }
    };

    /**
     * Form Handler
     */
    const FormHandler = {
        init: function() {
            const quoteForm = document.getElementById('quote-form');
            const newsletterForm = document.querySelector('.newsletter-form');

            if (quoteForm) {
                this.handleQuoteForm(quoteForm);
            }

            if (newsletterForm) {
                this.handleNewsletterForm(newsletterForm);
            }
        },

        handleQuoteForm: function(form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();

                const submitBtn = form.querySelector('.btn-submit');
                const originalText = submitBtn.innerHTML;

                // Validate form
                if (!FormHandler.validateForm(form)) {
                    return;
                }

                // Show loading state
                submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';
                submitBtn.disabled = true;

                // Simulate form submission (replace with actual API call)
                setTimeout(function() {
                    // Success
                    submitBtn.innerHTML = '<i class="bi bi-check-circle"></i> Sent Successfully!';
                    submitBtn.style.background = 'linear-gradient(135deg, #28a745 0%, #218838 100%)';
                    
                    // Reset form
                    form.reset();

                    // Reset button after delay
                    setTimeout(function() {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                    }, 3000);

                }, 1500);
            });
        },

        handleNewsletterForm: function(form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();

                const input = form.querySelector('input[type="email"]');
                const button = form.querySelector('button');

                if (!input.value || !FormHandler.isValidEmail(input.value)) {
                    input.style.border = '2px solid #dc3545';
                    return;
                }

                input.style.border = '';
                const originalHTML = button.innerHTML;
                button.innerHTML = '<i class="bi bi-check"></i>';
                
                setTimeout(function() {
                    button.innerHTML = originalHTML;
                    input.value = '';
                }, 2000);
            });
        },

        validateForm: function(form) {
            let isValid = true;
            const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');

            inputs.forEach(function(input) {
                const formGroup = input.closest('.form-group');
                
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#dc3545';
                    FormHandler.showError(formGroup, 'This field is required');
                } else if (input.type === 'email' && !FormHandler.isValidEmail(input.value)) {
                    isValid = false;
                    input.style.borderColor = '#dc3545';
                    FormHandler.showError(formGroup, 'Please enter a valid email');
                } else if (input.type === 'tel' && !FormHandler.isValidPhone(input.value)) {
                    isValid = false;
                    input.style.borderColor = '#dc3545';
                    FormHandler.showError(formGroup, 'Please enter a valid phone number');
                } else {
                    input.style.borderColor = '';
                    FormHandler.removeError(formGroup);
                }
            });

            return isValid;
        },

        showError: function(formGroup, message) {
            this.removeError(formGroup);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            errorDiv.style.cssText = 'color: #dc3545; font-size: 12px; margin-top: 5px;';
            errorDiv.textContent = message;
            formGroup.appendChild(errorDiv);
        },

        removeError: function(formGroup) {
            const existingError = formGroup.querySelector('.form-error');
            if (existingError) {
                existingError.remove();
            }
        },

        isValidEmail: function(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },

        isValidPhone: function(phone) {
            const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;
            return phoneRegex.test(phone);
        }
    };

    /**
     * Counter Animation for Stats Section
     */
    const CounterAnimation = {
        init: function() {
            const counters = document.querySelectorAll('.stat-number[data-count]');
            if (!counters.length) return;

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        CounterAnimation.animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.5
            });

            counters.forEach(function(counter) {
                observer.observe(counter);
            });
        },

        animateCounter: function(element) {
            const target = parseInt(element.getAttribute('data-count'), 10);
            const duration = 2000;
            const startTime = performance.now();
            const startValue = 0;

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
                
                element.textContent = CounterAnimation.formatNumber(currentValue);

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = CounterAnimation.formatNumber(target);
                }
            }

            requestAnimationFrame(updateCounter);
        },

        formatNumber: function(num) {
            if (num >= 1000) {
                return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K';
            }
            return num.toString();
        }
    };

    /**
     * Animation on Scroll (Simple implementation)
     */
    const AnimationOnScroll = {
        init: function() {
            const elements = document.querySelectorAll('[data-aos]');
            if (!elements.length) return;

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('aos-animate');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            elements.forEach(function(el) {
                observer.observe(el);
            });
        }
    };

    /**
     * Initialize animations when DOM is ready
     */
    document.addEventListener('DOMContentLoaded', function() {
        CounterAnimation.init();
        AnimationOnScroll.init();
    });

})();
