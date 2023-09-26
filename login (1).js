let users = []
window.addEventListener("load", () => {
  const usersFromStorge = JSON.parse(localStorage.getItem("users"));
  if (usersFromStorge) users = usersFromStorge
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    login()
  })
})

function login() {
  const userName = document.getElementById("userName").value;
  const password = document.getElementById("password").value;

  let errorUserName = document.getElementById("errorUserName");
  if (userName === "") {
    errorUserName.style.display = "block";
    return;
  } else {
    errorUserName.style.display = "none"
  }

  let errorPassword = document.getElementById("errorPassword");
  if (password === "") {
    errorPassword.style.display = "block";
    return;
  } else {
    errorPassword.style.display = "none"
  }

  let continueCheck = false
  for (let user of users) {
    if (user.userName === userName) {
      continueCheck = true;
      localStorage.setItem('loginUser' , JSON.stringify(user))
    }
    if (continueCheck) {
      if (user.password === password) {
        alert("login success")
        window.location.href = "Shift.html";
        return;
      }
    }
  }
  if (!continueCheck) {
    alert("userName is not exist")
    return;
  }
  alert("password is not valid")
  // alert("login failed")
}

