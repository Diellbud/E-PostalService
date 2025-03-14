const saveUsers = JSON.parse(localStorage.getItem("users"));
const initialUsers = saveUsers || [];
const registerForm = document.getElementById("registerForm");

let users = initialUsers;

function signIn(e) {
  e.preventDefault();
  let formData = new FormData(e.target);
  let email = formData.get("email").trim();
  let password = formData.get("password").trim();
  let passwordError = document.getElementById("passwordError");
  let emailError = document.getElementById("emailError");
  users.forEach((user) => {
    if (email === user.email) {
        emailError.textContent = "";
      if (password === user.password) {
        alert("Sign in successful");
        passwordError.textContent = "";
        email.value = "";
        password.value = "";
        return;
      } else {
        passwordError.textContent = "Incorrect Password!";
      }
    }else{
        emailError.textContent = "Incorrect Email!";
    }
  });
  
}
registerForm.addEventListener("submit", signIn);
