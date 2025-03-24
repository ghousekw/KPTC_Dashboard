/**
 * KPTC Dashboard Charts
 * Version: 1.0.1
 * This file handles all chart initialization and rendering for the KPTC dashboard
 */

// Fix placeholder images that are returning 404s from API
document.addEventListener('DOMContentLoaded', function() {
    // Check all image elements and convert API placeholders to local placeholders
    fixPlaceholderImages();
    
    // Initialize all charts with proper error handling
    initializeKPIGauges();
    initializeDataCharts();
});

/**
 * Fix placeholder images that are returning 404s
 * Replaces all API placeholder URLs with local SVG placeholders
 */
function fixPlaceholderImages() {
    // Replace profile placeholder images
    document.querySelectorAll('img').forEach(img => {
        // Check if the image URL is requesting an API placeholder
        if (img.src.includes('/api/placeholder/')) {
            const url = new URL(img.src);
            const path = url.pathname;
            
            // Extract dimensions from API request if available
            let width = 0;
            let height = 0;
            
            const matches = path.match(/\/api\/placeholder\/(\d+)\/(\d+)/);
            if (matches && matches.length === 3) {
                width = parseInt(matches[1]);
                height = parseInt(matches[2]);
            }
            
            // Choose appropriate local placeholder based on dimensions
            let placeholderSrc = '';
            
            if (width <= 40 && height <= 40) {
                placeholderSrc = 'assets/images/placeholder/profile-40x40.svg';
            } else if (width >= 500 && height >= 300) {
                placeholderSrc = 'assets/images/placeholder/chart-500x300.svg';
            } else {
                // Default placeholder
                placeholderSrc = 'assets/images/placeholder/logo-placeholder.svg';
            }
            
            // Set new source
            console.log(`Replacing placeholder: ${img.src} with ${placeholderSrc}`);
            img.src = placeholderSrc;
            
            // Add error handling
            img.onerror = function() {
                // If the placeholder fails, use a data URI fallback
                this.onerror = null;
                this.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Crect width="40" height="40" fill="%23f5f5f5"/%3E%3C/svg%3E';
            };
        }
    });
    
    // Handle chart placeholders visibility
    document.querySelectorAll('.placeholder-img.chart').forEach(placeholder => {
        const canvas = placeholder.closest('.chart').querySelector('canvas');
        
        // Show placeholder if canvas is not properly initialized
        if (!canvas || !canvas.getContext) {
            placeholder.style.display = 'flex';
        } else {
            placeholder.style.display = 'none';
        }
    });
}

/**
 * Initialize KPI gauge charts
 */
function initializeKPIGauges() {
    try {
        // Common configuration for gauge charts
        const gaugeOptions = {
            responsive: true,
            cutout: '70%',
            circumference: 180,
            rotation: 270,
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
        };
        
        // Create all gauge charts
        createGaugeChart('turnaroundGauge', 76, '#2ecc71', '#f1f1f1');
        createGaugeChart('firstTimeFixGauge', 89, '#f39c12', '#f1f1f1');
        createGaugeChart('satisfactionGauge', 94, '#2ecc71', '#f1f1f1');
        createGaugeChart('laborUtilizationGauge', 82, '#f39c12', '#f1f1f1');
    } catch (error) {
        console.error("Error initializing KPI gauges:", error);
        // Show fallback gauge placeholders
        document.querySelectorAll('.gauge-container').forEach(gauge => {
            const placeholder = document.createElement('div');
            placeholder.className = 'placeholder-img';
            placeholder.style.height = '100px';
            placeholder.style.width = '150px';
            placeholder.style.display = 'flex';
            placeholder.style.alignItems = 'center';
            placeholder.style.justifyContent = 'center';
            placeholder.innerHTML = '<i class="fas fa-chart-pie" style="font-size: 24px; color: #aaa;"></i>';
            gauge.appendChild(placeholder);
        });
    }
}

/**
 * Create a gauge chart
 */
function createGaugeChart(canvasId, value, color, backgroundColor) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.warn(`Canvas element with ID ${canvasId} not found`);
        return null;
    }
    
    try {
        return new Chart(canvas, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [value, 100 - value],
                    backgroundColor: [color, backgroundColor],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                cutout: '70%',
                circumference: 180,
                rotation: 270,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                }
            }
        });
    } catch (error) {
        console.error(`Error creating gauge chart ${canvasId}:`, error);
        return null;
    }
}

/**
 * Initialize all data visualization charts
 */
function initializeDataCharts() {
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
        // Job Orders Chart
        initializeJobOrdersChart(chartOptions);
        
        // Repair Jobs Chart
        initializeRepairJobsChart(chartOptions);
        
        // Monthly Trends Chart
        initializeMonthlyTrendsChart(chartOptions);
        
        // Additional charts if needed
        initializeAdditionalCharts(chartOptions);
    } catch (error) {
        console.error("Error initializing data charts:", error);
        // Make chart placeholders visible
        document.querySelectorAll('.placeholder-img.chart').forEach(placeholder => {
            placeholder.style.display = 'flex';
        });
    }
}

