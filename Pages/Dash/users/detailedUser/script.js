var params = new URLSearchParams(window.location.hash.split("?")[1]);
var userId = params.get("id");

var nameField = document.getElementById("detailUserName");
var emailField = document.getElementById("detailUserEmail");
var roleField = document.getElementById("detailUserRole");
var imageField = document.getElementById("detailUserImg");
var roleSelect = document.getElementById("roleSelect");
var saveRoleBtn = document.getElementById("saveRoleBtn");
var deleteUserBtn = document.getElementById("deleteUserBtn");

fetch(`http://localhost:3000/users/${userId}`)
  .then(res => res.json())
  .then(user => {
    document.getElementById("detailUserId").textContent = user.id;
    nameField.textContent = user.name;
    emailField.textContent = user.email;
    roleField.textContent = user.role;

    if (user.profilePic) {
      imageField.src = user.profilePic;
    }else{
        imageField.src = "../../Images/Main/user-128.svg"
    }

    if (roleSelect) {
      roleSelect.value = user.role;
    }
  })
  .catch(err => {
    console.error("Failed to load user data:", err);
    document.querySelector(".detailedUserContainer").innerHTML =
      "<p>Error loading user details.</p>";
  });

  saveRoleBtn.addEventListener("click", () => {
    const selectedRole = roleSelect.value;

    fetch(`http://localhost:3000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ role: selectedRole })
    })
      .then(res => res.json())
      .then(() => {
        alert("Role updated successfully.");
        roleField.textContent = selectedRole;
      })
      .catch(err => console.error("Error updating role:", err));
  });

  deleteUserBtn.addEventListener("click", () => {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    fetch(`http://localhost:3000/users/${userId}`, {
      method: "DELETE"
    })
      .then(() => {
        alert("User deleted successfully.");
        window.location.hash = "users";
      })
      .catch(err => console.error("Error deleting user:", err));
  });