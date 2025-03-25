var table = document.getElementById("dataTable");
var tableHead = document.createElement("tr");
var timeFrameCurrent;
if (timeFrameCurrent) {
  timeFrame.value = timeFrameCurrent;
} else {
  timeFrame.value = 1;
  timeFrameCurrent = timeFrame.value;
}
function createTableHead(key) {
  let tableTh = document.createElement("th");
  let tableThText;
  switch (key) {
    case "lastname":
      tableThText = document.createTextNode("Last Name");
      break;
    case "productWeight":
      tableThText = document.createTextNode("Product Weight");
      break;
    case "productPrice":
      tableThText = document.createTextNode("Product Price");
      break;
    default:
      tableThText = document.createTextNode(convertFtoCapital(key));
      break;
  }
  tableTh.appendChild(tableThText);
  tableHead.appendChild(tableTh);
}

table.appendChild(tableHead);

fetch("http://localhost:3000/fakeDatabaseTable")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
      function tableObject() {
        let objectKeys = Object.keys(data[0]);
        objectKeys.forEach((key) => {
          switch (key) {
            case "month":
              break;
            case "year":
              break;
              case "id":
                break;
            default:
              createTableHead(key);
              break;
          }
        });
      }
      tableObject();

      function createRows(month, year) {
        data.forEach((object) => {
          if (object.year == year) {
            if (object.month == month) {
              let tr = document.createElement("tr");
              let name = document.createElement("td");
              let nameText = document.createTextNode(object.name);
              let lastName = document.createElement("td");
              let lastNameText = document.createTextNode(object.lastname);
              let weight = document.createElement("td");
              let weightText = document.createTextNode(object.productWeight);
              let price = document.createElement("td");
              let priceText = document.createTextNode(
                "$" + object.productPrice
              );
              let address = document.createElement("td");
              let adressText = document.createTextNode(object.address);
              name.appendChild(nameText);
              lastName.appendChild(lastNameText);
              weight.appendChild(weightText);
              price.appendChild(priceText);
              address.appendChild(adressText);
              tr.appendChild(name);
              tr.appendChild(lastName);
              tr.appendChild(weight);
              tr.appendChild(price);
              tr.appendChild(address);
              table.appendChild(tr);
            }
          }
        });
      }

      function createMultipleRows(e) {
        deleteCurrentRowsOnRefresh();
        let value = Number(timeFrameCurrent);
        switch (value) {
          case 1:
            createRows(1, 1);
            break;
          case 2:
            createRows(2, 1);
            break;

          case 3:
            createRows(3, 1);
            break;

          case 4:
            createRows(1, 2);
            break;

          case 5:
            createRows(2, 2);
            break;

          case 6:
            createRows(3, 2);
            break;

          case 7:
            createRows(1, 3);
            break;
          case 8:
            createRows(2, 3);
            break;
          case 9:
            createRows(3, 3);
            break;

          default:
            break;
        }
      }

      function deleteCurrentRowsOnRefresh() {
        table.querySelectorAll("tr").forEach((row, index) => {
          if (index !== 0) {
            row.remove();
          }
        });
      }

      function reload(e) {
        timeFrameCurrent = e.target.value;
        createMultipleRows();
      }
      timeFrame.addEventListener("change", reload);
      createMultipleRows();
  })
  .catch((error) => {
    console.error(error);
  });
