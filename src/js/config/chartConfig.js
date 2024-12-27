export const chartDefaults = {
// Line Charts    
    common: {
        chart: {
            type: 'area',
            height: 110,
            sparkline: { enabled: true },
            background: 'transparent',
            toolbar: { show: false }
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        colors: ['#00E396'],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.6,
                opacityTo: 0.1,
                stops: [0, 90, 100]
            }
        },
        grid: {
            padding: {
                top: 10,
                bottom: 2
            }
        }
    },
    tooltip: {
        theme: 'dark',
        style: {
            fontSize: '12px'
        },
        y: {
            formatter: function(value, { seriesIndex, dataPointIndex, w }) {
                // Get the chart ID or series name to determine formatting
                const chartId = w.globals.chartID;
                const seriesName = w.globals.seriesNames[seriesIndex];
                
                // Format based on metric type
                if (chartId.includes('days-to-close')) {
                    return `${value} Days`;
                } else if (chartId.includes('opps-won')) {
                    return value.toString();  // Just the number for opportunities
                } else {
                    // Default money formatter for other metrics
                    return `$${value.toLocaleString()}`;
                }
            }
        }
    },

// Radial Charts
    radial: {
        chart: {
            type: 'radialBar',
            sparkline: { enabled: true }
        },
        

        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: {
                    background: "#2C3036",
                    strokeWidth: '2%',
                    strokeDashArray: 2,
                },
                dataLabels: {
                    name: { show: false },
                    value: {
                        fontSize: '22px',
                        color: '#fff',
                        fontWeight: 600,
                        offsetY: -2
                    }
                }
            }
        },
        fill: { colors: ['#00E396'] },
        stroke: {
            dashArray: 2,
            width: 2
        }
    },
    gauge: {
        startAngle: 180,
        endAngle: 0,
        hollow: {
            margin: 15,
            size: '70%'
        },
        track: {
            strokeWidth: '100%'
        },
        dataLabels: {
            show: true,
            name: {
                show: false
            },
            value: {
                offsetY: 15,
                fontSize: '22px',
                color: '#fff',
                formatter: function(val) {
                    return val + '%';
                }
            }
        }
    },

    //Area Spline Chart
    areaSpline: {
        chart: {
            type: 'area',
            height: 400,
            toolbar: { 
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        markers: {
            size: 4,
            colors: ['#008FFB', '#5F2D8F'],
            strokeColors: ['#fff', '#fff'],
            strokeWidth: 2,
            hover: {
                size: 6
            }
        },
        dataLabels: {
            enabled: false  // Remove the values on the points
        },
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            labels: {
                colors: '#ffffff'
            },
            itemMargin: {
                horizontal: 15,
                
            }
        },
        xaxis: {
            labels: {
                style: {
                    colors: '#ffffff'
                },
                formatter: function(val) {
                    const year = Math.floor(val / 4) + 2020;
                    const quarter = (val % 4) + 1;
                    return `Q${quarter} '${year.toString().slice(-2)}`;  // Updated format
                }
            },
            tickAmount: 16
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#ffffff'
                },
                formatter: function(val) {
                    return `$${val.toLocaleString()}`;
                }
            }
        },
        grid: {
            borderColor: '#334155'
        },
        tooltip: {
            theme: 'dark',
            x: {
                formatter: function(val) {
                    const year = Math.floor(val / 4) + 2020;
                    const quarter = (val % 4) + 1;
                    return `Q${quarter} '${year.toString().slice(-2)}`;
                }
            },
            y: {
                formatter: function(val) {
                    return `$${val.toLocaleString()}`;
                }
            },
            style: {
                fontSize: '11px'
            },
            marker: {
                show: true,
            },
            fixed: {
                enabled: false,
                position: 'topRight'
            }
        },
        colors: ['#008FFB', '#5F2D8F']
    },

