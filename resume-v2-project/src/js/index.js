import { analyticsComponent } from './components/analytics.js';
import { certificationsComponent } from './components/certifications.js';
import { aboutComponent } from './components/about.js';
import { workHistoryComponent } from './components/workHistory.js';

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

                    // Auto collapse sidebar after navigation
                    if (window.innerWidth <= 1780 && !sidebar.classList.contains('collapsed')) {
                        sidebar.classList.add('collapsed');
                        localStorage.removeItem('sidebarExpanded');
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
    const toggleBtn = document.querySelector('.toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');
    
    // Simplified toggle handler
    toggleBtn.addEventListener('click', () => {
        const isCollapsed = sidebar.classList.toggle('collapsed');
        const isTablet = window.innerWidth <= 1780;
        
        // Store only one state
        if (isTablet) {
            localStorage.setItem('sidebarExpanded', !isCollapsed);
        }
    });

    // Optimized resize handler
    function handleResize() {
        const width = window.innerWidth;
        
        if (width <= 1780) {
            // Only modify classes if needed
            if (!localStorage.getItem('sidebarExpanded')) {
                !sidebar.classList.contains('collapsed') && 
                    sidebar.classList.add('collapsed');
            }
        } else {
            // Clear states and ensure expanded for desktop
            localStorage.clear();
            sidebar.classList.contains('collapsed') && 
                sidebar.classList.remove('collapsed');
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