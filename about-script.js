document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenu.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navLinks.style.display = '';
            }
        });
    });

    // Parallax Effect
    window.addEventListener('scroll', () => {
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            element.style.backgroundPosition = `center ${rate}px`;
        });
    });

    // Stats Counter Animation
    const stats = document.querySelectorAll('.stat-item .number');
    let hasAnimated = false;

    const animateStats = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;

            const updateCount = () => {
                if (current < target) {
                    current += step;
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            };

            updateCount();
        });
    };

    // Trigger stats animation when in view
    const observerStats = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                animateStats();
                hasAnimated = true;
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observerStats.observe(statsSection);
    }

    // Testimonial Slider
    const testimonials = [
        {
            quote: "An amazing photographer who captured our wedding perfectly. Every photo tells a story!",
            name: "Sarah Johnson",
            role: "Wedding Client",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS__jpbnT_2kBN6dX4-7HOFZC_8eALRuyOUBg&s"
        },
        {
            quote: "Professional, creative, and incredibly talented. The photos exceeded our expectations!",
            name: "Michael Chen",
            role: "Corporate Client",
            image: "https://i.pinimg.com/236x/e4/81/c3/e481c36a27b48383561732f26cb85157.jpg"
        },
        {
            quote: "The best photographer I've worked with. Captures the perfect moment every time!",
            name: "Emma Davis",
            role: "Portrait Client",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwcpuHVJz5CHKIFhtpIlXG8zBTAJIuiVWC_g&s"
        }
    ];

    let currentTestimonial = 0;
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const prevBtn = document.querySelector('.slider-controls .prev');
    const nextBtn = document.querySelector('.slider-controls .next');

    const createTestimonialElement = (testimonial) => {
        return `
            <div class="testimonial-item">
                <div class="quote"><i class="fas fa-quote-left"></i></div>
                <p>${testimonial.quote}</p>
                <div class="client">
                    <img src="${testimonial.image}" alt="${testimonial.name}">
                    <div class="client-info">
                        <h4>${testimonial.name}</h4>
                        <span>${testimonial.role}</span>
                    </div>
                </div>
            </div>
        `;
    };

    const updateTestimonials = () => {
        const testimonialItems = document.querySelectorAll('.testimonial-item');
        testimonialItems.forEach(item => item.classList.remove('active'));
        testimonialItems[currentTestimonial].classList.add('active');
    };

    // Initialize testimonials
    testimonials.forEach(testimonial => {
        testimonialSlider.insertAdjacentHTML('beforeend', createTestimonialElement(testimonial));
    });
    updateTestimonials();

    // Testimonial Navigation
    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        updateTestimonials();
    });

    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonials();
    });

    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonials();
    }, 5000);

    // Animate elements on scroll
    const observerElements = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.timeline-item, .specialty-card, .stat-item').forEach(element => {
        observerElements.observe(element);
    });
});
