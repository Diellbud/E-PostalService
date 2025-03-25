var registerForm = document.getElementById("registerForm");

var users = [];
fetch("http://localhost:3000/users")
  .then(res => res.json())
  .then(data => {
    users = data;
})
.catch(error =>{
  console.log(error);
})

function signIn(e) {
  e.preventDefault();
  
  let formData = new FormData(registerForm);
  let email = formData.get("email").trim();
  let password = formData.get("password").trim();
  let passwordError = document.getElementById("passwordError");
  let emailError = document.getElementById("emailError");

  const user = users.find(user => user.email === email);

  if (!user) {
    emailError.textContent = "Incorrect Email!";
    passwordError.textContent = "";
    return;
  } else {
    emailError.textContent = "";
  }

  if (user.password === password) {
    alert("Sign in successful");
    passwordError.textContent = "";
    window.history.replaceState(null, null, window.location.href);
    window.location.hash = "home";
  } else {
    passwordError.textContent = "Incorrect Password!";
  }
}
registerForm.addEventListener("submit", signIn);