// Initialize KPI gauge charts
function createGaugeChart(canvasId, value, maxValue, thresholds) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || !canvas.getContext) {
        console.warn(`Gauge chart canvas ${canvasId} not found or context not available`);
        return;
    }
    
    const ctx = canvas.getContext('2d');
    
    // Determine color based on thresholds
    function getGaugeColor(value, thresholds) {
        if (thresholds.type === 'higher-better') {
            if (value >= thresholds.good) return '#2ecc71';
            if (value >= thresholds.warning) return '#f39c12';
            return '#e74c3c';
        } else { // lower-better
            if (value <= thresholds.good) return '#2ecc71';
            if (value <= thresholds.warning) return '#f39c12';
            return '#e74c3c';
        }
    }
    
    const gaugeChartOptions = {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [value, maxValue - value],
                backgroundColor: [
                    getGaugeColor(value, thresholds),
                    '#f0f0f0'
                ],
                borderWidth: 0,
                circumference: 180,
                rotation: 270
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true
            }
        },
        plugins: [{
            id: 'gaugeNeedle',
            afterDatasetDraw(chart) {
                const { ctx, data, chartArea } = chart;
                const xCenter = chart.getDatasetMeta(0).data[0].x;
                const yCenter = chart.getDatasetMeta(0).data[0].y;
                const radius = chart.getDatasetMeta(0).data[0].outerRadius;
                const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;
                const centerX = xCenter;
                const centerY = yCenter;
                const percentValue = value / maxValue;
                
                const angle = Math.PI * (percentValue + 0.5);
                const x = centerX + Math.cos(angle) * (radius * 0.95);
                const y = centerY + Math.sin(angle) * (radius * 0.95);
                
                // Draw the needle
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(centerX + Math.cos(angle) * innerRadius, centerY + Math.sin(angle) * innerRadius);
                ctx.lineTo(x, y);
                ctx.strokeStyle = '#555';
                ctx.lineWidth = 2;
                ctx.stroke();
                
                // Draw the circle at the base of the needle
                ctx.beginPath();
                ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
                ctx.fillStyle = '#555';
                ctx.fill();
                ctx.restore();
            }
        }]
    };
    
    try {
        return new Chart(ctx, gaugeChartOptions);
    } catch (error) {
        console.error(`Error creating gauge chart ${canvasId}:`, error);
    }
}

