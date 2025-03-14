var mainDashCellContainer = document.getElementById("mainDashCellContainer");
var timeFrame = document.getElementById("timeFrame");
function convertFtoCapital(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

if (timeFrameCurrent) {
  timeFrame.value = timeFrameCurrent
}else{
  timeFrame.value = 1
}

function createCell(type, month, year) {
  let typeOf = type.toLowerCase();
  typeOf = convertFtoCapital(typeOf);
  switch (typeOf) {
    case "Successfuldeliveries":
      typeOf = "Successful Deliveries";
      break;
    case "Faileddeliveries":
      typeOf = "Failed Deliveries";
      break;
    case "Totaldeliveries":
      typeOf = "Total Deliveries";
      break;
    default:
      break;
  }
  fakeDatabase.forEach((object) => {
    if (object.year == year) {
      if (object.month == month) {
        let cell = document.createElement("div");
        cell.className = "mainCell";
        let cellH3 = document.createElement("h3");
        let cellH3Text = document.createTextNode(typeOf);
        cellH3.appendChild(cellH3Text);
        let cellValueText = document.createTextNode(
          numberWithCommas(object[type.toLowerCase()])
        );
        if ("Revenue" == typeOf || "Expenses" == typeOf || "Total" == typeOf) {
          cellValueText = document.createTextNode(
            "$" + numberWithCommas(object[type.toLowerCase()])
          );
        }
        let cellValue = document.createElement("h2");
        cellValue.appendChild(cellValueText);
        cell.appendChild(cellH3);
        cell.appendChild(cellValue);
        mainDashCellContainer.appendChild(cell);
      }
    }
  });
}

function cellObject(month, year) {
  let objectKeys = Object.keys(fakeDatabase[0]);
  objectKeys.forEach((key) => {
    switch (key) {
      case "month":
        break;
      case "year":
        break;

      default:
        createCell(key, month, year);
        break;
    }
  });
}

function createMultipleCellsOnclick(e) {
  deleteCurrentCellsOnRefresh();
  let value = Number(e.target.value);
  switch (value) {
    case 1:
      cellObject(1, 1);
      break;
    case 2:
      cellObject(2, 1);
      break;

    case 3:
      cellObject(3, 1);
      break;

    case 4:
      cellObject(1, 2);
      break;

    case 5:
      cellObject(2, 2);
      break;

    case 6:
      cellObject(3, 2);
      break;

    case 7:
      cellObject(1, 3);
      break;
    case 8:
      cellObject(2, 3);
      break;
    case 9:
      cellObject(3, 3);
      break;

    default:
      break;
  }
}

function deleteCurrentCellsOnRefresh() {
  let children = mainDashCellContainer.children;
  let convertedChildren = Array.from(children);
  convertedChildren.forEach((child) => {
    child.remove();
  });
}
var timeFrameCurrent = timeFrame.value
function reload(e) {
  createMultipleCellsOnclick(e);
  timeFrameCurrent = timeFrame.value
}
timeFrame.addEventListener("change", reload)

timeFrame.addEventListener("change", createMultipleCellsOnclick);