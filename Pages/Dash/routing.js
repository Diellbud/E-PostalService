
const body = document.body;
const routes = {
  home: "./home/home.html",
  users: "./users/users.html",
  issues: "./issues/issues.html",
  logout: "../Authentication/Logout/logout.html",
  signin: "../Authentication/signIn/signIn.html",
  register: "../Authentication/Register/register.html"
};

const router = () => {

  let file;
  let route = window.location.hash.replace("#", "");
  const renderContent = document.getElementById("app");
  if (route === ""){
    window.location.hash = "home"
    route = "home"
  }else{
    file = routes[route];
  }
  if (file) {
    fetch(file)
      .then((response) => response.text())
      .then((data) => {
        renderContent.innerHTML = data;
        loadScripts(route);
      })
      .catch((error) => {
        renderContent.innerHTML = `<p>Error</p>`;
        console.warn(error);
      });
  }
};

const loadScripts = (route) => {
  const scripts = {
    home: [
      "./home/cellCard.js",
      "./home/tableScript.js",
      "./home/chart.js"
    ],
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
  document
    .querySelectorAll(".dynamic-script")
    .forEach((script) => script.remove());
};



window.addEventListener("hashchange", router);
window.addEventListener("load", router);
