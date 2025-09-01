// ===== Select DOM Elements =====
const body = document.querySelector("body"),
      modeToggle = body.querySelector(".mode-toggle"),
      sidebar = body.querySelector("nav"),
      sidebarToggle = body.querySelector(".sidebar-toggle"),
      navLinks = document.querySelectorAll('.nav-links li a'),
      contentSections = document.querySelectorAll('.content-section');

// ===== Check Local Storage for Dark Mode =====
let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
    body.classList.add("dark");
}

// ===== Check Local Storage for Sidebar Status =====
let getStatus = localStorage.getItem("status");
if (getStatus && getStatus === "close") {
    sidebar.classList.add("close");
}

// ===== Dark/Light Mode Toggle Function =====
if (modeToggle) {
    modeToggle.addEventListener("click", () => {
        body.classList.toggle("dark");
        
        if (body.classList.contains("dark")) {
            localStorage.setItem("mode", "dark");
            updateChartColors(true);
        } else {
            localStorage.setItem("mode", "light");
            updateChartColors(false);
        }
    });
}

// ===== Sidebar Toggle Function =====
if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
        sidebar.classList.toggle("close");
        if (sidebar.classList.contains("close")) {
            localStorage.setItem("status", "close");
        } else {
            localStorage.setItem("status", "open");
        }
    });
}

// ===== Navigation between sections =====
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links and sections
        navLinks.forEach(item => item.classList.remove('active'));
        contentSections.forEach(section => section.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Show corresponding section
        const sectionId = this.getAttribute('data-section');
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    });
});

// ===== Chart.js Initialization =====
let chart = null;
const chartCanvas = document.getElementById('myChart');

if (chartCanvas) {
    let ctx = chartCanvas.getContext('2d');
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            datasets: [{
                label: 'Income',
                data: [50000, 55000, 60000, 58000, 62000, 65000, 70000, 75000],
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                borderColor: 'rgba(76, 175, 80, 1)',
                borderWidth: 2,
                tension: 0.4
            },
            {
                label: 'Expenses',
                data: [30000, 32000, 35000, 38000, 40000, 42000, 45000, 48000],
                backgroundColor: 'rgba(244, 67, 54, 0.2)',
                borderColor: 'rgba(244, 67, 54, 1)',
                borderWidth: 2,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: body.classList.contains("dark") ? "#fff" : "#000"
                    }
                },
                x: {
                    ticks: {
                        color: body.classList.contains("dark") ? "#fff" : "#000"
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: body.classList.contains("dark") ? "#fff" : "#000"
                    }
                }
            }
        }
    });
}

// ===== Load Monthly Data Function =====
function loadMonthly(event) {
    if (!chart) return;
    
    chart.data.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
    chart.data.datasets[0].data = [50000, 55000, 60000, 58000, 62000, 65000, 70000, 75000];
    chart.data.datasets[1].data = [30000, 32000, 35000, 38000, 40000, 42000, 45000, 48000];
    chart.update();
    
    // Update toggle buttons active state
    const toggleButtons = document.querySelectorAll('.toggle-buttons button');
    if (toggleButtons.length) {
        toggleButtons.forEach(btn => btn.classList.remove('active'));
        if (event && event.target) {
            event.target.classList.add('active');
        }
    }
}

// ===== Load Yearly Data Function =====
function loadYearly(event) {
    if (!chart) return;
    
    chart.data.labels = ['2017', '2018', '2019', '2020', '2021', '2022', '2023'];
    chart.data.datasets[0].data = [500000, 550000, 600000, 650000, 700000, 750000, 800000];
    chart.data.datasets[1].data = [300000, 320000, 350000, 380000, 400000, 420000, 450000];
    chart.update();
    
    // Update toggle buttons active state
    const toggleButtons = document.querySelectorAll('.toggle-buttons button');
    if (toggleButtons.length) {
        toggleButtons.forEach(btn => btn.classList.remove('active'));
        if (event && event.target) {
            event.target.classList.add('active');
        }
    }
}

// ===== Update Chart Colors Based on Dark/Light Mode =====
function updateChartColors(isDark) {
    if (!chart) return;
    
    // Initialize options if they don't exist
    if (!chart.options.plugins) chart.options.plugins = {};
    if (!chart.options.plugins.legend) chart.options.plugins.legend = {};
    if (!chart.options.plugins.legend.labels) chart.options.plugins.legend.labels = {};
    
    if (!chart.options.scales) chart.options.scales = {};
    if (!chart.options.scales.x) chart.options.scales.x = {};
    if (!chart.options.scales.x.ticks) chart.options.scales.x.ticks = {};
    if (!chart.options.scales.y) chart.options.scales.y = {};
    if (!chart.options.scales.y.ticks) chart.options.scales.y.ticks = {};
    
    if (isDark) {
        chart.options.plugins.legend.labels.color = "#fff";
        chart.options.scales.x.ticks.color = "#fff";
        chart.options.scales.y.ticks.color = "#fff";
    } else {
        chart.options.plugins.legend.labels.color = "#000";
        chart.options.scales.x.ticks.color = "#000";
        chart.options.scales.y.ticks.color = "#000";
    }
    chart.update();
}

// ===== Add Salary Function =====
function addSalary() {
    const date = document.getElementById('salary-date');
    const amount = document.getElementById('salary-amount');
    const source = document.getElementById('salary-source');
    
    if (date && amount && source && 
        date.value && amount.value && source.value) {
        
        const table = document.querySelector('#add-salary .history-table tbody');
        if (!table) return;
        
        const newRow = document.createElement('tr');
        
        newRow.innerHTML = `
            <td>${formatDate(date.value)}</td>
            <td>${source.value}</td>
            <td class="amount-income">₹${Number(amount.value).toLocaleString('en-IN')}</td>
            <td class="action-buttons">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;
        
        table.appendChild(newRow);
        
        // Clear form
        date.value = '';
        amount.value = '';
        source.value = '';
        
        alert('Salary added successfully!');
    } else {
        alert('Please fill in all required fields (Date, Amount, Source)');
    }
}
// ===== Format Date Function =====
function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString; // Invalid date
        
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-IN', options);
    } catch (e) {
        return dateString; // Return original if formatting fails
    }
}

// ===== Edit and Delete Functionality for Tables =====
document.addEventListener('click', function(e) {
    // Handle edit buttons
    if (e.target.classList.contains('edit-btn')) {
        alert('Edit functionality would be implemented here');
    }
    
    // Handle delete buttons
    if (e.target.classList.contains('delete-btn')) {
        if (confirm('Are you sure you want to delete this record?')) {
            const row = e.target.closest('tr');
            if (row) row.remove();
        }
    }
});

function downloadPDF() {
    alert("PDF report download initiated for August 2023");
    // In a real application, this would generate or fetch a PDF
}



// Update date fields to show current date
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    
    // Set default values for date inputs
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    
    if (startDateInput) {
        startDateInput.value = formatDateForInput(firstDay);
    }
    if (endDateInput) {
        endDateInput.value = formatDateForInput(today);
    }
    
    // Update any date range display
    const dateRangeElement = document.querySelector('.date-range span');
    if (dateRangeElement) {
        dateRangeElement.textContent = "Report Generated: " + formatDateForDisplay(today);
    }
});

// Helper function to format date for input fields (YYYY-MM-DD)
function formatDateForInput(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Helper function to format date for display (e.g., "August 23, 2023")
function formatDateForDisplay(date) {
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}