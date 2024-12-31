import { analyticsComponent } from '../js/components/analytics.js';
import { certificationsComponent } from '../js/components/certifications.js';
import { aboutComponent } from '../js/components/about.js';
import { workHistoryComponent } from '../js/components/workHistory.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    
    const navButtons = document.querySelectorAll('.nav-button');
    
    const sectionContent = {
        analytics: analyticsComponent,
        certifications: certificationsComponent,
        about: aboutComponent,
        workHistory: workHistoryComponent,
        home: {
            render: () => aboutComponent.render()
        }
    };

    document.querySelector('.content-container').innerHTML = aboutComponent.render();
    aboutComponent.afterRender();
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', (event) => {
        try {
            const state = event.state;
            // If state exists and is valid
            if (state && state.section) {
                if (sectionContent[state.section]) {
                    document.querySelector('.content-container').innerHTML = sectionContent[state.section].render();
                    if (sectionContent[state.section].afterRender) {
                        sectionContent[state.section].afterRender();
                    }
                    setActiveButton(document.querySelector(`[data-section="${state.section}"]`));
                } else {
                    // Invalid section, return to home
                    resetToHome();
                }
            } else {
                // No state, return to home
                resetToHome();
            }
        } catch (error) {
            console.error('Navigation error:', error);
            resetToHome();
        }
    });

    // Helper function to reset to home state
    function resetToHome() {
        document.querySelector('.content-container').innerHTML = aboutComponent.render();
        aboutComponent.afterRender();
        setActiveButton(null);
        // Update URL without creating new history entry
        history.replaceState({ section: 'about' }, '', '#about');
    }

    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const link = button.querySelector('a');
            const section = button.dataset.section;

            if (section && sectionContent[section]) {
                e.preventDefault();
                try {
                    const component = sectionContent[section];
                    document.querySelector('.content-container').innerHTML = component.render();
                    
                    if (component.afterRender) {
                        component.afterRender();
                    }
                    setActiveButton(button);
                    history.pushState({ section: section }, '', `#${section}`);

                    // Add this to ensure scrolling is restored after navigation
                    if (window.innerWidth <= 492) {
                        document.body.style.overflow = '';
                        removeOverlay();
                        sidebar.classList.add('collapsed');
                    }
                } catch (error) {
                    console.error('Section rendering error:', error);
                    resetToHome();
                }
            }
            else if (link) {
                if (link.target === '_blank') {
                    window.open(link.href, '_blank');
                } else {
                    window.location.href = link.href;
                }
                // Also collapse for external links on tablet
                if (window.innerWidth <= 1780 && !sidebar.classList.contains('collapsed')) {
                    sidebar.classList.add('collapsed');
                    localStorage.removeItem('sidebarExpanded');
                }
            }
        });
    });

    // Initialize the first state
    history.replaceState({ section: 'about' }, '', '#about');

    // Add this new code for sidebar toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    // Simplified toggle handler
    menuToggle.addEventListener('click', () => {
        const isMobile = window.innerWidth <= 492;
        const isCollapsed = sidebar.classList.toggle('collapsed');
        
        if (isMobile) {
            if (!isCollapsed) {
                addOverlay();
                document.body.style.overflow = 'hidden';
            } else {
                removeOverlay();
                document.body.style.overflow = '';
            }
        }
        
        // Only store state for larger screens
        if (!isMobile) {
            localStorage.setItem('sidebarExpanded', !isCollapsed);
        }
    });

    // Add these new functions for mobile overlay
    function addOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
        
        // Force reflow
        overlay.offsetHeight;
        
        // Add active class after a brief delay
        requestAnimationFrame(() => {
            overlay.classList.add('active');
        });
        
        overlay.addEventListener('click', () => {
            sidebar.classList.add('collapsed');
            removeOverlay();
        });
    }

    function removeOverlay() {
        const overlay = document.querySelector('.sidebar-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            // Wait for transition to complete before removing
            overlay.addEventListener('transitionend', function handler() {
                overlay.remove();
                overlay.removeEventListener('transitionend', handler);
            });
        }
    }

    // Update the resize handler
    function handleResize() {
        const width = window.innerWidth;
        
        if (width <= 492) {
            // Mobile view
            sidebar.classList.add('collapsed');
            removeOverlay();  // Ensure overlay is removed
            document.body.style.overflow = '';
        } else if (width <= 1780) {
            // Tablet view - restore saved state or collapse
            const overlay = document.querySelector('.sidebar-overlay');
            if (overlay) {
                removeOverlay();
                document.body.style.overflow = '';
            }
            
            // Default to collapsed on tablet unless explicitly expanded
            if (!localStorage.getItem('sidebarExpanded')) {
                sidebar.classList.add('collapsed');
            }
        } else {
            // Desktop view (> 1780px) - always expanded
            const overlay = document.querySelector('.sidebar-overlay');
            if (overlay) {
                removeOverlay();
                document.body.style.overflow = '';
            }
            
            sidebar.classList.remove('collapsed'); // Always expanded on desktop
            localStorage.clear(); // Clear stored state on desktop
        }
    }

    // Debounced resize listener with reduced timeout
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResize, 10); 
    });

    // Initial setup
    handleResize();
});

function setActiveButton(activeButton) {
    document.querySelectorAll('.nav-button').forEach(btn => {
        btn.classList.remove('active');
    });
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

function cleanupMobileState() {
    document.body.style.overflow = '';
    const overlay = document.querySelector('.sidebar-overlay');
    if (overlay) {
        removeOverlay();
    }
    sidebar.classList.add('collapsed');
}

// Add to popstate handler
window.addEventListener('popstate', (event) => {
    if (window.innerWidth <= 492) {
        cleanupMobileState();
    }
    // ... rest of existing popstate code
});

// Add to resize handler
function handleResize() {
    const width = window.innerWidth;
    if (width > 492) {
        cleanupMobileState();
    }
    // ... rest of existing resize code
}