/**
 * Initialize Job Orders Chart
 */
function initializeJobOrdersChart(options) {
    const canvas = document.getElementById('jobOrdersChart');
    const placeholder = document.getElementById('jobOrdersChartPlaceholder');
    
    if (!canvas || !canvas.getContext) {
        console.warn('Job Orders chart canvas not found or context not available');
        if (placeholder) placeholder.style.display = 'flex';
        return;
    }
    
    try {
        if (placeholder) placeholder.style.display = 'none';
        
        const jobOrdersChart = new Chart(canvas, {
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
            options: options
        });
    } catch (error) {
        console.error("Error initializing Job Orders chart:", error);
        if (placeholder) placeholder.style.display = 'flex';
    }
}

/**
 * Initialize Repair Jobs Chart
 */
function initializeRepairJobsChart(options) {
    const canvas = document.getElementById('repairJobsChart');
    const placeholder = document.getElementById('repairJobsChartPlaceholder');
    
    if (!canvas || !canvas.getContext) {
        console.warn('Repair Jobs chart canvas not found or context not available');
        if (placeholder) placeholder.style.display = 'flex';
        return;
    }
    
    try {
        if (placeholder) placeholder.style.display = 'none';
        
        const repairJobsChart = new Chart(canvas, {
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
            options: options
        });
    } catch (error) {
        console.error("Error initializing Repair Jobs chart:", error);
        if (placeholder) placeholder.style.display = 'flex';
    }
}

/**
 * Initialize Monthly Trends Chart
 */
function initializeMonthlyTrendsChart(options) {
    const canvas = document.getElementById('monthlyTrendsChart');
    const placeholder = document.getElementById('monthlyTrendsChartPlaceholder');
    
    if (!canvas || !canvas.getContext) {
        console.warn('Monthly Trends chart canvas not found or context not available');
        if (placeholder) placeholder.style.display = 'flex';
        return;
    }
    
    try {
        if (placeholder) placeholder.style.display = 'none';
        
        const monthlyTrendsChart = new Chart(canvas, {
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
            options: options
        });
    } catch (error) {
        console.error("Error initializing Monthly Trends chart:", error);
        if (placeholder) placeholder.style.display = 'flex';
    }
}

/**
 * Initialize additional charts
 */
function initializeAdditionalCharts(options) {
    // Initialize additional charts since we fixed the duplicate IDs
    
    // Repair Status Chart
    const repairStatusCanvas = document.getElementById('repairStatusChart');
    if (repairStatusCanvas && repairStatusCanvas.getContext) {
        const repairStatusChart = new Chart(repairStatusCanvas, {
            type: 'doughnut',
            data: {
                labels: ['Completed', 'In Progress', 'On Hold', 'Waiting Parts'],
                datasets: [{
                    data: [40, 35, 15, 10],
                    backgroundColor: ['#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b']
                }]
            },
            options: {
                ...options,
                cutout: '65%'
            }
        });
    }
    
    // Workflow Status Chart
    const workflowCanvas = document.getElementById('approvalWorkflowChart');
    if (workflowCanvas && workflowCanvas.getContext) {
        const workflowChart = new Chart(workflowCanvas, {
            type: 'bar',
            data: {
                labels: ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4', 'Stage 5'],
                datasets: [{
                    label: 'Approved',
                    backgroundColor: '#1cc88a',
                    data: [20, 18, 15, 10, 8]
                }, {
                    label: 'Pending',
                    backgroundColor: '#f6c23e',
                    data: [5, 7, 10, 15, 17]
                }]
            },
            options: {
                ...options,
                scales: {
                    x: {
                        stacked: true
                    },
                    y: {
                        stacked: true
                    }
                }
            }
        });
    }
    
    // Monthly Values Chart (previously commented out)
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
                ...options,
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
    }
    
    // Technician Jobs Chart
    const technicianCanvas = document.getElementById('technicianJobsChart');
    if (technicianCanvas && technicianCanvas.getContext) {
        try {
            const technicianChart = new Chart(technicianCanvas, {
                type: 'bar', // Changed from horizontalBar which is deprecated
                data: {
                    labels: ['Tech 1', 'Tech 2', 'Tech 3', 'Tech 4', 'Tech 5'],
                    datasets: [{
                        label: 'Active Jobs',
                        backgroundColor: '#4e73df',
                        data: [4, 3, 2, 5, 3]
                    }]
                },
                options: {
                    ...options,
                    indexAxis: 'y', // This replaces the deprecated horizontalBar type
                }
            });
        } catch (error) {
            console.error("Error initializing technician chart:", error);
        }
    }
}