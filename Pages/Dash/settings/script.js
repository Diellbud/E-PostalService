var settingsForm = document.getElementById("settingsForm");
var userId = localStorage.getItem("cookie");

fetch(`http://localhost:3000/users/${userId}`)
  .then(res => res.json())
  .then(data => {
    document.getElementById("user").value = data.name || "";
    document.getElementById("email").value = data.email || "";
  });

fetch("http://localhost:3000/users")
  .then(res => res.json())
  .then(data => {
    function validateName(name) {
      let nameError = document.getElementById("nameError");
      if (!name) {
        nameError.textContent = "Name must not be empty";
        return false;
      } else if (name.length <= 3) {
        nameError.textContent = "Name must be longer than 3 characters";
        return false;
      } else if (name.length >= 20) {
        nameError.textContent = "Name cannot be longer than 20 characters";
        return false;
      } else if (!/^[a-zA-Z\s\-]+$/.test(name)) {
        nameError.textContent = "Name can only contain letters, spaces, and hyphens";
        return false;
      }
      nameError.textContent = "";
      return true;
    }

    function validateEmail(email) {
      let emailError = document.getElementById("emailError");
      if (!email) {
        emailError.textContent = "Email must not be empty";
        return false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.textContent = "Invalid email address";
        return false;
      } else if (data.some(user => user.email === email && user.id !== userId)) {
        emailError.textContent = "Email is already registered";
        return false;
      }
      emailError.textContent = "";
      return true;
    }

    function validatePassword(password) {
      let passwordError = document.getElementById("passwordError");
      if (!password) {
        passwordError.textContent = "";
        return true;
      } else if (password.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters";
        return false;
      } else if (password.length > 20) {
        passwordError.textContent = "Password cannot be longer than 20 characters";
        return false;
      }
      passwordError.textContent = "";
      return true;
    }

    function onsave(e) {
        e.preventDefault();
      
        const userName = document.getElementById("user").value.trim();
        const userEmail = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const file = document.getElementById("profilePic").files[0];
      
        if (!validateName(userName) || !validateEmail(userEmail) || !validatePassword(password)) return;
      
        const updatedUser = {
          name: userName,
          email: userEmail
        };
      
        if (password) updatedUser.password = password;
      
        if (file) {
          const reader = new FileReader();
          reader.onloadend = function () {
            updatedUser.profilePic = reader.result;
      
            sendUserUpdate(updatedUser);
          };
          reader.readAsDataURL(file);
        } else {
          sendUserUpdate(updatedUser);
        }
      }
      
      function sendUserUpdate(updatedUser) {
        fetch(`http://localhost:3000/users/${userId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser)
        })
          .then(res => res.json())
          .then(() => {
            alert("Settings updated!");
          })
          .catch(err => console.error("Error updating user:", err));
      }
    settingsForm.addEventListener("submit", onsave);
  });
