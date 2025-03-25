document.addEventListener("DOMContentLoaded", () => {
    const timeFrame = document.getElementById("timeFrame");
    let dynamicChart;
  
    fetch("http://localhost:3000/fakeDatabase")
      .then(res => res.json())
      .then(data => {
        initializeChart(data, Number(timeFrame.value));
        timeFrame.addEventListener("change", () => updateChart(data));
      })
      .catch(err => console.error(err));
  
    function initializeChart(database, year) {
      const canvas = document.getElementById("dynamicChart");
      if (!canvas) {
        console.error("Canvas element not found");
        return;
      }
  
      const ctx = canvas.getContext("2d");
      dynamicChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Month 1", "Month 2", "Month 3"],
          datasets: [{
            label: `Revenue for Year ${year}`,
            data: getMonthlyRevenue(database, year),
            borderColor: "rgba(75,192,192,1)",
            backgroundColor: "rgba(75,192,192,0.2)",
            borderWidth: 2,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    }
  
    function updateChart(database) {
      const selectedYear = Number(timeFrame.value);
      dynamicChart.data.datasets[0].label = `Revenue for Year ${selectedYear}`;
      dynamicChart.data.datasets[0].data = getMonthlyRevenue(database, selectedYear);
      dynamicChart.update();
    }
  
    function getMonthlyRevenue(database, year) {
      return database
        .filter(entry => entry.year === year)
        .sort((a, b) => a.month - b.month)
        .map(entry => entry.revenue);
    }
  });
  