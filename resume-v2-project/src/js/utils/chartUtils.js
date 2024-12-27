export const createTooltip = (value, index, type = 'money') => {
    const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
    const years = ['2020', '2021', '2022', '2023', '2024'];
    const quarterIndex = index % 4;
    const yearIndex = Math.floor(index / 4);
    
    let formattedValue;
    if (type === 'days') {
        formattedValue = `${value} Days`;
    } else if (type === 'opps') {
        formattedValue = `${value} Opps`;
    } else {
        formattedValue = `$${value.toLocaleString()}`;
    }
    
    return `
        <div class="custom-tooltip">
            <span>${quarters[quarterIndex]} ${years[yearIndex]}</span>
            <span>${formattedValue}</span>
        </div>
    `;
};

export const initializeChart = (elementId, config) => {
    const chart = new ApexCharts(document.querySelector(elementId), config);
    return chart;
};

