var params = new URLSearchParams(window.location.hash.split('?')[1]);
var issueId = params.get("id");

var detailId = document.getElementById("detailId");
var detailTitle = document.getElementById("detailTitle");
var detailDesc = document.getElementById("detailDesc");
var detailType = document.getElementById("detailType");
var detailImage = document.getElementById("detailImage");
var priorityForm = document.getElementById("priorityForm");
var prioritySelect = document.getElementById("prioritySelect");
var commentForm = document.getElementById("commentForm");
var commentInput = document.getElementById("commentInput");
var commentList = document.getElementById("commentList");

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

fetch(`http://localhost:3000/issues/${issueId}`)
  .then(res => res.json())
  .then(data => {
    detailId.textContent = data.id;
    detailTitle.textContent = data.title;
    detailDesc.textContent = data.desc;
    detailType.textContent = mapType(data.type);

    if (data.img) {
      detailImage.src = data.img;
      detailImage.classList.add("visible");
      detailImage.classList.remove("hidden");
    } else {
      detailImage.classList.add("hidden");
      detailImage.classList.remove("visible");
    }

    if (data.priority) {
      prioritySelect.value = data.priority;
    }
  })
  .catch(err => {
    console.error("Failed to fetch issue:", err);
    document.querySelector(".issueDetailContainer").innerHTML = "<p>Error loading issue details.</p>";
  });
function updatePriority (e) {
  e.preventDefault();
  const selectedPriority = prioritySelect.value;

  fetch(`http://localhost:3000/issues/${issueId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ priority: selectedPriority })
  })
    .then(res => res.json())
    .then(() => {
      alert("Priority updated successfully.");
    })
    .catch(err => {
      console.error("Error updating priority:", err);
    });
}
priorityForm.addEventListener("submit", updatePriority);
function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function loadComments() {
  fetch(`http://localhost:3000/comments?issueId=${issueId}`)
    .then(res => res.json())
    .then(data => {
      commentList.innerHTML = "";
      data.forEach((comment) => {
        const commentDiv = document.createElement("div");
        commentDiv.className = "commentCard";
      
        commentDiv.innerHTML = `
          <p class="commentText">${comment.text}</p>
          <div class="commentMeta">
            <span class="commentUser">${comment.user}</span>
            <span class="commentTime">• ${formatDate(comment.timestamp)}</span>
          </div>
        `;
      
        commentList.appendChild(commentDiv);
      });
      
    })
    .catch(err => console.error("Failed to load comments:", err));
}

commentForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const commentText = commentInput.value.trim();
  if (!commentText) return;

  const currentUserId = localStorage.getItem("cookie");

  fetch(`http://localhost:3000/users/${currentUserId}`)
    .then(res => res.json())
    .then(user => {
      const newComment = {
        issueId,
        text: commentText,
        user: user.name,
        timestamp: new Date().toISOString()
      };

      return fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment)
      });
    })
    .then(res => res.json())
    .then(() => {
      commentInput.value = "";
      loadComments();
    })
    .catch(err => console.error("Error posting comment:", err));
});

loadComments();
