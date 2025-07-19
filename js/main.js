// Removed complex navigation toggle - using simple horizontal scroll nav for mobile

// Function to toggle phone number visibility
function togglePhone() {
    const phoneInfo = document.getElementById('phoneInfo');
    const phoneBtn = document.getElementById('phoneRevealBtn');
    const toggleText = document.getElementById('phoneToggleText');
    
    if (phoneInfo && phoneBtn) {
        const isVisible = phoneInfo.classList.contains('visible');
        
        if (isVisible) {
            // Hide phone
            phoneInfo.classList.remove('visible');
            phoneBtn.classList.remove('hidden');
            if (toggleText) toggleText.textContent = 'Show Contact';
            localStorage.setItem('phoneRevealed', 'false');
        } else {
            // Show phone
            phoneInfo.classList.add('visible');
            phoneBtn.classList.add('hidden');
            if (toggleText) toggleText.textContent = 'Hide Contact';
            localStorage.setItem('phoneRevealed', 'true');
        }
    }
}

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

// Error handling utility
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" aria-label="Close notification">
            <i class="fas fa-times"></i>
        </button>
    `;
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Add keyboard event handling
document.addEventListener('keydown', function(e) {
    // Close WIP banner with Escape key
    if (e.key === 'Escape') {
        const banner = document.getElementById('wipBanner');
        if (banner && !banner.classList.contains('hidden')) {
            closeWipBanner();
        }
    }
});

// Active navigation highlighting
document.addEventListener('DOMContentLoaded', function() {
    // Add content-loaded class after a short delay to simulate loading
    setTimeout(() => {
        document.body.classList.add('content-loaded');
    }, 500);
    
    // Check if banner was previously closed
    const bannerClosed = localStorage.getItem('wipBannerClosed');
    const banner = document.getElementById('wipBanner');
    
    if (bannerClosed === 'true') {
        banner.style.display = 'none';
    } else {
        document.body.classList.add('has-banner');
    }
    
    // Check if phone was previously revealed
    const phoneRevealed = localStorage.getItem('phoneRevealed');
    const phoneInfo = document.getElementById('phoneInfo');
    const phoneBtn = document.getElementById('phoneRevealBtn');
    
    // Only on desktop - mobile always shows phone
    if (window.innerWidth > 768) {
        if (phoneRevealed === 'true' && phoneInfo && phoneBtn) {
            phoneInfo.classList.add('visible');
            phoneBtn.classList.add('hidden');
        }
    }
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');
    
    // Function to update active link
    function updateActiveLink() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const bannerHeight = document.body.classList.contains('has-banner') ? 48 : 0;
        const offset = 100 + bannerHeight;
        
        // Clear all active states first
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Check if we're at the bottom of the page (for Education section)
        if (scrollPosition + windowHeight >= documentHeight - 50) {
            const educationLink = document.querySelector('.nav-links a[href="#education"]');
            if (educationLink) {
                educationLink.classList.add('active');
                return;
            }
        }
        
        // Check each section
        sections.forEach(section => {
            const sectionTop = section.offsetTop - offset;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
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
            
            // Navigation link clicked - no action needed for simple horizontal nav
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const bannerHeight = document.body.classList.contains('has-banner') ? 48 : 0;
                const totalOffset = headerHeight + bannerHeight + 20; // 20px extra padding
                
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - totalOffset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
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
    
    try {
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
    } catch (error) {
        console.error('IntersectionObserver not supported:', error);
        // Fallback: show all elements immediately
        document.querySelectorAll('.badge, .project-card, .stat-card').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }
    
    // Animate GitHub stat cards
    try {
        const enhancedObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.classList.contains('stat-card')) {
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.transition = 'all 0.6s ease';
                    }, index * 100);
                    enhancedObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.stat-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            enhancedObserver.observe(card);
        });
    } catch (error) {
        console.error('Enhanced observer error:', error);
        // Fallback: show stat cards immediately
        document.querySelectorAll('.stat-card').forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'none';
        });
    }
    
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
    
    // Add fallback for profile image
    const profileImg = document.querySelector('.profile-pic');
    if (profileImg) {
        profileImg.addEventListener('error', function() {
            this.src = 'https://ui-avatars.com/api/?name=Mohan+Prasad&background=4660a0&color=fff&size=200';
        });
    }
}); 