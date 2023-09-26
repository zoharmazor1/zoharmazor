let users = []
window.addEventListener("load", () => {
  const usersFromStorge = JSON.parse(localStorage.getItem("users"));
  if (usersFromStorge) users = usersFromStorge
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault()///refresh
    createUser()
  })
})

class User{
  constructor(email , userName,firstName,lastName, age,password , confirmPassword){
    this.email = email;
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.password = password;
    this.confirmPassword = confirmPassword
  }

  signup(){
  let errorUserName = document.getElementById("errorUserName");
  if (this.userName.length < 6) {
    errorUserName.style.display = "block"
    return;
  }
  else {
    errorUserName.style.display = "none"
  }
  let errorFirstName = document.getElementById("errorFirstName");
  if (this.firstName.length < 2) {
    errorFirstName.style.display = "block"
    return;
  }
  else {
    errorFirstName.style.display = "none"
  }
  let errorLastName = document.getElementById("errorLastName");
  if (this.lastName.length < 2) {
    errorLastName.style.display = "block"
    return;
  }
  else {
    errorLastName.style.display = "none"
  }
  if (this.age < 18 || this.age > 65) {
    alert("הגיל צריך להיות בין 18-65");
    return;
  }
  if (this.password.length < 6) {
    alert("סיסמה חייבת לכלול 6 תווים לפחות")
    return;
  }
    let hasLetter = false;
    let hasNumber = false;
    for(let char of this.password){
      if((char >= 'a' && char<='z') || (char >= 'A' && char<='Z')) {
          hasLetter = true;
        }
       else if(char >= '0' && char<='9') {
          hasNumber = true;
      }
    }
    if(!hasLetter || !hasNumber){
       alert("סיסמה חייבת לכלול לפחות אות אחת ומספר אחד")
    return;
    }
    
  if (this.password !== this.confirmPassword) {
    alert("סיסמה לא תואמת")
    return
  }
    
  let user = {
    email :this.email,
    userName :this.userName,
    firstName :this.firstName,
    lastName :this.lastName,
    age :this.age,
    password :this.password,
    shifts : [],
    educational : [],
    profational : []
  }
  users.push(user)
  console.log(users)
  localStorage.setItem("users", JSON.stringify(users))
  alert("user sign up")
  window.location.href = "login.html"
  }
}

function createUser(){
   const email = document.getElementById("email").value;
  const userName = document.getElementById("userName").value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const age = document.getElementById("age").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  const newUser = new User(email , userName,firstName,lastName, age,password , confirmPassword)
  newUser.signup()
}
