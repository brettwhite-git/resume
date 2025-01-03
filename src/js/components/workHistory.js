export const workHistoryComponent = {
    render: () => {
        const template = `
            <div class="content-container">
                <section class="work-history">
                    <h2 class="section-title">Work History</h2>
                    <div class="timeline">
                        ${renderWorkHistory()}
                    </div>
                </section>
            </div>
        `;
        
        // Return the template
        return template;
    },
    
    // Add an after render hook
    afterRender: () => {
        // Initialize Lucide icons
        lucide.createIcons();
    }
};

function renderWorkHistory() {
    const workHistory = [
        {
            title: "Senior Solution Consultant",
            company: "Oracle NetSuite",
            period: "Dec 2021 - Present",
            description: "Oracle NetSuite is a leading cloud-based Enterprise Resource Planning (ERP) platform that offers a comprehensive suite of applications to manage business operations. It integrates various functions such as financials, CRM, e-commerce, inventory, and more, providing real-time visibility into financial data and streamlining business processes.",
            achievements: [
                "Generated over $10.6M in Annual Recurring Revenue as a top-requested consultant on a team of 20.",
                "Achieved SC of the Year in an organization of 175 SCs, exceeding 250% attainment with an average 41% conversion rate.",
                "Demonstrated deep expertise in NetSuite's architecture, enhancing customer concurrency and server efficiency to cut bottlenecks by up to 50%, by scaling computing resources or providing targeted guidance on optimizing concurrency and server requests.",
                "Implemented client specifications through prototype demonstrations and customized solutions, enriching the ERP offering with knowledge on more than 22 add-on applications such as NetSuite's Analytics Warehouse, Planning & Budgeting, Connectors, and our proprietary e-commerce cloud offering, enhancing opportunities for upselling and customer stickiness."
            ]
        },
        {
            title: "Staff Solution Consultant",
            company: "Oracle NetSuite",
            period: "Nov 2019 - Dec 2021",
            description: "",
            achievements: [
                "Drove NetSuite adoption and strategic customer engagement, generating over $3.5M in Annual Recurring Revenue (ARR) by upselling modular solutions, net new ERP instances, and managed services.",
                "Consistently achieved MVP of the Quarter awards by exceeding sales benchmarks and maintaining a 36% conversion rate.",
                "Proactively offered consultancy in NetSuite's non-profit segment, Suite Pro Bono, effectively scoping and deploying 10 to 15 hours worth of work that met specific operational needs.",
                "Built and maintained strong sales pipelines in collaboration with account managers, enhancing pipeline accuracy and strengthening relationships and overall strategy with existing clients."
            ]
        },
        {
            title: "Sourcing & Procurement Manager",
            company: "Screen Innovations",
            period: "Aug 2016 - Jan 2019",
            description: "Screen Innovations is known for its advanced manufacturing of projector screens that enhance the visual experience for residential and commercial spaces. They specialize in ambient light-rejecting technology for motorized and fixed-frame screens, offering various products that deliver superior image quality and performance.",
            achievements: [
                "Spearheaded cost reduction initiatives as the principal buyer and sourcing strategist for engineered materials, securing over $2M in savings through strategic negotiations and process optimization.",
                "Transformed purchasing strategies by establishing strong global supplier partnerships, reducing material costs by 20% while maintaining high-quality standards.",
                "Bridged go-to-market, engineering, and operations teams, ensuring product bills of materials (BOMs) were synchronized with product launch timelines, enhancing launch efficiency.",
                "Managed inventory and fulfillment operations with a dedicated 5-person team, implementing lean inventory strategies that improved replenishment and fulfillment metrics by an estimated 30%."
            ]
        },
        {
            title: "Supply Chain Manager",
            company: "Benedettini Cabinetry",
            period: "Feb 2013 - Jul 2016",
            description: "Benedettini Cabinetry is a distinguished provider of custom cabinetry, known for their craftsmanship and dedication to quality. Specializing in unique designs tailored to individual specifications, they blend traditional woodworking techniques with modern aesthetics to create functional and stylish cabinetry for residential spaces.",
            achievements: [
                "Cultivated robust supplier partnerships, guaranteeing consistent material supply and effectively navigating lumbar market changes to maintain supply chain integrity.",
                "Pioneered the creation of a mobile inventory scanning app, cutting error rates and delivery discrepancy-related back-charges by 80%, enhancing operational accuracy.",
                "Directed a 20-member inventory and logistics team in efficiently servicing and distributing hundreds of cabinets daily to top-tier home builders like Toll Brothers, Perry Homes, and Highland Homes, ensuring premium service.",
                "Engineered and implemented delivery route optimization and capacity planning strategies, achieving substantial reductions in mileage and the number of delivery trips, thereby improving logistical efficiency and reducing costs."
            ]
        }
    ];

    return workHistory.map(job => `
        <div class="timeline-item">
            <div class="timeline-card">
                <div class="timeline-header">
                    <div class="timeline-header-content">
                        <h3 class="job-title">${job.title}</h3>
                        <p class="job-company">${job.company}</p>
                    </div>
                    <span class="job-period">${job.period}</span>
                </div>
                ${job.description ? `<p class="company-description">${job.description}</p>` : ''}
                <ul class="achievements-list">
                    ${job.achievements.map(achievement => `
                        <li class="achievement-item">
                            <span class="achievement-bullet">
                                <i data-lucide="check-circle"></i>
                            </span>
                            <span class="achievement-text">${achievement}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `).join('');
} 