// Initialize data charts
function initializeCharts() {
    const isMobile = window.innerWidth < 768;
    // Common chart options
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: isMobile ? 0 : 1000 // Disable animations on mobile
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    padding: 20,
                    usePointStyle: true,
                    font: {
                        size: 12
                    }
                }
            }
        }
    };
    
    try {
        // Job Orders by Status Chart
        const jobOrdersCanvas = document.getElementById('jobOrdersChart');
        const jobOrdersPlaceholder = document.getElementById('jobOrdersChartPlaceholder');
        
        if (jobOrdersCanvas && jobOrdersCanvas.getContext) {
            if (jobOrdersPlaceholder) jobOrdersPlaceholder.style.display = 'none';
            const jobOrdersChart = new Chart(jobOrdersCanvas, {
                type: 'bar',
                data: {
                    labels: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
                    datasets: [{
                        label: 'Job Orders',
                        data: [65, 45, 93, 12],
                        backgroundColor: [
                            '#4e73df',
                            '#f6c23e',
                            '#1cc88a',
                            '#e74a3b'
                        ]
                    }]
                },
                options: chartOptions
            });
        } else {
            console.warn('Job Orders chart canvas not found or context not available');
            if (jobOrdersPlaceholder) jobOrdersPlaceholder.style.display = 'flex';
        }
        
        // Repair Jobs by Type Chart
        const repairJobsCanvas = document.getElementById('repairJobsChart');
        const repairJobsPlaceholder = document.getElementById('repairJobsChartPlaceholder');
        
        if (repairJobsCanvas && repairJobsCanvas.getContext) {
            if (repairJobsPlaceholder) repairJobsPlaceholder.style.display = 'none';
            const repairJobsChart = new Chart(repairJobsCanvas, {
                type: 'pie',
                data: {
                    labels: ['Engine', 'Transmission', 'Brakes', 'Electrical', 'Body Work', 'Other'],
                    datasets: [{
                        data: [30, 22, 18, 15, 10, 5],
                        backgroundColor: [
                            '#4e73df',
                            '#1cc88a',
                            '#36b9cc',
                            '#f6c23e',
                            '#e74a3b',
                            '#858796'
                        ]
                    }]
                },
                options: chartOptions
            });
        } else {
            console.warn('Repair Jobs chart canvas not found or context not available');
            if (repairJobsPlaceholder) repairJobsPlaceholder.style.display = 'flex';
        }
        
        // Monthly Trends Chart
        const monthlyTrendsCanvas = document.getElementById('monthlyTrendsChart');
        const monthlyTrendsPlaceholder = document.getElementById('monthlyTrendsChartPlaceholder');
        
        if (monthlyTrendsCanvas && monthlyTrendsCanvas.getContext) {
            if (monthlyTrendsPlaceholder) monthlyTrendsPlaceholder.style.display = 'none';
            const monthlyTrendsChart = new Chart(monthlyTrendsCanvas, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'New Orders',
                        data: [50, 60, 75, 80, 95, 110, 120, 130, 100, 95, 85, 80],
                        borderColor: '#4e73df',
                        backgroundColor: 'rgba(78, 115, 223, 0.05)',
                        tension: 0.3,
                        fill: true
                    }, {
                        label: 'Completed Orders',
                        data: [30, 40, 55, 70, 80, 90, 100, 110, 85, 80, 70, 65],
                        borderColor: '#1cc88a',
                        backgroundColor: 'rgba(28, 200, 138, 0.05)',
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: chartOptions
            });
        } else {
            console.warn('Monthly Trends chart canvas not found or context not available');
            if (monthlyTrendsPlaceholder) monthlyTrendsPlaceholder.style.display = 'flex';
        }
        
        // Monthly Values Chart
        const monthlyValuesCanvas = document.getElementById('monthlyValuesChart');
        
        if (monthlyValuesCanvas && monthlyValuesCanvas.getContext) {
            const monthlyValuesChart = new Chart(monthlyValuesCanvas, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Job Orders',
                        data: [65, 72, 78, 85, 82, 90, 88, 92, 85, 95, 98, 100],
                        borderColor: '#4caf50',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        fill: true,
                        tension: 0.4
                    }, {
                        label: 'Invoice Value (K KWD)',
                        data: [45, 52, 58, 60, 58, 65, 62, 68, 63, 70, 72, 75],
                        borderColor: '#2196f3',
                        backgroundColor: 'rgba(33, 150, 243, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    ...chartOptions,
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: '#f0f0f0'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        } else {
            console.warn('Monthly Values chart canvas not found or context not available');
        }
        
        // Repair Status Chart
        const repairStatusCanvas = document.getElementById('repairStatusChart');
        
        if (repairStatusCanvas && repairStatusCanvas.getContext) {
            const repairStatusChart = new Chart(repairStatusCanvas, {
                type: 'bar',
                data: {
                    labels: ['Mechanical', 'Electrical', 'Body Work', 'AC System', 'Transmission', 'Wheel Alignment'],
                    datasets: [{
                        label: 'Completed',
                        data: [12, 8, 5, 7, 4, 9],
                        backgroundColor: '#2ecc71',
                    }, {
                        label: 'In Progress',
                        data: [8, 6, 3, 4, 2, 3],
                        backgroundColor: '#3498db',
                    }, {
                        label: 'Pending',
                        data: [5, 3, 7, 2, 1, 2],
                        backgroundColor: '#e74c3c',
                    }]
                },
                options: {
                    ...chartOptions,
                    scales: {
                        x: {
                            stacked: true,
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            stacked: true,
                            beginAtZero: true,
                            grid: {
                                color: '#f0f0f0'
                            }
                        }
                    }
                }
            });
        } else {
            console.warn('Repair Status chart canvas not found or context not available');
        }
        
        // Approval Workflow Chart
        const approvalWorkflowCanvas = document.getElementById('approvalWorkflowChart');
        
        if (approvalWorkflowCanvas && approvalWorkflowCanvas.getContext) {
            const approvalWorkflowChart = new Chart(approvalWorkflowCanvas, {
                type: 'doughnut',
                data: {
                    labels: ['Approved', 'Pending Approval', 'Rejected', 'In Review', 'Cancelled'],
                    datasets: [{
                        data: [42, 28, 7, 15, 8],
                        backgroundColor: [
                            '#2ecc71', '#f39c12', '#e74c3c', '#3498db', '#95a5a6'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    ...chartOptions,
                    cutout: '60%'
                }
            });
        } else {
            console.warn('Approval Workflow chart canvas not found or context not available');
        }
        
        // Technician Jobs Chart
        const technicianJobsCanvas = document.getElementById('technicianJobsChart');
        
        if (technicianJobsCanvas && technicianJobsCanvas.getContext) {
            const technicianJobsChart = new Chart(technicianJobsCanvas, {
                type: 'bar',
                data: {
                    labels: ['Ahmed M.', 'Mohammed K.', 'Jamal S.', 'Fahad A.', 'Khaled Y.', 'Omar H.', 'Saad Q.', 'Tariq Z.'],
                    datasets: [{
                        label: 'Assigned Jobs',
                        data: [8, 6, 7, 4, 5, 3, 6, 2],
                        backgroundColor: '#3498db',
                        borderColor: '#2980b9',
                        borderWidth: 1
                    }, {
                        label: 'Completed Today',
                        data: [3, 2, 5, 2, 3, 1, 3, 1],
                        backgroundColor: '#2ecc71',
                        borderColor: '#27ae60',
                        borderWidth: 1
                    }]
                },
                options: {
                    ...chartOptions,
                    indexAxis: 'y',
                    scales: {
                        x: {
                            beginAtZero: true,
                            grid: {
                                color: '#f0f0f0'
                            }
                        },
                        y: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        } else {
            console.warn('Technician Jobs chart canvas not found or context not available');
        }
        
        // KPI Gauge Charts
        createGaugeChart('turnaroundGauge', 2.3, 5, { type: 'lower-better', good: 3, warning: 4 });
        createGaugeChart('firstTimeFixGauge', 89, 100, { type: 'higher-better', good: 90, warning: 80 });
        createGaugeChart('satisfactionGauge', 94, 100, { type: 'higher-better', good: 85, warning: 70 });
        createGaugeChart('laborUtilizationGauge', 82, 100, { type: 'higher-better', good: 85, warning: 75 });
        
    } catch (error) {
        console.error('Error initializing charts:', error);
    }
}

// Fix placeholder images
function fixPlaceholderImages() {
    // Handle API placeholder requests
    document.querySelectorAll('img').forEach(img => {
        const src = img.getAttribute('src');
        if (src && src.includes('/api/placeholder/')) {
            // Replace with local placeholder images instead
            let placeholderSrc;
            if (src.includes('30/30') || src.includes('35/35') || 
                src.includes('40/40') || src.includes('60/60')) {
                placeholderSrc = 'assets/images/placeholder/profile-40x40.svg';
            } else {
                placeholderSrc = 'assets/images/placeholder/chart-500x300.svg';
            }
            
            console.log(`Replacing API placeholder ${src} with local placeholder ${placeholderSrc}`);
            img.setAttribute('src', placeholderSrc);
        }
    });
    
    // Make chart placeholders visible if charts cannot be initialized
    document.querySelectorAll('.placeholder-img.chart').forEach(placeholder => {
        const chartId = placeholder.id.replace('Placeholder', '');
        const canvas = document.getElementById(chartId);
        
        if (!canvas || !canvas.getContext) {
            placeholder.style.display = 'flex';
        }
    });
}

// Initialize when DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Fix placeholder images first
    fixPlaceholderImages();
    
    // Check if Chart.js is loaded
    if (typeof Chart !== 'undefined') {
        console.log('Chart.js is loaded. Initializing charts...');
        initializeCharts();
    } else {
        console.error('Chart.js is not loaded. Charts cannot be initialized.');
        // Display placeholders if Chart.js fails to load
        document.querySelectorAll('.placeholder-img.chart').forEach(placeholder => {
            placeholder.style.display = 'flex';
        });
    }
}); 