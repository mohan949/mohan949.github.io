// Function to close WIP banner
function closeWipBanner() {
    const banner = document.getElementById('wipBanner');
    banner.classList.add('hidden');
    document.body.classList.remove('has-banner');
    
    // Hide banner after animation completes
    setTimeout(() => {
        banner.style.display = 'none';
    }, 500);
    
    // Save preference in localStorage
    localStorage.setItem('wipBannerClosed', 'true');
}

// Active navigation highlighting
document.addEventListener('DOMContentLoaded', function() {
    // Check if banner was previously closed
    const bannerClosed = localStorage.getItem('wipBannerClosed');
    const banner = document.getElementById('wipBanner');
    
    if (bannerClosed === 'true') {
        banner.style.display = 'none';
    } else {
        document.body.classList.add('has-banner');
    }
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.section, #about');
    
    // Function to update active link
    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100;
        const bannerHeight = document.body.classList.contains('has-banner') ? 48 : 0;
        const adjustedScrollPosition = scrollPosition + bannerHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (adjustedScrollPosition >= sectionTop && adjustedScrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);
    
    // Update active link on page load
    updateActiveLink();
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll-to-top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll-to-top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add animation to skill badges on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('badge')) {
                    entry.target.style.animation = 'fadeInUp 0.5s ease forwards';
                } else if (entry.target.classList.contains('project-card')) {
                    entry.target.style.animation = 'slideIn 0.6s ease forwards';
                }
            }
        });
    }, observerOptions);
    
    // Observe all badges and project cards
    document.querySelectorAll('.badge').forEach(badge => {
        observer.observe(badge);
    });
    
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
    
    // Animate star ratings when in view
    const starObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stars = entry.target.querySelectorAll('.skill-stars i');
                stars.forEach((star, index) => {
                    setTimeout(() => {
                        star.style.animation = 'starPop 0.4s ease forwards';
                    }, index * 100);
                });
                starObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.skill-item').forEach(item => {
        starObserver.observe(item);
    });
    

    
    // Add dark mode toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
    document.querySelector('header').appendChild(darkModeToggle);
    
    // Check for saved dark mode preference - default to light mode
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        // Ensure light mode is default
        localStorage.setItem('darkMode', 'disabled');
        document.body.classList.remove('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
    
    // Add stagger animation index to badges
    document.querySelectorAll('.skills .badge').forEach((badge, index) => {
        badge.style.setProperty('--index', index);
    });
    
    // Enhance form interactions (for future contact form)
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}); 