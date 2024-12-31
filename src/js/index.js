import { analyticsComponent } from '../js/components/analytics.js';
import { certificationsComponent } from '../js/components/certifications.js';
import { aboutComponent } from '../js/components/about.js';
import { workHistoryComponent } from '../js/components/workHistory.js';

const BREAKPOINTS = {
    MOBILE: 492,
    TABLET: 1780
};

// Group all sidebar-related functions together
const sidebarManager = {
    addOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
        
        requestAnimationFrame(() => {
            overlay.classList.add('active');
        });
        
        overlay.addEventListener('click', () => {
            this.collapse();
            this.removeOverlay();
        });
    },

    removeOverlay() {
        const overlay = document.querySelector('.sidebar-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            overlay.addEventListener('transitionend', function handler() {
                overlay.remove();
                overlay.removeEventListener('transitionend', handler);
            });
        }
    },

    collapse() {
        if (window.innerWidth <= BREAKPOINTS.TABLET) {
            const sidebar = document.querySelector('.sidebar');
            if (!sidebar.classList.contains('collapsed')) {
                sidebar.classList.add('collapsed');
                this.removeOverlay();
                localStorage.removeItem('sidebarExpanded');
            }
        }
    }
};

// Group navigation-related functions
const navigationManager = {
    setActiveButton(activeButton) {
        document.querySelectorAll('.nav-button').forEach(btn => {
            btn.classList.remove('active');
        });
        if (activeButton) {
            activeButton.classList.add('active');
        }
    },

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'instant'
        });
    },

    resetToHome() {
        document.querySelector('.content-container').innerHTML = aboutComponent.render();
        aboutComponent.afterRender();
        this.setActiveButton(null);
        this.scrollToTop();
        history.replaceState({ section: 'about' }, '', '#about');
    },

    debug: {
        logNavigation(section) {
            console.log(`Navigating to section: ${section}`);
            console.log('Current window width:', window.innerWidth);
            console.log('Current URL:', window.location.href);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    
    const navButtons = document.querySelectorAll('.nav-button');
    
    const sectionContent = {
        analytics: analyticsComponent,
        certifications: certificationsComponent,
        about: aboutComponent,
        workHistory: workHistoryComponent,
        home: {
            render: () => {
                try {
                    return aboutComponent.render();
                } catch (error) {
                    console.error('Error rendering home/about:', error);
                    return '<div>Error loading content</div>';
                }
            }
        }
    };

    // Add error boundary to initial render
    try {
        document.querySelector('.content-container').innerHTML = aboutComponent.render();
        aboutComponent.afterRender();
    } catch (error) {
        console.error('Initial render error:', error);
        document.querySelector('.content-container').innerHTML = '<div>Error loading content</div>';
    }
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', (event) => {
        try {
            const state = event.state;
            if (state && state.section) {
                if (sectionContent[state.section]) {
                    document.querySelector('.content-container').innerHTML = sectionContent[state.section].render();
                    if (sectionContent[state.section].afterRender) {
                        sectionContent[state.section].afterRender();
                    }
                    navigationManager.setActiveButton(document.querySelector(`[data-section="${state.section}"]`));
                    navigationManager.scrollToTop();
                } else {
                    navigationManager.resetToHome();
                }
            } else {
                navigationManager.resetToHome();
            }
        } catch (error) {
            console.error('Navigation error:', error);
            navigationManager.resetToHome();
        }

        if (window.innerWidth <= BREAKPOINTS.MOBILE) {
            cleanupMobileState();
        }
    });

    // Helper function to reset to home state
    function resetToHome() {
        document.querySelector('.content-container').innerHTML = aboutComponent.render();
        aboutComponent.afterRender();
        setActiveButton(null);
        scrollToTop();
        history.replaceState({ section: 'about' }, '', '#about');
    }

    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const link = button.querySelector('a');
            const section = button.dataset.section;

            if (section && sectionContent[section]) {
                e.preventDefault();
                navigationManager.debug.logNavigation(section);
                try {
                    const component = sectionContent[section];
                    document.querySelector('.content-container').innerHTML = component.render();
                    
                    if (component.afterRender) {
                        component.afterRender();
                    }
                    navigationManager.setActiveButton(button);
                    history.pushState({ section: section }, '', `#${section}`);
                    navigationManager.scrollToTop();

                    // Mobile cleanup
                    if (window.innerWidth <= BREAKPOINTS.MOBILE) {
                        document.body.style.overflow = '';
                        sidebarManager.removeOverlay();
                        sidebar.classList.add('collapsed');
                    }
                } catch (error) {
                    console.error('Section rendering error:', error);
                    navigationManager.resetToHome();
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

            if (window.innerWidth <= 1780) {
                collapseSidebar();
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
        const isMobile = window.innerWidth <= BREAKPOINTS.MOBILE;
        const isCollapsed = sidebar.classList.toggle('collapsed');
        
        if (isMobile) {
            if (!isCollapsed) {
                sidebarManager.addOverlay();
                document.body.style.overflow = 'hidden';
            } else {
                sidebarManager.removeOverlay();
                document.body.style.overflow = '';
            }
        }
        
        if (!isMobile) {
            localStorage.setItem('sidebarExpanded', !isCollapsed);
        }
    });

    // Update the resize handler
    function handleResize() {
        const width = window.innerWidth;
        const sidebar = document.querySelector('.sidebar');
        
        if (width <= BREAKPOINTS.MOBILE) {
            sidebar.classList.add('collapsed');
            sidebarManager.removeOverlay();
        } else if (width <= BREAKPOINTS.TABLET) {
            sidebarManager.removeOverlay();
            if (!localStorage.getItem('sidebarExpanded')) {
                sidebar.classList.add('collapsed');
            }
        } else {
            sidebarManager.removeOverlay();
            sidebar.classList.remove('collapsed');
            localStorage.clear();
        }
    }

    // Use RAF for smoother resize handling
    let rafId;
    window.addEventListener('resize', () => {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(handleResize);
    });

    // Initial setup
    handleResize();

    // Modify the document click listener
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1780) {
            const sidebar = document.querySelector('.sidebar');
            const menuToggle = document.querySelector('.menu-toggle');
            
            if (!sidebar.classList.contains('collapsed') && 
                !sidebar.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                
                // Only handle overflow if we're on mobile
                if (window.innerWidth <= 492) {
                    cleanupMobileState();
                } else {
                    sidebar.classList.add('collapsed');
                    localStorage.removeItem('sidebarExpanded');
                }
            }
        }
    });
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
    const overlay = document.querySelector('.sidebar-overlay');
    if (overlay) {
        document.body.style.overflow = '';
        sidebarManager.removeOverlay();
    }
    const sidebar = document.querySelector('.sidebar');
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

// Modify the collapseSidebar function
function collapseSidebar() {
    // Only collapse if window width is <= 1780px
    if (window.innerWidth <= 1780) {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar.classList.contains('collapsed')) {
            sidebar.classList.add('collapsed');
            removeOverlay();
            document.body.style.overflow = '';
            // Clear the localStorage state when manually collapsing
            localStorage.removeItem('sidebarExpanded');
        }
    }
}

// Add this helper function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'instant'
    });
}