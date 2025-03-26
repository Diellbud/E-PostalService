  var mainDashCellContainer = document.getElementById("mainDashCellContainer");
  var yearSelector = document.getElementById("yearSelector");
  var monthSelector = document.getElementById("monthSelector");
  var database = [];

  function deleteCurrentCellsOnRefresh() {
    mainDashCellContainer.innerHTML = "";
  }

  function createCell(type, dataObj) {
    let displayType = convertFtoCapital(type.toLowerCase());
    if (displayType === "Successfuldeliveries") displayType = "Successful Deliveries";
    if (displayType === "Faileddeliveries") displayType = "Failed Deliveries";
    if (displayType === "Totaldeliveries") displayType = "Total Deliveries";

    const cell = document.createElement("div");
    cell.className = "mainCell";

    const cellH3 = document.createElement("h3");
    cellH3.textContent = displayType;

    const value = dataObj[type];
    let formattedValue = ["revenue", "expenses", "total"].includes(type.toLowerCase())
      ? `$${numberWithCommas(value)}`
      : numberWithCommas(value);

    const cellValue = document.createElement("h2");
    cellValue.textContent = formattedValue;

    cell.appendChild(cellH3);
    cell.appendChild(cellValue);
    mainDashCellContainer.appendChild(cell);
  }

  function updateCells() {
    deleteCurrentCellsOnRefresh();

    const year = Number(yearSelector.value);
    const month = Number(monthSelector.value);
    const currentData = database.find(item => item.year === year && item.month === month);

    if (currentData) {
      Object.keys(currentData).forEach(key => {
        if (!["month", "year", "id"].includes(key)) {
          createCell(key, currentData);
        }
      });
    }
  }

  fetch("http://localhost:3000/fakeDatabase")
    .then(res => res.json())
    .then(data => {
      database = data;
      updateCells();
      yearSelector.addEventListener("change", updateCells);
      monthSelector.addEventListener("change", updateCells);
    })
    .catch(console.error);