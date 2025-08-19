// California Health Equity Dashboard - Verified Data Visualizations
// Using only real, verified data from official California sources

// Real verified data from the provided JSON
const verifiedHealthData = {
    "real_health_disparities": {
        "life_expectancy": {
            "asian": 85.7,
            "white": 80.8,
            "latino_hispanic": 79.1,
            "black": 74.6,
            "native_american": 73.5,
            "source": "California Health Care Foundation 2024",
            "url": "https://www.chcf.org/resource/health-disparities-by-race-and-ethnicity-in-california-almanac/"
        },
        "maternal_mortality": {
            "overall_california": 12.8,
            "black_multiplier": "3-4x",
            "year": 2019,
            "source": "CA-PAMR",
            "url": "https://www.cmqcc.org/education-research/maternal-mortality-review-ca-pamr/ca-pamr-recent-data"
        },
        "healthcare_access": {
            "latino_no_care": 18,
            "latino_delayed": 15,
            "latino_cost": 38,
            "black_no_care": 14.7,
            "black_delayed": 17.9,
            "black_cost": 35.2,
            "white_no_care": 8.2,
            "white_delayed": 11.5,
            "white_cost": 22.1,
            "source": "CHIS 2021",
            "url": "https://healthpolicy.ucla.edu/our-work/publications/health-disparities-race-and-ethnicity-california-2024-edition"
        }
    },
    "ab1204_requirements": {
        "hospitals_affected": 353,
        "deadline": "September 30, 2025",
        "structural_measures": 11,
        "quality_measures": "2-9",
        "demographic_categories": 9,
        "source": "HCAI",
        "url": "https://hqinstitute.org/support-for-mandatory-health-equity-reporting/"
    }
};

// Chart.js color palette - official design system colors
const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];

// Chart.js default configuration
Chart.defaults.font.family = 'var(--font-family-base)';
Chart.defaults.font.size = 14;
Chart.defaults.color = '#134252';
Chart.defaults.plugins.legend.labels.usePointStyle = true;

// Initialize application with verified data only
document.addEventListener('DOMContentLoaded', function() {
    console.log('California Health Equity Dashboard - Loading verified data...');
    
    // Log data sources for transparency
    console.log('Data Sources:', {
        'Life Expectancy': verifiedHealthData.real_health_disparities.life_expectancy.source,
        'Healthcare Access': verifiedHealthData.real_health_disparities.healthcare_access.source,
        'Maternal Mortality': verifiedHealthData.real_health_disparities.maternal_mortality.source,
        'AB 1204': verifiedHealthData.ab1204_requirements.source
    });
    
    // Create visualizations using verified data only
    createLifeExpectancyChart();
    createAccessBarriersChart();
    
    // Add interactivity and accessibility
    setupInteractivity();
    setupAccessibility();
    
    console.log('Dashboard loaded successfully with verified data');
});

