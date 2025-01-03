// src/js/components/analytics.js
import { chartDefaults } from '../config/chartConfig.js';
import { arrData, pipelineData, adsData, daysToCloseData, oppsWonData, leadConsultantData, winRateData, topModulesData, arrCategoryData, customerSizeData } from '../data/metricData.js';
import { createTooltip, initializeChart } from '../utils/chartUtils.js';

export const analyticsComponent = {
    render: () => {
        return `
            <div class="analytics-dashboard">
                <h2 class="dashboard-title">Solution Consultant Analytics</h2>
                
                <!-- Metrics Grid -->
                <div class="metrics-grid">
                    <div class="metric-card">
                        <div class="metric-title">ARR Influence</div>
                        <div id="arr-metric" class="metric-chart"></div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-title">Average Deal Size</div>
                        <div id="ads-metric" class="metric-chart"></div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-title">Days to Close</div>
                        <div id="days-to-close-metric" class="metric-chart"></div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-title">Opps Won</div>
                        <div id="opps-won-metric" class="metric-chart"></div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-title">Lead Consultant</div>
                        <div id="lead-consultant-metric" class="metric-chart"></div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-title">Win Rate</div>
                        <div id="win-rate-metric" class="metric-chart"></div>
                    </div>
                </div>

                <!-- New Chart Section -->
                <div class="chart-container">
                    <h3 class="chart-title">ARR by Pipeline</h3>
                    <div class="chart-wrapper">
                        <div id="arr-pipeline-chart"></div>
                    </div>
                </div>

                <div class="charts-row">
                    <div class="chart-container">
                        <h3 class="chart-title">Top 10 Modules</h3>
                        <div class="chart-wrapper">
                            <div id="top-modules-chart"></div>
                        </div>
                    </div>

                    <div class="chart-container">
                        <h3 class="chart-title">ARR by Category</h3>
                        <div class="chart-wrapper">
                            <div id="arr-category-chart"></div>
                        </div>
                    </div>
                </div>

                <div class="chart-container">
                    <h3 class="chart-title">ARR by Customer Size</h3>
                    <div class="chart-wrapper">
                        <div id="customer-size-chart"></div>
                    </div>
                </div>
            </div>
        `;
    },
    
    // After render function to initialize charts
    afterRender: () => {

        // ARR chart configuration
        const arrConfig = {
            ...chartDefaults.common,
            series: arrData.series,
            tooltip: {
                ...chartDefaults.tooltip,
                custom: ({ series, seriesIndex, dataPointIndex }) => 
                    createTooltip(series[seriesIndex][dataPointIndex], dataPointIndex)
            },
            title: {
                text: arrData.currentValue,
                align: 'left',
                style: { fontSize: '22px', color: '#fff', fontWeight: 600 }
            },
            subtitle: {
                text: arrData.trend,
                align: 'left',
                style: { fontSize: '14px', color: '#00E396' }
            }
        };

        const arrChart = initializeChart("#arr-metric", arrConfig);
        arrChart.render();
        
        // Average Deal Size chart configuration
        const adsConfig = {
            ...chartDefaults.common,
            series: adsData.series,
            tooltip: {
                ...chartDefaults.tooltip,
                custom: ({ series, seriesIndex, dataPointIndex }) => 
                    createTooltip(series[seriesIndex][dataPointIndex], dataPointIndex)
            },
            title: {
                text: adsData.currentValue,
                align: 'left',
                style: { fontSize: '22px', color: '#fff', fontWeight: 600 }
            },
            subtitle: {
                text: adsData.trend,
                align: 'left',
                style: { fontSize: '14px', color: '#00E396' }
            }
        };

        const adsChart = initializeChart("#ads-metric", adsConfig);
        adsChart.render();

        // Days to Close chart configuration
        const daysToCloseConfig = {
            ...chartDefaults.common,
            series: daysToCloseData.series,
            tooltip: {
                ...chartDefaults.tooltip,
                custom: ({ series, seriesIndex, dataPointIndex }) => 
                    createTooltip(series[seriesIndex][dataPointIndex], dataPointIndex, 'days')
            },
            title: {
                text: daysToCloseData.currentValue,
                align: 'left',
                style: { fontSize: '22px', color: '#fff', fontWeight: 600 }
            }
        };

        const daysToCloseChart = initializeChart("#days-to-close-metric", daysToCloseConfig);
        daysToCloseChart.render();

        // Opps Won chart configuration
        const oppsWonConfig = {
            ...chartDefaults.common,
            series: oppsWonData.series,
            tooltip: {
                ...chartDefaults.tooltip,
                custom: ({ series, seriesIndex, dataPointIndex }) => 
                    createTooltip(series[seriesIndex][dataPointIndex], dataPointIndex, 'opps')
            },
            title: {
                text: oppsWonData.currentValue,
                align: 'left',
                style: { fontSize: '22px', color: '#fff', fontWeight: 600 }
            },
            subtitle: {
                text: oppsWonData.trend,
                align: 'left',
                style: { fontSize: '14px', color: oppsWonData.trendColor }
            }
        };

        const oppsWonChart = initializeChart("#opps-won-metric", oppsWonConfig);
        oppsWonChart.render();

        // Lead Consultant chart configuration
        const leadConsultantConfig = {
            ...chartDefaults.radial,
            ...chartDefaults.gauge,
            series: leadConsultantData.series,
            chart: {
                ...chartDefaults.radial.chart,
                height: 175,
            }
        };

        const leadConsultantChart = initializeChart("#lead-consultant-metric", leadConsultantConfig);
        leadConsultantChart.render();

        // Win Rate chart configuration
        const winRateConfig = {
            ...chartDefaults.radial,
            series: winRateData.series,
            chart: {
                ...chartDefaults.radial.chart,
                height: 175
            }
        };

        const winRateChart = initializeChart("#win-rate-metric", winRateConfig);
        winRateChart.render();

        // ARR Pipeline Chart Configuration
        const arrPipelineConfig = {
            ...chartDefaults.areaSpline,
            series: [
                {
                    name: 'ARR',
                    data: arrData.series[0].data
                },
                {
                    name: 'Pipeline',
                    data: pipelineData.series[0].data
                }
            ],
            chart: {
                ...chartDefaults.areaSpline.chart,
                id: 'arr-pipeline-chart'
            },
            responsive: [{
                breakpoint: 492,  // Mobile breakpoint
                options: {
                    xaxis: {
                        labels: {
                            style: {
                                fontSize: '8px'  // Smaller font only on mobile
                            }
                        }
                    }
                }
            }]
        };

        const arrPipelineChart = initializeChart("#arr-pipeline-chart", arrPipelineConfig);
        arrPipelineChart.render();

        // Top 10 Modules Chart Configuration
        const topModulesConfig = {
            ...chartDefaults.horizontalBar,
            series: topModulesData.series,
            chart: {
                ...chartDefaults.horizontalBar.chart,
                id: 'top-modules-chart',
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    borderRadius: 4,
                    endingShape: 'rounded'
                }
            },
            xaxis: {
                min: 0,
                max: 500000,
                tickAmount: 4,
                axisBorder: {
                    show: true
                },
                axisTicks: {
                    show: true
                },
                labels: {
                    show: true,
                    style: {
                        colors: '#ffffff'
                    },
                    formatter: function(value) {
                        const roundedValue = Math.round(value);
                        const showValues = [0, 100000, 250000, 500000];
                        
                        const isShowValue = showValues.some(v => Math.abs(v - roundedValue) < 1000);
                        
                        if (isShowValue) {
                            return roundedValue === 0 ? '$0' : `$${roundedValue/1000}K`;
                        }
                        return '';
                    }
                }
            },
            grid: {
                xaxis: {
                    lines: {
                        show: true
                    }
                },
                yaxis: {
                    lines: {
                        show: false
                    }
                }
            }
        };

        const topModulesChart = initializeChart("#top-modules-chart", topModulesConfig);
        topModulesChart.render();

        // ARR by Category Chart Configuration
        const arrCategoryConfig = {
            ...chartDefaults.donut,
            series: arrCategoryData.series,
            labels: arrCategoryData.labels,
            chart: {
                ...chartDefaults.donut.chart,
                id: 'arr-category-chart'
            },
            tooltip: {
                enabled: false
            },
            legend: {
                position: 'right',
                fontSize: '14px',
                horizontalAlign: 'center',
                markers: {
                    width: 12,
                    height: 12
                },
                itemMargin: {
                    horizontal: 8,
                    vertical: 4
                },
                offsetY: 50
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '70%',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '14px'
                            },
                            value: {
                                show: true,
                                fontSize: '16px',
                                formatter: function(val) {
                                    return '$' + Number(val).toLocaleString('en-US', {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    });
                                }
                            },
                            total: {
                                show: true,
                                label: 'Total ARR',
                                fontSize: '14px',
                                formatter: function(w) {
                                    const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                    return '$' + total.toLocaleString('en-US', {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    });
                                }
                            }
                        }
                    }
                }
            },
            responsive: [{
                breakpoint: 1274,
                options: {
                    chart: {
                        height: 380
                    },
                    legend: {
                        fontSize: '12px',
                        position: 'bottom',
                        horizontalAlign: 'center',
                        offsetY: 0,
                        itemMargin: {
                            horizontal: 12,
                            vertical: 3
                        }
                    }
                }
            }, {
                breakpoint: 896,
                options: {
                    chart: {
                        height: 300
                    },
                    legend: {
                        fontSize: '11px',
                        itemMargin: {
                            horizontal: 8,
                            vertical: 2
                        }
                    },
                    plotOptions: {
                        pie: {
                            donut: {
                                labels: {
                                    total: {
                                        show: true,
                                        fontSize: '14px'
                                    },
                                    value: {
                                        fontSize: '14px'
                                    }
                                }
                            }
                        }
                    }
                }
            }]
        };

        const arrCategoryChart = initializeChart("#arr-category-chart", arrCategoryConfig);
        arrCategoryChart.render();

        // Customer Size Chart Configuration
        const customerSizeConfig = {
            ...chartDefaults.treemap,
            series: customerSizeData.series,
            chart: {
                ...chartDefaults.treemap.chart,
                id: 'customer-size-chart'
            }
        };

        const customerSizeChart = initializeChart("#customer-size-chart", customerSizeConfig);
        customerSizeChart.render();
    }
};
