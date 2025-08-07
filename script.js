
let form = document.getElementById("form");
let body = document.getElementById("tbody");
let employees  = [];
let editEmail = null;

function addemployee(employee){

   if (editEmail) {
        // Edit mode: update existing employee
        let index = employees.findIndex(emp => emp.email === editEmail);
        if (index !== -1) {
            employees[index] = employee; // Update array

            // Update matching <tr> in table
            let rows = body.querySelectorAll("tr");
            rows.forEach(row => {
                let rowEmail = row.querySelector('button[editrow]').getAttribute("editrow");
                if (rowEmail === editEmail) {
                    row.innerHTML = `<td>${employee.name}</td>
                                     <td>${employee.email}</td>
                                     <td>${employee.id}</td>
                                     <td>${employee.company}</td>
                                     <td>${employee.designation}</td>
                                     <td>
                                        <button onclick="removed(this)" addremove="${employee.email}" id="remove">Remove</button>
                                        <button onclick="edit(this)" editrow="${employee.email}" id="edit">Edit</button>
                                     </td>`;
                }
            });
        }
        editEmail = null; // Exit edit mode
    } else {

   // let body = document.getElementById("body");
   for(let i=0;i<employees.length;i++){
        if(employees[i].email === employee.email){
            alert("Email is already exist")
             return;
        }
       
   }

    let tr = document.createElement("tr")

   tr.innerHTML = `<td>${employee.name}</td>
                   <td>${employee.email}</td>
                   <td>${employee.id}</td>
                   <td>${employee.company}</td>
                   <td>${employee.designation}</td>
                   <td>
                   <button class="btn-remove" onclick="removed(this)" addremove="${employee.email}">Remove</button>
                   <button class="btn-edit" onclick="edit(this)"  editrow = "${employee.email}">Edit</button>
                   </td>`
    
   body.appendChild(tr);
   employees.push(employee);
  }
   //console.log(body);
   form.reset();
}

document.addEventListener("submit",(event) =>{
    event.preventDefault();
    let employee = {
        name: event.target.name.value,
        email: event.target.email.value,
        id: event.target.id.value,
        company: event.target.company.value,
        designation: event.target.designation.value
    }  
    addemployee(employee)
})
 
function removed(buttonRef){
    let empid = buttonRef.getAttribute("addremove");
    
    
   // for(let i=0; i<employees.length;i++){
            let filt = employees.filter((emp)=>{
                      if(emp.email != empid){
                        return true;
                      }
                   
                 //  console.log(filt)
            })
            employees = filt


        // if(employees[i].empid === empid){
        //     employees.splice(i,1)
        //     break;
        // }
  //  } 

    console.log(employees)
    let parentTd = buttonRef.parentNode; 
    let parentTr = parentTd.parentNode; 
    parentTr.remove();
}

/////  Here is the edit function

  function edit(buttonRef) {
    let emailToEdit = buttonRef.getAttribute("editrow");
    editEmail = emailToEdit; // Save the email to know we're editing

    let employee = employees.find(emp => emp.email === emailToEdit);
    if (!employee) return;

    // Populate form with existing data
    form.name.value = employee.name;
    form.email.value = employee.email;
    form.id.value = employee.id;
    form.company.value = employee.company;
    form.designation.value = employee.designation;
}