// 1. Life Expectancy Chart - Using Real CHCF 2024 Data
function createLifeExpectancyChart() {
    const ctx = document.getElementById('lifeExpectancyChart');
    if (!ctx) {
        console.warn('Life expectancy chart canvas not found');
        return;
    }
    
    const lifeExpData = verifiedHealthData.real_health_disparities.life_expectancy;
    
    // Prepare data in descending order
    const chartData = [
        { race: 'Asian', years: lifeExpData.asian },
        { race: 'White', years: lifeExpData.white },
        { race: 'Latino/Hispanic', years: lifeExpData.latino_hispanic },
        { race: 'Black', years: lifeExpData.black },
        { race: 'Native American', years: lifeExpData.native_american }
    ].sort((a, b) => b.years - a.years);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartData.map(d => d.race),
            datasets: [{
                label: 'Life Expectancy (Years)',
                data: chartData.map(d => d.years),
                backgroundColor: chartColors.slice(0, chartData.length),
                borderColor: chartColors.slice(0, chartData.length),
                borderWidth: 2,
                borderRadius: 4,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#1FB8CD',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            const years = context.parsed.x;
                            const race = context.label;
                            return [
                                `${race}: ${years} years`,
                                `Source: ${lifeExpData.source}`
                            ];
                        },
                        footer: function(tooltipItems) {
                            const highest = Math.max(...chartData.map(d => d.years));
                            const lowest = Math.min(...chartData.map(d => d.years));
                            const gap = highest - lowest;
                            return `Gap: ${gap.toFixed(1)} years between highest and lowest`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: false,
                    min: 70,
                    max: 90,
                    title: {
                        display: true,
                        text: 'Life Expectancy (Years)',
                        font: {
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Race/Ethnicity',
                        font: {
                            weight: 'bold'
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// 2. Healthcare Access Barriers Chart - Using Real CHIS 2021 Data
function createAccessBarriersChart() {
    const ctx = document.getElementById('accessBarriersChart');
    if (!ctx) {
        console.warn('Access barriers chart canvas not found');
        return;
    }
    
    const accessData = verifiedHealthData.real_health_disparities.healthcare_access;
    
    // Prepare verified data
    const demographics = ['White', 'Black', 'Latino/Hispanic'];
    const noCareData = [accessData.white_no_care, accessData.black_no_care, accessData.latino_no_care];
    const delayedData = [accessData.white_delayed, accessData.black_delayed, accessData.latino_delayed];
    const costData = [accessData.white_cost, accessData.black_cost, accessData.latino_cost];
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: demographics,
            datasets: [
                {
                    label: 'No Usual Source of Care (%)',
                    data: noCareData,
                    backgroundColor: '#1FB8CD',
                    borderColor: '#1FB8CD',
                    borderWidth: 2,
                    borderRadius: 4,
                    borderSkipped: false
                },
                {
                    label: 'Delayed Care Due to Cost (%)',
                    data: delayedData,
                    backgroundColor: '#FFC185',
                    borderColor: '#FFC185',
                    borderWidth: 2,
                    borderRadius: 4,
                    borderSkipped: false
                },
                {
                    label: 'Cost Barriers to Care (%)',
                    data: costData,
                    backgroundColor: '#B4413C',
                    borderColor: '#B4413C',
                    borderWidth: 2,
                    borderRadius: 4,
                    borderSkipped: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        padding: 20,
                        font: {
                            weight: 'bold'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#1FB8CD',
                    borderWidth: 1,
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        footer: function(tooltipItems) {
                            return `Source: ${accessData.source}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 45,
                    title: {
                        display: true,
                        text: 'Percentage (%)',
                        font: {
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Demographic Group',
                        font: {
                            weight: 'bold'
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            }
        }
    });
}

// Interactive features for better user experience
function setupInteractivity() {
    // Add click handlers for metric cards
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            highlightDataSource(card);
        });
        
        // Add keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                highlightDataSource(card);
            }
        });
    });
    
    // Smooth scroll to sections
    const sourceLinks = document.querySelectorAll('a[href^="#"]');
    sourceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function highlightDataSource(card) {
    // Remove existing highlights
    document.querySelectorAll('.highlighted').forEach(el => {
        el.classList.remove('highlighted');
    });
    
    // Add highlight effect
    card.classList.add('highlighted');
    
    // Find and highlight corresponding methodology card
    const metricLabel = card.querySelector('.metric-label')?.textContent;
    if (metricLabel) {
        highlightMethodologySection(metricLabel);
    }
    
    // Remove highlight after 3 seconds
    setTimeout(() => {
        card.classList.remove('highlighted');
    }, 3000);
    
    // Announce to screen readers
    announceToScreenReader(`Highlighted data source for ${metricLabel || 'selected metric'}`);
}

function highlightMethodologySection(metricLabel) {
    const methodologyCards = document.querySelectorAll('.methodology-card');
    methodologyCards.forEach(card => {
        const cardTitle = card.querySelector('h4')?.textContent;
        if (cardTitle && (
            (metricLabel.includes('Gap') && cardTitle.includes('Life Expectancy')) ||
            (metricLabel.includes('Risk') && cardTitle.includes('Maternal')) ||
            (metricLabel.includes('Hospitals') && cardTitle.includes('AB 1204')) ||
            (metricLabel.includes('Care') && cardTitle.includes('Healthcare'))
        )) {
            card.style.backgroundColor = 'rgba(31, 184, 205, 0.1)';
            card.style.borderLeftWidth = '6px';
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            setTimeout(() => {
                card.style.backgroundColor = '';
                card.style.borderLeftWidth = '4px';
            }, 3000);
        }
    });
}

function setupAccessibility() {
    // Add ARIA labels for charts
    const chartContainers = document.querySelectorAll('.chart-container');
    chartContainers.forEach((container) => {
        const title = container.querySelector('h3');
        if (title) {
            container.setAttribute('role', 'img');
            container.setAttribute('aria-label', `Chart: ${title.textContent} - Interactive data visualization`);
        }
    });
    
    // Add screen reader support for metric cards
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach((card, index) => {
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-describedby', 'chart-instructions');
        
        const number = card.querySelector('.metric-number')?.textContent;
        const label = card.querySelector('.metric-label')?.textContent;
        const desc = card.querySelector('.metric-desc')?.textContent;
        
        if (number && label && desc) {
            card.setAttribute('aria-label', `${label}: ${number}. ${desc}. Click to highlight data source.`);
        }
    });
    
    // Add instructions for screen readers
    if (!document.getElementById('chart-instructions')) {
        const instructions = document.createElement('div');
        instructions.id = 'chart-instructions';
        instructions.className = 'sr-only';
        instructions.textContent = 'Click or press Enter to highlight related data source and methodology information';
        document.body.appendChild(instructions);
    }
    
    // Enhance source links for screen readers
    const sourceLinks = document.querySelectorAll('.source-link, .ref-link');
    sourceLinks.forEach(link => {
        if (!link.getAttribute('aria-label')) {
            const linkText = link.textContent;
            link.setAttribute('aria-label', `${linkText} - Opens in new tab`);
        }
    });
}

function announceToScreenReader(message) {
    let announcer = document.getElementById('sr-announcer');
    if (!announcer) {
        announcer = document.createElement('div');
        announcer.id = 'sr-announcer';
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        document.body.appendChild(announcer);
    }
    
    announcer.textContent = message;
    setTimeout(() => {
        announcer.textContent = '';
    }, 1000);
}

// Data validation and error handling
function validateData() {
    const requiredFields = [
        'real_health_disparities.life_expectancy.asian',
        'real_health_disparities.life_expectancy.black',
        'real_health_disparities.healthcare_access.latino_cost',
        'ab1204_requirements.hospitals_affected'
    ];
    
    const missingFields = requiredFields.filter(field => {
        const value = field.split('.').reduce((obj, key) => obj?.[key], verifiedHealthData);
        return value === undefined || value === null;
    });
    
    if (missingFields.length > 0) {
        console.error('Missing required data fields:', missingFields);
        showDataError();
    } else {
        console.log('All required data fields validated successfully');
    }
}

function showDataError() {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'data-error';
    errorDiv.innerHTML = `
        <p><strong>Data Validation Notice:</strong> Some data fields are missing. 
        This dashboard displays only verified data from official California sources. 
        Please contact the data providers if you notice any discrepancies.</p>
    `;
    errorDiv.style.cssText = `
        background: var(--color-bg-4);
        border: 2px solid var(--color-error);
        color: var(--color-text);
        padding: var(--space-16);
        margin: var(--space-16);
        border-radius: var(--radius-md);
        text-align: center;
        font-weight: var(--font-weight-medium);
    `;
    
    document.body.insertBefore(errorDiv, document.body.firstChild);
}

// Print functionality
function setupPrintSupport() {
    window.addEventListener('beforeprint', function() {
        // Ensure charts are visible for printing
        const charts = document.querySelectorAll('canvas');
        charts.forEach(chart => {
            chart.style.maxWidth = '100%';
            chart.style.height = 'auto';
        });
    });
}

// Performance monitoring
function monitorPerformance() {
    if ('performance' in window && 'measure' in performance) {
        performance.mark('dashboard-start');
        
        window.addEventListener('load', function() {
            performance.mark('dashboard-complete');
            performance.measure('dashboard-load-time', 'dashboard-start', 'dashboard-complete');
            
            const measures = performance.getEntriesByType('measure');
            measures.forEach(measure => {
                if (measure.name === 'dashboard-load-time') {
                    console.log(`Dashboard loaded in ${Math.round(measure.duration)}ms`);
                }
            });
        });
    }
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    validateData();
    setupPrintSupport();
    monitorPerformance();
});

// Error handling for missing chart elements
window.addEventListener('error', function(event) {
    if (event.message && event.message.includes('canvas')) {
        console.warn('Chart canvas element not found:', event.message);
    }
});

// Add highlight effect CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .highlighted {
        animation: highlight-pulse 0.6s ease-in-out;
        box-shadow: 0 0 20px rgba(31, 184, 205, 0.4) !important;
    }
    
    @keyframes highlight-pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
    
    .data-error {
        animation: slide-in 0.3s ease-out;
    }
    
    @keyframes slide-in {
        from { transform: translateY(-20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

console.log('California Health Equity Dashboard - Verified Data Version - Ready');
console.log('All data sources verified and citations included for transparency');