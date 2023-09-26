let shifts = [];
let filteredShifts = [];
let user = null;
window.addEventListener("load",()=>{
  let userFromLocal =  JSON.parse(localStorage.getItem('loginUser'));
  if(!userFromLocal) window.location.href = "login.html";
  else{
    let nameNavbar = document.getElementById('nameNavbar');
    if(nameNavbar) nameNavbar.innerHTML = 'Hello- ' + userFromLocal.userName
    user = userFromLocal
    shifts = [...user.shifts]
    showShifts([...user.shifts])
    let filterByBranch = document.getElementById('filterByBranch');
    filterByBranch.addEventListener("change",(e)=>{
      console.log(e.target.value)
      filteredShifts = shifts.filter((shift)=>shift.branch == e.target.value);
      showShifts([...filteredShifts])
    })
      let filterByRole = document.getElementById('filterByRole');
    filterByRole.addEventListener("change",(e)=>{
      console.log(e.target.value)
      filteredShifts = shifts.filter((shift)=>shift.role == e.target.value);
      showShifts([...filteredShifts])
    })
  }
})

function showShifts(shifts){
  let totalSalary = 0;
  const allShifts = document.getElementById('tbody');
  allShifts.innerHTML = '';
  for(let shift of shifts){
    totalSalary += Number(shift.total)
    const shiftRow = document.createElement('tr');
    shiftRow.innerHTML = `
    <td>${shift.date}</td>
    <td>${shift.start}</td>
    <td>${shift.end}</td>
    <td>${shift.salary}</td>
    <td>${shift.time}</td>
    <td>${shift.role}</td>
    <td>${shift.branch}</td>
    <td>${shift.total}</td>
    <td>${shift.comments}</td>
    `

    const tdEdit = document.createElement('td')
    const buttonEdit = document.createElement('button')
    buttonEdit.innerText = "edit";
    buttonEdit.addEventListener("click",()=>{
      editShift(shift)
    })
    tdEdit.append(buttonEdit)
    
    const tdDelete = document.createElement('td')
    const buttonDelete = document.createElement('button')
    buttonDelete.innerText = "delete";
    buttonDelete.addEventListener("click",()=>{
      deleteShift(shift)
    })
    tdDelete.append(buttonDelete)
    shiftRow.append(tdEdit , tdDelete)
    allShifts.append(shiftRow)
  }
  let totalSalaryDiv =  document.getElementById('totalSalary');
  totalSalaryDiv.innerText = 'Your total salary is:  ' + totalSalary;

}

    function deleteShift(shift){
       const popup = document.createElement('div');
        popup.className = "popup1";
      popup.innerText = "Are you sure?"
      const buttonYes = document.createElement('button');
      buttonYes.innerText = "Yes"
      buttonYes.addEventListener("click",()=>{
        console.log(shift)
       let oldArray = user.shifts
    let shiftsUser= oldArray.filter((shift1)=>shift1 != shift)
    showShifts(shiftsUser);
    user.shifts = [...shiftsUser]
        popup.remove()
    localStorage.setItem('loginUser' , JSON.stringify(user))
    let allusers =  JSON.parse(localStorage.getItem("users"));
    if(allusers && allusers.length > 0){
      for(let oneUser of allusers){
        if(oneUser.userName === user.userName && oneUser.password === user.password){
          oneUser.shifts = [...shiftsUser];
          localStorage.setItem('users' , JSON.stringify(allusers))
        }
      }
    }
      })
       const buttonNo = document.createElement('button');
      buttonNo.innerText = "No"
      buttonNo.addEventListener("click",()=>{
        popup.remove()
      })
      popup.append(buttonYes , buttonNo)
      const allShiftsDiv = document.getElementById("allShifts");
  allShiftsDiv.append(popup)
    }

