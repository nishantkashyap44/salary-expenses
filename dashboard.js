// ===== Select DOM Elements =====
const body = document.querySelector("body"),             // Body element
      modeToggle = body.querySelector(".mode-toggle"),   // Dark/Light mode toggle button
      sidebar = body.querySelector("nav"),              // Sidebar navigation
      sidebarToggle = body.querySelector(".sidebar-toggle"); // Sidebar open/close button

// ===== Check Local Storage for Dark Mode =====
let getMode = localStorage.getItem("mode");            // Get saved mode from browser
if(getMode && getMode === "dark"){
    body.classList.add("dark");                       // Add dark class if previously dark mode
}

// ===== Check Local Storage for Sidebar Status =====
let getStatus = localStorage.getItem("status");       // Get saved sidebar status
if(getStatus && getStatus === "close"){
    sidebar.classList.add("close");                   // Add close class if sidebar was closed
}

// ===== Dark/Light Mode Toggle Function =====
modeToggle.addEventListener("click", () =>{
    body.classList.toggle("dark");                   // Toggle dark mode class

    if(body.classList.contains("dark")){
        localStorage.setItem("mode", "dark");        // Save dark mode to LocalStorage
        updateChartColors(true);                     // Update chart colors for dark mode
    }else{
        localStorage.setItem("mode", "light");       // Save light mode to LocalStorage
        updateChartColors(false);                    // Update chart colors for light mode
    }
});

// ===== Sidebar Toggle Function =====
sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");               // Toggle sidebar open/close class
    if(sidebar.classList.contains("close")){
        localStorage.setItem("status", "close");    // Save closed status
    }else{
        localStorage.setItem("status", "open");     // Save open status
    }
});

// ===== Chart.js Initialization =====
let ctx = document.getElementById('myChart').getContext('2d'); // Get canvas context

let chart = new Chart(ctx, {
  type: 'bar',       // Bar chart
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // X-axis labels
    datasets: [{
      label: 'Expenses',                     // First dataset
      data: [2000, 1500, 1800, 2200, 1700, 1900, 2100, 2500, 2300, 2400, 2000, 2200], // Y-axis data
      backgroundColor: 'rgba(255, 99, 132, 0.5)', // Bar color
    },
    {
      label: 'Savings',                       // Second dataset
      data: [1000, 1200, 1300, 1400, 1500, 1600, 1700, 2000, 1800, 2100, 1900, 2200],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    }]
  },
  options: {
    responsive: true,                         // Responsive chart
    plugins: {
      legend: { position: 'top' }             // Legend on top
    }
  }
});

// ===== Load Monthly Data Function =====
function loadMonthly() {
  chart.data.labels = ["Week 1", "Week 2", "Week 3", "Week 4"];  // X-axis weeks
  chart.data.datasets[0].data = [500, 700, 400, 600];            // Expenses per week
  chart.data.datasets[1].data = [200, 300, 250, 350];            // Savings per week
  chart.update();                                                // Update chart
}

// ===== Load Yearly Data Function =====
function loadYearly() {
  chart.data.labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  chart.data.datasets[0].data = [2000, 1500, 1800, 2200, 1700, 1900, 2100, 2500, 2300, 2400, 2000, 2200]; // Expenses
  chart.data.datasets[1].data = [1000, 1200, 1300, 1400, 1500, 1600, 1700, 2000, 1800, 2100, 1900, 2200]; // Savings
  chart.update();  // Redraw chart
}

// ===== Update Chart Colors Based on Dark/Light Mode =====
function updateChartColors(isDark) {
  if (isDark) {
    chart.options.plugins.legend.labels.color = "#fff";   // Legend text white
    chart.options.scales.x.ticks.color = "#fff";          // X-axis labels white
    chart.options.scales.y.ticks.color = "#fff";          // Y-axis labels white
  } else {
    chart.options.plugins.legend.labels.color = "#000";   // Legend text black
    chart.options.scales.x.ticks.color = "#000";          // X-axis labels black
    chart.options.scales.y.ticks.color = "#000";          // Y-axis labels black
  }
  chart.update();  // Redraw chart with updated colors
}
