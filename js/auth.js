if (localStorage.getItem("user")) {
  window.location.replace("index.html");
}

function login(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  let accounts = getCookie("accounts");
  if (!accounts) {
    document.getElementById("error").classList.remove("d-none");
    return;
  } else {
    accounts = JSON.parse(accounts);
  }

  const loginSucceed = accounts.find(
    (a) => a.email === email && a.password === password
  );
  if (loginSucceed) {
    localStorage.setItem("user", loginSucceed);
    window.location.replace("index.html");
  } else {
    document.getElementById("error").classList.remove("d-none");
  }
}

function register(event) {
  event.preventDefault();
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  let accounts = getCookie("accounts");
  if (!accounts) {
    accounts = [];
  } else {
    accounts = JSON.parse(accounts);
    console.log(accounts);
  }

  const existed = accounts.find((a) => a.email === email);

  if (existed) {
    document.getElementById("error").textContent = "This email already used.";
    document.getElementById("error").classList.remove("d-none");
  } else {
    accounts.push({ email: email, password: password });
    setCookie("accounts", JSON.stringify(accounts));
    document.getElementById("error").textContent =
      "Register succeed, please login.";
    document.getElementById("error").classList.remove("d-none", "text-danger");
    document.getElementById("error").classList.add("text-primary");
    window.location.replace("login.html");
  }
}

function setCookie(key, value) {
  var hashValue = encodeURIComponent(value);
  document.cookie = key + "=" + hashValue + "; max-age=3600; path=/";
}

function getCookie(key) {
  var list = decodeURIComponent(document.cookie).split(";");
  for (var i = 0; i < list.length; i++) {
    var c = list[i].trim();
    if (c.indexOf(key + "=") == 0) {
      return c.substring(key.length + 1, c.length);
    }
  }
  return "";
}