function editShift(shift){
   const popup = document.createElement('div');
  popup.className = "popup";
  const dateInput = document.createElement('input');
  dateInput.value = shift.date;
  dateInput.type = "date";
  const startInput = document.createElement('input');
  startInput.value = shift.start;
  const endInput = document.createElement('input');
  endInput.value = shift.end;
  const salaryInput = document.createElement('input');
  salaryInput.value = shift.salary;
      const timeInput = document.createElement('select');
  timeInput.innerHTML = `
  <option value="morning">morning</option>
  <option value="noon">noon</option>
  <option value="evening">evening</option>
  const roleInput = document.createElement('select');
  `
  timeInput.value = shift.time; 
  const roleInput = document.createElement('select');
  
  roleInput.innerHTML = `
  <option value="Branch Manger">Branch Manger</option>
  <option value="Shift Manger">Shift Manger</option>
  <option value="Waiter">Waiter</option>
  <option value="Bartender">Bartender</option>
  `
  roleInput.value = shift.role
  
   const branchInput = document.createElement('select');
  branchInput.innerHTML = `
  <option value="Tel Aviv">Tel Aviv</option>
 <option value="Haifa">Haifa</option>
 <option value="Jerusalem">Jerusalem</option>
 <option value="Beer Sheva">Beer Sheva</option>
  <option value="Eliat">Eliat</option>
   <option value="Ra'anana ">Ra'anana</option>
    <option value="Kiryat Gat">Kiryat Gat</option>
  `
  branchInput.value = shift.branch
  const totalInput = document.createElement('input');
  totalInput.value = shift.total;
    const commentsInput = document.createElement('input');
  commentsInput.value = shift.comments;
   const addButton = document.createElement('button');
  addButton.innerText = "Edit shift";
  addButton.addEventListener("click",()=>{
    let oldArray = user.shifts;
    let newShift = {
      date : dateInput.value , 
      start :startInput.value , 
      end :endInput.value , 
      salary: salaryInput.value , 
      time : timeInput.value,
      role: roleInput.value , 
      branch :branchInput.value , 
      total:totalInput.value,
      comments: commentsInput.value
    }
    let shiftsUser= oldArray.filter((shift1)=>shift1 != shift)
    shiftsUser.push(newShift)
    showShifts(shiftsUser);
    user.shifts = [...shiftsUser]
    popup.remove()
    localStorage.setItem('loginUser' , JSON.stringify(user))
    let allusers =     JSON.parse(localStorage.getItem("users"));
    if(allusers && allusers.length > 0){
      for(let oneUser of allusers){
        if(oneUser.userName === user.userName && oneUser.password === user.password){
          oneUser.shifts = [...shiftsUser];
          localStorage.setItem('users' , JSON.stringify(allusers))
        }
      }
    }
   // let newShift = new Shift(dateInput.value , startInput.value , endInput.value , salaryInput.value , roleInput.value , branchInput.value , totalInput.value)
   //  newShift.add()
  })
  popup.append(dateInput , startInput , endInput , salaryInput , timeInput ,roleInput , branchInput , totalInput ,commentsInput, addButton)
  const allShiftsDiv = document.getElementById("allShifts");
  allShiftsDiv.append(popup)
}

function addShift(){
  const popup = document.createElement('div');
  popup.className = "popup";
  const dateInput = document.createElement('input');
  dateInput.placeholder = "date";
  dateInput.type = "date";
  const startInput = document.createElement('input');
  startInput.placeholder = "Start Time";
  const endInput = document.createElement('input');
  endInput.placeholder = "End Time";
  const salaryInput = document.createElement('input');
  salaryInput.placeholder = "Salary";
    const timeInput = document.createElement('select');
  timeInput.innerHTML = `
  <option value="morning">morning</option>
  <option value="noon">noon</option>
  <option value="evening">evening</option>
  `
  const roleInput = document.createElement('select');
  roleInput.innerHTML = `
  <option value="Branch Manger">Branch Manger</option>
  <option value="Shift Manger">Shift Manger</option>
  <option value="Waiter">Waiter</option>
  <option value="Bartender">Bartender</option>
  `
   const branchInput = document.createElement('select');
  branchInput.innerHTML = `
  <option value="Tel Aviv">Tel Aviv</option>
 <option value="Haifa">Haifa</option>
 <option value="Jerusalem">Jerusalem</option>
 <option value="Beer Sheva">Beer Sheva</option>
  <option value="Eliat">Eliat</option>
   <option value="Ra'anana ">Ra'anana</option>
    <option value="Kiryat Gat">Kiryat Gat</option>
  `
  const totalInput = document.createElement('input');
  totalInput.placeholder = "Total Salary";
  const commentsInput = document.createElement('input');
  commentsInput.placeholder = "Comments";
   const addButton = document.createElement('button');
  addButton.innerText = "Add shift";
  addButton.addEventListener("click",()=>{
   let newShift = new Shift(dateInput.value , startInput.value , endInput.value , salaryInput.value , timeInput.value ,roleInput.value , branchInput.value , totalInput.value , commentsInput.value)
    newShift.add()
    popup.remove()
  })
  popup.append(dateInput , startInput , endInput , salaryInput , timeInput, roleInput , branchInput , totalInput ,commentsInput, addButton)
  const allShiftsDiv = document.getElementById("allShifts");
  allShiftsDiv.append(popup)
}

class Shift {
  constructor(date , start , end , salary ,time , role , branch , total, comments){
    this.date = date;
    this.start = start;
    this.end = end;
    this.salary = salary;
    this.time = time
    this.role = role;
    this.branch = branch;
    this.total = total;
    this.comments = comments;
  }

  add(){
    let shift = {
      date : this.date,
      start : this.start,
      end : this.end,
      salary : this.salary,
      time : this.time,
      role : this.role,
      branch : this.branch,
      total : this.total,
      comments : this.comments
    }

    let shiftsUser = user.shifts
    shiftsUser.push(shift);
    showShifts(shiftsUser);
    user.shifts = [...shiftsUser]
    localStorage.setItem('loginUser' , JSON.stringify(user))
    let allusers =     JSON.parse(localStorage.getItem("users"));
    if(allusers && allusers.length > 0){
      for(let oneUser of allusers){
        if(oneUser.userName === user.userName && oneUser.password === user.password){
          oneUser.shifts = [...shiftsUser];
          localStorage.setItem('users' , JSON.stringify(allusers))
        }
      }
    }
  }
  
}

function logout(){
  localStorage.removeItem('loginUser');
  window.location.href = "login.html";
}
