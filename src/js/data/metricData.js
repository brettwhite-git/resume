//ARR  
export const arrData = {
    series: [{
        name: 'ARR',
        data: [
            258919, 50200, 365908, 241075,    // 2020
            302476, 455752, 286132, 85187,    // 2021
            278348, 183575, 187348, 416701,   // 2022
            690434, 1234688, 286132, 132192,  // 2023
            403245, 940433, 771603, 339392    // 2024
        ]
    }],
    currentValue: '$14,576,638',
    trend: '+14.2%',
    trendDirection: 'up'
};
// Adding Pipeline data in the same format
export const pipelineData = {
    series: [{
        name: 'Pipeline',
        data: [
            477500, 281952, 454386, 618800,    // 2020
            446680, 476950, 545870, 329515,    // 2021
            341400, 328698, 545276, 751098,    // 2022
            884500, 1164000, 675000, 556000,   // 2023
            727000, 954000, 1108000, 454000    // 2024
        ]
    }],
};

// Average Deal Size
export const adsData = {
    series: [{
        name: 'Average Deal Size',
        data: [
            10328, 82796, 8712, 24845,      // 2020
            27013, 19443, 23158, 12587,     // 2021
            22461, 15443, 19876, 35821,     // 2022
            52447, 71245, 38719, 41876,     // 2023
            47123, 58991, 45876, 35443      // 2024
        ]
    }],
    currentValue: '$25,983',
    trend: '+15% QoQ'
};

// Days to Close
export const daysToCloseData = {
    series: [{
        name: 'Days to Close',
        data: [
            26, 37, 42, 36,     // 2020
            32, 45, 41, 39,     // 2021
            35, 42, 38, 45,     // 2022
            44, 38, 35, 43,     // 2023
            48, 41, 37, 42      // 2024
        ]
    }],
    currentValue: '40 Days'
};

// Opps Won
export const oppsWonData = {
    series: [{
        name: 'Opps Won',
        data: [
            11, 19, 28, 32,     // 2020
            39, 45, 52, 48,     // 2021
            44, 51, 47, 42,     // 2022
            56, 63, 58, 54,     // 2023
            42, 38, 35, 15      // 2024
        ]
    }],
    currentValue: '561 Opps',
    trend: '',
    trendColor: ''
};

// Lead Consultant
export const leadConsultantData = {
    series: [92],  // Percentage value
    currentValue: '92%'
};

// Win Rate
export const winRateData = {
    series: [46]  // Percentage value
    
};

// Top 10 Modules
export const topModulesData = {
    series: [{
        name: 'Revenue',
        data: [
            { x: 'CRM', y: 479612 },
            { x: 'OneWorld', y: 421589 },
            { x: 'Analytics', y: 289756 },
            { x: 'Ecommerce', y: 273433 },
            { x: 'FP&A', y: 173623 },
            { x: 'Connectors', y: 151567 },
            { x: 'CPQ', y: 89403 },
            { x: 'Manufacturing', y: 34613 },
            { x: 'Accounting', y: 29483 },
            { x: 'Payroll', y: 24838 }
        ]
    }]
};

// ARR by Category data
export const arrCategoryData = {
    series: [3979423, 2871597, 2463452, 1880386, 1574277, 860022, 757985, 189496],
    labels: ['Platform', 'Upgrade', 'Infrastructure', 'Support', 'Retention', 'Analytics', 'Commerce', 'Financials'],
    total: '$14,576,638'  // This matches your total ARR
};

// ARR by Customer Size
export const customerSizeData = {
    series: [{
        data: [
            { x: '$4 Billion+', y: 825000 },
            { x: '$2B to $4B', y: 750000 },
            { x: '$1B to $2B', y: 680000 },
            { x: '$500M to $1B', y: 590000 },
            { x: '$400M to $500M', y: 520000 },
            { x: '$300M to $400M', y: 480000 },
            { x: '$250M to $300M', y: 450000 },
            { x: '$200M to $250M', y: 420000 },
            { x: '$150M to $200M', y: 380000 },
            { x: '$100M to $150M', y: 340000 },
            { x: '$50M to $100M', y: 290000 },
            { x: '$30M to $50M', y: 245000 },
            { x: '$20M to $30M', y: 210000 },
            { x: '$10M to $20M', y: 175000 },
            { x: '$5M to $10M', y: 142000 },
            { x: '$2M to $5M', y: 98000 },
            { x: '$1M to $2M', y: 65000 },
            { x: '$500k to $1M', y: 45000 },
            { x: 'Under $500K', y: 25000 }
        ]
    }]
};


