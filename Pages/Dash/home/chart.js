    var yearSelector = document.getElementById("yearSelector");
    var ctx = document.getElementById("dynamicChart").getContext("2d");
    var database = [], dynamicChart;
  
    fetch("http://localhost:3000/fakeDatabase")
      .then(res => res.json())
      .then(data => {
        database = data;
        initChart();
        yearSelector.addEventListener("change", updateChart);
      })
      .catch(console.error);
  
    function getChartData(year) {
      return database
        .filter(entry => entry.year === year)
        .sort((a, b) => a.month - b.month)
        .map(entry => entry.revenue);
    }
  
    function initChart() {
        dynamicChart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              datasets: [{
                label: `Revenue (Year ${yearSelector.value})`,
                data: getChartData(Number(yearSelector.value)),
                backgroundColor: "#007bff",
                hoverBackgroundColor: "#0062cc",
                borderRadius: 6,
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                  labels: { font: { size: 16 } }
                },
                tooltip: {
                  backgroundColor: "rgba(0,0,0,0.8)",
                  padding: 10,
                  titleFont: { size: 16 },
                  bodyFont: { size: 14 }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: { color: "#e6e6e6" },
                  ticks: {
                    color: "#555",
                    font: { size: 14 },
                    callback: value => '$' + value.toLocaleString()
                  }
                },
                x: {
                  grid: { display: false },
                  ticks: {
                    color: "#555",
                    font: { size: 14 }
                  }
                }
              },
              animation: {
                duration: 1500,
                easing: 'easeOutQuart'
              }
            }
          });
    }
  
    function updateChart() {
      dynamicChart.data.datasets[0].label = `Revenue for Year ${yearSelector.value}`;
      dynamicChart.data.datasets[0].data = getChartData(Number(yearSelector.value));
      dynamicChart.update();
    }