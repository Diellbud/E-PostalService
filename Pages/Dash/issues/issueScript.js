var issueForm = document.getElementById("issueForm");
var issueTableBody = document.getElementById("issueTableBody");
var issueTableContainer = document.getElementById("issueTableContainer");

var typeMap = {
  1: "Payment",
  2: "Product Listings",
  3: "Shipping",
  4: "Account",
  5: "Technical",
  6: "Other"
};

fetch("http://localhost:3000/users")
  .then((res) => res.json())
  .then((data) => {
    const currentUserId = localStorage.getItem("cookie");
    const currentUser = data.find((user) => user.id === currentUserId);

    if (currentUser && currentUser.role === "admin") {
      issueTableContainer.style.display = "block";
      loadIssues();
    } else {
      issueTableContainer.style.display = "none";
    }
  });

function loadIssues() {
  issueTableBody.innerHTML = "";
  fetch("http://localhost:3000/issues")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((issue) => addIssueRow(issue));
      if (data.length == 0) {
        issueTableContainer.innerHTML =""
      }
    })
    .catch((err) => console.error(err));
}

function addIssueRow(issue) {
  const row = document.createElement("tr");
  row.addEventListener("click", () => {
    window.location.hash = `detailedIssue?id=${issue.id}`;
  });

  const typeText = typeMap[issue.type];
  const priorityText = mapPriority(issue.priority);
  const priorityClass = priorityText.toLowerCase();

  row.innerHTML = `
    <td data-label="ID">${issue.id}</td>
    <td data-label="Title">${issue.title}</td>
    <td data-label="Description">${issue.desc}</td>
    <td data-label="Type"><span class="type ${typeText.toLowerCase().replace(" ", "-")}">${typeText}</span></td>
    <td data-label="Priority"><span class="priority ${priorityClass}">${priorityText}</span></td>
  `;

  issueTableBody.appendChild(row);
}

  
  function mapPriority(priority) {
    switch (priority) {
      case "1": return "Low";
      case "2": return "Medium";
      case "3": return "High";
      case "4": return "Critical";
      default: return "Unset";
    }
  }


function createIssue(e) {
    e.preventDefault();
  
    const title = document.getElementById("title").value;
    const desc = document.getElementById("desc").value;
    const type = document.getElementById("type").value;
    const imageInput = document.getElementById("fileId");
    const file = imageInput.files[0];
  
    if (!title || !desc || !type) {
      alert("Please fill in all fields.");
      return;
    }
  
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const base64Img = event.target.result;
        submitIssue(title, desc, type, base64Img);
      };
      reader.readAsDataURL(file);
    } else {
      submitIssue(title, desc, type, null);
    }
  }
  
  function submitIssue(title, desc, type, base64Img) {
    const issueData = {
      title: title,
      desc: desc,
      type: type,
      img: base64Img
    };
  
    fetch("http://localhost:3000/issues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(issueData),
    })
      .then((res) => res.json())
      .then((data) => {
        addIssueRow(data);
        issueForm.reset();
      })
      .catch((err) => console.error("Error creating issue:", err));
  }

issueForm.addEventListener("submit", createIssue);
