var params = new URLSearchParams(window.location.hash.split('?')[1]);
var issueId = params.get("id");

fetch(`http://localhost:3000/issues/${issueId}`)
  .then(res => res.json())
  .then(data => {
    document.getElementById("detailId").textContent = data.id;
    document.getElementById("detailTitle").textContent = data.title;
    document.getElementById("detailDesc").textContent = data.desc;
    document.getElementById("detailType").textContent = mapType(data.type);
    const imageElement = document.getElementById("detailImage");
    if (data.img) {
      imageElement.src = data.img;
      imageElement.classList.add("visible");
      imageElement.classList.remove("hidden");
    } else {
      imageElement.classList.add("hidden");
      imageElement.classList.remove("visible");
    }

    if (data.priority) {
      document.getElementById("prioritySelect").value = data.priority;
    }
  })
  .catch(err => {
    console.error("Failed to fetch issue:", err);
    document.querySelector(".issueDetailContainer").innerHTML = "<p>Error loading issue details.</p>";
  });

function mapType(typeCode) {
  const typeMap = {
    1: "Payment",
    2: "Product Listings",
    3: "Shipping",
    4: "Account",
    5: "Technical",
    6: "Other"
  };
  return typeMap[typeCode] || "Unknown";
}

document.getElementById("priorityForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const selectedPriority = document.getElementById("prioritySelect").value;

  fetch(`http://localhost:3000/issues/${issueId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ priority: selectedPriority })
  })
  .then(res => res.json())
  .then(data => {
    alert("Priority updated successfully.");
  })
  .catch(err => {
    console.error("Error updating priority:", err);
  });
});