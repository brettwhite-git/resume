const testimonials = [
    {
        text: "Brett's taught me more about ERP than any of our corporate trainings have, he's always available and never judges me for having a bizarre or simple question, and above all else, he is an absolute pleasure to work with. Brett carries each customer demo/conversation with poise and respect, creating comfortable and inviting environments for all customers he speaks with. I know with 100 percent certainty that my customers are in great hands when Brett is on a call with us. His intelligence and depth of knowledge in the industry is inspiring.",
        author: "- Mel B.",
        position: "Senior Account Manager"
    },
    {
        text: "Brett attended 2 of my customer reviews and offered a tremendous amount of support, NetSuite knowledge, and credibility to my calls. My manager even attended one of the calls and said that Brett was one of the best solution consultants he's ever heard. On our last review, he effectively communicated with the VP of IT who had a ton of industry knowledge and NetSuite expertise. He asked quite a few very niche questions and Brett was able to answer EVERY one of them. He truly ran the show and set me up for success as an Account Manager.",
        author: "- Alexa R.",
        position: "Account Manager"
    },
    {
        text: "Brett is a true rock star and watching him grow over the last few years has been awesome. Not only is he unbelievably knowledgeable about all things NetSuite but he is fantastic with customers. Whether that be assisting with a challenge a customer is experiencing or just advising them with their plans for growth, Brett truly shines when it comes to building rapport and helping drive a deal across the finish line.",
        author: "- Alex D.",
        position: "Regional Director"
    },
    {
        text: "I could allways rely on Brett to find the best vendor for anything I could dream up. His ability to work with vendors to negotiate prices and make sure they met their promises took great deals of pressure off of myself and the engineering tram to do what engineers do best. Tell Brett what you needed and you know it will be taken care of. However, at the same time he would make sure you are in the loop to track the progress as well as answer any questions that need to be asked and answered.",
        author: "- Johnathan G.",
        position: "Senior Engineer"
    }
];

class AboutComponent {
    constructor() {
        this.currentTestimonialIndex = 0;
        this.isAnimating = false;
    }

