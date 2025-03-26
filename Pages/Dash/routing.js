const body = document.body;
const routes = {
  home: "./home/home.html",
  users: "./users/users.html",
  issues: "./issues/issues.html",
  logout: "../Authentication/Logout/logout.html",
  signin: "../Authentication/signIn/signIn.html",
  register: "../Authentication/Register/register.html",
};

const userSideBarName = document.getElementById("userSideBarName");

function convertFtoCapital(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const router = () => {
  let route = window.location.hash.replace("#", "");
  const renderContent = document.getElementById("app");

  fetch("http://localhost:3000/users")
    .then((res) => res.json())
    .then((data) => {
      const userId = localStorage.getItem("cookie");
      const loggedInUser = data.find((user) => user.id === userId);

      if ((route === "home" || route === "users" || route === "issues") && !loggedInUser) {
        window.location.hash = "signin";
        return;
      }

      if (route === "signin" && loggedInUser) {
        window.location.hash = "home";
        return;
      }

      if (loggedInUser && userSideBarName) {
        userSideBarName.textContent = convertFtoCapital(loggedInUser.name);
      }

      if (route === "") {
        window.location.hash = "signin";
        return;
      }

      const file = routes[route];
      if (file) {
        fetch(file)
          .then((response) => response.text())
          .then((data) => {
            renderContent.innerHTML = data;
            loadScripts(route);
          })
          .catch((error) => {
            renderContent.innerHTML = `<p>Error loading page.</p>`;
            console.warn(error);
          });
      }
    });
};

const loadScripts = (route) => {
  const scripts = {
    home: ["./home/cellCard.js", "./home/tableScript.js", "./home/chart.js"],
    users: ["./users/userScript.js"],
    issues: ["./issues/issueScript.js"],
    logout: ["../Authentication/Logout/script.js"],
    signin: ["../Authentication/signIn/script.js"],
    register: ["../Authentication/Register/script.js"],
  };
  const scriptFiles = scripts[route];
  if (scriptFiles) {
    removeExistingScripts();
    loadScriptSequentially(scriptFiles, 0);
  }
};

const loadScriptSequentially = (scripts, index) => {
  if (index < scripts.length) {
    const script = document.createElement("script");
    script.src = scripts[index];
    script.className = "dynamic-script";
    script.onload = () => loadScriptSequentially(scripts, index + 1);
    document.body.appendChild(script);
  }
};

const removeExistingScripts = () => {
  document.querySelectorAll(".dynamic-script").forEach((script) => script.remove());
};

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
