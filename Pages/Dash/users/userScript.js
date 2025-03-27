var usersContainer = document.getElementById("usersContainer");
var isAdmin = false;
var currentUserId = localStorage.getItem("cookie");

fetch("http://localhost:3000/users")
  .then(res => res.json())
  .then(users => {
    const currentUser = users.find(u => u.id === currentUserId);
    if (currentUser && currentUser.role === "admin") {
      isAdmin = true;
    }

    users.forEach(user => {
      const card = document.createElement("div");
      card.classList.add("userCard");

      card.innerHTML = `
        <img src="${user.profilePic || '../../Images/Main/user-128.svg'}" alt="User Image" />
        <h3>${user.name}</h3>
        <p>Email: ${user.email}</p>
        <p>Role: ${user.role || 'N/A'}</p>
      `;

      if (isAdmin) {
        card.style.cursor = "pointer";
        card.addEventListener("click", () => {
          window.location.hash = `detailedUser?id=${user.id}`;
        });
      }

      usersContainer.appendChild(card);
    });
  })
  .catch(err => console.error("Failed to load users:", err));