    initializeCarousel() {
        const carousel = document.querySelector('.testimonial-carousel');
        if (!carousel) return;

        const slides = carousel.querySelectorAll('.testimonial-slide');
        const prevButton = carousel.querySelector('.prev-button');
        const nextButton = carousel.querySelector('.next-button');
        let currentSlide = 0;

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.style.display = i === index ? 'block' : 'none';
            });
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        };

        // Initialize first slide
        showSlide(currentSlide);

        // Add event listeners
        if (prevButton) prevButton.addEventListener('click', prevSlide);
        if (nextButton) nextButton.addEventListener('click', nextSlide);

        // Auto advance every 5 seconds
        setInterval(nextSlide, 5000);
    }

    renderHeroSection() {
        return `
            <div class="hero-section">
                <h1 class="hero-title">
                    Transforming Challenges into <br>
                    <span class="gradient-text">Cloud Solutions</span>
                </h1>
                <p class="hero-subtitle">
                    Solutions Specialist crafting intelligent enterprise systems, powered by Cloud & AI innovation
                </p>
            </div>
        `;
    }

    renderStatsSection() {
        const stats = [
            {
                title: 'ARR GENERATED',
                value: '$14M+',
                subtitle: 'in revenue growth'
            },
            {
                title: 'CUSTOMER WINS',
                value: '500+',
                subtitle: 'successful onboardings'
            },
            {
                title: 'COST SAVINGS',
                value: '$2M+',
                subtitle: 'in procurement optimization'
            }
        ];

        const statsCards = stats.map(stat => `
            <div class="metric-card">
                <div class="metric-title">${stat.title}</div>
                <div class="metric-value">${stat.value}</div>
                <div class="metric-subtitle">${stat.subtitle}</div>
            </div>
        `).join('');

        return `
            <div class="metrics-section">
                <div class="metrics-grid">
                    ${statsCards}
                </div>
            </div>
        `;
    }

    renderSkillsSection() {
        const skills = [
            {
                icon: 'users',
                category: "Sales Enablement",
                items: ["Solution Design", "Discovery", "POC", "Value Engineering"],
                bgColor: "sales-enablement"
            },
            {
                icon: 'cloud',
                category: "Cloud Architecture",
                items: ["Oracle Cloud", "SuiteCloud", "Networking", "Infrastructure"],
                bgColor: "cloud-architecture"
            },
            {
                icon: 'code',
                category: "Development",
                items: ["SuiteScript", "JavaScript", "Web Services", "Workflows"],
                bgColor: "development"
            },
            {
                icon: 'brain-circuit',
                category: "AI & Analytics",
                items: ["Generative AI", "Data", "Analytics", "Business Intelligence"],
                bgColor: "ai-analytics"
            },
            {
                icon: 'database',
                category: "Data Management",
                items: ["SQL", "Data Hygiene", "Database", "Integration"],
                bgColor: "data-management"
            },
            {
                icon: 'shield-check',
                category: "Security & Compliance",
                items: ["Access Control", "Disaster Recovery", "Compliance", "Risk Management"],
                bgColor: "security"
            }
        ];

        const skillCards = skills.map(skill => {
            const className = skill.bgColor;
            return `
                <div class="skill-card">
                    <div class="skill-icon-wrapper">
                        <div class="skill-icon ${className}">
                            <i class="lucide" data-lucide="${skill.icon}"></i>
                        </div>
                    </div>
                    <h3 class="skill-title">${skill.category}</h3>
                    <div class="skill-tags">
                        ${skill.items.map(item => `<span class="skill-tag">${item}</span>`).join('')}
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="skills-section">
                <h2 class="section-title">Expertise & Skills</h2>
                <div class="skills-grid">
                    ${skillCards}
                </div>
            </div>
        `;
    }

    renderTestimonialsSection() {
        return `
            <div class="testimonial-section">
                <h2 class="section-title">Testimonials</h2>
                <div class="testimonial-container">
                    <div class="testimonial-content">
                        <div class="testimonial-text-content">
                            <i class="quote-mark left lucide" data-lucide="quote"></i>
                            <p class="testimonial-text">${testimonials[0].text}</p>
                            <i class="quote-mark right lucide" data-lucide="quote"></i>
                            <div class="testimonial-author">
                                <p class="author-name">${testimonials[0].author}</p>
                                <p class="author-position">${testimonials[0].position}</p>
                            </div>
                        </div>
                    </div>
                    <div class="testimonial-controls">
                        <button class="control-button prev">
                            <i class="lucide" data-lucide="chevron-left"></i>
                        </button>
                        <button class="control-button next">
                            <i class="lucide" data-lucide="chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    updateTestimonial(direction) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const contentContainer = document.querySelector('.testimonial-text-content');
        if (!contentContainer) return;

        contentContainer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        contentContainer.style.opacity = '0';
        contentContainer.style.transform = direction === 'next' ? 'translateX(20px)' : 'translateX(-20px)';

        setTimeout(() => {
            if (direction === 'next') {
                this.currentTestimonialIndex = (this.currentTestimonialIndex + 1) % testimonials.length;
            } else {
                this.currentTestimonialIndex = (this.currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
            }

            const testimonial = testimonials[this.currentTestimonialIndex];
            contentContainer.innerHTML = `
                <i class="quote-mark left lucide" data-lucide="quote"></i>
                <p class="testimonial-text">${testimonial.text}</p>
                <i class="quote-mark right lucide" data-lucide="quote"></i>
                <div class="testimonial-author">
                    <p class="author-name">${testimonial.author}</p>
                    <p class="author-position">${testimonial.position}</p>
                </div>
            `;

            lucide.createIcons({
                attrs: {
                    class: 'quote-icon'
                }
            });

            contentContainer.style.transform = direction === 'next' ? 'translateX(-20px)' : 'translateX(20px)';
            
            requestAnimationFrame(() => {
                contentContainer.style.opacity = '1';
                contentContainer.style.transform = 'translateX(0)';
            });
            
            setTimeout(() => {
                this.isAnimating = false;
            }, 500);
        }, 500);
    }

    initializeEventListeners() {
        const prevButton = document.querySelector('.control-button.prev');
        const nextButton = document.querySelector('.control-button.next');

        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => this.updateTestimonial('prev'));
            nextButton.addEventListener('click', () => this.updateTestimonial('next'));
        }
    }

    renderCareerImpactSection() {
        const impacts = [
            {
                title: 'ARR GENERATED',
                value: '$14M+',
                subtitle: 'in revenue growth'
            },
            {
                title: 'CUSTOMER WINS',
                value: '500+',
                subtitle: 'successful implementations'
            },
            {
                title: 'COST SAVINGS',
                value: '$2M+',
                subtitle: 'in procurement optimization'
            }
        ];

        const impactCards = impacts.map(impact => `
            <div class="impact-card">
                <div class="impact-title">${impact.title}</div>
                <div class="impact-value">${impact.value}</div>
                <div class="impact-subtitle">${impact.subtitle}</div>
            </div>
        `).join('');

        return `
            <div class="career-impact-section">
                <h2 class="section-title">Career Impact</h2>
                <div class="impact-grid">
                    ${impactCards}
                </div>
            </div>
        `;
    }

    renderStatsHighlightsSection() {
        const highlights = [
            {
                icon: 'medal',
                value: '4x',
                label: 'SC Award Winner',
                iconColor: '#fbbf24' // gold
            },
            {
                icon: 'trophy',
                value: '2x',
                label: 'Presidents Club',
                iconColor: '#60a5fa' // blue
            },
            {
                icon: 'presentation',
                value: '3x',
                label: 'Conference Presenter',
                iconColor: '#8b5cf6' // purple
            },
            {
                icon: 'award',
                value: '12x',
                label: 'Certifications',
                iconColor: '#34d399' // green
            },
            {
                icon: 'heart',
                value: '50+',
                label: 'Pro Bono Hours',
                iconColor: '#f87171' // red
            },
            {
                icon: 'users',
                value: '10K+',
                label: 'Users Impacted',
                iconColor: '#38bdf8' // light blue
            }
        ];

        const highlightCards = highlights.map(highlight => `
            <div class="highlight-card">
                <div class="highlight-icon" style="color: ${highlight.iconColor}">
                    <i class="lucide" data-lucide="${highlight.icon}"></i>
                </div>
                <div class="highlight-content">
                    <div class="highlight-value">${highlight.value}</div>
                    <div class="highlight-label">${highlight.label}</div>
                </div>
            </div>
        `).join('');

        return `
            <div class="accomplishments-section">
                <h2 class="section-title">Key Highlights</h2>
                <div class="stats-highlights-section">
                    <div class="highlights-grid">
                        ${highlightCards}
                    </div>
                </div>
            </div>
        `;
    }

    render() {
        return `
            <section class="about-section">
                ${this.renderHeroSection()}
                ${this.renderCareerImpactSection()}
                ${this.renderSkillsSection()}
                ${this.renderStatsHighlightsSection()}
                ${this.renderTestimonialsSection()}
            </section>
        `;
    }

    afterRender() {
        if (window.lucide) {
            lucide.createIcons({
                attrs: {
                    class: 'skill-icon-svg'
                }
            });
        } else {
            console.error('Lucide not loaded');
        }

        this.initializeCarousel();
        this.initializeEventListeners();
    }
}

export const aboutComponent = new AboutComponent();



