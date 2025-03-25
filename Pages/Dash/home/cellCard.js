var mainDashCellContainer = document.getElementById("mainDashCellContainer");
var timeFrame = document.getElementById("timeFrame");
var database = [];

function convertFtoCapital(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function deleteCurrentCellsOnRefresh() {
  mainDashCellContainer.innerHTML = "";
}

function createCell(type, month, year) {
  let displayType = convertFtoCapital(type.toLowerCase());
  switch (displayType) {
    case "Successfuldeliveries":
      displayType = "Successful Deliveries";
      break;
    case "Faileddeliveries":
      displayType = "Failed Deliveries";
      break;
    case "Totaldeliveries":
      displayType = "Total Deliveries";
      break;
  }

  database.forEach((object) => {
    if (object.year === year && object.month === month) {
      const cell = document.createElement("div");
      cell.className = "mainCell";

      const cellH3 = document.createElement("h3");
      cellH3.textContent = displayType;

      const value = object[type.toLowerCase()];
      let formattedValue;
      if (["revenue", "expenses", "total"].includes(type.toLowerCase())) {
        formattedValue = `$${numberWithCommas(value)}`;
      } else {
        formattedValue = numberWithCommas(value);
      }
      const cellValue = document.createElement("h2");
      cellValue.textContent = formattedValue;

      cell.appendChild(cellH3);
      cell.appendChild(cellValue);
      mainDashCellContainer.appendChild(cell);
    }
  });
}

function cellObject(month, year) {
  const objectKeys = Object.keys(database[0]);
  objectKeys.forEach((key) => {
    if (key !== "month" && key !== "year") {
      createCell(key, month, year);
    }
  });
}

function createMultipleCellsOnclick(e) {
  deleteCurrentCellsOnRefresh();
  const value = Number(e.target.value);

  const timeMapping = {
    1: [1, 1],
    2: [2, 1],
    3: [3, 1],
    4: [1, 2],
    5: [2, 2],
    6: [3, 2],
    7: [1, 3],
    8: [2, 3],
    9: [3, 3],
  };

  const [month, year] = timeMapping[value];
  cellObject(month, year);
}
fetch("http://localhost:3000/fakeDatabase")
  .then((response) => response.json())
  .then((data) => {
    database = data;
    createMultipleCellsOnclick({ target: timeFrame });
    timeFrame.addEventListener("change", createMultipleCellsOnclick);
  })
  .catch((error) => {
    console.error("Error fetching database:", error);
  });