// Bar Chart
    horizontalBar: {
        chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: true,
                borderRadius: 4,
                barHeight: '65%'
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            type: 'category',
            labels: {
                style: {
                    colors: '#fff',
                    fontSize: '14px'
                },
                formatter: function(val) {
                    if (val >= 1000000) {
                        return '$' + (val / 1000000).toFixed(1) + 'M';
                    } else if (val >= 1000) {
                        return '$' + Math.round(val / 1000) + 'K';
                    }
                    return '$' + val;
                }
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#fff',
                    fontSize: '14px'
                }
            }
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: function(val) {
                    return '$' + val.toLocaleString();
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
        },
        colors: ['#00E396']
    },

// Pie Chart
donut: {
    chart: {
        type: 'donut',
        height: 350,
        foreColor: "#ccc",
        toolbar: {
            show: false
        }
    },
    colors: ['#00E396', '#00BAEC', '#775DD0', '#FF4560', '#FEB019', '#2E93FA', '#66DA26', '#FF66B3'],
    plotOptions: {
        pie: {
            donut: {
                size: '70%',
                labels: {
                    show: true,
                    name: {
                        show: true,
                        fontSize: '14px',
                        color: '#fff'
                    },
                    value: {
                        show: true,
                        fontSize: '16px',
                        color: '#fff',
                        formatter: function(w) {
                            return '$' + Number(w).toLocaleString('en-US');
                        }
                    },
                    total: {
                        show: true,
                        label: 'Total ARR',
                        color: '#fff',
                        formatter: function(w) {
                            const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                            return '$' + total.toLocaleString('en-US');
                        }
                    }
                }
            },
            offsetX: -100
        }
    },
    legend: {
        position: 'right',
        offsetY: 50,
        offsetX: -20,
        floating: true,
        fontSize: '14px',
        labels: {
            colors: '#fff'
        },
        markers: {
            width: 8,
            height: 8
        },
        itemMargin: {
            vertical: 5
        }
    },
    dataLabels: {
        enabled: false
    },
    tooltip: {
        theme: 'dark',
        style: {
            fontSize: '14px'
        },
        y: {
            formatter: function(value) {
                return 'Revenue: $' + value.toLocaleString();
            }
        },
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
            const value = series[seriesIndex];
            const label = w.globals.labels[seriesIndex];
            return `<div class="custom-tooltip">
                     <div style="display: flex; align-items: center; gap: 8px;">
                       <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${w.globals.colors[seriesIndex]}"></span>
                       <span>${label}: $${value.toLocaleString()}</span>
                     </div>
                   </div>`;
        },
        marker: {
            show: false
        },
        fixed: {
            enabled: false
        }
    }
},

//Treemap Chart`
treemap: {
    chart: {
        type: 'treemap',
        height: 400,
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: true,
        style: {
            fontSize: '14px',
            colors: ['#ffffff'],
            fontWeight: 500
        },
        formatter: function(text, op) {
            return [text]
        }
    },
    tooltip: {
        theme: 'dark',
        style: {
            fontSize: '14px'
        },
        y: {
            formatter: function(value) {
                return '$' + value.toLocaleString();
            }
        },
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
            const value = w.globals.series[seriesIndex][dataPointIndex];
            const label = w.config.series[seriesIndex].data[dataPointIndex].x;
            return `<div class="custom-tooltip">
                     <div style="display: flex; align-items: center; gap: 8px;">
                       <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${w.globals.colors[seriesIndex]}"></span>
                       <span>${label}: $${value.toLocaleString()}</span>
                     </div>
                   </div>`;
        },
        marker: {
            show: false
        },
        fixed: {
            enabled: false
        }
    },
    legend: {
        show: false
    },
    plotOptions: {
        treemap: {
            distributed: true,
            enableShades: false,
            colorScale: {
                ranges: [{
                    from: 700001,
                    to: Number.MAX_VALUE,
                    color: '#003366'  // Very dark blue
                }, {
                    from: 500001,
                    to: 700000,
                    color: '#006699'  // Dark blue
                }, {
                    from: 300001,
                    to: 500000,
                    color: '#0099CC'  // Medium blue
                }, {
                    from: 0,
                    to: 300000,
                    color: '#33CCFF'  // Light blue
                }]
            }
        }
    }
}
};




