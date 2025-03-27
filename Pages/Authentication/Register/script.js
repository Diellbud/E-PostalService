var users = [];
fetch("http://localhost:3000/users")
  .then(res => res.json())
  .then(data => {
    users = data;
})
.catch(error =>{
  console.log(error);
  
})
var registerForm = document.getElementById("registerForm");

function validateName(name) {
  let nameError = document.getElementById("nameError");
  if (name == "") {
    nameError.textContent = "Name must not be empty";
    return false;
  } else if (name.length <= 3) {
    nameError.textContent = "Name must be longer than 3 characters";
    return false;
  } else if (name.length >= 20) {
    nameError.textContent = "Name cannot be longer than 20 characters";
    return false;
  } else if (!/^[a-zA-Z\s\-]+$/.test(name)) {
    nameError.textContent =
      "Name can only contain letters, spaces, and hyphens";
    return false;
  }
  nameError.textContent = "";
  return true;
}

function validateEmail(email) {
  let emailError = document.getElementById("emailError");
  if (email == "") {
    emailError.textContent = "Email must not be empty";
    return false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailError.textContent = "Invalid email address";
    return false;
  } else if (users.some((user) => user.email === email)) {
    emailError.textContent = "Email is already registered";
    return false;
  }
  emailError.textContent = "";
  return true;
}
function validatePassword(password) {
  let passwordError = document.getElementById("passwordError");
  if (password == "") {
    passwordError.textContent = "Password must not be empty";
    return false;
  } else if (password.length < 6) {
    passwordError.textContent = "Password must not be less than 6 characters";
    return false;
  } else if (password.length >= 20) {
    passwordError.textContent = "Password cannot be longer than 20 characters";
    return false;
  }
  passwordError.textContent = "";
  return true;
}

function validateForm(e) {
  e.preventDefault();
  let formData = new FormData(registerForm);
  let name = formData.get("name").trim();
  let email = formData.get("email").trim();
  let password = formData.get("password").trim();
  if (validateName(name)) {
    if (validateEmail(email)) {
      if (validatePassword(password)) {
        let userObject = {
          name: name,
          email: email,
          password: password,
          role:"user",
        };
        fetch("http://localhost:3000/users",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userObject)})
        
        .then(res => res.json())
        .then(data => {
          alert("Registration successful!");
          window.location.hash = "signin";
        })
        .catch(error => {
          console.log(error);
        })
      }
    }
  }
}
registerForm.addEventListener("submit", validateForm);