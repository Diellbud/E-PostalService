var table = document.getElementById("dataTable");
var yearSelector = document.getElementById("yearSelector");
var monthSelector = document.getElementById("monthSelector");
var data = [];

function convertFtoCapital(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function createTableHead(objectKeys) {
  table.innerHTML = "";
  const tableHead = document.createElement("tr");
  objectKeys.forEach(key => {
    if (!["month", "year", "id"].includes(key)) {
      const th = document.createElement("th");
      th.textContent = key === "lastname" ? "Last Name" :
                       key === "productWeight" ? "Product Weight" :
                       key === "productPrice" ? "Product Price" :
                       convertFtoCapital(key);
      tableHead.appendChild(th);
    }
  });
  table.appendChild(tableHead);
}

function createRows(month, year) {
  data.forEach(obj => {
    if (obj.year === year && obj.month === month) {
      const tr = document.createElement("tr");
      ["name", "lastname", "productWeight", "productPrice", "address"].forEach(prop => {
        const td = document.createElement("td");
        td.textContent = prop === "productPrice" ? `$${obj[prop]}` : obj[prop];
        tr.appendChild(td);
      });
      table.appendChild(tr);
    }
  });
}

function updateTable() {
  table.innerHTML = "";
  createTableHead(Object.keys(data[0]));
  createRows(Number(monthSelector.value), Number(yearSelector.value));
}

fetch("http://localhost:3000/fakeDatabaseTable")
  .then(res => res.json())
  .then(fetchedData => {
    data = fetchedData;
    updateTable();
    yearSelector.addEventListener("change", updateTable);
    monthSelector.addEventListener("change", updateTable);
  })
  .catch(console.error);