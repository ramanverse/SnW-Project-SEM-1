document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const lightboxTitle = lightbox.querySelector('.image-info h3');
    const lightboxCategory = lightbox.querySelector('.image-info p');
    const closeLightbox = lightbox.querySelector('.close-lightbox');
    const prevBtn = lightbox.querySelector('.prev-img');
    const nextBtn = lightbox.querySelector('.next-img');
    let currentImageIndex = 0;
    let filteredItems = [...galleryItems];

    // Mobile Menu
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenu.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            
            galleryItems.forEach(item => {
                item.classList.remove('fade-in');
                void item.offsetWidth; // Trigger reflow
                
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    item.classList.add('fade-in');
                } else {
                    item.style.display = 'none';
                }
            });

            // Update filtered items array
            filteredItems = [...galleryItems].filter(item => 
                filter === 'all' || item.dataset.category === filter
            );
        });
    });

    // Lightbox functionality
    galleryItems.forEach((item, index) => {
        const viewBtn = item.querySelector('.view-btn');
        
        viewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(index);
        });

        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    function openLightbox(index) {
        currentImageIndex = index;
        const item = galleryItems[index];
        const img = item.querySelector('img');
        const title = item.querySelector('h3').textContent;
        const category = item.querySelector('p').textContent;

        lightboxImg.src = img.src;
        lightboxTitle.textContent = title;
        lightboxCategory.textContent = category;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightboxHandler() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function navigateImage(direction) {
        currentImageIndex = (currentImageIndex + direction + filteredItems.length) % filteredItems.length;
        const item = filteredItems[currentImageIndex];
        const img = item.querySelector('img');
        const title = item.querySelector('h3').textContent;
        const category = item.querySelector('p').textContent;

        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.src = img.src;
            lightboxTitle.textContent = title;
            lightboxCategory.textContent = category;
            lightboxImg.style.opacity = '1';
        }, 300);
    }

    // Event Listeners
    closeLightbox.addEventListener('click', closeLightboxHandler);
    prevBtn.addEventListener('click', () => navigateImage(-1));
    nextBtn.addEventListener('click', () => navigateImage(1));

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightboxHandler();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeLightboxHandler();
                break;
            case 'ArrowLeft':
                navigateImage(-1);
                break;
            case 'ArrowRight':
                navigateImage(1);
                break;
        }
    });

    // Lazy loading images
    const lazyLoad = target => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('fade-in');
                    observer.disconnect();
                }
            });
        });

        io.observe(target);
    };

    // Apply lazy loading to images
    document.querySelectorAll('img[data-src]').forEach(lazyLoad);
});
